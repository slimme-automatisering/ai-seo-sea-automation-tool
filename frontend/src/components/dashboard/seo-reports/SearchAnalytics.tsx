import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography } from '@mui/material';

const SearchAnalytics = () => {
  const data = [
    { date: '2024-01-01', clicks: 145, impressions: 2300 },
    // ... meer data
  ];

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>Search Console Analytics</Typography>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="clicks" fill="#2196f3" name="Clicks" />
        <Bar dataKey="impressions" fill="#ff9800" name="Impressies" />
      </BarChart>
    </>
  );
};

export default SearchAnalytics;
