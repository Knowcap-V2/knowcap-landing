
'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react'

const intelligenceFeatures = [
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'Spot projects at risk early — every prediction is linked to its warning signs.'
  },
  {
    icon: Users,
    title: 'Best Practice Discovery',
    description: 'Identify the habits of top performers — each tied to the exact conversations that drove results.'
  },
  {
    icon: DollarSign,
    title: 'Profitability Insights',
    description: 'Pinpoint which clients drain resources — with a verifiable history of interactions.'
  }
]

export default function BeyondObviousSection() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Target className="w-5 h-5 text-[#005EFF]" />
            <span className="section-subheading">Beyond Control → Verifiable Intelligence</span>
          </div>
          <h2 className="section-heading mb-6">
            Control is the foundation. Intelligence is the payoff.
          </h2>
          <p className="hero-subheading max-w-3xl mx-auto">
            Because every insight is backed by receipts, you can act with confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {intelligenceFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-[#F5F5F5] rounded-xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#191F2E]">{feature.title}</h3>
                <p className="body-text">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[#E6F2FF] rounded-xl p-10 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4 text-[#191F2E]">
            Knowcap doesn't just help you control projects.
          </h3>
          <p className="hero-subheading text-[#414651]">
            It helps you build a smarter, more profitable team.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
