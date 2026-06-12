// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Facturar, ListaFacturar, Logout } from './Icons';
import './Navbar.css';
import logoFerreteria from '../assets/Logo2.png'; 
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const esAdmin = user?.rol === 'Administrador';

  const handleLogout = () => {
    logout(); 
    navigate('/', { replace: true }); 
  };

  return (
    <nav className="navbar-container">
      {/* Logo */}
      <NavLink to="/menu" className="navbar-brand">
        <img src={logoFerreteria} alt="Logo" className="navbar-logo-img" />
      </NavLink>

      {/* Navegación */}
      <div className="navbar-menu">
        
        <NavLink to="/menu" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Menu />
          Menu
        </NavLink>
        {esAdmin &&(
          <NavLink to="/facturar" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Facturar />
          Facturar
        </NavLink>
        )}
        
        <NavLink to="/listafacturas" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <ListaFacturar />
          Lista Facturas
        </NavLink>

        <button onClick={handleLogout} className="nav-item btn-logout">
          <Logout />
          Cerrar Sesión
        </button>

      </div>
    </nav>
  );
};

export default Navbar;