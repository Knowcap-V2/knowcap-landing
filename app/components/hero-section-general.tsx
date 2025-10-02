

'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Code, Zap } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { useState, useEffect } from 'react'

export default function HeroSectionGeneral() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToApplication = () => {
    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg">
      {/* Theme Toggle - Fixed position top right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <div className="max-w-[1400px] mx-auto px-2 py-16 text-center relative">
        <div className={`mb-8 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Users className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">AI Context Engine for Teams</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Stop Hoping for the Best. <span className="gradient-text">Start Governing with Proof.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Knowcap.ai is the Context Engineering Platform for professional teams. It transforms your conversations, screen recordings, and documents into a system of record that eliminates knowledge loss, flags risks with timestamped receipts, and ensures every project runs with clarity, accountability, and proof.
          </p>
        </div>

        <div className={`relative mb-8 mx-auto max-w-4xl transition-all duration-800 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* YouTube Video Container */}
          <div className="relative aspect-video rounded-lg overflow-hidden border border-border/20 shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/_B3XMb_LiU4"
              title="Knowcap AI Platform Demo"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <button
            onClick={() => window.open('https://app.reclaim.ai/m/knowcap-group/knowcapai-demo', '_blank')}
            className="absolute -bottom-4 -right-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
          >
            Live Demo
          </button>
        </div>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <Button 
            size="lg"
            onClick={() => window.open('https://app.reclaim.ai/m/knowcap-group/knowcapai-demo', '_blank')}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Book a Quick Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline"
            size="lg"
            onClick={scrollToApplication}
            className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
          >
            Get Started Free
          </Button>
        </div>
        
        {/* Social Proof Bar */}
        <div className={`mt-12 transition-all duration-800 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-sm text-muted-foreground mb-6">Trusted by Leading Professional Teams</p>
          <div className="flex justify-center items-center gap-8 text-muted-foreground">
            <div className="text-sm font-medium bg-muted/30 px-4 py-2 rounded-md">Founders Circle Members</div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">Join Early Elite Partners</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
