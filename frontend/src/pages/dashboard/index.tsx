import { FC } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import OverallMetrics from '@/components/dashboard/OverallMetrics';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentPerformance from '@/components/dashboard/RecentPerformance';
import TopKeywords from '@/components/dashboard/seo-reports/TopKeywords';
import SearchAnalytics from '@/components/dashboard/seo-reports/SearchAnalytics';
import CampaignOverview from '@/components/dashboard/CampaignOverview';

const DashboardPage: FC = () => {
  return (
    <DashboardLayout title="Dashboard">
      <Box sx={{ p: 3 }}>
        {/* Bovenste rij met metrics */}
        <Box sx={{ mb: 3 }}>
          <OverallMetrics />
        </Box>

        {/* Tweede rij met snelle acties */}
        <Box sx={{ mb: 3 }}>
          <QuickActions />
        </Box>

        <Grid container spacing={3}>
          {/* Prestatie grafieken */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 2 }}>
              <RecentPerformance />
            </Paper>
          </Grid>

          {/* Campaign Overview */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 2 }}>
              <CampaignOverview />
            </Paper>
          </Grid>

          {/* SEO Preview */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <TopKeywords />
            </Paper>
          </Grid>

          {/* Search Analytics Preview */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <SearchAnalytics />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
