import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8000/api';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    console.log('Sending registration data:', userData);
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
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
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User data response:', response.data);
    return response.data.data.user;
  } catch (error) {
    console.error('Error getting user data:', error.response?.data || error.message);
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
