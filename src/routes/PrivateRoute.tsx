// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactElement;
  rolRequerido?: string;
}

const RutaProtegida = ({ children, rolRequerido }: PrivateRouteProps) => {
  const { user } = useAuth();

  // 1. Si no hay nadie logueado, lo mandamos al Login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 2. Si definimos un rol obligatorio y el usuario no lo tiene, lo mandamos a la lista
  if (rolRequerido && user.rol !== rolRequerido) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Si pasó todas las pruebas, dibujamos la página a la que quería entrar
  return children;
};

export default RutaProtegida;