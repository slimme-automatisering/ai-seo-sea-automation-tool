import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const DashboardMetrics: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                SEO Score
              </Typography>
              <Typography variant="h4" color="primary">
                85%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                SEA Performance
              </Typography>
              <Typography variant="h4" color="secondary">
                92%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Organic Traffic
              </Typography>
              <Typography variant="h4" color="success.main">
                +15%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardMetrics;
