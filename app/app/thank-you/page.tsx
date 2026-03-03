'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Instagram, MessageCircle, ArrowRight } from 'lucide-react'
import Footer from '@/components/footer'

function ThankYouContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'submission' // beta, contact, or application

  useEffect(() => {
    document.title = 'Thank You | Knowcap.ai'
  }, [])

  const getMessage = () => {
    switch (type) {
      case 'beta':
        return {
          title: 'Thank You for Applying!',
          subtitle: 'Your beta application has been received.',
          message: 'We are reviewing applications and will be in touch within 48 hours if your profile is a strong match for our pilot program.'
        }
      case 'contact':
        return {
          title: 'Message Received!',
          subtitle: 'We have received your inquiry.',
          message: 'Our team will review your message and get back to you within 24 hours. We appreciate your interest in Knowcap.ai!'
        }
      case 'application':
        return {
          title: 'Application Submitted!',
          subtitle: 'Thank you for applying to join our team.',
          message: 'We are excited to learn more about you. Our team will review your application and reach out if your profile matches what we are looking for.'
        }
      default:
        return {
          title: 'Thank You!',
          subtitle: 'Your submission has been received.',
          message: 'We will be in touch soon.'
        }
    }
  }

  const content = getMessage()

  return (
    <>
      <main className="min-h-screen" style={{ background: 'var(--bg-light-pitch)' }}>
      {/* Thank You Section */}
      <section className="relative py-24" style={{ background: 'radial-gradient(circle at 50% 0%, #E3F2FD 0%, #F8FAFC 70%)' }}>
        <div className="hero-blur"></div>
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 style={{ 
            fontFamily: "'Space Grotesk', sans-serif", 
            fontSize: '3rem', 
            fontWeight: 700, 
            letterSpacing: '-0.02em', 
            lineHeight: '1.2', 
            marginBottom: '1rem',
            color: 'var(--dark-bg)'
          }}>
            {content.title}
          </h1>

          {/* Subtitle */}
          <p style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontSize: '1.25rem', 
            color: 'var(--primary-blue)', 
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            {content.subtitle}
          </p>

          {/* Message */}
          <p style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontSize: '1.125rem', 
            color: 'var(--gray-text)', 
            lineHeight: '1.6',
            marginBottom: '3rem'
          }}>
            {content.message}
          </p>
        </div>
      </section>

      {/* Social CTAs Section */}
      <section className="py-20" style={{ background: 'var(--bg-light-pitch)' }}>
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 style={{ 
              fontFamily: "'Space Grotesk', sans-serif", 
              fontSize: '2rem', 
              fontWeight: 700,
              marginBottom: '1rem',
              color: 'var(--dark-bg)'
            }}>
              Stay Connected
            </h2>
            <p style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: '1.125rem', 
              color: 'var(--gray-text)'
            }}>
              Join our growing community and follow our journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Instagram Card */}
            <a 
              href="https://www.instagram.com/knowcap.ai?igsh=dXF3bnJueW5ocXc2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="pitch-card group hover:scale-[1.02] transition-all duration-300"
              style={{ padding: '2.5rem', textDecoration: 'none' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%)' }}>
                  <Instagram className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 style={{ 
                    fontFamily: "'Space Grotesk', sans-serif", 
                    fontSize: '1.5rem', 
                    fontWeight: 700,
                    color: 'var(--dark-bg)',
                    marginBottom: '0.25rem'
                  }}>
                    Follow on Instagram
                  </h3>
                </div>
              </div>
              <p style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '1rem', 
                color: 'var(--gray-text)',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Follow our journey, see behind-the-scenes content, and stay updated on product launches
              </p>
              <div className="flex items-center gap-2 text-[#833AB4] font-semibold group-hover:gap-3 transition-all">
                <span>Follow Us</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </a>

            {/* WhatsApp Card */}
            <a 
              href="https://chat.whatsapp.com/EJEH9M7Edb4CupXijC7GCE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="pitch-card group hover:scale-[1.02] transition-all duration-300"
              style={{ padding: '2.5rem', textDecoration: 'none' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}>
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 style={{ 
                    fontFamily: "'Space Grotesk', sans-serif", 
                    fontSize: '1.5rem', 
                    fontWeight: 700,
                    color: 'var(--dark-bg)',
                    marginBottom: '0.25rem'
                  }}>
                    Join WhatsApp
                  </h3>
                </div>
              </div>
              <p style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '1rem', 
                color: 'var(--gray-text)',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Connect with our community, ask questions, and get early access to updates and announcements
              </p>
              <div className="flex items-center gap-2 text-[#25D366] font-semibold group-hover:gap-3 transition-all">
                <span>Join Community</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </a>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all hover:scale-105"
              style={{ 
                background: 'var(--primary-blue)',
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-light-pitch)' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p style={{ fontFamily: "'Inter', sans-serif", color: 'var(--gray-text)' }}>Loading...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
