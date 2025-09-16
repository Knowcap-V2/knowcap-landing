

'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Users, Zap, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-toggle'
import { useState, useEffect } from 'react'

export default function BetaHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const slides = [
    {
      src: '/dashboard1.png',
      alt: 'AI-powered meeting management with sources and studio workspace',
      title: 'AI-Powered Meeting Intelligence'
    },
    {
      src: '/dashboard2.png', 
      alt: 'Project Leader Performance Dashboard showing Hassan Sam Arslan metrics',
      title: 'Expert-Level Performance Analytics'
    },
    {
      src: '/dashboard3.png',
      alt: 'Comprehensive project analysis with detailed breakdowns and assessments',
      title: 'Deep Project Analysis & Insights'
    }
  ]

  const scrollToNextSection = () => {
    document.getElementById('beta-problem')?.scrollIntoView({ behavior: 'smooth' })
  }

  const joinBeta = () => {
    document.getElementById('beta-cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Manual navigation only - no auto-advance

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
            <span className="text-sm font-medium text-muted-foreground bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20">Odoo Partners Beta Program</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            The AI-Powered Operating System for <span className="gradient-text">Odoo Partners</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Stop losing revenue to scope creep, client confusion, and endless support questions. 
            Knowcap transforms your Odoo implementations into intelligent systems that scale your expertise.
          </p>
        </div>

        <div className={`relative mb-4 mx-0 sm:mx-1 transition-all duration-800 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Carousel Container with External Navigation */}
          <div className="relative flex items-center justify-center gap-2">
            {/* Left Navigation Arrow */}
            <button
              onClick={prevSlide}
              className="bg-background/90 backdrop-blur-sm border border-border/50 hover:bg-accent/50 rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl z-10 flex-shrink-0"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Image Container */}
            <div className="relative border border-border/10 rounded-sm overflow-hidden flex-1 max-w-none">
              <div className="relative aspect-[18/10] overflow-hidden">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Navigation Arrow */}
            <button
              onClick={nextSlide}
              className="bg-background/90 backdrop-blur-sm border border-border/50 hover:bg-accent/50 rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl z-10 flex-shrink-0"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Slide Indicators - Outside the image container */}
          <div className="flex justify-center gap-1.5 mt-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-primary' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Slide Title - Outside the image container */}
          <div className="text-center mt-0.5">
            <p className="text-xs font-medium text-muted-foreground">
              {slides[currentSlide].title}
            </p>
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <Button 
            size="lg" 
            onClick={joinBeta}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Join Beta Program
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline"
            size="lg"
            onClick={() => window.open('https://app.reclaim.ai/m/knowcap-group/knowcapai-demo', '_blank')}
            className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
          >
            Book Demo
          </Button>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Limited Beta Spots</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Free During Beta</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Odoo Partners Only</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToNextSection}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

