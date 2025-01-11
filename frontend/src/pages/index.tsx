import type { NextPage } from "next";
import Head from "next/head";
import DashboardMetrics from "../components/dashboard/DashboardMetrics";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AI SEO & SEA Automation Tool</title>
        <meta
          name="description"
          content="AI-powered SEO and SEA automation tool"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DashboardMetrics />
      </main>
    </div>
  );
};

export default Home;
