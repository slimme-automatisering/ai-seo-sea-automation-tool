import React from 'react';
import DashboardMetrics from '../../components/dashboard/DashboardMetrics';

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <DashboardMetrics />
    </div>
  );
};

export default DashboardPage;
