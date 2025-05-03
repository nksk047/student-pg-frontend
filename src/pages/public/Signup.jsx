import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('pgUserToken', res.data.token);
      localStorage.setItem('pgUserRole', res.data.user.role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="owner">PG Owner</option>
        </select>
        <button type="submit">Sign Up</button>
        <p className="switch-link">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;
