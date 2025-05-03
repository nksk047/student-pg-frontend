import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('pgUserToken', res.data.token);
      localStorage.setItem('pgUserRole', res.data.user.role);
      navigate(`/${res.data.user.role}/dashboard`);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {message && <p className="error-message">{message}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button type="submit">Login</button>

        <div className="extra-links">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
