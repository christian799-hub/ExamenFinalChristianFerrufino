import logoFerreteria from '../assets/Logo2.png';
import './Menu.css';

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="card">
        <img src={logoFerreteria} alt="Logo Ferretería América" className="logo" />
        <h1>Sistema de facturación<br />Ferretería América</h1>
        <p>Bienvenido al panel de control</p>
      </div>
    </div>
  );
};

export default Menu;