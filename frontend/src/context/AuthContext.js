'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API, { setToken } from '../services/api';

const AuthContext = createContext();

const API_BASE_URL = process.env.BACKEND_URL

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log(user,'authuser');
  
  const router = useRouter();

  const login = async (username, password) => {
    const res = await API.post(`${API_BASE_URL}/auth/login`, { username, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    // setUser(res.data.user);
    setUser({ id: res.data.userId, username: username }); 
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setToken(token);
        const res = await API.get(`${API_BASE_URL}/users/${user.id}`);
        setUser(res.data);
      } catch (err) {
        logout();
      }
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
