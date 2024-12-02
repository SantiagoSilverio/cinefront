'use client'; // Asegura que todo este archivo sea del lado del cliente
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { login as apiLogin, logout as apiLogout } from '../services/api'; // Funciones de login y logout desde un archivo de servicios

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      // Si hay token, podrías obtener datos del usuario desde la API
      // Aquí podrías hacer una llamada real para obtener los datos del usuario
      setUser({ username: 'Usuario autenticado' });
    }
    setLoading(false); // Deja de estar en estado de carga
  }, []);

  const login = async (username, password) => {
    const data = await apiLogin(username, password);
    setUser({ username });
    Cookies.set('access_token', data.access); // Guarda el token en las cookies
    return data;
  };

  const logout = async () => {
    try {
      await apiLogout(); // Llamada a la API para cerrar sesión
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      Cookies.remove('access_token');
      setUser(null); // Elimina el usuario del estado
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Opcional: Pantalla de carga
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
