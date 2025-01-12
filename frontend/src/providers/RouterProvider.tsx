'use client';

import { BrowserRouter } from 'react-router-dom';

export function RouterProvider({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
