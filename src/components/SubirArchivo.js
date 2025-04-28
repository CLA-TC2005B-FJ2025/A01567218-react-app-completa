import React, { useRef, useState, useEffect } from 'react';
import './SubirArchivo.css';
import { TbFileUpload } from "react-icons/tb";


function SubirArchivo() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [fileHistory, setFileHistory] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // <-- Nuevo estado para el buscador
  

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && validateExcel(file)) {
      console.log('Archivo seleccionado:', file.name);
      setFileName(file.name);
      addFileToHistory(file.name);
      showSuccessModal();
    } else {
      alert('Por favor selecciona un archivo Excel válido (.xlsx o .xls)');
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

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && validateExcel(file)) {
      console.log('Archivo soltado:', file.name);
      setFileName(file.name);
      addFileToHistory(file.name);
      showSuccessModal();
    } else {
      alert('Por favor suelta un archivo Excel válido (.xlsx o .xls)');
    }
  };

  const addFileToHistory = (fileName) => {
    const newEntry = {
      name: fileName,
      date: new Date().toISOString(),
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

  // Nuevo: historial filtrado por búsqueda
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

      {/* Subir archivo */}
      <div className="upload-card">
                {/* Detalles */}
            <div className="detalles-card">
                <div className="upload-right">
          <h2>Detalles del archivo</h2>
          <div className="detail-input">
            <label>Materia</label>
            <select>
              <option>Seleccionar materia</option>
            </select>
          </div>
          <div className="detail-input">
            <label>Grupo</label>
            <select>
              <option>Seleccionar grupo</option>
            </select>
          </div>
          <div className="detail-input">
            <label>Profesor</label>
            <select>
              <option>Seleccionar profesor</option>
            </select>
          </div>
            </div>
        </div>
        
        <div className="uploadicon-container">

        <div
          className={`upload-left ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <h2>Subir un archivo</h2>
          < TbFileUpload className="upload-icon" /> 
          <p>Arrastra y suelta un archivo Excel, ó selecciónalo:</p>
          <button className="select-file-button" onClick={handleButtonClick}>
            Seleccionar archivo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
          {fileName && <p className="file-name">Archivo: {fileName}</p>}
        </div>
        </div>
        </div>

      {/* Historial de archivos */}
      <div className="history-card">
        <h2>Historial de archivos</h2>

        {/* Nuevo: buscador */}
        <input
          type="text"
          className="search-input"
          placeholder="Buscar archivo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="history-list">
          {filteredHistory.length === 0 ? (
            <p>No hay archivos que coincidan.</p>
          ) : (
            filteredHistory.map((file, index) => (
              <div key={index} className="history-item">
                <span>{file.name}</span>
                <span>{new Date(file.date).toLocaleDateString()}</span>
                <button className="delete-button" onClick={() => handleDeleteFile(index)}>🗑️</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SubirArchivo;