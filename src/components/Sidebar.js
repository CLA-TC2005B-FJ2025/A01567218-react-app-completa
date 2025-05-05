import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaList, FaPlusCircle, FaEdit, FaTrash, FaSignOutAlt, FaFileUpload, FaAddressBook, FaFileAlt, FaUser } from 'react-icons/fa';
import './Sidebar.css';
import { HiUserAdd, HiDocumentAdd, HiClipboardList } from "react-icons/hi";
import { HiHome } from "react-icons/hi2";
import { AuthContext } from '../contexts/AuthContext';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('user');
  };

  return (
    <div id="sidebar" className="slide-in">
      <div className="sidebar-content">
        <ul className="space-y-2 mt-6">
          <li>
            <Link to="/inicio" className={`sidebar-link ${location.pathname === '/inicio' ? 'active' : ''}`}>
              <HiHome className="home-icon" />
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/encuestas" className={`sidebar-link ${location.pathname === '/encuestas' ? 'active' : ''}`}>
              <HiClipboardList className="sidebar-icon" />
              Encuestas
            </Link>
          </li>
          <li>
            <Link to="/subirarchivo" className={`sidebar-link ${location.pathname === '/subirarchivo' ? 'active' : ''}`}>
              <HiDocumentAdd className="add-icon" />
              Subir archivos
            </Link>
          </li>
          <li>
            <Link to="/añadirperfil" className={`sidebar-link ${location.pathname === '/añadirperfil' ? 'active' : ''}`}>
              <HiUserAdd className="sidebar-icon" />
              Añadir perfil
            </Link>
          </li>

        </ul>
      </div>

      {/* Sección de usuario */}
      <div className="user-section">
        <div className="user-info">
          <FaUser className="user-icon" />
          <span className="username">{user ? `${user}@tec.mx` : 'Usuario'}</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;