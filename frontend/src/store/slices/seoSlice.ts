import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SEOMetrics {
  score: number;
  keywords: string[];
  suggestions: string[];
  lastUpdated: string;
}

interface SEOState {
  metrics: SEOMetrics;
  isAnalyzing: boolean;
  error: string | null;
  targetUrl: string;
  history: {
    date: string;
    score: number;
    url: string;
  }[];
}

const initialState: SEOState = {
  metrics: {
    score: 0,
    keywords: [],
    suggestions: [],
    lastUpdated: '',
  },
  isAnalyzing: false,
  error: null,
  targetUrl: '',
  history: [],
};

const seoSlice = createSlice({
  name: 'seo',
  initialState,
  reducers: {
    startAnalysis: (state, action: PayloadAction<string>) => {
      state.isAnalyzing = true;
      state.error = null;
      state.targetUrl = action.payload;
    },
    analysisComplete: (state, action: PayloadAction<SEOMetrics>) => {
      state.isAnalyzing = false;
      state.metrics = action.payload;
      state.history.push({
        date: new Date().toISOString(),
        score: action.payload.score,
        url: state.targetUrl,
      });
    },
    analysisError: (state, action: PayloadAction<string>) => {
      state.isAnalyzing = false;
      state.error = action.payload;
    },
    clearHistory: (state) => {
      state.history = [];
    },
    updateKeywords: (state, action: PayloadAction<string[]>) => {
      state.metrics.keywords = action.payload;
    },
    updateSuggestions: (state, action: PayloadAction<string[]>) => {
      state.metrics.suggestions = action.payload;
    },
  },
});

export const {
  startAnalysis,
  analysisComplete,
  analysisError,
  clearHistory,
  updateKeywords,
  updateSuggestions,
} = seoSlice.actions;

export default seoSlice.reducer;
