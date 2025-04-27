import React from 'react';
import './Topbar.css';
import { HiOutlineLogout } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";




function Topbar() {
    return (
        <div className="topbar">
            <div className="topbar-left">
                <img src = "/img/logomonos.png" alt="logo monos" className="logomonos-topbar" />
                <img src = "/img/hplogo.png" alt="logo hp" className="logohp-topbar" />
            </div>
            <div className="topbar-center">
                <h1 className="bienvenida">Bienvenido, {localStorage.getItem('user')}</h1>
            <div className="topbar-right">
                <button onClick={handleLogout} className="icon-logout"> <HiOutlineLogout className="topbar-icon" /> </button>
                <button className="icon-settings"> <IoSettingsSharp className="topbar-icon" /> </button>
                <button className="icon-user"> <FaUserCircle className="topbar-icon" /> </button>
            </div>
            </div>
        </div>
    );
}

export default Topbar;