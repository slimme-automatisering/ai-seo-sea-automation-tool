import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Campaign } from '../types'
import { setCampaigns } from '../store/slices/seaSlice'

export const useSEA = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCampaigns = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/sea/campaigns')
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns')
      }

      const data: Campaign[] = await response.json()
      dispatch(setCampaigns(data))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  const createCampaign = useCallback(async (campaignData: Omit<Campaign, 'id'>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/sea/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create campaign')
      }

      await fetchCampaigns()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create campaign')
      throw err
    } finally {
      setLoading(false)
    }
  }, [fetchCampaigns])

  return {
    fetchCampaigns,
    createCampaign,
    loading,
    error,
  }
}
