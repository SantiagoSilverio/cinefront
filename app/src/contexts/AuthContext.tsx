'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

// Types
interface User {
  username: string;
  email?: string;
  groups?: { name: string }[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ access?: string; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create context with type assertion
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('access_token');
        if (token) {
          const response = await fetch('https://back-k1a3.onrender.com/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // If token is invalid, remove it
            Cookies.remove('access_token');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        Cookies.remove('access_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('https://back-k1a3.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }

      if (data.access) {
        Cookies.set('access_token', data.access, { expires: 7 });
        
        // Fetch user profile after successful login
        const profileResponse = await fetch('https://back-k1a3.onrender.com/profile', {
          headers: {
            Authorization: `Bearer ${data.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setUser(profileData);
        }

        return { access: data.access };
      }

      return { error: 'No se pudo obtener el token de acceso' };
    } catch (error) {
      console.error('Login error:', error);
      return { error: error instanceof Error ? error.message : 'Error en el inicio de sesión' };
    }
  };

  const logout = async () => {
    try {
      const token = Cookies.get('access_token');
      if (token) {
        await fetch('https://back-k1a3.onrender.com/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      Cookies.remove('access_token');
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}