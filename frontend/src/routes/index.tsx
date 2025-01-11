import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

// Pages
import DashboardPage from '../pages/dashboard';
import AnalyticsPage from '../pages/analytics';
import SettingsPage from '../pages/settings';
import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';
import SEOPage from '../pages/seo';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Laden...</div>;
  }

  return user ? element : <Navigate to='/login' replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* Protected routes */}
      <Route path='/' element={<PrivateRoute element={<Layout><DashboardPage /></Layout>} />} />
      <Route path='/seo' element={<PrivateRoute element={<Layout><SEOPage /></Layout>} />} />
      <Route path='/analytics' element={<PrivateRoute element={<Layout><AnalyticsPage /></Layout>} />} />
      <Route path='/settings' element={<PrivateRoute element={<Layout><SettingsPage /></Layout>} />} />

      {/* Catch-all route */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default AppRoutes;
