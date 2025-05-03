import React, { useState } from 'react';
import axios from 'axios';
import './AddPGForm.css';

const AddPGForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    rent: '',
    type: '',
    amenities: ''
  });

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
      amenities: formData.amenities.split(',').map(a => a.trim())
    };

    try {
      await axios.post('http://localhost:5000/api/pgs', payload);
      alert('PG listing added!');
      setFormData({
        name: '',
        address: '',
        city: '',
        rent: '',
        type: '',
        amenities: ''
      });
    } catch (err) {
      console.error('Error adding PG:', err.message);
    }
  };

  return (
    <div>
      <h2>Add New PG</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required /><br />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required /><br />
        <input name="rent" placeholder="Rent" value={formData.rent} onChange={handleChange} required type="number" /><br />
        <input name="type" placeholder="Type (Boys/Girls/Co-ed)" value={formData.type} onChange={handleChange} required /><br />
        <input name="amenities" placeholder="Amenities (comma separated)" value={formData.amenities} onChange={handleChange} /><br />
        <button type="submit">Add PG</button>
      </form>
    </div>
  );
};

export default AddPGForm;
