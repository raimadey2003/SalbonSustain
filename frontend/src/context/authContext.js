import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      // 🔐 Allow hardcoded admin login
      if (email === 'admin@salbonsustain.com' && password === 'admin123') {
        const userData = {
          id: '1',
          name: 'Admin User',
          email: email,
          role: 'admin'
        };
        setUser(userData);
        localStorage.setItem('token', 'admin-placeholder-token'); // optional dummy token
        return { success: true, user: userData };
      }

      // 🧠 Backend login for normal users
      const response = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Login failed' };
      }

      setUser(data.user);
      localStorage.setItem('token', data.token); // ✅ Save token here!
      return { success: true, user: data.user };

    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5050/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Registration failed' };
      }

      setUser(data.user);
      localStorage.setItem('token', data.token); // ✅ Also save token here if needed
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // ✅ Remove token on logout
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      isAdmin,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
