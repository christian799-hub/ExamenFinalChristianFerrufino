import { Helmet } from 'react-helmet-async';
import logoFerreteria from '../assets/Logo2.png';
import './Menu.css';

const Menu = () => {
  return (
    <>
    <Helmet>

        <title>Menu Ferreteria America</title>

        <meta
          name="description"
          content="Menu Ferreteria America."
        />

        <meta
          name="keywords"
          content="React, JavaScript, frontend, desarrollo web, facturacion, Ferreteria, Menu"
        />

        <meta
          name="author"
          content="Christian Ferrufino"
        />

        {/* Open Graph */}

        <meta
          property="og:title"
          content="Menu Ferretería America"
        />

        <meta
          property="og:description"
          content="Menu Ferreteria America."
        />

        <meta
          property="og:type"
          content="website"
        />
    </Helmet>
          
    <div className="menu-container">
      <div className="card">
        <img src={logoFerreteria} alt="Logo Ferreteria America" className="logo" />
        <h1>Sistema de facturación<br />Ferretería América</h1>
        <p>Bienvenido al panel de control</p>
      </div>
    </div>
    </>
  );
};

export default Menu;