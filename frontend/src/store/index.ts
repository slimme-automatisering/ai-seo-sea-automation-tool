import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import seoReducer from './slices/seoSlice'
import seaReducer from './slices/seaSlice'
import analyticsReducer from './slices/analyticsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    seo: seoReducer,
    sea: seaReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/setUser'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.startDate', 'payload.endDate'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'sea.campaigns.startDate', 'sea.campaigns.endDate'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
