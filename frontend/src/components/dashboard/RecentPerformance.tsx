import { FC } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', seo: 4000, sea: 2400 },
  { name: 'Week 2', seo: 3000, sea: 1398 },
  { name: 'Week 3', seo: 2000, sea: 9800 },
  { name: 'Week 4', seo: 2780, sea: 3908 },
  { name: 'Week 5', seo: 1890, sea: 4800 },
  { name: 'Week 6', seo: 2390, sea: 3800 },
];

const RecentPerformance: FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recente Prestaties
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="seo" name="SEO Verkeer" fill="#2196f3" />
              <Bar dataKey="sea" name="SEA Verkeer" fill="#ff9800" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentPerformance;
