
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('auth_token');
  return !!token; // Devuelve true si existe, false si es null o vacío
};

// Utilidad extra por si en el futuro necesitas saber el rol en alguna vista
export const getUserRole = (): 'Administrador' | 'Invitado' | null => {
  const userRaw = localStorage.getItem('auth_user');
  if (!userRaw) return null;
  try {
    const user = JSON.parse(userRaw);
    return user.rol;
  } catch {
    return null;
  }
};