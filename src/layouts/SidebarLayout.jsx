import React from 'react';
import Header from '../components/Header';
import Leftbar from '../components/Leftbar';
import { Outlet } from 'react-router-dom';

function SidebarLayout() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Leftbar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
