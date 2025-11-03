

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from 'sonner'

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
      <body className={inter.className}>
        {children}
        <Toaster />
        <Sonner />
      </body>
    </html>
  )
}

