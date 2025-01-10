import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

const PerformanceGraphs: React.FC = () => {
  const [timeRange, setTimeRange] = useState('');
  const [metric, setMetric] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Performance Analyse
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Tijdsperiode</InputLabel>
            <Select
              value={timeRange}
              label="Tijdsperiode"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="7d">Laatste 7 dagen</MenuItem>
              <MenuItem value="30d">Laatste 30 dagen</MenuItem>
              <MenuItem value="90d">Laatste 90 dagen</MenuItem>
              <MenuItem value="1y">Laatste jaar</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Metric</InputLabel>
            <Select
              value={metric}
              label="Metric"
              onChange={(e) => setMetric(e.target.value)}
            >
              <MenuItem value="clicks">Clicks</MenuItem>
              <MenuItem value="impressions">Impressies</MenuItem>
              <MenuItem value="conversions">Conversies</MenuItem>
              <MenuItem value="revenue">Omzet</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Trend Analyse
              </Typography>
              {/* Hier komt de grafiek component */}
              <Box
                sx={{
                  width: '100%',
                  height: 300,
                  bgcolor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color="textSecondary">
                  Grafiek wordt hier weergegeven
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Belangrijkste Statistieken
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography color="textSecondary">Totaal Clicks</Typography>
                <Typography variant="h6">12,458</Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Gemiddelde CTR
                </Typography>
                <Typography variant="h6">2.8%</Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Conversie Ratio
                </Typography>
                <Typography variant="h6">3.2%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Vergelijking met Vorige Periode
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography color="textSecondary">Clicks Groei</Typography>
                <Typography variant="h6" color="success.main">
                  +15.4%
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  CTR Verandering
                </Typography>
                <Typography variant="h6" color="error.main">
                  -2.1%
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Conversie Groei
                </Typography>
                <Typography variant="h6" color="success.main">
                  +8.7%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PerformanceGraphs;
