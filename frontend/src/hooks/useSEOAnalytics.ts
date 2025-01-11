import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSEOData } from '../store/slices/seoSlice'

export const useSEOAnalytics = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSEOData = useCallback(async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/seo/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      
      if (!response.ok) {
        throw new Error('SEO analysis failed')
      }

      const data = await response.json()
      dispatch(setSEOData(data))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  return { fetchSEOData, loading, error }
}
