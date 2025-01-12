import { FC, ReactNode } from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  trend?: string;
  icon: ReactNode;
  color?: string;
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  unit,
  trend,
  icon,
  color
}) => {
  const theme = useTheme();
  const isTrendPositive = trend?.startsWith('+');

  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Achtergrond Icon */}
      <Box
        sx={{
          position: 'absolute',
          right: -20,
          top: -20,
          opacity: 0.1,
          transform: 'scale(2)',
          color: color || theme.palette.primary.main
        }}
      >
        {icon}
      </Box>

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1 }}>
          <Typography variant="h4" component="span">
            {value}
          </Typography>
          {unit && (
            <Typography variant="h6" color="textSecondary" sx={{ ml: 0.5 }}>
              {unit}
            </Typography>
          )}
        </Box>

        {trend && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mt: 1,
            color: isTrendPositive ? 'success.main' : 'error.main'
          }}>
            {isTrendPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {trend}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
