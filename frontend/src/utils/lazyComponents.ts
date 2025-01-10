import dynamic from 'next/dynamic';

// Dashboard componenten
export const DashboardMetrics = dynamic(() => import('../components/dashboard/DashboardMetrics'), {
  loading: () => <div>Loading metrics...</div>,
  ssr: false
});

export const CampaignOverview = dynamic(() => import('../components/dashboard/CampaignOverview'), {
  loading: () => <div>Loading campaigns...</div>
});

// SEO componenten
export const KeywordResearch = dynamic(() => import('../components/seo/KeywordResearch'), {
  loading: () => <div>Loading keyword research...</div>
});

export const ContentGenerator = dynamic(() => import('../components/seo/ContentGenerator'), {
  loading: () => <div>Loading content generator...</div>
});

export const TechnicalSEO = dynamic(() => import('../components/seo/TechnicalSEO'), {
  loading: () => <div>Loading technical analysis...</div>
});

// SEA componenten
export const CampaignManager = dynamic(() => import('../components/sea/CampaignManager'), {
  loading: () => <div>Loading campaign manager...</div>
});

export const AdCreator = dynamic(() => import('../components/sea/AdCreator'), {
  loading: () => <div>Loading ad creator...</div>
});

export const BudgetOptimizer = dynamic(() => import('../components/sea/BudgetOptimizer'), {
  loading: () => <div>Loading budget optimizer...</div>
});

// Analytics componenten
export const PerformanceGraphs = dynamic(() => import('../components/analytics/PerformanceGraphs'), {
  loading: () => <div>Loading performance graphs...</div>
});

export const CompetitorAnalysis = dynamic(() => import('../components/analytics/CompetitorAnalysis'), {
  loading: () => <div>Loading competitor analysis...</div>
});

// Settings componenten
export const UserSettings = dynamic(() => import('../components/settings/UserSettings'), {
  loading: () => <div>Loading user settings...</div>
});

export const APISettings = dynamic(() => import('../components/settings/APISettings'), {
  loading: () => <div>Loading API settings...</div>
});
