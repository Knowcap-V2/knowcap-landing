'use client'

import { useEffect } from 'react'
import TermsOfServiceContent from '@/components/terms-of-service-content'
import { ThemeToggle } from '@/components/theme-toggle'
import Footer from '@/components/footer'

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service - Knowcap.ai'
  }, [])

  return (
    <>
      <main className="min-h-screen bg-background" style={{  }}>
      {/* Theme Toggle - Fixed position top right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <TermsOfServiceContent />
          <Footer />
    </main>
    </>
  )
}
