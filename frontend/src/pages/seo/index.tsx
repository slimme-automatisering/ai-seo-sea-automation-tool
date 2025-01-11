import React from 'react';
import { Container } from '@mui/material';
import SEODashboard from '../../components/seo/SEODashboard';

const SEOPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <SEODashboard />
    </Container>
  );
};

export default SEOPage;
