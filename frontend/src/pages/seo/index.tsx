import type { NextPage } from 'next'
import Head from 'next/head'
import { SEODashboard } from '../../components/seo/SEODashboard'

const SEOPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>SEO Dashboard - AI SEO & SEA Tool</title>
        <meta name="description" content="AI-powered SEO optimization dashboard" />
      </Head>

      <main>
        <SEODashboard />
      </main>
    </div>
  )
}

export default SEOPage
