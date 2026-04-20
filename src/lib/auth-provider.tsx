
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Colaborador } from './db/schema';
import { login as loginAction } from './auth';

interface AuthContextType {
  user: Colaborador | null;
  loading: boolean;
  login: (credentials: {username: string, password: string}) => Promise<Colaborador | { error: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Colaborador | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('team-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('team-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: {username: string, password: string}) => {
    const result = await loginAction(credentials);
    if ('error' in result) {
      return result;
    }

    try {
      localStorage.setItem('team-user', JSON.stringify(result));
      setUser(result);
    } catch (error) {
      console.error("Failed to save user to localStorage", error);
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('team-user');
      setUser(null);
      router.push('/equipo/login');
    } catch (error) {
      console.error("Failed to remove user from localStorage", error);
    }
  }, [router]);

  useEffect(() => {
    if (!loading && !user && pathname.startsWith('/equipo/dashboard')) {
        router.push('/equipo/login');
    }
  }, [user, loading, pathname, router]);

  if (loading && pathname?.startsWith('/equipo')) {
     return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
