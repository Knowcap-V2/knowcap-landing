
'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle2, FileText, Lightbulb, Brain, LineChart } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function HeroSectionGeneral() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg">
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center relative z-10">
        {/* Hero Text */}
        <div className={`mb-12 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-6xl font-normal mb-4 leading-tight text-gray-600">
            The AI Governance Layer for
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-[#1a1d29]">
            Professional Teams
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Knowcap watches meetings and screens to auto-create timestamp-backed PRDs, SOPs, and onboarding guides. Your work becomes verified, searchable memory.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/book'}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8 py-6 rounded-lg transition-all duration-300 text-base"
            >
              Book a Demo
            </Button>
            <Button 
              size="lg"
              onClick={() => window.location.href = '/beta'}
              className="bg-[#1a1d29] hover:bg-[#2a2d39] text-white font-medium px-8 py-6 rounded-lg transition-all duration-300 text-base"
            >
              Apply for Early Access
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 mb-16 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-[#1a1d29] mb-1">Governance</h3>
            <p className="text-xs text-gray-600">Keep Projects Accountable</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-3">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-sm font-semibold text-[#1a1d29] mb-1">Agents</h3>
            <p className="text-xs text-gray-600">Client-facing AI trained on your Meetings</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-sm font-semibold text-[#1a1d29] mb-1">Artifacts</h3>
            <p className="text-xs text-gray-600">Auto-generated PRDs & SOPs</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-sm font-semibold text-[#1a1d29] mb-1">Memory</h3>
            <p className="text-xs text-gray-600">Persistent Project Knowledge</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-3">
              <LineChart className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-sm font-semibold text-[#1a1d29] mb-1">Insights</h3>
            <p className="text-xs text-gray-600">Detects if projects are on track</p>
          </div>
        </div>

        {/* Product Screenshot */}
        <div className={`relative mb-8 mx-auto max-w-5xl transition-all duration-800 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
            <Image
              src="/hero-image.png"
              alt="Knowcap AI Platform Interface"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
