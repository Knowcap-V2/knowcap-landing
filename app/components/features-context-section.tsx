
'use client'

import { Radio, FileCheck, Search } from 'lucide-react'
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
      image: '/feature-capture.png',
      borderColor: 'blue-500'
    },
    {
      icon: Search,
      title: 'Answer with Proof',
      description: 'Ask any question and get an instant answer with a direct link to the exact, verified moment in the recording. No more searching.',
      image: '/feature-search-new.png',
      borderColor: 'purple-500'
    },
    {
      icon: FileCheck,
      title: 'Audit Any Deliverable',
      description: 'All generated PRDs, SOPs, and guides include timestamp citations and embedded clips, so every deliverable can be trusted, verified, and governed.',
      image: '/feature-audit-new.png',
      borderColor: 'green-500'
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
                    <div className={`relative rounded-2xl overflow-hidden shadow-2xl border border-${feature.borderColor}/20`}>
                      <Image
                        src={feature.image}
                        alt={`${feature.title} Interface`}
                        width={1312}
                        height={736}
                        className="w-full h-auto"
                      />
                    </div>
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
                    <div className={`relative rounded-2xl overflow-hidden shadow-2xl border border-${feature.borderColor}/20`}>
                      <Image
                        src={feature.image}
                        alt={`${feature.title} Interface`}
                        width={1312}
                        height={736}
                        className="w-full h-auto"
                      />
                    </div>
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

