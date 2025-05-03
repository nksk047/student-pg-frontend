import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleListing.css';

const SingleListing = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);

  useEffect(() => {
    const fetchPg = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pgs/${id}`);
        setPg(res.data);
      } catch (err) {
        console.error('Failed to load PG');
      }
    };

    fetchPg();
  }, [id]);

  if (!pg) return <div className="single-loading">Loading...</div>;

  return (
    <div className="single-container">
      <div className="single-card">
        <h2>{pg.name}</h2>
        <p><strong>City:</strong> {pg.city}</p>
        <p><strong>Address:</strong> {pg.address}</p>
        <p><strong>Rent:</strong> ₹{pg.rent}</p>
        <p><strong>Type:</strong> {pg.type}</p>
        <p><strong>Amenities:</strong> {pg.amenities.join(', ')}</p>
      </div>
    </div>
  );
};

export default SingleListing;
