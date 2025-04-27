// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaList, FaPlusCircle, FaEdit, FaTrash, FaSignOutAlt, FaFileUpload,FaAddressBook, FaFileAlt } from 'react-icons/fa';
import './Sidebar.css';
import { IoPersonAdd } from "react-icons/io5";
import { HiUserAdd, HiDocumentAdd, HiClipboardList } from "react-icons/hi";
import { HiHome } from "react-icons/hi2";


function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('user');
  };

  return (
    <div id="sidebar" className="slide-in">
      <img src="/img/logomonos.png" alt="Logo ECOA" className="logo-jiji" />
      <ul className="space-y-2 mt-6">
        <li>
          <Link to="/menu" className={`sidebar-link ${location.pathname === '/menu' ? 'active' : ''}`}>
            <HiHome className="home-icon" />
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/listapersonajes" className={`sidebar-link ${location.pathname === '/listapersonajes' ? 'active' : ''}`}>
            <HiClipboardList className="sidebar-icon" />
            Lista de personajes
          </Link>
        </li>
        <li>
          <Link to="/crearpersonaje" className={`sidebar-link ${location.pathname === '/crearpersonaje' ? 'active' : ''}`}>
            <HiDocumentAdd className="add-icon" />
            Crear personaje
          </Link>
        </li>
        <li>
          <Link to="/actualizarpersonaje" className={`sidebar-link ${location.pathname === '/actualizarpersonaje' ? 'active' : ''}`}>
            <HiUserAdd className="sidebar-icon" />
            Actualizar personaje
          </Link>
        </li>
        <li>
          <Link to="/eliminarpersonaje" className={`sidebar-link ${location.pathname === '/eliminarpersonaje' ? 'active' : ''}`}>
            <FaTrash className="sidebar-icon" />
            Eliminar personaje
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="sidebar-link">
            <FaSignOutAlt className="sidebar-icon" />
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;