
'use client'

import { Upload, Database, FileCheck, MessageSquare, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function HowItWorksSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const steps = [
    {
      number: 1,
      icon: Upload,
      headline: 'Ingest Every Project Asset',
      subtext: 'Connect Knowcap to your project. Upload PDFs, link websites, add YouTube videos, record your screen, or send a bot to your meetings. Every asset is ingested as a verifiable source.',
      color: 'blue'
    },
    {
      number: 2,
      icon: Database,
      headline: 'Build Your Project Memory',
      subtext: 'Knowcap automatically interlinks *all* these sources. Meetings, documents, videos, and workflows are connected into a persistent, searchable memory, with decisions cross-referenced instantly.',
      color: 'purple'
    },
    {
      number: 3,
      icon: FileCheck,
      headline: 'Generate & Govern with Proof',
      subtext: 'Instantly create any project document—from critical contracts, quotations, and SOPs to in-depth technical PRDs and gap analyses—all backed by your verifiable project memory.',
      color: 'green'
    },
    {
      number: 4,
      icon: MessageSquare,
      headline: 'Ask & Share Instantly',
      subtext: 'Spin up client-facing Smart Agents trained on your complete project memory. Every answer comes backed by the exact clip, doc, or website source.',
      color: 'orange'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'bg-blue-500',
        text: 'text-blue-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'bg-purple-500',
        text: 'text-purple-600'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'bg-green-500',
        text: 'text-green-600'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: 'bg-orange-500',
        text: 'text-orange-600'
      }
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#191F2E] mb-6">
            How Knowcap Works
          </h2>
          <p className="text-lg text-[#535862] max-w-3xl mx-auto">
            From capture to proof. A simple loop that turns all your project assets into a single, verifiable memory.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 max-w-5xl mx-auto mb-16">
          {steps.map((step, index) => {
            const colors = getColorClasses(step.color)
            return (
              <div
                key={step.number}
                className={`transition-all duration-800 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`relative ${colors.bg} ${colors.border} border-2 rounded-2xl p-8`}>
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#191F2E] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.number}
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Icon */}
                    <div className={`${colors.icon} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#191F2E] mb-3">
                        {step.number}. {step.headline}
                      </h3>
                      <p className="text-[#535862] text-lg leading-relaxed">
                        {step.subtext}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Arrow (except for last step) */}
                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-[#535862] rotate-90" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Micro CTA */}
        <div className={`text-center transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
          <p className="text-lg text-[#535862] mb-6">
            See the loop in action
          </p>
          <Button 
            size="lg" 
            className="bg-[#005EFF] hover:bg-[#0052CC] text-white text-lg px-8 py-6 rounded-lg btn-shadow"
          >
            Book a Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
