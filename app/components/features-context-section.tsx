'use client'

import { Video, MessageSquare, FileCheck } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FeaturesContextSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative py-24 bg-[#0A0F1E] overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#005EFF]/5 to-transparent"></div>
      
      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#00C48C] mb-4 uppercase tracking-wider">Features</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See Your Work Come Alive in Context
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Capture & Watch */}
          <div className={`bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#005EFF]/50 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Mock interface */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 mb-6 min-h-[240px] flex flex-col">
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <span>Ask about decisions, topics, tasks, or...</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="p-2 bg-white rounded-lg shadow-sm">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                </button>
                <button className="p-2 bg-white rounded-lg shadow-sm">
                  <div className="w-16 h-4 bg-gray-300 rounded"></div>
                </button>
              </div>
            </div>
            
            {/* Icon & Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#005EFF] flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Capture & Watch</h3>
            </div>
            
            <p className="text-[#B8C5D6]">
              Every meeting and screen session is automatically recorded with timestamps. Never lose context or critical decisions.
            </p>
          </div>

          {/* Card 2: Answer with Proof */}
          <div className={`bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#00C48C]/50 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '100ms' }}>
            {/* Mock interface */}
            <div className="bg-[#0A0F1E] rounded-xl p-6 mb-6 min-h-[240px] flex flex-col justify-center items-center text-center border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00C48C] to-[#00A875] flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Smart Agents</h4>
              <p className="text-[#B8C5D6] text-sm">
                Invite clients to chat with an AI trained on their project. Every answer links back to a verified moment on screen.
              </p>
            </div>
            
            {/* Icon & Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#00C48C] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Answer with Proof</h3>
            </div>
            
            <p className="text-[#B8C5D6]">
              Client-facing AI agents trained on your meetings provide instant answers backed by timestamp receipts.
            </p>
          </div>

          {/* Card 3: Audit Any Deliverable */}
          <div className={`bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#9747FF]/50 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            {/* Mock interface */}
            <div className="bg-gradient-to-br from-pink-100 to-purple-50 rounded-xl p-6 mb-6 min-h-[240px] flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-200 rounded flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                </div>
                <div className="flex-1 bg-white/50 rounded h-3"></div>
              </div>
              <div className="space-y-2 flex-1">
                <div className="bg-white/70 rounded h-2 w-3/4"></div>
                <div className="bg-white/70 rounded h-2 w-full"></div>
                <div className="bg-white/70 rounded h-2 w-2/3"></div>
              </div>
              <div className="mt-auto pt-4">
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-green-200 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  </div>
                  <div className="w-6 h-6 bg-yellow-200 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Icon & Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#9747FF] flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Audit Any Deliverable</h3>
            </div>
            
            <p className="text-[#B8C5D6]">
              Every PRD, SOP, and artifact is backed by verified knowledge. Trace any claim back to the exact moment it was discussed.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
