import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'

import Login from '../pages/Login'

import Menu from '../pages/Menu'
import ListaFacturas from '../pages/ListaFacturas'
import Facturar from '../pages/Facturar'
import NotFound from '../pages/NotFound'
import Unauthorized from '../pages/Unauthorized'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from '../context/AuthContext'


const AppRoutes = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route
          path='/'
          element={
          <PublicRoute>
            <Login />
          </PublicRoute>
          }
        />

        { /*Test */}
        <Route
          element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
          }
        >
          <Route
          path='/menu'
          element={
          <PrivateRoute >
            <Menu />
          </PrivateRoute>
          }
          />

          <Route
          path='/facturar'
          element={
          <PrivateRoute rolRequerido = 'Administrador'>
            <Facturar />
          </PrivateRoute>
          }
          />

          <Route
          path='/listafacturas'
          element={
          <PrivateRoute>
            <ListaFacturas />
          </PrivateRoute>
          }
          />
        </Route>
        
        {/* 404 */}
        <Route
          path='*'
          element={<NotFound />}
        />
        { /* No autorizado */}
        <Route
          path='/unauthorized'
          element={
            <Unauthorized />
          }
          />
      </Routes>

    </BrowserRouter>
    </AuthProvider>
  )
}

export default AppRoutes