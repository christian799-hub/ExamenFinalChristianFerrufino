import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import './Login.css'; 

import logoFerreteriaAmerica from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  // --- ESTADOS DE INTERFAZ ORIGINALES ---
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // --- NUEVOS ESTADOS DE SEGURIDAD ---
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    // Llama al login 
    const result = await login(user, password);

    if (result.success) {
      navigate('/menu', { replace: true });
    } else {
      setError(result.message || 'Error de credenciales');
    }
  };

  return (
    <>
      <Helmet>

        <title>Login Ferreteria America</title>

        <meta
          name="description"
          content="Login Ferreteria America."
        />

        <meta
          name="keywords"
          content="React, JavaScript, frontend, desarrollo web, facturacion, Ferreteria, Login"
        />

        <meta
          name="author"
          content="Christian Ferrufino"
        />

        {/* Open Graph */}

        <meta
          property="og:title"
          content="Login Ferretería America"
        />

        <meta
          property="og:description"
          content="Login Ferreteria America."
        />

        <meta
          property="og:type"
          content="website"
        />
      </Helmet>

      <div className="login-pagina">
        {/* --- Formulario --- */}
        <div className="login-izquierda">
          <div className="login-form-container">
            <h1 className="login-titulo">Login</h1>
            <p className="login-subtitulo">Ingrese sus datos</p>

            <form onSubmit={handleSubmit}>
              {/* Usuario */}
              <div className="form-grupo">
                <label htmlFor="text" className="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  id="usuario"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Usuario"
                  className="form-input"
                />
              </div>

              {/* Contraseña */}
              <div className="form-grupo">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input">
                  <input
                    type='password'
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Botón de Login */}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>

          {/* Mensaje ERROR */}

            {error && (
              <div className="error">
                {error}
              </div>
            )}

          {/* Footer*/}
          <div className="login-footer">
            © Ferreteria America 2026
          </div>
        </div>

        {/* --- (Logo) --- */}
        <div className="login-derecha">
          <div className="logo-grupo">
            <img
              src={logoFerreteriaAmerica}
              alt="Logo Ferreteria America"
              className="logo-icono"
            />
            <p className="logo-texto">
              Ferreteria<br />America
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;