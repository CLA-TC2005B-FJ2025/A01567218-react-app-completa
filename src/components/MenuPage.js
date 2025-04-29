import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './MenuPage.css';

function MenuPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalEncuestas = 721;
  const encuestasEsperadas = 1007;
  const porcentajeCompletadas = Math.round((totalEncuestas / encuestasEsperadas) * 100);
  const porcentajeFaltantes = 100 - porcentajeCompletadas;
  const encuestasFaltantes = encuestasEsperadas - totalEncuestas;

  return (
    <div className="menu-container"> 
      <header className="dashboard-header">
        <div className="left-logos"></div>
        <div className="right-profile"></div>
      </header>

      <div className="menu-content">

        {/* Tarjeta de encuestas completadas */}
        <div className="card-encuestas">
          <div className="circular-chart">
            <CircularProgressbar
              value={porcentajeCompletadas}
              text={`${porcentajeCompletadas}%`}
              styles={buildStyles({
                textColor: "#999",
                pathColor: "#1814A9",  // Azul fuerte
                trailColor: "#d6d6d6",
                textSize: '18px',
              })}
            />
            <p className="label">Encuestas completadas</p>
          </div>

          <div className="encuestas-info">
            <p><strong>Total completadas</strong><br />{totalEncuestas}</p>
            <p><strong>Encuestas esperadas</strong><br />{encuestasEsperadas}</p>
            <select className="dropdown-clasificacion">
              <option>Elegir clasificación</option>
            </select>
          </div>
        </div>

        {/* Tarjeta de encuestas faltantes */}
        <div className="card-encuestas">
          <div className="circular-chart">
            <CircularProgressbar
              value={porcentajeFaltantes}
              text={`${porcentajeFaltantes}%`}
              styles={buildStyles({
                textColor: "#999",
                pathColor: "#E03E3E", // Rojo fuerte
                trailColor: "#d6d6d6",
                textSize: '18px',
              })}
            />
            <p className="label">Encuestas faltantes</p>
          </div>

          <div className="encuestas-info">
            <p><strong>Total faltantes</strong><br />{encuestasFaltantes}</p>
            <p><strong>Encuestas esperadas</strong><br />{encuestasEsperadas}</p>
            <select className="dropdown-clasificacion">
              <option>Elegir clasificación</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MenuPage;