'use client'

import { Radio, FileCheck, Search, Paperclip } from 'lucide-react'
import { useState, useEffect } from 'react'

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
      mockup: 'capture'
    },
    {
      icon: Search,
      title: 'Answer with Proof',
      description: 'Ask any question and get an instant answer with a direct link to the exact, verified moment in the recording. No more searching.',
      mockup: 'search'
    },
    {
      icon: FileCheck,
      title: 'Audit Any Deliverable',
      description: 'All generated PRDs, SOPs, and guides include timestamp citations and embedded clips, so every deliverable can be trusted, verified, and governed.',
      mockup: 'audit'
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
                    {feature.mockup === 'search' && (
                      <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-8 border border-purple-500/20">
                        <div className="bg-white rounded-xl p-6">
                          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                            <Paperclip className="w-5 h-5 text-gray-400" />
                            <input 
                              type="text" 
                              placeholder="Ask about decisions, topics, tasks, or visuals..."
                              className="flex-1 text-sm text-gray-600 bg-transparent outline-none"
                              disabled
                            />
                            <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                              Search
                            </button>
                          </div>
                          <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="text-sm font-medium text-gray-900 mb-1">Found in Meeting #247</div>
                              <div className="text-xs text-gray-600">Timestamp: 12:34 - "We decided to use..."</div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
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
                    {feature.mockup === 'audit' && (
                      <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-2xl p-8 border border-green-500/20">
                        <div className="bg-white rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                              <FileCheck className="w-5 h-5 text-green-600" />
                              <span className="font-semibold text-gray-900">Product Requirements Doc</span>
                            </div>
                            <span className="text-xs text-gray-500">Verified</span>
                          </div>
                          <div className="space-y-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm font-medium text-gray-900 mb-2">Feature: User Authentication</div>
                              <div className="flex items-center gap-2 text-xs text-blue-600">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <span>Source: Meeting #247 @ 12:34</span>
                              </div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm font-medium text-gray-900 mb-2">Timeline: Q1 2024</div>
                              <div className="flex items-center gap-2 text-xs text-blue-600">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <span>Source: Planning Session @ 45:12</span>
                              </div>
                            </div>
                          </div>
                        </div>
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
