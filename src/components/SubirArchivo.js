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

  useEffect(() => {
    const savedHistory = localStorage.getItem('fileHistory');
    if (savedHistory) {
      setFileHistory(JSON.parse(savedHistory));
    }
  }, []);

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
      setFileName(file.name);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/subir_encuesta`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Error al subir el archivo');
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        await fetchUploadedFileInfo(file.name);

        showSuccessModal();
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al procesar el archivo.');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Por favor selecciona un archivo Excel válido (.xlsx o .xls)');
    }
  };

  const fetchUploadedFileInfo = async (archivoNombre) => {
    try {
      const [materiasRes, profesoresRes, preguntasRes, respuestasRes] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_BASE_URL}/materias/nombres`),
        fetch(`${process.env.REACT_APP_API_BASE_URL}/profesores/nombres`),
        fetch(`${process.env.REACT_APP_API_BASE_URL}/total_preguntas`),
        fetch(`${process.env.REACT_APP_API_BASE_URL}/total_respuestas`)
      ]);

      const materias = await materiasRes.json();
      const profesores = await profesoresRes.json();
      const preguntas = await preguntasRes.json();
      const respuestas = await respuestasRes.json();

      setMateria(materias[0] || '');
      setProfesor(profesores[0] || '');
      setGrupo('1A');
      setFechaUpload(new Date().toLocaleDateString());
      setNumPreguntas(preguntas.total_preguntas || '');
      setNumRespuestas(respuestas.total_respuestas || '');

      addFileToHistory(archivoNombre, {
        materia: materias[0] || '',
        grupo: '1A',
        profesor: profesores[0] || '',
        numPreguntas: preguntas.total_preguntas || '',
        numRespuestas: respuestas.total_respuestas || ''
      });
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
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
      setFileName(file.name);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/subir_encuesta`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Error al subir el archivo');
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        await fetchUploadedFileInfo(file.name);

        showSuccessModal();
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al procesar el archivo.');
      } finally {
        setIsLoading(false);
      }
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
      numPreguntas: fileInfo.numPreguntas,
      numRespuestas: fileInfo.numRespuestas
    };
    setFileHistory(prev => {
      const updated = [...prev, newEntry];
      return updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
  };

  const showSuccessModal = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  const showDeleteSuccessModal = () => {
    setShowDeleteModal(true);
    setTimeout(() => setShowDeleteModal(false), 2000);
  };

  const handleDeleteFile = (indexToDelete) => {
    setFileHistory(prev => prev.filter((_, index) => index !== indexToDelete));
    showDeleteSuccessModal();
  };

  const filteredHistory = fileHistory.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-background">
      {showModal && <div className="modal-success"><p>¡Archivo subido exitosamente!</p></div>}
      {showDeleteModal && <div className="modal-delete"><p>¡Archivo eliminado exitosamente!</p></div>}

      <div className="main-cards-container">
        <div className="upload-container">
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
              {isLoading && <div className="loading-spinner"><div className="spinner"></div><p>Procesando archivo...</p></div>}
            </div>
          </div>

          <div className="upload-right">
            <h2>Detalles del archivo</h2>
            <div className="details-grid">
              <div className="detail-item"><label>Materia</label><input type="text" value={materia} readOnly /></div>
              <div className="detail-item"><label>Grupo</label><input type="text" value={grupo} readOnly /></div>
              <div className="detail-item"><label>Profesor</label><input type="text" value={profesor} readOnly /></div>
              <div className="detail-item"><label>Fecha de subida</label><input type="text" value={fechaUpload} readOnly /></div>
              <div className="detail-item"><label>Número de preguntas</label><input type="number" value={numPreguntas} readOnly /></div>
              <div className="detail-item"><label>Número de respuestas</label><input type="number" value={numRespuestas} readOnly /></div>
            </div>
          </div>
        </div>

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
                  <span className="file-date">{new Date(file.date).toLocaleDateString()}</span>
                  <div className="file-details">
                    <span>{file.materia}</span>
                    <span>{file.grupo}</span>
                    <span>{file.profesor}</span>
                  </div>
                </div>
                <button className="delete-button" onClick={() => handleDeleteFile(index)}>×</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubirArchivo;