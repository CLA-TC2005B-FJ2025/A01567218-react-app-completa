import React, { useEffect, useState } from 'react';
import './Profesor.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function ResultadosPage() {
  const [data, setData] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState('');
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    // Cargar grupos
    const fetchGrupos = async () => {
      try {
        const response = await fetch('http://localhost:5000/materias');
        const gruposData = await response.json();
        setGrupos(gruposData.map(g => g.nombre)); 
      } catch (error) {
        console.error('Error al cargar grupos:', error);
      }
    };

    fetchGrupos();
  }, []);

  useEffect(() => {
    if (grupoSeleccionado) {
      // Cargar resultados
      const fetchResultados = async () => {
        try {
          const response = await fetch(`http://localhost:5000/resultados/${grupoSeleccionado}`);
          const resultadosData = await response.json();
          setData(resultadosData);
        } catch (error) {
          console.error('Error al cargar resultados:', error);
        }
      };

      // Cargar comentarios
      const fetchComentarios = async () => {
        try {
          const response = await fetch(`http://localhost:5000/comentarios?grupo=${grupoSeleccionado}`);
          const comentariosData = await response.json();
          setComentarios(comentariosData);
        } catch (error) {
          console.error('Error al cargar comentarios:', error);
        }
      };

      fetchResultados();
      fetchComentarios();
    }
  }, [grupoSeleccionado]);

  const getColor = (value) => {
    if (value < 6) return "#f87171"; // rojo
    if (value >= 6 && value < 8) return "#facc15"; // amarillo
    return "#4ade80"; // verde
  };

  return (
    <div className="resultados-page">
      <div className="grafica-container">
        <div className="grafica-izquierda">
          <div className="grafica-header">
            <h2>Promedios por pregunta</h2>
            <select
              value={grupoSeleccionado}
              onChange={(e) => setGrupoSeleccionado(e.target.value)}
              className="grupo-select"
            >
              <option value="">Seleccione grupo</option>
              {grupos.map((grupo, index) => (
                <option key={index} value={grupo}>{grupo}</option>
              ))}
            </select>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 10]} />
              <YAxis dataKey="pregunta" type="category" />
              <Tooltip />
              <Bar dataKey="promedio">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.promedio)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="estadisticas">
          <h3>Calificación más alta:</h3>
          <p>{Math.max(...data.map(d => d.promedio)) || '-'}</p>

          <h3>Calificación más baja:</h3>
          <p>{Math.min(...data.map(d => d.promedio)) || '-'}</p>

          <h3>Calificación más repetida:</h3>
          <p>{data.length > 0 ? calcularMasRepetida(data.map(d => d.promedio)) : '-'}</p>

          <h3>Calificación menos repetida:</h3>
          <p>{data.length > 0 ? calcularMenosRepetida(data.map(d => d.promedio)) : '-'}</p>
        </div>
      </div>

      {/* Sección Comentarios */}
      <div className="comentarios-card">
        <h2>Comentarios:</h2>

        {comentarios.length === 0 ? (
          <p className="sin-comentarios">No hay comentarios para este grupo.</p>
        ) : (
          <div className="comentarios-lista">
            {comentarios.map((comentario, index) => (
              <div key={index} className="comentario-item">
                {comentario.comentario}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function calcularMasRepetida(arr) {
  const freq = {};
  arr.forEach(num => freq[num] = (freq[num] || 0) + 1);
  return Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
}

function calcularMenosRepetida(arr) {
  const freq = {};
  arr.forEach(num => freq[num] = (freq[num] || 0) + 1);
  return Object.keys(freq).reduce((a, b) => freq[a] < freq[b] ? a : b);
}

export default ResultadosPage;