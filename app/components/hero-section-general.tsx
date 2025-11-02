
'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle2, FileText, Lightbulb, Brain, LineChart } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HeroSectionGeneral() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg">
      <div className="hero-blur"></div>
      <div className="max-w-[1280px] mx-auto px-8 py-20 text-center relative z-10">
        {/* Hero Text */}
        <div className={`mb-12 max-w-[1024px] mx-auto transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F2FF] border border-[#005EFF]/20 mb-6">
            <span className="text-sm font-semibold text-[#005EFF]">
              Teams using Knowcap cut onboarding time by 70%
            </span>
          </div>
          
          <h1 className="hero-heading mb-6">
            The AI Governance Layer for{' '}
            <span className="text-[#005EFF]">Professional Teams</span>
          </h1>
          <p className="hero-subheading mb-12 max-w-3xl mx-auto">
            Knowcap watches meetings and screens to auto-create timestamp-backed PRDs, SOPs, and onboarding guides. Your work becomes verified, searchable memory.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/book'}
            >
              Book a Demo
            </Button>
            <Button 
              size="lg"
              onClick={() => window.location.href = '/beta'}
            >
              Apply for Early Access
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 max-w-[1024px] mx-auto transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#E6F2FF] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#005EFF]" />
            </div>
            <h3 className="text-base font-semibold text-[#191F2E] mb-2">Governance</h3>
            <p className="text-sm text-[#535862]">Keep Projects Accountable</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFF4E6] flex items-center justify-center mb-4">
              <Lightbulb className="w-8 h-8 text-[#FF9500]" />
            </div>
            <h3 className="text-base font-semibold text-[#191F2E] mb-2">Agents</h3>
            <p className="text-sm text-[#535862]">Client-facing AI trained on your Meetings</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#E6F9F2] flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-[#00C48C]" />
            </div>
            <h3 className="text-base font-semibold text-[#191F2E] mb-2">Artifacts</h3>
            <p className="text-sm text-[#535862]">Auto-generated PRDs & SOPs</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#F3E6FF] flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-[#9747FF]" />
            </div>
            <h3 className="text-base font-semibold text-[#191F2E] mb-2">Memory</h3>
            <p className="text-sm text-[#535862]">Persistent Project Knowledge</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFE6F2] flex items-center justify-center mb-4">
              <LineChart className="w-8 h-8 text-[#FF3B69]" />
            </div>
            <h3 className="text-base font-semibold text-[#191F2E] mb-2">Insights</h3>
            <p className="text-sm text-[#535862]">Detects if projects are on track</p>
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
      </div>
    </section>
  )
}
