import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeGetSession, safeSetSession, clearSessionKey, STORAGE_KEYS } from '../utils/storage';

const AuthContext = createContext();

// Preconfigured owner credentials for prototype owner session
const OWNER_CREDENTIALS = {
  username: 'santhosh',
  password: '1718',
};

export function AuthProvider({ children }) {
  const [isOwner, setIsOwner] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const session = safeGetSession(STORAGE_KEYS.AUTH, null);
    if (session && session.isAuthenticated && session.token) {
      setIsOwner(true);
    }
    setAuthChecked(true);
  }, []);

  const login = (username, password) => {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (
      cleanUser === OWNER_CREDENTIALS.username &&
      cleanPass === OWNER_CREDENTIALS.password
    ) {
      const sessionData = {
        isAuthenticated: true,
        token: 'owner_token_' + Date.now(),
        user: 'Santhosh (Owner)',
        loginTime: new Date().toISOString(),
      };
      safeSetSession(STORAGE_KEYS.AUTH, sessionData);
      setIsOwner(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials. Access restricted to site owner.' };
  };

  const logout = () => {
    clearSessionKey(STORAGE_KEYS.AUTH);
    setIsOwner(false);
  };

  return (
    <AuthContext.Provider value={{ isOwner, authChecked, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
