

'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Clock, DollarSign, Users, MessageSquare } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    title: 'Time Hemorrhage',
    description: 'Your team spends 40% of their time answering the same client questions repeatedly instead of delivering value.',
    impact: '16 hours per week per consultant'
  },
  {
    icon: MessageSquare,
    title: 'Knowledge Scatter',
    description: 'Critical project insights are trapped in meetings, emails, and documents that nobody can find when needed.',
    impact: '3-5 hours per critical decision'
  },
  {
    icon: Users,
    title: 'Client Frustration',
    description: 'Clients get inconsistent answers from different team members, eroding trust and requiring constant clarification.',
    impact: '23% higher churn risk'
  },
  {
    icon: DollarSign,
    title: 'Revenue Leaks',
    description: 'Scope creep and missed requirements happen because project context gets lost in the communication maze.',
    impact: '15-30% margin erosion'
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
            Your Expertise is Being <span className="text-red-400">Wasted</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every day, valuable knowledge and insights disappear into the communication void. 
            Your team's expertise becomes inaccessible the moment a meeting ends.
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
            The Hidden Cost: $47,000+ per consultant per year
          </h3>
          <p className="text-lg text-muted-foreground">
            Based on industry research on knowledge work inefficiencies in professional services firms.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

