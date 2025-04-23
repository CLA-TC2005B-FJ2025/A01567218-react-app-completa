import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './MenuPage.css';

function MenuPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <div className="menu-container">
      <img src="/img/logoECOA.png" alt="Login" className="logo-monos" />
      <img src="/img/hplogo.png" alt="Login" className="logo-hp" />
      <img src="/img/profileicon.png" alt="icono usuario" className="profile-icon" />
      {user && <h1 className="bienvenida">Bienvenido, {user}</h1>}
      <ul>
        <li><a href="/listapersonajes">Lista todos los personajes</a></li>
        <li><a href="/crearpersonaje">Crear personaje</a></li>
        <li><a href="/actualizarpersonaje">Actualizar personaje</a></li>
        <li><a href="/eliminarpersonaje">Eliminar personaje</a></li>
      </ul>
      <img
      src="/img/logouticon.png"
      alt="Cerrar sesión"
      className="icon-logout"
      onClick={handleLogout}
      />
    </div>
    </div>
  );
}

export default MenuPage;
