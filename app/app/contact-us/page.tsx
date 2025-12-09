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


        </div>
      </section>

      <Footer />
    </main>
  )
}
