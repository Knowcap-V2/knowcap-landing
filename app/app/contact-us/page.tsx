'use client'

import { useEffect } from 'react'
import ContactForm from '@/components/contact-form'
import Footer from '@/components/footer'

export default function ContactUsPage() {
  useEffect(() => {
    document.title = 'Contact Us | Knowcap.ai'
  }, [])

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-light-pitch)' }}>
      {/* Hero Section */}
      <section className="relative py-24 bg-white" style={{ background: 'radial-gradient(circle at 50% 0%, #E3F2FD 0%, #F8FAFC 70%)' }}>
        <div className="hero-blur"></div>
        <div className="max-w-[1100px] mx-auto px-6 text-center relative z-10">
          <div className="slide-label mb-6">Get In Touch</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            Let's Start a <span className="gradient-text">Conversation</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.125rem', color: 'var(--gray-text)', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>
            Have questions about Knowcap? Want to discuss how we can help your team? We are here to help.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20" style={{ background: 'var(--bg-light-pitch)' }}>
        <div className="max-w-[800px] mx-auto px-6">
          <div className="pitch-card" style={{ padding: '3rem' }}>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <div className="inline-block pitch-card" style={{ padding: '2rem' }}>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--dark-bg)' }}>
                Direct Contact
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                Prefer email? Reach out directly:
              </p>
              <a 
                href="mailto:hsa@knowcap.ai" 
                className="text-2xl font-semibold" 
                style={{ color: 'var(--primary-blue)', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                hsa@knowcap.ai
              </a>
              <p className="text-sm text-gray-500 mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                Every message is read and answered personally within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
