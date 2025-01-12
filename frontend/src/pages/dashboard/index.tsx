import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import DashboardMetrics from '../../components/dashboard/DashboardMetrics';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import KeywordRankings from '@/components/dashboard/seo-reports/KeywordRankings';
import VisibilityScore from '@/components/dashboard/seo-reports/VisibilityScore';
import TopKeywords from '@/components/dashboard/seo-reports/TopKeywords';
import SearchAnalytics from '@/components/dashboard/seo-reports/SearchAnalytics';
import BacklinksOverview from '@/components/dashboard/seo-reports/BacklinksOverview';
import TechnicalSEOStatus from '@/components/dashboard/seo-reports/TechnicalSEOStatus';
import KeywordPerformanceDetails from '@/components/dashboard/seo-reports/KeywordPerformanceDetails';
import SEOOverview from '@/components/dashboard/seo-reports/SEOOverview';
import SEOSettings from '@/components/dashboard/seo-reports/SEOSettings';
import CampaignOverview from '@/components/dashboard/CampaignOverview';

const DashboardPage: FC = () => {
  return (
    <DashboardLayout title="Dashboard">
      <Box sx={{ flexGrow: 1 }}>
        <DashboardMetrics />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <KeywordRankings />
          </Grid>
          <Grid item xs={12} md={4}>
            <VisibilityScore />
          </Grid>
          <Grid item xs={12} md={6}>
            <TopKeywords />
          </Grid>
          <Grid item xs={12} md={6}>
            <SearchAnalytics />
          </Grid>
          <Grid item xs={12} md={6}>
            <BacklinksOverview />
          </Grid>
          <Grid item xs={12} md={6}>
            <TechnicalSEOStatus />
          </Grid>
          <Grid item xs={12}>
            <KeywordPerformanceDetails />
          </Grid>
          <Grid item xs={12} md={6}>
            <SEOOverview />
          </Grid>
          <Grid item xs={12} md={6}>
            <SEOSettings />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
