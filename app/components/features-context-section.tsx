'use client'

import { MessageSquare, Database, Link2, Check } from 'lucide-react'
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
          <p className="text-sm font-semibold text-[#005EFF] mb-4 uppercase tracking-wider">// Features</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#191F2E] mb-6">
            Designed for How You Actually Work
          </h2>
        </div>

        {/* Feature Rows */}
        <div className="space-y-20">
          {/* Feature 1: Smart Agents */}
          <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border-2 border-[#D5D7DA] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-[#535862]" />
                </div>
                <h3 className="text-2xl font-bold text-[#191F2E]">Smart Agents</h3>
              </div>
              <p className="text-[#535862] mb-6">
                Ask, summarize, and act instantly — your AI teammate.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#005EFF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#535862]">Summarizes, drafts, and executes tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#005EFF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#535862]">Automates repetitive workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#005EFF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#535862]">Learns from your style and preferences</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 min-h-[300px] card-shadow">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-sm text-[#535862]">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <span>Ask about decisions, topics, tasks, or visual</span>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  </div>
                  <div className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-[#535862]">Search</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Unified Memory */}
          <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '100ms' }}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border-2 border-[#D5D7DA] flex items-center justify-center">
                  <Database className="w-5 h-5 text-[#535862]" />
                </div>
                <h3 className="text-2xl font-bold text-[#191F2E]">Unified Memory</h3>
              </div>
              <p className="text-[#535862] mb-6">
                One source of truth for meetings, files, and insights.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#005EFF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#535862]">Centralized storage for notes, transcripts, and docs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#005EFF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#535862]">Retrieve insights across sessions effortlessly</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#005EFF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#535862]">Maintains evolving project context automatically</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl p-8 min-h-[300px] card-shadow">
              <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#191F2E]">Chat history</div>
                    <div className="text-xs text-[#535862]">View where you've worked on your profile</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-xs text-[#535862]">Last edited</div>
                      <div className="text-sm font-medium text-[#191F2E]">2h ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Context Aware */}
          <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border-2 border-[#D5D7DA] flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-[#535862]" />
                </div>
                <h3 className="text-2xl font-bold text-[#191F2E]">Context Aware</h3>
              </div>
              <p className="text-[#535862] mb-6">
                Every insight links back to its origin — the transcript or artifact.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#005EFF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#535862]">Recognizes the origin of every insight</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#005EFF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#535862]">Adapts suggestions to current tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#005EFF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#535862]">Connects related notes, links, and artifacts</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-50 rounded-2xl p-8 min-h-[300px] card-shadow">
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                  </div>
                  <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                  <div className="flex gap-2">
                    <div className="w-5 h-5 bg-gray-100 rounded"></div>
                    <div className="w-5 h-5 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-5 h-5 bg-gray-100 rounded"></div>
                    <div className="w-5 h-5 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                  </div>
                  <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                  <div className="flex gap-2">
                    <div className="w-5 h-5 bg-gray-100 rounded"></div>
                    <div className="w-5 h-5 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
