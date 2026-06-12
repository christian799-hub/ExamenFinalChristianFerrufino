import { Link } from 'react-router-dom'
import './Unauthorized.css'

const Unauthorized = () => {
  return (
    <>
    <div className="panelcontenido">
        <h1>Acceso denegado</h1>
        <Link to="/" className="btn">
            Volver al Login
        </Link>
    </div>
    
    </>
  )
}

export default Unauthorized