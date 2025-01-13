import { FC } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SettingsIcon from '@mui/icons-material/Settings';

const QuickActions: FC = () => {
  const actions = [
    {
      title: 'Nieuwe Campagne',
      icon: <AddIcon />,
      color: '#2196f3',
      path: '/dashboard/campaigns/new'
    },
    {
      title: 'SEO Analyse',
      icon: <AnalyticsIcon />,
      color: '#4caf50',
      path: '/dashboard/seo'
    },
    {
      title: 'Keyword Research',
      icon: <ContentPasteSearchIcon />,
      color: '#ff9800',
      path: '/dashboard/keywords'
    },
    {
      title: 'Instellingen',
      icon: <SettingsIcon />,
      color: '#9c27b0',
      path: '/dashboard/settings'
    }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Snelle Acties
        </Typography>
        <Grid container spacing={2}>
          {actions.map((action, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  p: 2,
                  borderColor: action.color,
                  color: action.color,
                  '&:hover': {
                    borderColor: action.color,
                    backgroundColor: `${action.color}10`
                  }
                }}
                href={action.path}
              >
                <Box sx={{ color: action.color }}>
                  {action.icon}
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {action.title}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
