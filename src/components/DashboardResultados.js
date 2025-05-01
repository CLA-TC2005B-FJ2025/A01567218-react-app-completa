import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardResultados.css';
import { FaSearch, FaUser, FaComment, FaTrash } from 'react-icons/fa';

const DashboardResultados = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [comentarios, setComentarios] = useState([
    "No me gustan las clases del profe Javier. Es muy molesto me choca.",
    "No me gustan las clases del profe Javier. Es muy molesto me choca.",
    "No me gustan las clases del profe Javier. Es muy molesto me choca."
  ]);

  const resultados = [
    { nombre: 'Carlos Ventura', porcentaje: 88 },
    { nombre: 'Renata Soto', porcentaje: 70 },
    { nombre: 'Diego Estrada', porcentaje: 55 },
    { nombre: 'Leslye Bailón', porcentaje: 99 },
    { nombre: 'Javier Loaiza', porcentaje: 33 },
  ];

  const getColorClass = (porcentaje) => {
    if (porcentaje >= 90) return 'verde';
    if (porcentaje >= 70) return 'amarillo';
    if (porcentaje >= 50) return 'naranja';
    return 'rojo';
  };

  const handleClick = (nombre) => {
    if (nombre === 'Carlos Ventura') {
      navigate('/profesor');
    }
  };

  const handleDeleteComment = (index) => {
    setComentarios(prevComentarios => prevComentarios.filter((_, i) => i !== index));
  };

  return (
    <div className="contenedor">
      <div className="panel panel-izquierdo">
        <h2>Filtrar resultados</h2>
        <select>
          <option>Filtrar resultados por</option>
        </select>
        <ul className="lista-resultados">
          {resultados.map((r, idx) => (
            <li 
              key={idx} 
              className="tarjeta-resultado"
              onClick={() => handleClick(r.nombre)}
              style={{ cursor: 'pointer' }}
            >
              <FaUser className="icono-usuario" />
              <span className="info-usuario">{r.nombre} Per.Ene–Feb 2025</span>
              <span className={`porcentaje ${getColorClass(r.porcentaje)}`}>{r.porcentaje}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel panel-derecho">
        <h2>Manejo de comentarios</h2>
        <div className="buscador">
          <input
            type="text"
            placeholder="Buscar palabra clave"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch />
        </div>
        <ul className="lista-comentarios">
          {comentarios.map((comentario, idx) => (
            <li key={idx} className="tarjeta-comentario">
              <FaComment className="icono-comentario" />
              <span className="texto-comentario">{comentario}</span>
              <button 
                className="delete-button"
                onClick={() => handleDeleteComment(idx)}
                title="Eliminar comentario"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardResultados;