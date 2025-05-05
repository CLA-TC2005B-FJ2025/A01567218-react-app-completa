import React, { useRef, useState, useEffect } from 'react';
import './SubirArchivo.css';
import { FaFileExcel } from "react-icons/fa";

function SubirArchivo() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [fileHistory, setFileHistory] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [materia, setMateria] = useState('');
  const [grupo, setGrupo] = useState('');
  const [profesor, setProfesor] = useState('');
  const [fechaUpload, setFechaUpload] = useState('');
  const [numPreguntas, setNumPreguntas] = useState('');
  const [numRespuestas, setNumRespuestas] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Cargar historial guardado
  useEffect(() => {
    const savedHistory = localStorage.getItem('fileHistory');
    if (savedHistory) {
      setFileHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Guardar historial automáticamente
  useEffect(() => {
    localStorage.setItem('fileHistory', JSON.stringify(fileHistory));
  }, [fileHistory]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && validateExcel(file)) {
      setIsLoading(true);
      console.log('Archivo seleccionado:', file.name);
      setFileName(file.name);
      
      // Simular un retraso de 5 segundos
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Extraer información del nombre del archivo
      const fileInfo = extractFileInfo(file.name);
      setMateria(fileInfo.materia);
      setGrupo(fileInfo.grupo);
      setProfesor(fileInfo.profesor);
      setFechaUpload(new Date().toLocaleDateString());
      setNumPreguntas(fileInfo.numPreguntas || '');
      setNumRespuestas(fileInfo.numRespuestas || '');
      
      addFileToHistory(file.name, fileInfo);
      showSuccessModal();
      setIsLoading(false);
    } else {
      alert('Por favor selecciona un archivo Excel válido (.xlsx o .xls)');
    }
  };

  const extractFileInfo = (fileName) => {
    // Valores predeterminados
    return {
      materia: 'Matemáticas I',
      grupo: '1A',
      profesor: 'José Luis Mejía',
      numPreguntas: '13',
      numRespuestas: '25'
    };
  };

  const validateExcel = (file) => {
    return (
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && validateExcel(file)) {
      setIsLoading(true);
      console.log('Archivo soltado:', file.name);
      setFileName(file.name);
      
      // Simular un retraso de 5 segundos
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Extraer información del nombre del archivo
      const fileInfo = extractFileInfo(file.name);
      setMateria(fileInfo.materia);
      setGrupo(fileInfo.grupo);
      setProfesor(fileInfo.profesor);
      setFechaUpload(new Date().toLocaleDateString());
      setNumPreguntas(fileInfo.numPreguntas || '');
      setNumRespuestas(fileInfo.numRespuestas || '');
      
      addFileToHistory(file.name, fileInfo);
      showSuccessModal();
      setIsLoading(false);
    } else {
      alert('Por favor suelta un archivo Excel válido (.xlsx o .xls)');
    }
  };

  const addFileToHistory = (fileName, fileInfo) => {
    const newEntry = {
      name: fileName,
      date: new Date().toISOString(),
      materia: fileInfo.materia,
      grupo: fileInfo.grupo,
      profesor: fileInfo.profesor,
      numPreguntas: numPreguntas,
      numRespuestas: numRespuestas
    };
    setFileHistory(prev => {
      const updated = [...prev, newEntry];
      return updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
  };

  const showSuccessModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const showDeleteSuccessModal = () => {
    setShowDeleteModal(true);
    setTimeout(() => {
      setShowDeleteModal(false);
    }, 2000);
  };

  const handleDeleteFile = (indexToDelete) => {
    setFileHistory(prev => prev.filter((_, index) => index !== indexToDelete));
    showDeleteSuccessModal();
  };

  // Historial filtrado por búsqueda
  const filteredHistory = fileHistory.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-background">
      {showModal && (
        <div className="modal-success">
          <p>¡Archivo subido exitosamente!</p>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal-delete">
          <p>¡Archivo eliminado exitosamente!</p>
        </div>
      )}

      <div className="main-cards-container">
        <div className="upload-container">
          {/* Subir archivo */}
          <div className="upload-left">
            <h2>Subir un archivo</h2>
            <div
              className={`upload-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FaFileExcel className="upload-icon" />
              <p>Arrastra y suelta un archivo Excel, ó selecciónalo:</p>
              <button 
                className="select-file-button" 
                onClick={handleButtonClick}
                disabled={isLoading}
              >
                {isLoading ? 'Cargando...' : 'Seleccionar archivo'}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                disabled={isLoading}
              />
              {fileName && <p className="file-name">Archivo: {fileName}</p>}
              {isLoading && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Procesando archivo...</p>
                </div>
              )}
            </div>
          </div>

          {/* Detalles del archivo */}
          <div className="upload-right">
            <h2>Detalles del archivo</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>Materia</label>
                <input
                  type="text"
                  value={materia}
                  onChange={(e) => setMateria(e.target.value)}
                  placeholder="Materia"
                  readOnly
                />
              </div>
              <div className="detail-item">
                <label>Grupo</label>
                <input
                  type="text"
                  value={grupo}
                  onChange={(e) => setGrupo(e.target.value)}
                  placeholder="Grupo"
                  readOnly
                />
              </div>
              <div className="detail-item">
                <label>Profesor</label>
                <input
                  type="text"
                  value={profesor}
                  onChange={(e) => setProfesor(e.target.value)}
                  placeholder="Profesor"
                  readOnly
                />
              </div>
              <div className="detail-item">
                <label>Fecha de subida</label>
                <input
                  type="text"
                  value={fechaUpload}
                  readOnly
                />
              </div>
              <div className="detail-item">
                <label>Número de preguntas</label>
                <input
                  type="number"
                  value={numPreguntas}
                  onChange={(e) => setNumPreguntas(e.target.value)}
                  placeholder="Número de preguntas"
                  readOnly
                />
              </div>
              <div className="detail-item">
                <label>Número de respuestas</label>
                <input
                  type="number"
                  value={numRespuestas}
                  onChange={(e) => setNumRespuestas(e.target.value)}
                  placeholder="Número de respuestas"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Historial de archivos */}
        <div className="history-card">
          <h2>Historial de archivos</h2>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar archivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="history-list">
            {filteredHistory.map((file, index) => (
              <div key={index} className="history-item">
                <div className="history-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-date">
                    {new Date(file.date).toLocaleDateString()}
                  </span>
                  <div className="file-details">
                    <span>{file.materia}</span>
                    <span>{file.grupo}</span>
                    <span>{file.profesor}</span>
                  </div>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteFile(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubirArchivo;