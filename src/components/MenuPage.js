import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
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

      {/* Puedes quitar este menú si ya usas Sidebar */}
      <ul className="dashboard-menu">
        <li><Link to="/listapersonajes">Lista todos los personajes</Link></li>
        <li><Link to="/crearpersonaje">Crear personaje</Link></li>
        <li><Link to="/actualizarpersonaje">Actualizar personaje</Link></li>
        <li><Link to="/eliminarpersonaje">Eliminar personaje</Link></li>
      </ul>
    </div>
    </div>
  );
}

export default MenuPage;