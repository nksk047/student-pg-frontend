import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorites.css';

const Favorites = () => {
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
        console.error('Failed to load favorites');
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites-container">
      <h2>Your Favorite PGs</h2>
      {favorites.length === 0 ? (
        <p className="empty-message">You haven't saved any PGs yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(pg => (
            <div key={pg._id} className="fav-card">
              <h3>{pg.name}</h3>
              <p>{pg.city} | ₹{pg.rent} | {pg.type}</p>
              <p className="amenities">Amenities: {pg.amenities.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
