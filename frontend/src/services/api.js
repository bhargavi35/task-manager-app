// frontend/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export const setToken = (token) => {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Interceptor to include token in requests if available
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default API;