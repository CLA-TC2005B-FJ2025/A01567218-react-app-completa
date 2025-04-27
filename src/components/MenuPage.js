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
        </div>
        <div className="right-profile">
        </div>
      </header>

      <div className="menu-content">
        <p>Selecciona una opción del menú lateral para comenzar.</p>
      </div>
    </div>
  );
}

export default MenuPage;
