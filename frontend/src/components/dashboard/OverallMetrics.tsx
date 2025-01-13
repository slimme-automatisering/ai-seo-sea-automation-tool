import { FC } from 'react';
import { Grid } from '@mui/material';
import { StatCard } from './StatCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import CampaignIcon from '@mui/icons-material/Campaign';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const OverallMetrics: FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="SEO Score"
          value="85/100"
          trend="+5%"
          icon={<SearchIcon />}
          color="#2196f3"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="SEA Performance"
          value="92%"
          trend="+3%"
          icon={<CampaignIcon />}
          color="#4caf50"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Organisch Verkeer"
          value="15.2K"
          trend="+12%"
          icon={<TrendingUpIcon />}
          color="#ff9800"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="ROI"
          value="€2.5K"
          trend="+8%"
          icon={<MonetizationOnIcon />}
          color="#9c27b0"
        />
      </Grid>
    </Grid>
  );
};

export default OverallMetrics;
