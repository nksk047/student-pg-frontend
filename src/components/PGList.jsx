import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PGList.css';

const PGList = () => {
  const [pgs, setPgs] = useState([]);

  useEffect(() => {
    const fetchPGs = async () => { axios.get(`${process.env.REACT_APP_API_BASE}/api/pgs`);

      try {
        const res = await 
        setPgs(res.data);
      } catch (err) {
        console.error('Error fetching PG listings:', err.message);
      }
    };

    fetchPGs();
  }, []);

  return (
    <div>
      <h2>Available PG Listings</h2>
      {pgs.length === 0 ? (
        <p>No PGs listed yet.</p>
      ) : (
        <ul>
          {pgs.map((pg) => (
            <li key={pg._id}>
              <strong>{pg.name}</strong> - {pg.city} - ₹{pg.rent} <br />
              {pg.address} <br />
              Type: {pg.type} <br />
              Amenities: {pg.amenities.join(', ')}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PGList;
