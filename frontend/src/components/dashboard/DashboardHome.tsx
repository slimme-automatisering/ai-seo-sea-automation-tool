import { FC } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import CampaignIcon from '@mui/icons-material/Campaign';
import { DashboardLayout } from './DashboardLayout';
import { StatCard } from './StatCard';
import { RecentActivities } from './RecentActivities';
import { PerformanceChart } from './PerformanceChart';

export const DashboardHome: FC = () => {
  return (
    <DashboardLayout title="Dashboard">
      <Grid container spacing={3}>
        {/* Statistieken Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="SEO Score"
            value="85"
            unit="%"
            trend="+5%"
            icon={<SearchIcon />}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="SEA ROI"
            value="3.2"
            unit="x"
            trend="+0.8"
            icon={<CampaignIcon />}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Conversies"
            value="124"
            trend="+12%"
            icon={<TrendingUpIcon />}
            color="#FF9800"
          />
        </Grid>

        {/* Grafieken */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Prestatie Overzicht
            </Typography>
            <Box sx={{ height: 300 }}>
              <PerformanceChart />
            </Box>
          </Paper>
        </Grid>

        {/* Recente Activiteiten */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recente Activiteiten
            </Typography>
            <RecentActivities />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
