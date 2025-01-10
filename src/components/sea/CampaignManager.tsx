import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

const CampaignManager: React.FC = () => {
  const [campaigns] = useState([
    {
      id: 1,
      name: 'Zomer Sale 2025',
      budget: '€5,000',
      spent: '€2,300',
      status: 'active',
      roi: '+125%',
    },
    {
      id: 2,
      name: 'Black Friday',
      budget: '€10,000',
      spent: '€0',
      status: 'scheduled',
      roi: 'N/A',
    },
    {
      id: 3,
      name: 'Kerst Promotie',
      budget: '€7,500',
      spent: '€7,500',
      status: 'completed',
      roi: '+85%',
    },
  ]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Campaign Manager</Typography>
        <Button variant="contained" color="primary">
          Nieuwe Campagne
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Campagne</TableCell>
                  <TableCell>Budget</TableCell>
                  <TableCell>Besteed</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>ROI</TableCell>
                  <TableCell>Acties</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>{campaign.budget}</TableCell>
                    <TableCell>{campaign.spent}</TableCell>
                    <TableCell>
                      <Chip
                        label={campaign.status}
                        color={
                          campaign.status === 'active'
                            ? 'success'
                            : campaign.status === 'scheduled'
                            ? 'warning'
                            : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{campaign.roi}</TableCell>
                    <TableCell>
                      <Button size="small" color="primary">
                        Bewerk
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CampaignManager;
