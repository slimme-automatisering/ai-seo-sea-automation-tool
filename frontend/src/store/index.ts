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
        // Negeer bepaalde acties/paden voor serialization checks
        ignoredActions: ['seo/analysisComplete'],
        ignoredPaths: ['seo.metrics.lastUpdated'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
