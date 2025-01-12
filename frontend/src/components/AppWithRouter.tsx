'use client';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../routes';

const AppWithRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Router>
      <AppRoutes />
      {children}
    </Router>
  );
};

export default AppWithRouter;
