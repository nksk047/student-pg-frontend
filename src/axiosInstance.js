// src/axiosInstance.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
