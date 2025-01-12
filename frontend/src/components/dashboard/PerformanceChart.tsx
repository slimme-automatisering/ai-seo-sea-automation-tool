import { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material';

const mockData = [
  { name: 'Jan', seo: 65, sea: 45, conversies: 24 },
  { name: 'Feb', seo: 68, sea: 52, conversies: 28 },
  { name: 'Mar', seo: 72, sea: 58, conversies: 35 },
  { name: 'Apr', seo: 75, sea: 62, conversies: 42 },
  { name: 'Mei', seo: 78, sea: 68, conversies: 48 },
  { name: 'Jun', seo: 82, sea: 72, conversies: 52 },
  { name: 'Jul', seo: 85, sea: 75, conversies: 58 },
];

export const PerformanceChart: FC = () => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={mockData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="seo"
          name="SEO Score"
          stroke={theme.palette.primary.main}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="sea"
          name="SEA Performance"
          stroke={theme.palette.secondary.main}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="conversies"
          name="Conversies"
          stroke={theme.palette.success.main}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
