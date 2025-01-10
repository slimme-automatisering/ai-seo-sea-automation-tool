import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const APISettings: React.FC = () => {
  const [showGoogleKey, setShowGoogleKey] = useState(false);
  const [showSemrushKey, setShowSemrushKey] = useState(false);
  const [showAhrefsKey, setShowAhrefsKey] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        API Instellingen
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Beheer hier uw API keys voor verschillende diensten. Bewaar deze keys veilig
        en deel ze nooit met anderen.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Google Services
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Google Ads API Key"
                    type={showGoogleKey ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowGoogleKey(!showGoogleKey)}
                            edge="end"
                          >
                            {showGoogleKey ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Google Analytics Client ID"
                    placeholder="xxx.apps.googleusercontent.com"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Google Analytics Client Secret"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Update Google API Settings
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                SEO Tools
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="SEMrush API Key"
                    type={showSemrushKey ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowSemrushKey(!showSemrushKey)}
                            edge="end"
                          >
                            {showSemrushKey ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ahrefs API Key"
                    type={showAhrefsKey ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowAhrefsKey(!showAhrefsKey)}
                            edge="end"
                          >
                            {showAhrefsKey ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Update SEO API Settings
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                API Limieten & Gebruik
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary">
                        Google Ads API
                      </Typography>
                      <Typography variant="h6">
                        80% / 100%
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Vernieuwt over: 2 uur
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary">
                        SEMrush API
                      </Typography>
                      <Typography variant="h6">
                        45% / 100%
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Vernieuwt over: 12 uur
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary">
                        Ahrefs API
                      </Typography>
                      <Typography variant="h6">
                        30% / 100%
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Vernieuwt over: 18 uur
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default APISettings;
