import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';

const CompetitorAnalysis: React.FC = () => {
  const [competitor, setCompetitor] = useState('');
  const [competitors] = useState([
    {
      name: 'Concurrent A',
      rankingScore: 85,
      keywordOverlap: '65%',
      backlinks: '12K',
      traffic: '250K',
    },
    {
      name: 'Concurrent B',
      rankingScore: 78,
      keywordOverlap: '45%',
      backlinks: '8K',
      traffic: '180K',
    },
    {
      name: 'Concurrent C',
      rankingScore: 92,
      keywordOverlap: '75%',
      backlinks: '20K',
      traffic: '400K',
    },
  ]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Concurrent Analyse
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Voeg concurrent toe"
                  value={competitor}
                  onChange={(e) => setCompetitor(e.target.value)}
                />
                <Button variant="contained" color="primary">
                  Analyseer
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Concurrent Vergelijking
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Concurrent</TableCell>
                      <TableCell>Ranking Score</TableCell>
                      <TableCell>Keyword Overlap</TableCell>
                      <TableCell>Backlinks</TableCell>
                      <TableCell>Geschat Verkeer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {competitors.map((comp) => (
                      <TableRow key={comp.name}>
                        <TableCell>{comp.name}</TableCell>
                        <TableCell>
                          <Typography
                            color={
                              comp.rankingScore > 80
                                ? 'success.main'
                                : comp.rankingScore > 70
                                ? 'warning.main'
                                : 'error.main'
                            }
                          >
                            {comp.rankingScore}
                          </Typography>
                        </TableCell>
                        <TableCell>{comp.keywordOverlap}</TableCell>
                        <TableCell>{comp.backlinks}</TableCell>
                        <TableCell>{comp.traffic}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Concurrerende Keywords
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Keyword</TableCell>
                      <TableCell>Positie</TableCell>
                      <TableCell>Concurrent Positie</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>seo optimalisatie</TableCell>
                      <TableCell>#4</TableCell>
                      <TableCell>#2</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>online marketing</TableCell>
                      <TableCell>#6</TableCell>
                      <TableCell>#3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>website analyse</TableCell>
                      <TableCell>#3</TableCell>
                      <TableCell>#5</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Content Gap Analyse
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Ontbrekend Keyword</TableCell>
                      <TableCell>Zoekvolume</TableCell>
                      <TableCell>Moeilijkheid</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>lokale seo</TableCell>
                      <TableCell>2.4K</TableCell>
                      <TableCell>Medium</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>seo tools</TableCell>
                      <TableCell>1.8K</TableCell>
                      <TableCell>Laag</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>wordpress seo</TableCell>
                      <TableCell>3.2K</TableCell>
                      <TableCell>Hoog</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompetitorAnalysis;
