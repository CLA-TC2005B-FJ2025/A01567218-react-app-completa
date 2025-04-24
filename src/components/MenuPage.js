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
      {/* NUEVO HEADER */}
      <header className="dashboard-header">
        <div className="left-logos">
          <img src="/img/logoECOA.png" alt="ECOA logo" className="logo-monos" />
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
  
      {/* El resto de tu dashboard */}
      <ul className="dashboard-menu">
        <li><a href="/listapersonajes">Lista todos los personajes</a></li>
        <li><a href="/crearpersonaje">Crear personaje</a></li>
        <li><a href="/actualizarpersonaje">Actualizar personaje</a></li>
        <li><a href="/eliminarpersonaje">Eliminar personaje</a></li>
      </ul>
    </div>
  );
}


export default MenuPage;