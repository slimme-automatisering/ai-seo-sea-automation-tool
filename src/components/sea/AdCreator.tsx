import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

const AdCreator: React.FC = () => {
  const [adType, setAdType] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [finalUrl, setFinalUrl] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Ad Creator
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Advertentie Type</InputLabel>
                <Select
                  value={adType}
                  label="Advertentie Type"
                  onChange={(e) => setAdType(e.target.value)}
                >
                  <MenuItem value="search">Search Ad</MenuItem>
                  <MenuItem value="display">Display Ad</MenuItem>
                  <MenuItem value="shopping">Shopping Ad</MenuItem>
                  <MenuItem value="video">Video Ad</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                helperText={`${headline.length}/30 karakters`}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Beschrijving"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                helperText={`${description.length}/90 karakters`}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Final URL"
                value={finalUrl}
                onChange={(e) => setFinalUrl(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Preview
                  </Typography>
                  <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                    <Typography variant="subtitle1" color="primary">
                      {headline || 'Uw Headline'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {description || 'Uw advertentie beschrijving komt hier...'}
                    </Typography>
                    <Typography variant="caption" color="success.main">
                      {finalUrl || 'www.uwwebsite.nl'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Maak Advertentie
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdCreator;
