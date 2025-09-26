import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// The two mock users we have
const MOCK_USERS = {
  vendor: { type: 'vendor', name: 'Zoho (Chennai)' },
  distributor: { type: 'distributor', name: 'Germany' },
};

// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userType) => {
    const userToLogin = MOCK_USERS[userType];
    if (userToLogin) {
      setUser(userToLogin);
      navigate('/'); // Redirect to home page after login
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login'); // Redirect to login page after logout
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to easily use the context
export const useAuth = () => {
  return useContext(AuthContext);
};