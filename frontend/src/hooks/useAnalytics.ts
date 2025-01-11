import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AnalyticsData } from '../types'
import { setAnalyticsData } from '../store/slices/analyticsSlice'

export const useAnalytics = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = useCallback(async (period: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/analytics?period=${period}`)
      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }

      const data: AnalyticsData = await response.json()
      dispatch(setAnalyticsData(data))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  const exportAnalytics = useCallback(async (period: string, format: 'csv' | 'pdf') => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/analytics/export?period=${period}&format=${format}`)
      if (!response.ok) {
        throw new Error('Failed to export analytics')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-${period}.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export analytics')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    fetchAnalytics,
    exportAnalytics,
    loading,
    error,
  }
}
