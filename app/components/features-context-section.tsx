'use client'

import { MessageSquare, Database, Link2, Check, Radio, FileCheck, Search } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FeaturesContextSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#191F2E] mb-6">
            Run Projects on Proof, Not Just Memory.
          </h2>
          <p className="text-lg text-[#535862] max-w-4xl mx-auto">
            Knowcap transforms meetings and screen sessions into verified project knowledge, linking every insight to its source so you can validate, audit, and share with timestamped proof.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Capture with Context */}
          <div className={`bg-[#F5F5F5] rounded-xl p-8 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-[#191F2E] mb-4">
              Capture with Context
            </h3>
            <p className="text-[#535862]">
              Send Knowcap to any meeting or screen session. It listens, watches, and understands, automatically linking every spoken word and on-screen action to its source.
            </p>
          </div>

          {/* Card 2: Answer with Proof */}
          <div className={`bg-[#F5F5F5] rounded-xl p-8 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '100ms' }}>
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-[#191F2E] mb-4">
              Answer with Proof
            </h3>
            <p className="text-[#535862]">
              Ask any question and get an instant answer with a direct link to the exact, verified moment in the recording. No more searching.
            </p>
          </div>

          {/* Card 3: Audit Any Deliverable */}
          <div className={`bg-[#F5F5F5] rounded-xl p-8 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-[#191F2E] mb-4">
              Audit Any Deliverable
            </h3>
            <p className="text-[#535862]">
              All generated PRDs, SOPs, and guides include timestamp citations and embedded clips, so every deliverable can be trusted, verified, and governed.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
