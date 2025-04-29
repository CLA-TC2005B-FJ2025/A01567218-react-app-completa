// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MenuPage from './components/MenuPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ListaPersonajes from './components/ListaPersonajes';
import CrearPersonaje from './components/CrearPersonaje';
import ActualizarPersonaje from './components/ActualizarPersonaje';
import EliminarPersonaje from './components/EliminarPersonaje';
import PrivateLayout from './components/PrivateLayout';
import SubirArchivo from './components/SubirArchivo';
import AñadirPerfil from './components/AñadirPerfil';
import DashboardResultados from './components/DashboardResultados';

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Aquí metemos el fondo */}
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
          
          {/* Fondo fijo detrás */}
          <div style={{
            backgroundImage: 'url(/img/BGmain.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
          }}></div>

          {/* Tus rutas encima */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/menu" element={<PrivateRoute><PrivateLayout><MenuPage /></PrivateLayout></PrivateRoute>} />
            <Route path="/listapersonajes" element={<PrivateRoute><PrivateLayout><ListaPersonajes /></PrivateLayout></PrivateRoute>} />
            <Route path="/crearpersonaje" element={<PrivateRoute><PrivateLayout><CrearPersonaje /></PrivateLayout></PrivateRoute>} />
            <Route path="/actualizarpersonaje" element={<PrivateRoute><PrivateLayout><ActualizarPersonaje /></PrivateLayout></PrivateRoute>} />
            <Route path="/eliminarpersonaje" element={<PrivateRoute><PrivateLayout><EliminarPersonaje /></PrivateLayout></PrivateRoute>} />
            <Route path="/subirarchivo" element={<PrivateRoute><PrivateLayout><SubirArchivo /></PrivateLayout></PrivateRoute>} />
            <Route path="/añadirperfil" element={<PrivateRoute><PrivateLayout><AñadirPerfil /></PrivateLayout></PrivateRoute>} />
            <Route path="/dashboardresultados" element={<PrivateRoute><PrivateLayout><DashboardResultados /></PrivateLayout></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>

        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;