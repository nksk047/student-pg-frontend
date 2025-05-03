import React, { useState } from 'react';
import axios from 'axios';
import './CreateListing.css';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    rent: '',
    type: '',
    amenities: ''
  });

  const [message, setMessage] = useState('');
  const token = localStorage.getItem('pgUserToken');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      rent: Number(formData.rent),
      amenities: formData.amenities.split(',').map(item => item.trim())
    };

    try {
      await axios.post('http://localhost:5000/api/pgs', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('✅ PG Listing Created!');
      setFormData({
        name: '',
        address: '',
        city: '',
        rent: '',
        type: '',
        amenities: ''
      });
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Failed to create listing');
    }
  };

  return (
    <div className="create-listing-container">
      <form className="create-listing-form" onSubmit={handleSubmit}>
        <h2>Create New PG Listing</h2>

        {message && <p className="form-message">{message}</p>}

        <input
          name="name"
          placeholder="PG Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          name="rent"
          placeholder="Rent (₹)"
          type="number"
          value={formData.rent}
          onChange={handleChange}
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="Co-ed">Co-ed</option>
        </select>
        <input
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={formData.amenities}
          onChange={handleChange}
        />

        <button type="submit">Post PG</button>
      </form>
    </div>
  );
};

export default CreateListing;
