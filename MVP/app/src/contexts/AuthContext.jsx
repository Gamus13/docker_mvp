import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axios';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [users, setUsers] = useState([]);

  const setUser = (user, role) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      setIsAuthenticated(false);
    }
    _setUser(user);
    setRole(role);
  };

  const addUser = (userInfo) => {
    setUsers((prevUsers) => [...prevUsers, userInfo]);
    setIsAuthenticated(true);
  };

  const getUsers = () => {
    return users;
  };

  const csrfToken = async () => {
    await axios.get('http://localhost/sanctum/csrf-cookie');
    return true;
  };

  useEffect(() => {
    // Vérifiez l'état d'authentification lors du montage si nécessaire
    // Par exemple, vérifier le stockage local ou d'autres méthodes pour maintenir l'authentification
    setIsAuthenticated(!!user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, setUser, csrfToken, addUser, getUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
