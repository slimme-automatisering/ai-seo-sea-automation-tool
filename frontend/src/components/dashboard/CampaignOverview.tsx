import React from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';

const CampaignOverview: React.FC = () => {
  const campaigns = [
    { name: 'Zomer Campagne 2025', status: 'active', budget: '€2,500', performance: '+12%' },
    { name: 'Black Friday', status: 'scheduled', budget: '€5,000', performance: 'N/A' },
    { name: 'Kerst Promotie', status: 'draft', budget: '€3,000', performance: 'N/A' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Campagne Overzicht
      </Typography>
      <List>
        {campaigns.map((campaign) => (
          <Card key={campaign.name} sx={{ mb: 2 }}>
            <CardContent>
              <ListItem>
                <ListItemText
                  primary={campaign.name}
                  secondary={`Budget: ${campaign.budget}`}
                />
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip
                    label={campaign.status}
                    color={campaign.status === 'active' ? 'success' : 'default'}
                  />
                  {campaign.performance !== 'N/A' && (
                    <Typography color="primary">
                      {campaign.performance}
                    </Typography>
                  )}
                </Box>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default CampaignOverview;
