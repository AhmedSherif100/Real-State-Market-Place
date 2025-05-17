import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8000/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
};

export const getUserFromToken = async (token) => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    const response = await axios.get(`${API_URL}/users/${decoded.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.user;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Add token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
