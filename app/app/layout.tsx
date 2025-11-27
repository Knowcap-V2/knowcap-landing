

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from 'sonner'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Knowcap.ai - The AI Governance Platform for Professional Teams',
  description: 'Knowcap watches meetings and screens to auto-create timestamp-backed PRDs, SOPs, and onboarding guides. Your work becomes verified, searchable memory.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ucq62z2e5n");
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <Sonner />
      </body>
    </html>
  )
}

