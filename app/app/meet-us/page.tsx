'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Users, TrendingUp, Handshake, HeartHandshake, UserCog } from 'lucide-react'
import Footer from '@/components/footer'

export default function MeetUsPage() {
  useEffect(() => {
    document.title = 'Meet Us | Knowcap.ai'
  }, [])

  const stakeholders = [
    {
      id: 'book',
      title: 'Strategy Consultation',
      icon: Users,
      description: 'Discuss your project challenges and explore how Knowcap can help your team.',
      color: '#005EFF',
      bgColor: 'rgba(0, 94, 255, 0.08)',
      route: '/book'
    },
    {
      id: 'invest',
      title: 'Investor Discussion',
      icon: TrendingUp,
      description: 'Explore Knowcap vision, opportunities, and strategic growth roadmap.',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.08)',
      route: '/invest'
    },
    {
      id: 'partner',
      title: 'Technology Partnership',
      icon: Handshake,
      description: 'Build the future of AI-powered delivery together with strategic collaboration.',
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.08)',
      route: '/partner'
    },
    {
      id: 'team',
      title: 'Culture & Team Fit',
      icon: HeartHandshake,
      description: 'Connect with the people building Knowcap and explore mindset alignment.',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.08)',
      route: '/team'
    },
    {
      id: 'vendor',
      title: 'Vendor Partnership',
      icon: UserCog,
      description: 'Discuss B2B partnerships and collaboration opportunities with Knowcap.',
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.08)',
      route: '/vendor'
    }
  ]

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-light-pitch)' }}>
      {/* Hero Section */}
      <section className="relative py-24 bg-white" style={{ background: 'radial-gradient(circle at 50% 0%, #E3F2FD 0%, #F8FAFC 70%)' }}>
        <div className="hero-blur"></div>
        <div className="max-w-[1100px] mx-auto px-6 text-center relative z-10">
          <div className="slide-label mb-6">Connect With Us</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            Let's <span className="gradient-text">Meet & Collaborate</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.125rem', color: 'var(--gray-text)', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>
            Whether you are a potential partner, investor, team member, or customer—we would love to connect.
          </p>
        </div>
      </section>

      {/* Stakeholder Selection */}
      <section className="py-16" style={{ background: 'var(--bg-light-pitch)' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakeholders.map((stakeholder) => {
              const Icon = stakeholder.icon
              
              return (
                <Link
                  key={stakeholder.id}
                  href={stakeholder.route}
                  className="pitch-card text-left transition-all hover:scale-105 block"
                  style={{
                    padding: '2rem',
                    border: '2px solid transparent',
                    background: 'var(--surface-glass)',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: stakeholder.bgColor }}
                  >
                    <Icon className="w-7 h-7" style={{ color: stakeholder.color }} />
                  </div>
                  <h3 
                    className="text-lg font-bold mb-2" 
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--dark-bg)' }}
                  >
                    {stakeholder.title}
                  </h3>
                  <p 
                    className="text-sm" 
                    style={{ fontFamily: "'Inter', sans-serif", color: 'var(--gray-text)' }}
                  >
                    {stakeholder.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
