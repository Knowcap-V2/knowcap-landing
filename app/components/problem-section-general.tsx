
'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, DollarSign, Brain, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const threats = [
  {
    icon: DollarSign,
    title: 'Profit Leaks',
    description: 'Without verifiable receipts of every decision, scope creep and undocumented changes silently destroy project margins.',
    visual: 'Leaking money bag'
  },
  {
    icon: Brain,
    title: 'Knowledge Loss',
    description: 'When employees leave, your team\'s memory leaves with them — because insights were never captured in a persistent, verifiable way.',
    visual: 'Fading brain'
  },
  {
    icon: Clock,
    title: 'Productivity Drain',
    description: 'Your team wastes hours re-answering the same client questions while disputes over "who said what" derail progress.',
    visual: 'Hourglass draining'
  }
]

export default function ProblemSectionGeneral() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span className="text-sm font-medium text-gray-600">The Real Threat to Your Business</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#1a1d29]">
            Your projects don't fail because of bad people.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            They fail because knowledge gets lost, proof is missing, and context disappears.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {threats.map((threat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:border-red-300"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <threat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-red-600">{threat.title}</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {threat.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-white border border-gray-200 rounded-lg p-8"
        >
          <h3 className="text-3xl font-bold mb-4 text-[#1a1d29]">
            The solution isn't better people. It's a system that captures receipts.
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Every successful project needs one thing: a verifiable record of what was decided, when, and by whom. 
            Without it, you're building on quicksand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => document.getElementById('governance')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#1a1d29] hover:bg-[#2a2d39] text-white font-medium px-8 py-6 rounded-lg transition-all duration-300 text-base"
            >
              See How We Create Receipts
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/book'}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8 py-6 rounded-lg transition-all duration-300 text-base"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
