'use client'

import { Radio, FileCheck, Search, Paperclip } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function FeaturesContextSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Radio,
      title: 'Capture with Context',
      description: 'Send Knowcap to any meeting or screen session. It listens, watches, and understands, automatically linking every spoken word and on-screen action to its source.',
      mockup: 'capture',
      image: null
    },
    {
      icon: Search,
      title: 'Answer with Proof',
      description: 'Ask any question and get an instant answer with a direct link to the exact, verified moment in the recording. No more searching.',
      mockup: 'search',
      image: '/feature-search.png'
    },
    {
      icon: FileCheck,
      title: 'Audit Any Deliverable',
      description: 'All generated PRDs, SOPs, and guides include timestamp citations and embedded clips, so every deliverable can be trusted, verified, and governed.',
      mockup: 'audit',
      image: '/feature-audit.png'
    }
  ]

  return (
    <section className="relative py-24 bg-[#0A0E1A] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#005EFF]/5 to-transparent"></div>
      
      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-[#005EFF] mb-4 uppercase tracking-wider">// Features</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Run Projects on Proof, Not Just Memory.
          </h2>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto">
            Knowcap transforms meetings and screen sessions into verified project knowledge, linking every insight to its source so you can validate, audit, and share with timestamped proof.
          </p>
        </div>

        {/* Feature Sections */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Mockup on Left (odd rows) or Right (even rows) */}
              {index % 2 === 0 ? (
                <>
                  {/* Mockup */}
                  <div className="relative">
                    {feature.mockup === 'capture' && (
                      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-8 border border-blue-500/20">
                        <div className="bg-[#1A1F2E] rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="bg-[#0A0E1A] rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-3 text-gray-400 text-sm mb-3">
                              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                              <span>Recording in progress...</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full w-1/3 bg-blue-500 rounded-full"></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-800 rounded w-full"></div>
                            <div className="h-3 bg-gray-800 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {feature.mockup === 'search' && feature.image && (
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20">
                        <Image
                          src={feature.image}
                          alt="Answer with Proof Interface"
                          width={1312}
                          height={736}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Mockup */}
                  <div className="relative">
                    {feature.mockup === 'audit' && feature.image && (
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-green-500/20">
                        <Image
                          src={feature.image}
                          alt="Audit Any Deliverable Interface"
                          width={1312}
                          height={736}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
