import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Campaign {
  id: string;
  name: string;
  budget: number;
  status: 'active' | 'paused' | 'ended';
  startDate: string;
  endDate?: string;
  keywords: string[];
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
  };
}

interface SEAState {
  campaigns: Campaign[];
  activeCampaignId: string | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: ('active' | 'paused' | 'ended')[];
    dateRange: {
      start: string;
      end: string;
    };
  };
}

const initialState: SEAState = {
  campaigns: [],
  activeCampaignId: null,
  isLoading: false,
  error: null,
  filters: {
    status: ['active'],
    dateRange: {
      start: '',
      end: '',
    },
  },
};

const seaSlice = createSlice({
  name: 'sea',
  initialState,
  reducers: {
    setCampaigns: (state, action: PayloadAction<Campaign[]>) => {
      state.campaigns = action.payload;
    },
    addCampaign: (state, action: PayloadAction<Campaign>) => {
      state.campaigns.push(action.payload);
    },
    updateCampaign: (state, action: PayloadAction<Partial<Campaign> & { id: string }>) => {
      const index = state.campaigns.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.campaigns[index] = { ...state.campaigns[index], ...action.payload };
      }
    },
    deleteCampaign: (state, action: PayloadAction<string>) => {
      state.campaigns = state.campaigns.filter(c => c.id !== action.payload);
    },
    setActiveCampaign: (state, action: PayloadAction<string>) => {
      state.activeCampaignId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<SEAState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateCampaignPerformance: (
      state,
      action: PayloadAction<{ id: string; performance: Campaign['performance'] }>
    ) => {
      const campaign = state.campaigns.find(c => c.id === action.payload.id);
      if (campaign) {
        campaign.performance = action.payload.performance;
      }
    },
  },
});

export const {
  setCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  setActiveCampaign,
  setLoading,
  setError,
  updateFilters,
  updateCampaignPerformance,
} = seaSlice.actions;

export default seaSlice.reducer;
