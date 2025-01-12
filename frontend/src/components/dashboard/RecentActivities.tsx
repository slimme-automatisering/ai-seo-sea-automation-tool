import { FC } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CampaignIcon from '@mui/icons-material/Campaign';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Activity {
  id: number;
  type: 'seo' | 'sea' | 'content' | 'optimization';
  description: string;
  timestamp: string;
}

const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'seo',
    description: 'SEO analyse voltooid voor "Product Pagina"',
    timestamp: '5 minuten geleden'
  },
  {
    id: 2,
    type: 'sea',
    description: 'Google Ads campagne "Zomer Sale" gestart',
    timestamp: '1 uur geleden'
  },
  {
    id: 3,
    type: 'content',
    description: 'Blog artikel "SEO Tips 2025" gepubliceerd',
    timestamp: '2 uur geleden'
  },
  {
    id: 4,
    type: 'optimization',
    description: 'Automatische keyword optimalisatie uitgevoerd',
    timestamp: '3 uur geleden'
  }
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'seo':
      return <SearchIcon color="primary" />;
    case 'sea':
      return <CampaignIcon color="secondary" />;
    case 'content':
      return <EditIcon color="info" />;
    case 'optimization':
      return <CheckCircleIcon color="success" />;
    default:
      return <EditIcon />;
  }
};

export const RecentActivities: FC = () => {
  return (
    <List sx={{ width: '100%' }}>
      {mockActivities.map((activity, index) => (
        <div key={activity.id}>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              {getActivityIcon(activity.type)}
            </ListItemIcon>
            <ListItemText
              primary={activity.description}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {activity.timestamp}
                </Typography>
              }
            />
          </ListItem>
          {index < mockActivities.length - 1 && <Divider variant="inset" component="li" />}
        </div>
      ))}
    </List>
  );
};
