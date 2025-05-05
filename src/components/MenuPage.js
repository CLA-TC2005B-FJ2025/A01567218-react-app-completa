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

  // Datos de ejemplo para los archivos
  const archivos = [
    { nombre: 'Resultados_2024.pdf', fecha: '15/03/2024' },
    { nombre: 'Encuestas_Completadas.xlsx', fecha: '14/03/2024' },
    { nombre: 'Reporte_Mensual.pdf', fecha: '10/03/2024' },
    { nombre: 'Estadisticas_Generales.xlsx', fecha: '05/03/2024' }
  ];

  const fecha = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="menu-container"> 
      <header className="dashboard-header">
        <div className="left-logos"></div>
        <div className="right-profile"></div>
      </header>

      <div className="menu-content">
        <div className="info-general-container">
          <h2 className="info-general-titulo">Información general</h2>
          <p className="info-general-fecha">Para el {fecha}, las estadísticas de las encuestas son las siguientes:</p>
          
          {/* tarjeta de perfil */}
          <div className="card-perfil">
            <div className="perfil-info">
              <div className="perfil-icono">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="perfil-detalles">
                <h3>Administrador</h3>
                <p>Acceso completo al sistema</p>
              </div>
            </div>
          </div>

          <div className="cards-container">
            {/* tarjeta de encuestas completadas */}
            <div className="card-encuestas">
              <div className="circular-chart">
                <CircularProgressbar
                  value={porcentajeCompletadas}
                  text={`${porcentajeCompletadas}%`}
                  styles={buildStyles({
                    textColor: "#999",
                    pathColor: "#1814A9",
                    trailColor: "#d6d6d6",
                    textSize: '24px',
                    fontWeight: 'bold'
                  })}
                />
                <p className="label">Encuestas completadas</p>
              </div>

              <div className="encuestas-info">
                <p><strong>Total completadas:</strong> {totalEncuestas}</p>
                <p><strong>Encuestas esperadas:</strong> {encuestasEsperadas}</p>
                <select className="dropdown-clasificacion">
                  <option>Elegir clasificación</option>
                </select>
              </div>
            </div>

            {/* tarjeta de encuestas faltantes */}
            <div className="card-encuestas">
              <div className="circular-chart">
                <CircularProgressbar
                  value={porcentajeFaltantes}
                  text={`${porcentajeFaltantes}%`}
                  styles={buildStyles({
                    textColor: "#999",
                    pathColor: "#E03E3E",
                    trailColor: "#d6d6d6",
                    textSize: '24px',
                    fontWeight: 'bold'
                  })}
                />
                <p className="label">Encuestas faltantes</p>
              </div>

              <div className="encuestas-info">
                <p><strong>Total faltantes:</strong> {encuestasFaltantes}</p>
                <p><strong>Encuestas esperadas:</strong> {encuestasEsperadas}</p>
                <select className="dropdown-clasificacion">
                  <option>Elegir clasificación</option>
                </select>
              </div>
            </div>

            {/*tarjeta de manejo de archivos */}
            <div className="card-archivos">
              <h3 className="archivos-titulo">Manejo de archivos</h3>
              <div className="archivos-lista">
                {archivos.map((archivo, index) => (
                  <div key={index} className="archivo-item">
                    <div className="archivo-info">
                      <span className="archivo-nombre">{archivo.nombre}</span>
                      <span className="archivo-fecha">{archivo.fecha}</span>
                    </div>
                    <button className="btn-visualizar">Visualizar</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MenuPage;