import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, getCurrentUser } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        setUser(userData);
        setError(null);
      } catch (err) {
        setUser(null);
        // Only set error if it's not a 401 (unauthorized)
        if (err.response?.status !== 401) {
          setError(err.response?.data?.message || 'Authentication failed');
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginService(email, password);
      // The token is now in an HTTP-only cookie
      setUser(response.data.user);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutService();
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 