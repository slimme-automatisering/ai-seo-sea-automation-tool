import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

interface SEOMetric {
  title: string;
  value: string | number;
  change?: string;
}

const SEODashboard: React.FC = () => {
  const metrics: SEOMetric[] = [
    {
      title: 'Gemiddelde Positie',
      value: '12.4',
      change: '+2.1'
    },
    {
      title: 'Klikfrequentie (CTR)',
      value: '3.8%',
      change: '+0.5%'
    },
    {
      title: 'Impressies',
      value: '15.2K',
      change: '+1.2K'
    },
    {
      title: 'Indexeringsstatus',
      value: '92%',
      change: '+5%'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant='h4' gutterBottom>
        SEO Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography color='textSecondary' gutterBottom>
                {metric.title}
              </Typography>
              <Typography component='p' variant='h4'>
                {metric.value}
              </Typography>
              {metric.change && (
                <Typography
                  sx={{
                    color: metric.change.startsWith('+') ? 'success.main' : 'error.main',
                    mt: 1
                  }}
                >
                  {metric.change}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SEODashboard;
