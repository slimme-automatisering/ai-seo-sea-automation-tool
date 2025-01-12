import { CircularProgress, Box, Typography } from '@mui/material';

const VisibilityScore = () => {
  const data = {
    score: 67,
    trend: 5.3,
  };

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <Typography variant="h6" gutterBottom>Zichtbaarheidsscore</Typography>
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress
          variant="determinate"
          value={data.score}
          size={200}
          thickness={4}
          sx={{ color: '#2196f3' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}
        >
          <Typography variant="h3">{data.score}%</Typography>
          <Typography variant="body2" color="text.secondary">
            {data.trend > 0 ? '+' : ''}{data.trend}% vs vorige week
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VisibilityScore;
