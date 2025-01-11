import type { NextPage } from 'next'
import Head from 'next/head'
import { SEADashboard } from '../../components/sea/SEADashboard'

const SEAPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>SEA Dashboard - AI SEO & SEA Tool</title>
        <meta name="description" content="AI-powered SEA campaign management dashboard" />
      </Head>

      <main>
        <SEADashboard />
      </main>
    </div>
  )
}

export default SEAPage
