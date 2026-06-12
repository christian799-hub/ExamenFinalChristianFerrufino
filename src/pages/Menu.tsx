import logoFerreteria from '../assets/Logo2.png'; 
import './Menu.css';

const Menu = () => {
  return (
    <div className='card'>
      <h1>Sistema de facturacion Ferreteria America</h1>
      {logoFerreteria}
    </div>
  );
};

export default Menu;