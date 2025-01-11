import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const BudgetOptimizer: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState<number>(1000);
  const [optimization, setOptimization] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Budget Optimizer
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom>Totaal Budget</Typography>
              <Slider
                value={totalBudget}
                onChange={(_, value) => setTotalBudget(value as number)}
                min={100}
                max={10000}
                step={100}
                valueLabelDisplay="on"
                valueLabelFormat={(value) => `€${value}`}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel>Optimalisatie Strategie</InputLabel>
                <Select
                  value={optimization}
                  label="Optimalisatie Strategie"
                  onChange={(e) => setOptimization(e.target.value)}
                >
                  <MenuItem value="conversions">Maximaliseer Conversies</MenuItem>
                  <MenuItem value="clicks">Maximaliseer Clicks</MenuItem>
                  <MenuItem value="impressions">Maximaliseer Impressies</MenuItem>
                  <MenuItem value="roi">Maximaliseer ROI</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Huidige Verdeling
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography color="textSecondary">Search Campagnes</Typography>
                <Typography variant="h6">€{totalBudget * 0.6}</Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Display Campagnes
                </Typography>
                <Typography variant="h6">€{totalBudget * 0.3}</Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Shopping Campagnes
                </Typography>
                <Typography variant="h6">€{totalBudget * 0.1}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Voorspelde Resultaten
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography color="textSecondary">Verwachte Clicks</Typography>
                <Typography variant="h6">1,250</Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Verwachte Conversies
                </Typography>
                <Typography variant="h6">75</Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                  Verwachte ROI
                </Typography>
                <Typography variant="h6" color="success.main">
                  185%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            Optimaliseer Budget
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BudgetOptimizer;
