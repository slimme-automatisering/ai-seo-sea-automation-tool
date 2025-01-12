'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { AuthProvider } from '../context/AuthContext';
import dynamic from 'next/dynamic';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

// Dynamically import the router components with ssr disabled
const AppWithRouter = dynamic(
  () => import('../components/AppWithRouter'),
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppWithRouter>
          <Component {...pageProps} />
        </AppWithRouter>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
