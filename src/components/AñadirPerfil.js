import React, { useState, useEffect } from 'react';
import './AñadirPerfil.css';
import { FaUser, FaIdCard, FaUserTie, FaBuilding } from 'react-icons/fa';

function AñadirPerfil() {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [matricula, setMatricula] = useState('');
  const [rol, setRol] = useState('');
  const [departamento, setDepartamento] = useState('');

  const [departamentos, setDepartamentos] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [historialPerfiles, setHistorialPerfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const responseDep = await fetch(`${baseUrl}/Departamento/nombres`);
        const dataDep = await responseDep.json();
        setDepartamentos(Array.isArray(dataDep) ? dataDep : dataDep.departamentos || []);

        const responsePerm = await fetch(`${baseUrl}/Permisos`);
        const dataPerm = await responsePerm.json();
        setPermisos(Array.isArray(dataPerm) ? dataPerm : dataPerm.permisos || []);

        const responseHistorial = await fetch(`${baseUrl}/profesores/rol`);
        const dataHistorial = await responseHistorial.json();
        console.log('Respuesta del historial:', dataHistorial);
        setHistorialPerfiles(Array.isArray(dataHistorial) ? dataHistorial : dataHistorial.profesores || []);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchDatos();
  }, [baseUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      matricula,
      rol,
      departamento
    };

    try {
      const response = await fetch(`${baseUrl}/profesores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Perfil creado exitosamente');
        setNombre('');
        setApellidoPaterno('');
        setApellidoMaterno('');
        setMatricula('');
        setRol('');
        setDepartamento('');
        actualizarHistorial();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error al crear perfil:', error);
      alert('Error de conexión con el servidor');
    }
  };

  const actualizarHistorial = async () => {
    try {
      const responseHistorial = await fetch(`${baseUrl}/profesores/rol`);
      const dataHistorial = await responseHistorial.json();
      setHistorialPerfiles(Array.isArray(dataHistorial) ? dataHistorial : dataHistorial.profesores || []);
    } catch (error) {
      console.error('Error al actualizar historial:', error);
    }
  };

  return (
    <div className="crear-materia-page">
      <div className="main-cards-container">
        {/* Crear perfil */}
        <div className="crear-materia-container">
          <h2 className="crear-materia-title">Añadir perfil</h2>
          <form onSubmit={handleSubmit} className="crear-materia-form">
            <div className="form-row">
              <div className="form-group">
                <label><FaUser className="form-icon" /> Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  placeholder="Ingrese el nombre"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><FaUserTie className="form-icon" /> Apellido paterno</label>
                <input
                  type="text"
                  value={apellidoPaterno}
                  onChange={(e) => setApellidoPaterno(e.target.value)}
                  required
                  placeholder="Ingrese el apellido paterno"
                />
              </div>

              <div className="form-group">
                <label><FaUserTie className="form-icon" /> Apellido materno</label>
                <input
                  type="text"
                  value={apellidoMaterno}
                  onChange={(e) => setApellidoMaterno(e.target.value)}
                  required
                  placeholder="Ingrese el apellido materno"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><FaIdCard className="form-icon" /> Matrícula</label>
                <input
                  type="text"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                  placeholder="Ingrese la matrícula"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><FaUserTie className="form-icon" /> Tipo de usuario</label>
                <select
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  required
                >
                  <option value="">Selecciona un permiso</option>
                  {permisos.map((perm, index) => (
                    <option key={index} value={perm}>{perm}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label><FaBuilding className="form-icon" /> Departamento</label>
                <select
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  required
                >
                  <option value="">Selecciona un departamento</option>
                  {departamentos.map((dep, index) => (
                    <option key={index} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="crear-materia-button">
              Añadir perfil
            </button>
          </form>
        </div>

        {/* Historial de perfiles */}
        <div className="perfiles-container">
          <h2 className="crear-materia-title">Historial de perfiles</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar perfil..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="perfiles-list">
            {historialPerfiles
              .filter(perfil => perfil.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((perfil, index) => (
                <div key={index} className="perfil-item">
                  {perfil}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AñadirPerfil;