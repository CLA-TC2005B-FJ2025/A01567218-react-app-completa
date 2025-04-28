import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [nombreCompleto, setNombreCompleto] = useState('');

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // para sesión
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login exitoso
        setUser(username);

        // Luego fetch al nombre completo
        const nombreResponse = await fetch('http://localhost:5000/usuario', {
          credentials: 'include',
        });

        if (nombreResponse.ok) {
          const nombre = await nombreResponse.text();
          setNombreCompleto(nombre);
        } else {
          console.error('Error obteniendo el nombre completo');
        }

        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en login');
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setNombreCompleto('');
  };

  return (
    <AuthContext.Provider value={{ user, nombreCompleto, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};