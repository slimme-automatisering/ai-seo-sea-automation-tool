import React from 'react';
import { Container, Typography } from '@mui/material';

const AnalyticsPage: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' component='h1' gutterBottom>
        Analytics Dashboard
      </Typography>
      {/* Analytics componenten hier */}
    </Container>
  );
};

export default AnalyticsPage;
