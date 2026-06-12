//Inicializa React
// Librería principal React
import React from 'react'
// Renderizado React DOM
import ReactDOM from 'react-dom/client'
// Componente principal App
import App from './App'
import './index.css'



// Crear aplicación React
ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    {/* Contexto autenticación */}
      {/* Aplicación principal */}
      <App />
  </React.StrictMode>
)