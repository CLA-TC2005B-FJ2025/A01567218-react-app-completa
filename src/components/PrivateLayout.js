// src/components/PrivateLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import './PrivateLayout.css';

function PrivateLayout({ children }) {
  return (
    <div className="private-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default PrivateLayout;
