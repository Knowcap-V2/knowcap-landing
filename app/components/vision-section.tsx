
'use client'

import { motion } from 'framer-motion'
import { Eye, Shield, BookOpen, Zap, Users } from 'lucide-react'

const pillars = [
  {
    icon: Eye,
    title: 'Radical Transparency',
    description: 'Every task, every hour, every decision is visible in real-time. No more wondering what your team is doing or where projects stand.',
    benefit: 'Know exactly where you stand, always.'
  },
  {
    icon: Shield,
    title: 'Proactive Problem Prevention', 
    description: 'AI-powered alerts catch issues before they become crises. Budget overruns, timeline risks, scope creep - we see it coming.',
    benefit: 'Stop fighting fires. Start preventing them.'
  },
  {
    icon: BookOpen,
    title: 'Institutional Memory',
    description: 'Every decision, every solution, every lesson learned is captured and searchable. When team members leave, their knowledge stays.',
    benefit: 'Build a learning organization, not a dependency on individuals.'
  },
  {
    icon: Zap,
    title: 'Systematic Excellence',
    description: 'Turn your best practices into repeatable systems. Every project benefits from the lessons of the last.',
    benefit: 'Scale quality, not just quantity.'
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'Give clients the visibility and tools they need to be true partners in their success, not just spectators.',
    benefit: 'Transform relationships from transactional to transformational.'
  }
]

export default function VisionSection() {
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
            <Eye className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">The Solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Five Pillars of <span className="gradient-text">Odoo Project Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every crisis has a solution. Every problem has a system. 
            Here's how we transform the chaos into clarity.
          </p>
        </motion.div>

        <div className="space-y-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-8 hover:shadow-xl transition-all duration-300 hover:border-cyan-500/30"
            >
              <div className={`flex flex-col lg:flex-row items-start gap-6 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-cyan-300">{pillar.title}</h3>
                  <p className="text-muted-foreground mb-4 text-lg leading-relaxed">{pillar.description}</p>
                  <div className="bg-secondary/50 rounded-lg p-4 border-l-4 border-cyan-400">
                    <p className="text-cyan-300 font-semibold">{pillar.benefit}</p>
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 bg-card border border-border rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-4">
            This isn't theory. <span className="text-cyan-400">This is how we actually work.</span>
          </h3>
          <p className="text-lg text-muted-foreground">
            These five pillars aren't aspirational - they're operational. 
            They're built into every feature, every workflow, every interaction in Knowcap.ai. 
            Because they're not just good ideas. They're survival strategies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
