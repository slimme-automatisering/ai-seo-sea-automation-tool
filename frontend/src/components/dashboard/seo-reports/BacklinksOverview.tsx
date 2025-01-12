import { Grid, Paper, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';

const BacklinksOverview = () => {
  const backlinks = [
    { domain: 'example.com', url: 'https://example.com/article', authority: 65, added: '2024-01-10' },
    // ... meer backlinks
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Recente Backlinks</Typography>
      <List>
        {backlinks.map((backlink, index) => (
          <ListItem key={index} divider>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText
              primary={backlink.domain}
              secondary={`DA: ${backlink.authority} - Toegevoegd: ${backlink.added}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default BacklinksOverview;
