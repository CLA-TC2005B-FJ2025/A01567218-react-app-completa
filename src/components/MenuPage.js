// src/components/MenuPage.js
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
    <div className="menu-container"> 
      <header className="dashboard-header">
        <div className="left-logos">
          <img src="/img/hplogo.png" alt="HP logo" className="logo-hp" />
        </div>
        {user && <h1 className="bienvenida">Bienvenido, {user}</h1>}
        <div className="right-profile">
          <img src="/img/profileicon.png" alt="icono usuario" className="profile-icon" />
          <img
            src="/img/logouticon.png"
            alt="Cerrar sesión"
            className="icon-logout"
            onClick={handleLogout}
          />
        </div>
      </header>

      <div className="menu-content">
        <p>Selecciona una opción del menú lateral para comenzar.</p>
      </div>
    </div>
  );
}

export default MenuPage;
