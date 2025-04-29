import React, { useState } from 'react';
import './AñadirPerfil.css'; // Tu CSS

function AñadirPerfil() {
  const [nombreMateria, setNombreMateria] = useState('');
  const [codigoMateria, setCodigoMateria] = useState('');
  const [departamento, setDepartamento] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo de perfiles
  const perfiles = [
    { nombre: 'Profesor' },
    { nombre: 'Coordinador académico' },
    { nombre: 'Director académico' },
    { nombre: 'Laboratorista' },
    { nombre: 'Tutor' },
    { nombre: 'Coordinador deportivo' },
    { nombre: 'Coordinador cultural' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombreMateria, codigoMateria, departamento });
  };

  const filteredPerfiles = perfiles.filter(perfil =>
    perfil.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="crear-materia-page">
      {/* Primera tarjeta: Crear Materia */}
      <div className="crear-materia-container">
        <h2 className="crear-materia-title">Añadir perfil</h2>
        <form onSubmit={handleSubmit} className="crear-materia-form">
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={nombreMateria}
              onChange={(e) => setNombreMateria(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Apellido paterno</label>
            <input
              type="text"
              value={codigoMateria}
              onChange={(e) => setCodigoMateria(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Apellido materno</label>
            <input
              type="text"
              value={codigoMateria}
              onChange={(e) => setCodigoMateria(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Matrícula</label>
            <input
              type="text"
              value={codigoMateria}
              onChange={(e) => setCodigoMateria(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo de usuario</label>
            <input
              type="text"
              value={codigoMateria}
              onChange={(e) => setCodigoMateria(e.target.value)}
              required
            />
          </div>


          <div className="form-group">
            <label>Departamento</label>
            <select
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              required
            >
              <option value="">Selecciona un departamento</option>
              <option value="Académico">Académico</option>
              <option value="Deportivo">Deportivo</option>
              <option value="Cultural">Cultural</option>
              <option value="Laboratorista">Laboratorista</option>
              <option value="Tutores">Tutores</option>
            </select>
          </div>

          <button type="submit" className="crear-materia-button">
            Añadir perfil
          </button>
        </form>
      </div>

      {/* Segunda tarjeta: Lista de Perfiles */}
      <div className="perfiles-container">
        <h2 className="crear-materia-title">Todos los perfiles</h2>
        <input
          type="text"
          placeholder="Buscar perfil"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="perfiles-list">
          {filteredPerfiles.map((perfil, index) => (
            <div key={index} className="perfil-item">
              {perfil.nombre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AñadirPerfil;