import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MenuPage from './components/MenuPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PrivateLayout from './components/PrivateLayout';
import SubirArchivo from './components/SubirArchivo';
import AñadirPerfil from './components/AñadirPerfil';
import Encuestas from './components/Encuestas';
import Profesor from './components/Profesor';
function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
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
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/inicio" element={<PrivateRoute><PrivateLayout><MenuPage /></PrivateLayout></PrivateRoute>} />
            <Route path="/subirarchivo" element={<PrivateRoute><PrivateLayout><SubirArchivo /></PrivateLayout></PrivateRoute>} />
            <Route path="/añadirperfil" element={<PrivateRoute><PrivateLayout><AñadirPerfil /></PrivateLayout></PrivateRoute>} />
            <Route path="/encuestas" element={<PrivateRoute><PrivateLayout><Encuestas /></PrivateLayout></PrivateRoute>} />
            <Route path="/profesor" element={<Profesor />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
export default App;
