import { FC } from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import KeywordPerformanceDetails from '@/components/dashboard/seo-reports/KeywordPerformanceDetails';
import TopKeywords from '@/components/dashboard/seo-reports/TopKeywords';
import SearchAnalytics from '@/components/dashboard/seo-reports/SearchAnalytics';
import BacklinksOverview from '@/components/dashboard/seo-reports/BacklinksOverview';
import TechnicalSEOStatus from '@/components/dashboard/seo-reports/TechnicalSEOStatus';
import VisibilityScore from '@/components/dashboard/seo-reports/VisibilityScore';
import SEOOverview from '@/components/dashboard/seo-reports/SEOOverview';
import SEOSettings from '@/components/dashboard/seo-reports/SEOSettings';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';

const SEODashboardPage: FC = () => {
  return (
    <DashboardLayout title="SEO Dashboard">
      <Box sx={{ p: 3 }}>
        {/* Header met titel en acties */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            SEO Dashboard
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              color="primary"
              href="/dashboard/seo/new-analysis"
            >
              Nieuwe Analyse
            </Button>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              href="/dashboard/seo/settings"
            >
              Instellingen
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Bovenste rij met overzicht en scores */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <SEOOverview />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <VisibilityScore />
            </Paper>
          </Grid>

          {/* Tweede rij met keyword prestaties en technische status */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <KeywordPerformanceDetails />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <TechnicalSEOStatus />
            </Paper>
          </Grid>

          {/* Derde rij met zoekanalytics en backlinks */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <SearchAnalytics />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <BacklinksOverview />
            </Paper>
          </Grid>

          {/* Onderste rij met top keywords en instellingen */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <TopKeywords />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <SEOSettings />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default SEODashboardPage;
