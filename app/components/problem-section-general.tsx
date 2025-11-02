
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
    <section className="py-20 md:py-24 bg-[#F5F5F5]">
      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="section-subheading">The Real Threat to Your Business</span>
          </div>
          <h2 className="section-heading mb-6">
            Your projects don't fail because of bad people.
          </h2>
          <p className="hero-subheading max-w-3xl mx-auto">
            They fail because knowledge gets lost, proof is missing, and context disappears.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {threats.map((threat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-xl p-8 text-center card-shadow hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <threat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-red-600">{threat.title}</h3>
              </div>
              <p className="body-text">
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
          className="text-center bg-white rounded-xl p-10 card-shadow"
        >
          <h3 className="text-3xl font-semibold mb-4 text-[#191F2E]">
            The solution isn't better people. It's a system that captures receipts.
          </h3>
          <p className="body-text mb-8 max-w-3xl mx-auto">
            Every successful project needs one thing: a verifiable record of what was decided, when, and by whom. 
            Without it, you're building on quicksand.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => document.getElementById('governance')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How We Create Receipts
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/book'}
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
