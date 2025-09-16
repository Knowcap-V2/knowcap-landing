

'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Clock, DollarSign, Users, MessageSquare } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    title: 'Endless Odoo Support Questions',
    description: 'Your team spends countless hours explaining the same Odoo workflows, configurations, and business processes to clients.',
    impact: '20+ hours per week per consultant'
  },
  {
    icon: MessageSquare,
    title: 'Implementation Knowledge Loss',
    description: 'Critical Odoo customizations, configurations, and decisions get lost between meetings and team handoffs.',
    impact: '5-8 hours per requirements gap'
  },
  {
    icon: Users,
    title: 'Client Training Nightmares',
    description: 'Creating Odoo training materials from scratch for every client while maintaining consistency across your team.',
    impact: '40+ hours per training cycle'
  },
  {
    icon: DollarSign,
    title: 'Scope Creep & Margin Erosion',
    description: 'Odoo requirements grow unchecked because previous discussions and decisions aren\'t easily accessible.',
    impact: '20-40% margin loss per project'
  }
]

export default function BetaProblemSection() {
  return (
    <section id="beta-problem" className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <span className="text-sm font-medium text-muted-foreground">The Reality</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Odoo Expertise is Being <span className="text-red-400">Wasted</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every Odoo implementation contains valuable business logic, customizations, and decisions. 
            But this expertise becomes inaccessible the moment a project meeting ends.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                  <p className="text-muted-foreground mb-3">{problem.description}</p>
                  <div className="text-sm font-medium text-red-400 bg-red-950/20 px-3 py-1 rounded-full inline-block">
                    Cost: {problem.impact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12 bg-card border border-red-200/20 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-4 text-red-400">
            The Hidden Cost: $60,000+ per Odoo consultant per year
          </h3>
          <p className="text-lg text-muted-foreground">
            Based on research across 100+ Odoo partner firms on implementation inefficiencies and knowledge loss.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

