import React, { useState } from 'react';
import { Box, TextField, Button, Card, CardContent, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';

const KeywordResearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [keywords] = useState([
    { keyword: 'seo optimalisatie', volume: '1.2K', difficulty: 'medium', cpc: '€2.50' },
    { keyword: 'website ranking', volume: '800', difficulty: 'high', cpc: '€3.20' },
    { keyword: 'google optimalisatie', volume: '500', difficulty: 'low', cpc: '€1.80' },
  ]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Keyword Research
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Zoek keywords"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary">
          Analyseer
        </Button>
      </Box>
      <List>
        {keywords.map((kw) => (
          <Card key={kw.keyword} sx={{ mb: 2 }}>
            <CardContent>
              <ListItem>
                <ListItemText
                  primary={kw.keyword}
                  secondary={`Volume: ${kw.volume} | CPC: ${kw.cpc}`}
                />
                <Chip
                  label={kw.difficulty}
                  color={
                    kw.difficulty === 'low'
                      ? 'success'
                      : kw.difficulty === 'medium'
                      ? 'warning'
                      : 'error'
                  }
                />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default KeywordResearch;
