import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('pgUserToken');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(res.data);
      } catch (err) {
        console.error('Error loading favorites');
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="student-dashboard">
      <h2>Welcome to Your Dashboard</h2>

      <div className="fav-section">
        <h3>Your Saved PGs</h3>
        {favorites.length === 0 ? (
          <p className="empty">No favorites saved yet.</p>
        ) : (
          <div className="fav-grid">
            {favorites.map(pg => (
              <div key={pg._id} className="fav-card">
                <h4>{pg.name}</h4>
                <p>{pg.city} | ₹{pg.rent} | {pg.type}</p>
                <p className="small">Amenities: {pg.amenities.join(', ')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
