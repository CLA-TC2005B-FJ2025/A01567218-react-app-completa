// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('user'); // opcional, si usas localStorage
  };

  return (
    <div id="sidebar">  
    <img src="/img/logomonos.png" alt="Logo ECOA" className="logo-jiji" />
      <ul>
        <li><Link to="/menu">Inicio</Link></li>
        <li><Link to="/listapersonajes">Lista de personajes</Link></li>
        <li><Link to="/crearpersonaje">Crear personaje</Link></li>
        <li><Link to="/actualizarpersonaje">Actualizar personaje</Link></li>
        <li><Link to="/eliminarpersonaje">Eliminar personaje</Link></li>
        <li><button onClick={handleLogout}>Cerrar sesión</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;
