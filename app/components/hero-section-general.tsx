
'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle2, FileText, Lightbulb, Brain, LineChart } from 'lucide-react'
import { useState, useEffect } from 'react'
import BetaApplicationForm from '@/components/beta-application-form'

export default function HeroSectionGeneral() {
  const [mounted, setMounted] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg">
      <div className="hero-blur"></div>
      <div className="max-w-[1100px] mx-auto px-6 py-20 text-center relative z-10">
        {/* Hero Text */}
        <div className={`mb-12 max-w-[900px] mx-auto transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Trust Badge */}
          <div className="slide-label mb-6">
            Teams using Knowcap cut onboarding time by 70%
          </div>
          
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            AI That Turns Meetings and Screen Work Into{' '}
            <span className="gradient-text">Verified Project Docs</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.125rem', color: 'var(--gray-text)', lineHeight: '1.6', marginBottom: '3rem' }} className="max-w-3xl mx-auto">
            Every document links to its video proof — giving your team context you can trust.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = 'https://knowcap.ai/book'}
            >
              Book a Demo
            </Button>
            <Button 
              size="lg"
              onClick={() => setIsFormOpen(true)}
            >
              Apply for Beta Access
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 max-w-[900px] mx-auto transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="pitch-card flex flex-col items-center text-center" style={{ padding: '1.5rem' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--primary-light)' }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--primary-blue)' }} />
            </div>
            <h3 className="text-base font-semibold text-[#191F2E] mb-2 min-h-[48px] flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Keep Projects Accountable</h3>
            <p className="text-sm text-[#535862]" style={{ fontFamily: "'Inter', sans-serif" }}>AI-powered governance flags risks and verifies decisions.</p>
          </div>
          
          <div className="pitch-card flex flex-col items-center text-center" style={{ padding: '1.5rem' }}>
            <div className="w-16 h-16 rounded-full bg-[#FFF4E6] flex items-center justify-center mb-4">
              <Lightbulb className="w-8 h-8 text-[#FF9500]" />
            </div>
            <h3 className="text-base font-semibold text-[#191F2E] mb-2 min-h-[48px] flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Get Instant Answers</h3>
            <p className="text-sm text-[#535862]" style={{ fontFamily: "'Inter', sans-serif" }}>Deploy AI agents trained on your project's verified memory.</p>
          </div>
          
          <div className="pitch-card flex flex-col items-center text-center" style={{ padding: '1.5rem' }}>
            <div className="w-16 h-16 rounded-full bg-[#E6F9F2] flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-[#00C48C]" />
            </div>
            <h3 className="text-base font-semibold text-[#191F2E] mb-2 min-h-[48px] flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Instant Documentation</h3>
            <p className="text-sm text-[#535862]" style={{ fontFamily: "'Inter', sans-serif" }}>Auto-generate PRDs, SOPs, and guides from any meeting.</p>
          </div>
          
          <div className="pitch-card flex flex-col items-center text-center" style={{ padding: '1.5rem' }}>
            <div className="w-16 h-16 rounded-full bg-[#F3E6FF] flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-[#9747FF]" />
            </div>
            <h3 className="text-base font-semibold text-[#191F2E] mb-2 min-h-[48px] flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A Searchable Memory</h3>
            <p className="text-sm text-[#535862]" style={{ fontFamily: "'Inter', sans-serif" }}>Every meeting, doc, and decision, instantly verifiable.</p>
          </div>
          
          <div className="pitch-card flex flex-col items-center text-center" style={{ padding: '1.5rem' }}>
            <div className="w-16 h-16 rounded-full bg-[#FFE6F2] flex items-center justify-center mb-4">
              <LineChart className="w-8 h-8 text-[#FF3B69]" />
            </div>
            <h3 className="text-base font-semibold text-[#191F2E] mb-2 min-h-[48px] flex items-center justify-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Spot Risks Automatically</h3>
            <p className="text-sm text-[#535862]" style={{ fontFamily: "'Inter', sans-serif" }}>Project intelligence flags delays and scope creep for you.</p>
          </div>
        </div>

        {/* YouTube Video */}
        <div className={`relative mx-auto max-w-[1024px] transition-all duration-800 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative aspect-video rounded-xl overflow-hidden card-shadow bg-white p-8">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/j-SzV4i9Fbg?si=VsfOLpiJSg6FriJX" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Trusted By Section */}
        <div className={`mt-20 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-[#535862] mb-2">Real teams already building with Knowcap</p>
            <p className="text-sm text-[#535862]">6 Odoo partners • 40+ projects • 1000+ recorded sessions</p>
          </div>
          
          {/* Logo Grid */}
          <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <div className="h-12 w-32 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Ariika</span>
              </div>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <div className="h-12 w-32 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Moko</span>
              </div>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <div className="h-12 w-32 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BI Solutions</span>
              </div>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <div className="h-12 w-32 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Smetools</span>
              </div>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <div className="h-12 w-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Braincrew</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BetaApplicationForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </section>
  )
}
