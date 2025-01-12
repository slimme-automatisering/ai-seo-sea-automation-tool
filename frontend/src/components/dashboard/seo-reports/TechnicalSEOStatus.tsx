import { Box, Typography, LinearProgress } from '@mui/material';

const TechnicalSEOStatus = () => {
  const checks = [
    { name: 'Mobile Friendly', status: 'success', value: 98, description: 'Alle paginas zijn mobile-friendly' },
    { name: 'Laadsnelheid', status: 'warning', value: 75, description: 'Gemiddelde laadtijd: 2.8s' },
    { name: 'Meta Descriptions', status: 'error', value: 65, description: '35% mist optimale meta description' }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Technische SEO Status</Typography>
      {checks.map((check, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">{check.name}</Typography>
            <Typography variant="body2">{check.value}%</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={check.value}
            color={check.status === 'success' ? 'success' : check.status === 'warning' ? 'warning' : 'error'}
          />
          <Typography variant="caption" color="text.secondary">{check.description}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TechnicalSEOStatus;
