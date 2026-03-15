import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('jwtToken');
            setUser(null);
          } else {
            // Optionally, verify token with backend or fetch fresh user data
            // For this project, we'll just set user from decoded token
            setUser({ id: decoded.id, name: decoded.name, email: decoded.email, isAdmin: decoded.isAdmin });
          }
        } catch (error) {
          console.error("Invalid token", error);
          localStorage.removeItem('jwtToken');
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, name: decoded.name, email: decoded.email, isAdmin: decoded.isAdmin });
      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await API.post('/auth/register', { name, email, password });
      // After successful registration, you might automatically log them in
      // or redirect to login page.
      // For this example, we'll just return success indication.
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
