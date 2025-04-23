import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './LoginPage.css';
import './MenuPage.css';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/menu');
      } else {
        setError('Usuario o password incorrectos');
      }
    } catch (err) {
      setError('No se pudo conectar al servicio de autenticacion.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
          <img src="/img/logotec.png" alt="Login" className="logo1" />
          <img src="/img/hplogo.png" alt="Login" className="logo2" />
      <div className="login-card">
      <img src="/img/logoECOA.png" alt="Login" className="logo" />
        <h2>Bienvenido al Sistema de Respuestas de la ECOA</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
          <div className="input-con-icon">
            <img src="/img/usericon.png" alt="icono usuario" />
            <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            required
            />
          </div>
          </div>
          <div>
          <div className="input-con-icon">
            <img src="/img/pwicon.png" alt="icono contraseña" />
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            />
          </div>

          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
  
}

export default LoginPage;
