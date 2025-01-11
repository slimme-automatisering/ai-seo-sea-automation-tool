import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnalyticsMetric {
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
}

interface PageMetrics {
  pageViews: AnalyticsMetric;
  uniqueVisitors: AnalyticsMetric;
  bounceRate: AnalyticsMetric;
  avgSessionDuration: AnalyticsMetric;
}

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
}

interface AnalyticsState {
  isLoading: boolean;
  error: string | null;
  dateRange: {
    start: string;
    end: string;
  };
  metrics: PageMetrics;
  trafficSources: TrafficSource[];
  topPages: {
    url: string;
    views: number;
    uniqueVisitors: number;
  }[];
  realTimeUsers: number;
}

const initialState: AnalyticsState = {
  isLoading: false,
  error: null,
  dateRange: {
    start: "",
    end: "",
  },
  metrics: {
    pageViews: { value: 0, change: 0, trend: "stable" },
    uniqueVisitors: { value: 0, change: 0, trend: "stable" },
    bounceRate: { value: 0, change: 0, trend: "stable" },
    avgSessionDuration: { value: 0, change: 0, trend: "stable" },
  },
  trafficSources: [],
  topPages: [],
  realTimeUsers: 0,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setDateRange: (
      state,
      action: PayloadAction<{ start: string; end: string }>
    ) => {
      state.dateRange = action.payload;
    },
    updateMetrics: (state, action: PayloadAction<PageMetrics>) => {
      state.metrics = action.payload;
    },
    setTrafficSources: (state, action: PayloadAction<TrafficSource[]>) => {
      state.trafficSources = action.payload;
    },
    setTopPages: (
      state,
      action: PayloadAction<
        { url: string; views: number; uniqueVisitors: number }[]
      >
    ) => {
      state.topPages = action.payload;
    },
    updateRealTimeUsers: (state, action: PayloadAction<number>) => {
      state.realTimeUsers = action.payload;
    },
    resetAnalytics: (state) => {
      return initialState;
    },
  },
});

export const {
  setLoading,
  setError,
  setDateRange,
  updateMetrics,
  setTrafficSources,
  setTopPages,
  updateRealTimeUsers,
  resetAnalytics,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
