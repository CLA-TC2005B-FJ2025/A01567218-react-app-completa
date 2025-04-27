import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './PrivateLayout.css';

function PrivateLayout({ children }) {
  return (
    <div className="private-layout">
      <Topbar />
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default PrivateLayout;
