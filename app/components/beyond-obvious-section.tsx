
'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Target, Shield } from 'lucide-react'

const intelligenceFeatures = [
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'Know which projects are at risk of failure before your client does by identifying patterns in communication and deliverables.'
  },
  {
    icon: Users,
    title: 'Best Practice Discovery',
    description: 'Automatically identify the habits and processes of your top-performing consultants so you can replicate their success across the entire team.'
  },
  {
    icon: DollarSign,
    title: 'Profitability Insights',
    description: 'Pinpoint which types of clients, projects, or tasks consistently drain the most resources, allowing you to optimize your business model for profitability.'
  }
]

export default function BeyondObviousSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Target className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">The Path to True Project Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Control is the Foundation. <span className="gradient-text">Intelligence</span> is the Payoff.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting your projects under control is the first step. But the real goal is to make them smarter. Once Knowcap is governing your projects, it becomes your single source of truth—allowing our AI to unlock insights you've never had before:
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
              className="bg-card border border-border rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-cyan-500/30"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-cyan-300">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            <span className="text-cyan-400">Knowcap doesn't just help you manage projects. </span>
            It helps you build a smarter, more profitable business.
          </h3>
        </motion.div>
      </div>
    </section>
  )
}
