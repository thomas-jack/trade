
import React, { useState, useEffect, createContext, useContext, useCallback, ReactNode, useMemo } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  handleAuthCallback: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'crypto-sim-user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(() => {
    // In a real app, this would redirect to your OAuth provider.
    // Here, we'll just navigate to our callback page to simulate the redirect.
    window.location.href = '/auth/callback';
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    // Redirect to home page to clear any state
    window.location.href = '/';
  }, []);
  
  const handleAuthCallback = useCallback(() => {
    // This is where you would handle the OAuth callback, e.g.,
    // exchange a code for a token and fetch user info.
    // For this simulation, we'll just create a mock user.
    setIsLoading(true);
    setTimeout(() => {
      const mockUser: User = {
        name: 'Satoshi',
        // A generic, creative avatar for the user
        avatarUrl: `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="none" stroke-width="5"><path stroke="#F7931A" d="M50,5 a45,45 0 1,0 0,90 a45,45 0 1,0 0,-90" /><path stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" d="M35 50 h30 M50 35 v30 M40 40 L60 60 M40 60 L60 40" /></g></svg>')}`,
      };
      setUser(mockUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
      setIsLoading(false);
      // Redirect back to the main application
      window.location.href = '/';
    }, 1500); // Simulate network request
  }, []);

  const value = useMemo(() => ({
    user,
    isLoading,
    login,
    logout,
    handleAuthCallback
  }), [user, isLoading, login, logout, handleAuthCallback]);

  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
