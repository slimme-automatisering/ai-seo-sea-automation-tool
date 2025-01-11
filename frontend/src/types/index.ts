export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'MANAGER' | 'USER'
  googleId?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export interface Campaign {
  id: string
  name: string
  budget: number
  startDate: Date
  endDate?: Date
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED'
  userId: string
}

export interface SeoAnalysisResult {
  meta: MetaAnalysis
  content: ContentAnalysis
  technical: TechnicalAnalysis
  suggestions: string[]
}

export interface MetaAnalysis {
  title: string
  description: string
  keywords: string[]
  score: number
  suggestions: string[]
}

export interface ContentAnalysis {
  readability: number
  wordCount: number
  keywordDensity: number
  suggestions: string[]
}

export interface TechnicalAnalysis {
  loadTime: number
  mobileOptimized: boolean
  sslEnabled: boolean
  suggestions: string[]
}

export interface AnalyticsData {
  impressions: number
  clicks: number
  conversions: number
  cost: number
  ctr: number
  cpc: number
  position: number
  period: string
}
