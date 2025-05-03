import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMessage('✅ Password reset successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Invalid or expired link');
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleReset}>
        <h2>Reset Your Password</h2>
        {message && <p className="reset-message">{message}</p>}
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
