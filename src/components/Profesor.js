import React, { useEffect, useState } from 'react';
import './Profesor.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const handleDownloadPDF = async () => {
  const input = document.querySelector('.resultados-page');
  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save('reporte_resultados.pdf');
};

function ResultadosPage() {
  const [data, setData] = useState([
    { pregunta: "Claridad", promedio: 8.5 },
    { pregunta: "Disponibilidad", promedio: 9.2 },
    { pregunta: "Material", promedio: 7.8 },
    { pregunta: "Evaluaciones", promedio: 8.9 },
    { pregunta: "Retroalimentación", promedio: 8.1 },
    { pregunta: "Dominio", promedio: 9.5 },
    { pregunta: "Puntualidad", promedio: 9.0 },
    { pregunta: "Trabajo equipo", promedio: 8.3 },
    { pregunta: "Manejo", promedio: 4.2 }
  ]);

  const [grupos, setGrupos] = useState([
    "Matemáticas I - Grupo A",
    "Matemáticas I - Grupo B",
    "Física I - Grupo A",
    "Química I - Grupo B"
  ]);

  const [grupoSeleccionado, setGrupoSeleccionado] = useState('Matemáticas I - Grupo A');

  const [comentarios, setComentarios] = useState([
    "El profesor explica muy bien los conceptos y siempre está disponible para resolver dudas.",
    "Las evaluaciones son justas y reflejan lo que se ve en clase.",
    "Me gustaría que hubiera más ejemplos prácticos en las clases.",
    "El material didáctico es muy útil para estudiar.",
    "Las retroalimentaciones son muy detalladas y ayudan a mejorar."
  ]);

  const getColor = (value) => {
    if (value < 6) return "#f87171"; // rojo
    if (value >= 6 && value < 8) return "#facc15"; // amarillo
    return "#4ade80"; // verde
  };

  // Calcular promedio general
  const promedioGeneral = data.reduce((acc, curr) => acc + curr.promedio, 0) / data.length;
  const porcentajePromedio = (promedioGeneral / 10) * 100;

  return (
    <div className="resultados-page">
      <Sidebar />
      <Topbar />
      <div className="descarga-container">
        <button onClick={handleDownloadPDF} className="descarga-boton">
          Descargar como PDF
          </button>
          </div>
      
      <div className="grafica-container">
        <div className="grafica-izquierda">
          <div className="grafica-header">
            <h2>Promedios por pregunta</h2>
            <select
              value={grupoSeleccionado}
              onChange={(e) => setGrupoSeleccionado(e.target.value)}
              className="grupo-select"
            >
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
          <p>9</p>

          <h3>Calificación más baja:</h3>
          <p>4</p>

          <h3>Promedio por este grupo:</h3>
          <p>8</p>

        </div>
      </div>

      {/* Gráfico circular de promedio general */}
      <div className="promedio-general-container">
        <h2>Promedio General</h2>
        <div className="circular-progress-container">
          <CircularProgressbar
            value={porcentajePromedio}
            text={`${promedioGeneral.toFixed(1)}`}
            styles={buildStyles({
              textColor: "#1814A9",
              pathColor: "#1814A9",
              trailColor: "#d6d6d6",
              textSize: '32px',
              fontWeight: 'bold'
            })}
          />
        </div>
      </div>

      {/* Sección Comentarios */}
      <div className="comentarios-card">
        <h2>Comentarios:</h2>
        <div className="comentarios-lista">
          {comentarios.map((comentario, index) => (
            <div key={index} className="comentario-item">
              {comentario}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultadosPage;