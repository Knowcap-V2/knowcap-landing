

'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, DollarSign, Brain, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const threats = [
  {
    icon: DollarSign,
    title: 'Profit Leaks',
    description: 'Without a verifiable record of every decision, undocumented scope creep and unapproved changes silently destroy your project margins.',
    visual: 'Leaking money bag'
  },
  {
    icon: Brain,
    title: 'Knowledge Loss',
    description: 'When an employee leaves, your company\'s institutional memory walks out the door because their knowledge was never captured in a verifiable way.',
    visual: 'Fading brain'
  },
  {
    icon: Clock,
    title: 'Productivity Drain',
    description: 'Your team is trapped in a cycle of repetitive work, wasting hours answering the same client questions while "he said, she said" disputes derail progress.',
    visual: 'Hourglass draining'
  }
]

export default function ProblemSectionGeneral() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-sm font-medium text-muted-foreground">The Real Threat to Your Business</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Your projects aren't failing because of bad people. <br />
            <span className="gradient-text">They're failing because of a broken system without receipts.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {threats.map((threat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:border-red-500/30"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <threat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-red-300">{threat.title}</h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
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
          className="text-center bg-card border border-border rounded-lg p-8"
        >
          <h3 className="text-3xl font-bold mb-4">
            The solution isn't better people. <span className="text-cyan-400">It's a system that creates receipts.</span>
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            Every successful project needs one thing: a verifiable record of what was decided, when, and by whom. 
            Without it, you're building on quicksand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => document.getElementById('governance')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              See How We Create Receipts
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => window.open('https://app.reclaim.ai/m/knowcap-group/knowcapai-demo', '_blank')}
              className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
