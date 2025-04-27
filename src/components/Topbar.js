import './Topbar.css';
import React, { useContext } from 'react';
import { HiOutlineLogout } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


function Topbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate('/login');
    };

    return (
        <div id="topbar" className="slide-inT">
            <div className="topbar-left">
                <img src = "/img/logomonos.png" alt="logo monos" className="logomonos-topbar" />
                <img src = "/img/hplogo.png" alt="logo hp" className="logohp-topbar" />
            </div>
            <div className="topbar-center">
                <h1 className="bienvenida">Bienvenido, {localStorage.getItem('user')}</h1>
            </div>
            <div className="topbar-right">
                <button onClick={handleLogout} className="icon-button"> <HiOutlineLogout className="topbar-icon" /> </button>
                <button className="icon-button"> <IoSettingsSharp className="topbar-icon" /> </button>
                <button className="icon-button"> <FaUserCircle className="topbar-icon" /> </button>
            </div>
            </div>
    );
}

export default Topbar;