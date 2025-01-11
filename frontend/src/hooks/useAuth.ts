import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setLoading, setError, logout } from '../store/slices/authSlice'
import type { RootState } from '../store'
import type { User } from '../types'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  )

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true))
      try {
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          const userData: User = await response.json()
          dispatch(setUser(userData))
        }
      } catch (err) {
        console.error('Auth check failed:', err)
        dispatch(setError(err instanceof Error ? err.message : 'Session check failed'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    checkAuth()
  }, [dispatch])

  // Google OAuth login
  const loginWithGoogle = useCallback(async () => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    
    // Open Google OAuth popup
    const width = 500
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    const popup = window.open(
      '/api/auth/google',
      'Google Login',
      `width=${width},height=${height},left=${left},top=${top}`
    )

    if (popup) {
      // Listen for messages from popup
      const messageHandler = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return

        if (event.data?.type === 'oauth_success') {
          const { user } = event.data
          dispatch(setUser(user))
          popup.close()
        } else if (event.data?.type === 'oauth_error') {
          dispatch(setError(event.data.error || 'Login failed'))
          popup.close()
        }
      }

      window.addEventListener('message', messageHandler)
      return () => window.removeEventListener('message', messageHandler)
    } else {
      dispatch(setError('Popup blocked. Please allow popups for this site.'))
    }
  }, [dispatch])

  // Regular login (fallback)
  const login = useCallback(async (email: string, password: string) => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      
      if (!response.ok) {
        throw new Error('Login failed')
      }

      const userData: User = await response.json()
      dispatch(setUser(userData))
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Login failed'))
      throw err
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  // Logout
  const handleLogout = useCallback(async () => {
    dispatch(setLoading(true))
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      dispatch(logout())
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Logout failed'))
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  return {
    user,
    isAuthenticated,
    loading,
    error,
    loginWithGoogle,
    login,
    logout: handleLogout,
  }
}
