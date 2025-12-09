
import PrivacyPolicyContent from '@/components/privacy-policy-content'
import { ThemeToggle } from '@/components/theme-toggle'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Knowcap.ai',
  description: 'Privacy Policy for Knowcap Chrome Extension - Learn how we collect, use, and protect your information.',
}

export default function PolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Theme Toggle - Fixed position top right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <PrivacyPolicyContent />
          <Footer />
    </main>
  )
}
