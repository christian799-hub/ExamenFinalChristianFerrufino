// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginResponse } from '../types/auth'; // Tus interfaces originales
 // Tus interfaces originales

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (usuario: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica si hay una sesión activa al arrancar la aplicación
  useEffect(() => {
    const verificarSesion = () => {
      const token = localStorage.getItem('auth_token');
      const userRaw = localStorage.getItem('auth_user');

      if (token && userRaw) {
        try {
          setUser(JSON.parse(userRaw));
        } catch (error) {
          // Si el JSON está corrupto, limpiamos
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      }
      setLoading(false); // Finaliza la carga inicial
    };

    verificarSesion();
  }, []);

  // Función para iniciar sesión conectada a tu PHP
  const login = async (usuario: string, password: string) => {
    try {
      const response = await fetch("http://localhost/api/login.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password }),
      });

      if (!response.ok) {
        return { success: false, message: 'Error en la comunicación con el servidor' };
      }

      const data: LoginResponse = await response.json();

      if (data.success && data.token) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        setUser(data.user); // Guardamos reactivamente el usuario
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Credenciales incorrectas' };
      }
    } catch (error) {
      return { success: false, message: 'No se pudo conectar al servidor backend PHP' };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null); // Al pasar a null, toda la app reacciona y se protege
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar la autenticación de forma limpia
export const useAuth = () => useContext(AuthContext);