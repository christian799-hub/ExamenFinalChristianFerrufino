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

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (rolRequerido && user.rol !== rolRequerido) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RutaProtegida;