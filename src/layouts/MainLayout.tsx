// Renderiza rutas hijas
import { Outlet } from 'react-router-dom'
// Navbar principal
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <>
      {/* Barra navegación */}
      <Navbar />
      <Outlet />
      {/* Contenido dinámico */}
    </>
  )
}

export default MainLayout