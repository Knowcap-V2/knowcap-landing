'use client'

import { useEffect } from 'react'
import { Code, Palette, Megaphone, Users, Target, Rocket } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/footer'

export default function CareersPage() {
  useEffect(() => {
    document.title = 'Careers | Knowcap.ai'
  }, [])

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We are building the future of AI-powered project governance. Every line of code, every design decision matters.'
    },
    {
      icon: Rocket,
      title: 'Move Fast',
      description: 'From idea to deployment in days, not months. We ship, learn, iterate, and scale with velocity.'
    },
    {
      icon: Users,
      title: 'Team First',
      description: 'We believe in radical transparency, honest feedback, and building together as a unified team.'
    }
  ]

  const openRoles = [
    {
      title: 'Full-Stack Engineer',
      icon: Code,
      type: 'Engineering',
      location: 'Remote / Cairo',
      description: 'Build the core platform with Next.js, React, and Node.js. Work on AI integration, real-time collaboration, and scale.',
      color: '#005EFF',
      bgColor: 'rgba(0, 94, 255, 0.08)'
    },
    {
      title: 'Product Designer',
      icon: Palette,
      type: 'Design',
      location: 'Remote / Cairo',
      description: 'Craft intuitive interfaces for complex AI workflows. Own the end-to-end design from wireframes to production.',
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.08)'
    },
    {
      title: 'Growth Marketing Lead',
      icon: Megaphone,
      type: 'Marketing',
      location: 'Remote / Cairo',
      description: 'Drive user acquisition through content, SEO, partnerships, and community. Own the growth funnel from awareness to conversion.',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.08)'
    }
  ]

  const perks = [
    'Competitive salary + equity',
    'Remote-first culture',
    'Latest tech & tools',
    'Learning & development budget',
    'Flexible working hours',
    'Health insurance',
    'Annual team retreats',
    'Direct impact on product'
  ]

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-light-pitch)' }}>
      {/* Hero Section */}
      <section className="relative py-24 bg-white" style={{ background: 'radial-gradient(circle at 50% 0%, #E3F2FD 0%, #F8FAFC 70%)' }}>
        <div className="hero-blur"></div>
        <div className="max-w-[1100px] mx-auto px-6 text-center relative z-10">
          <div className="slide-label mb-6">Join Our Team</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            Build the Future of <span className="gradient-text">AI Governance</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.125rem', color: 'var(--gray-text)', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Join a small, fast-moving team solving one of the hardest problems in professional services: turning unstructured work into verifiable knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#open-roles"
              className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-all"
              style={{ background: 'var(--primary-blue)', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              View Open Roles
            </a>
            <Link
              href="/contact-us"
              className="inline-block px-8 py-4 rounded-lg font-semibold border-2 transition-all"
              style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              General Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="slide-label mb-4">Our Values</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2', color: 'var(--dark-bg)' }}>
              What We Believe In
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="pitch-card" style={{ padding: '2rem' }}>
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'var(--primary-light)' }}
                  >
                    <Icon className="w-7 h-7" style={{ color: 'var(--primary-blue)' }} />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3" 
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--dark-bg)' }}
                  >
                    {value.title}
                  </h3>
                  <p 
                    style={{ fontFamily: "'Inter', sans-serif", color: 'var(--gray-text)', lineHeight: '1.6' }}
                  >
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="py-20" style={{ background: 'var(--bg-light-pitch)' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="slide-label mb-4">Open Positions</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2', color: 'var(--dark-bg)' }}>
              Join Our Growing Team
            </h2>
          </div>

          <div className="space-y-6">
            {openRoles.map((role, index) => {
              const Icon = role.icon
              return (
                <div 
                  key={index} 
                  className="pitch-card hover:scale-[1.02] transition-all"
                  style={{ padding: '2.5rem', borderLeft: `4px solid ${role.color}` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex gap-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: role.bgColor }}
                      >
                        <Icon className="w-7 h-7" style={{ color: role.color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 
                            className="text-2xl font-bold" 
                            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--dark-bg)' }}
                          >
                            {role.title}
                          </h3>
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ background: role.bgColor, color: role.color }}
                          >
                            {role.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {role.location}
                        </p>
                        <p 
                          className="text-base" 
                          style={{ fontFamily: "'Inter', sans-serif", color: 'var(--gray-text)', lineHeight: '1.6' }}
                        >
                          {role.description}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`mailto:hsa@knowcap.ai?subject=Application: ${role.title}`}
                      className="px-6 py-3 rounded-lg font-semibold text-white whitespace-nowrap transition-all hover:scale-105"
                      style={{ background: role.color, fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Not finding the right role */}
          <div className="mt-12 text-center">
            <div className="inline-block pitch-card" style={{ padding: '2.5rem' }}>
              <h3 
                className="text-xl font-bold mb-3" 
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--dark-bg)' }}
              >
                Don't see the right role?
              </h3>
              <p 
                className="text-gray-600 mb-4" 
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                We are always looking for exceptional talent. Send us your resume and tell us how you can contribute.
              </p>
              <a
                href="mailto:hsa@knowcap.ai?subject=General Application"
                className="inline-block px-6 py-3 rounded-lg font-semibold border-2 transition-all"
                style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Perks & Benefits */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="slide-label mb-4">Perks & Benefits</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2', color: 'var(--dark-bg)' }}>
              Why Work With Us
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map((perk, index) => (
              <div 
                key={index} 
                className="pitch-card text-center" 
                style={{ padding: '1.5rem' }}
              >
                <p 
                  className="font-semibold" 
                  style={{ fontFamily: "'Inter', sans-serif", color: 'var(--dark-bg)' }}
                >
                  {perk}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
