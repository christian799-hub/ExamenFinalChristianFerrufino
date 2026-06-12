// App.jsx
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './routes/AppRoutes';

function App() {
  // Renderiza rutas envueltas en el proveedor de SEO
  return (
    <HelmetProvider>
      <AppRoutes />
    </HelmetProvider>
  );
}

export default App;