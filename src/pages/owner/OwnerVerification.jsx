import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OwnerVerification.css';

const OwnerVerification = () => {
  const token = localStorage.getItem('pgUserToken');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const fetchStatus = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/owner/verify/status', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus(res.data.status);
    } catch {
      setStatus(null); // Not submitted yet
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await axios.post('http://localhost:5000/api/owner/verify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('✅ Document uploaded successfully.');
      setStatus('pending');
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Upload failed.');
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-box">
        <h2>Owner Verification</h2>

        {status && (
          <div className={`status-tag ${status.replace(' ', '-')}`}>
            Current Status: <strong>{status}</strong>
          </div>
        )}

        {!status && (
          <form className="upload-form" onSubmit={handleUpload}>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
            <button type="submit">Upload Verification Document</button>
          </form>
        )}

        {message && <p className="upload-message">{message}</p>}
      </div>
    </div>
  );
};

export default OwnerVerification;
