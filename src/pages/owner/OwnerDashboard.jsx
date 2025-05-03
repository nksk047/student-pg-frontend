import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const [pgs, setPgs] = useState([]);
  const [status, setStatus] = useState('');
  const token = localStorage.getItem('pgUserToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/pgs/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPgs(res.data);
      } catch (err) {
        console.error('Failed to load PGs');
      }

      try {
        const res = await axios.get('http://localhost:5000/api/owner/verify/status', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStatus(res.data.status);
      } catch {
        setStatus('not-submitted');
      }
    };

    fetchData();
  }, []);

  


  return (
    <div className="owner-dashboard">
      <h2>Owner Dashboard</h2>

      <div className={`verification-status ${status.replace(' ', '-')}`}>
        Verification Status:
        <span className="badge"> {status}</span>
      </div>

      <div className="pg-list-section">
        <h3>Your PG Listings</h3>
        {pgs.length === 0 ? (
          <p className="empty">You haven't added any PGs yet.</p>
        ) : (
          <div className="pg-owner-list">
            {pgs.map(pg => (
              <div key={pg._id} className="pg-owner-card">
                <h4>{pg.name}</h4>
                <p className="details">{pg.city} | ₹{pg.rent} | {pg.type}</p>
                <p className="small">Amenities: {pg.amenities.join(', ')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
