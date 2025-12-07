'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the App component with no SSR to avoid hydration issues
// since it uses browser APIs (localStorage, IndexedDB, microphone, screen capture)
const KnowApp = dynamic(() => import('@/lib/knowapp/App'), { ssr: false });

export default function AppPage() {
  useEffect(() => {
    // Set page title
    document.title = 'Knowapp - AI Notebook | Knowcap.ai';
  }, []);

  return <KnowApp />;
}
