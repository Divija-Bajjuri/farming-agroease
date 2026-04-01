import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '@/lib/api-service';

export interface User {
  id: string;
  name: string;
  mobile: string;
  village?: string;
  district?: string;
  state?: string;
  farmSize?: string;
  cropTypes?: string[];
  preferredLanguage?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (mobile: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

interface RegisterData {
  name: string;
  mobile: string;
  password: string;
  village?: string;
  district?: string;
  state?: string;
  farmSize?: string;
  cropTypes?: string[];
  preferredLanguage?: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  updateProfile: async () => ({ success: false }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('agroEase_token');
    if (savedToken) {
      verifyToken(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (t: string) => {
    try {
      localStorage.setItem('agroEase_token', t);
      const data = await authAPI.getProfile();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(t);
      } else {
        localStorage.removeItem('agroEase_token');
      }
    } catch {
      localStorage.removeItem('agroEase_token');
    }
    setLoading(false);
  };

  const login = useCallback(async (mobile: string, password: string) => {
    try {
      const data = await authAPI.login({ mobile, password });
      
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('agroEase_token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    }
  }, []);

  const register = useCallback(async (regData: RegisterData) => {
    try {
      const data = await authAPI.register(regData);
      
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('agroEase_token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Registration failed' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('agroEase_token');
  }, []);

  const updateProfile = useCallback(async (profileData: Partial<User>) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    try {
      // For now, just update local state - could add API call later
      setUser({ ...user, ...profileData });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
