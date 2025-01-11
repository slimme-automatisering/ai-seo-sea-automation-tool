import React, { lazy, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

// Loading component
const LoadingComponent: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress />
  </Box>
);

// HOC for lazy loading
const withSuspense = (WrappedComponent: React.ComponentType) => {
  return function WithSuspenseComponent(props: any) {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
};

// Dashboard Components
export const DashboardMetrics = lazy(() => import('../components/dashboard/DashboardMetrics'));
export const LazyDashboardMetrics = withSuspense(DashboardMetrics);

export const CampaignOverview = lazy(() => import('../components/dashboard/CampaignOverview'));
export const LazyCampaignOverview = withSuspense(CampaignOverview);

// SEO Components
export const KeywordResearch = lazy(() => import('../components/seo/KeywordResearch'));
export const LazyKeywordResearch = withSuspense(KeywordResearch);

export const ContentGenerator = lazy(() => import('../components/seo/ContentGenerator'));
export const LazyContentGenerator = withSuspense(ContentGenerator);

export const TechnicalSEO = lazy(() => import('../components/seo/TechnicalSEO'));
export const LazyTechnicalSEO = withSuspense(TechnicalSEO);

// SEA Components
export const CampaignManager = lazy(() => import('../components/sea/CampaignManager'));
export const LazyCampaignManager = withSuspense(CampaignManager);

export const AdCreator = lazy(() => import('../components/sea/AdCreator'));
export const LazyAdCreator = withSuspense(AdCreator);

export const BudgetOptimizer = lazy(() => import('../components/sea/BudgetOptimizer'));
export const LazyBudgetOptimizer = withSuspense(BudgetOptimizer);

// Analytics Components
export const PerformanceGraphs = lazy(() => import('../components/analytics/PerformanceGraphs'));
export const LazyPerformanceGraphs = withSuspense(PerformanceGraphs);

export const CompetitorAnalysis = lazy(() => import('../components/analytics/CompetitorAnalysis'));
export const LazyCompetitorAnalysis = withSuspense(CompetitorAnalysis);

// Settings Components
export const UserSettings = lazy(() => import('../components/settings/UserSettings'));
export const LazyUserSettings = withSuspense(UserSettings);

export const APISettings = lazy(() => import('../components/settings/APISettings'));
export const LazyAPISettings = withSuspense(APISettings);
