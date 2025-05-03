import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listings.css';

const Listings = () => {
  const [pgs, setPgs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    maxRent: '',
    type: ''
  });

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/pgs`);

        setPgs(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Error fetching PGs', err.message);
      }
    };
    fetchPGs();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    let results = [...pgs];
  
    if (filters.city) {
      results = results.filter(pg => pg.city.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.maxRent) {
      results = results.filter(pg => pg.rent <= Number(filters.maxRent));
    }
    if (filters.type) {
      results = results.filter(pg => pg.type.toLowerCase() === filters.type.toLowerCase());
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(pg =>
        pg.name.toLowerCase().includes(query) ||
        pg.city.toLowerCase().includes(query) ||
        pg.address.toLowerCase().includes(query) ||
        pg.amenities.join(' ').toLowerCase().includes(query)
      );
    }
  
    setFiltered(results);
  };
  

  const handleFavorite = async (pgId) => {
    const token = localStorage.getItem('pgUserToken');
    try {
      await axios.post(`http://localhost:5000/api/favorites/${pgId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Added to favorites');
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving favorite');
    }
  };
  
  const [searchQuery, setSearchQuery] = useState('');
<input
  type="text"
  placeholder="Search by name, city, amenities..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>


  return (
    <div>
      <h2>PG Listings</h2>

      <div>
        <input name="city" placeholder="Filter by City" value={filters.city} onChange={handleFilterChange} />
        <input name="maxRent" placeholder="Max Rent" type="number" value={filters.maxRent} onChange={handleFilterChange} />
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="Co-ed">Co-ed</option>
        </select>
        <button onClick={applyFilters}>Apply</button>
        
      </div>

      <ul style={{ marginTop: '20px' }}>
  {filtered.length === 0 ? (
    <p>No PGs found</p>
  ) : (
    filtered.map(pg => (
      <li key={pg._id}>
        <strong>{pg.name}</strong> - {pg.city} - ₹{pg.rent} ({pg.type}) <br />
        Amenities: {pg.amenities.join(', ')} <br />
        Owner: {pg.owner?.name}
        {pg.owner?.isAdmin && (
          <span style={{ marginLeft: '10px', color: 'green' }}>✅ Verified</span>
        )}
        <br />
        <button onClick={() => handleFavorite(pg._id)}>❤️ Save to Favorites</button>
        <hr />
      </li>
    ))
  )}
</ul>
    </div>
  );
};

export default Listings;
