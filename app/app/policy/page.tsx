
'use client'

import { useEffect } from 'react'
import PageHeader from '@/components/page-header'
import PrivacyPolicyContent from '@/components/privacy-policy-content'
import { ThemeToggle } from '@/components/theme-toggle'
import Footer from '@/components/footer'

export default function PolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy - Knowcap.ai'
  }, [])

  return (
    <>
      <PageHeader />
      <main className="min-h-screen bg-background" style={{ paddingTop: '4rem' }}>
      {/* Theme Toggle - Fixed position top right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <PrivacyPolicyContent />
          <Footer />
    </main>
    </>
  )
}
