import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { HiOutlineLogout } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import './Topbar.css';

function Topbar() {
  const { nombreCompleto, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // <-- para saber en qué página estás

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div id="topbar">
      <div className="topbar-left">
        <img src="/img/logomonos.png" alt="Logo Monos" className="logomonos-topbar" />
        <img src="/img/hplogo.png" alt="Logo HP" className="logohp-topbar" />
      </div>

      <div className="topbar-center">
        {/* solo en menu */}
        {location.pathname === '/menu' && (
          <h1 className="bienvenida">Bienvenido </h1>
        )}
      </div>

      <div className="topbar-right">
        <button onClick={handleLogout}><HiOutlineLogout className="topbar-icon" /></button>
        <button><IoSettingsSharp className="topbar-icon" /></button>
        <button><FaUserCircle className="topbar-icon" /></button>
      </div>
    </div>
  );
}

export default Topbar;