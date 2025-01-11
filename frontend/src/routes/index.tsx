import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Layout } from '../components/Layout'

// Pages
import Dashboard from '../pages/dashboard'
import SEO from '../pages/seo'
import SEA from '../pages/sea'
import Analytics from '../pages/analytics'
import Settings from '../pages/settings'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'

const PrivateRoute: FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? element : <Navigate to="/login" replace />
}

export const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/seo"
          element={
            <PrivateRoute
              element={
                <Layout>
                  <SEO />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/sea"
          element={
            <PrivateRoute
              element={
                <Layout>
                  <SEA />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute
              element={
                <Layout>
                  <Analytics />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
            />
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
