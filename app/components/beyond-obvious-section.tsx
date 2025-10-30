
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
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Target className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Beyond Control → Verifiable Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a1d29]">
            Control is the foundation. Intelligence is the payoff.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Because every insight is backed by receipts, you can act with confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {intelligenceFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#1a1d29] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1a1d29]">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-[#1a1d29]">
            Knowcap doesn't just help you control projects.
          </h3>
          <p className="text-xl text-gray-600">
            It helps you build a smarter, more profitable team.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
