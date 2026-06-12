import { Link } from 'react-router-dom'
import './Unauthorized.css'
import { Helmet } from 'react-helmet-async'

const Unauthorized = () => {
  return (
    <>
    <Helmet>
      <title>UNAUTHORIZED</title>
    </Helmet>
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