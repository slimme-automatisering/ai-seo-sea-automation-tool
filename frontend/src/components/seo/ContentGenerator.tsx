import React, { useState } from 'react';
import { Box, TextField, Button, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ContentGenerator: React.FC = () => {
  const [contentType, setContentType] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Content Generator
      </Typography>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Content Type</InputLabel>
              <Select
                value={contentType}
                label="Content Type"
                onChange={(e) => setContentType(e.target.value)}
              >
                <MenuItem value="blog">Blog Post</MenuItem>
                <MenuItem value="product">Product Beschrijving</MenuItem>
                <MenuItem value="meta">Meta Beschrijving</MenuItem>
                <MenuItem value="social">Social Media Post</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Keywords (één per regel)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel>Tone of Voice</InputLabel>
              <Select
                value={tone}
                label="Tone of Voice"
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value="professional">Professioneel</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Vriendelijk</MenuItem>
                <MenuItem value="formal">Formeel</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" color="primary">
              Genereer Content
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContentGenerator;
