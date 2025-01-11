import React, { useState } from 'react';
import { Box, TextField, Button, Card, CardContent, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const TechnicalSEO: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [issues] = useState([
    { type: 'critical', message: 'Ontbrekende meta descriptions', pages: ['/', '/contact'] },
    { type: 'warning', message: 'Afbeeldingen zonder alt tekst', pages: ['/products/1', '/products/3'] },
    { type: 'info', message: 'Lange laadtijd', pages: ['/blog'] },
  ]);

  const handleAnalyze = () => {
    setLoading(true);
    // Simuleer analyse
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Technische SEO Analyse
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Analyseer'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <List>
        {issues.map((issue, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <ListItem>
                <ListItemText
                  primary={issue.message}
                  secondary={`Gevonden op: ${issue.pages.join(', ')}`}
                  primaryTypographyProps={{
                    color:
                      issue.type === 'critical'
                        ? 'error'
                        : issue.type === 'warning'
                        ? 'warning.main'
                        : 'info.main',
                  }}
                />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default TechnicalSEO;
