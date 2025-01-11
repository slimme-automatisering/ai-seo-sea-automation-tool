import type { NextPage } from 'next'
import Head from 'next/head'
import { Dashboard } from '../components/dashboard/Dashboard'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AI SEO & SEA Automation Tool</title>
        <meta name="description" content="AI-powered SEO and SEA automation tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Dashboard />
      </main>
    </div>
  )
}

export default Home
