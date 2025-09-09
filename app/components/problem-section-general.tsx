

'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Eye, MessageSquare, Clock, FileText, Settings } from 'lucide-react'

const crises = [
  {
    icon: Eye,
    title: 'The Visibility Gap',
    description: 'You have no idea what your team is actually doing on projects until it\'s too late. Tasks disappear into black holes, progress reports are fiction, and you find out about problems when stakeholders complain.',
    impact: 'Result: Constant firefighting, blown budgets, damaged relationships.'
  },
  {
    icon: MessageSquare,
    title: 'The Communication Drain',
    description: 'Your team is drowning in endless meetings, status updates, and clarification requests. Instead of executing on deliverables, they\'re explaining progress and answering the same questions repeatedly.',
    impact: 'Result: Lost productivity, team frustration, stakeholder dissatisfaction.'
  },
  {
    icon: Clock,
    title: 'The Knowledge Time Bomb',
    description: 'When a key team member leaves, they take all the project knowledge with them. You\'re left scrambling to figure out what they built, how processes work, and why systems are suddenly failing.',
    impact: 'Result: Project delays, knowledge loss, expensive re-work.'
  },
  {
    icon: FileText,
    title: 'The Process Documentation Gap',
    description: 'You know you need Standard Operating Procedures for your projects, but who has time to document them? Meanwhile, every project is a unique approach, and you can\'t scale your operations.',
    impact: 'Result: Inconsistent delivery, quality issues, team confusion.'
  },
  {
    icon: Settings,
    title: 'The Tool Integration Trap',
    description: 'Every project uses different tools and workflows. Your team juggles multiple platforms, and nothing talks to each other. Data lives in silos, and reporting is a nightmare.',
    impact: 'Result: Inefficiency, data loss, reporting headaches.'
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
            <span className="text-sm font-medium text-muted-foreground">The Reality Check</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Five Crises of <span className="gradient-text text-black dark:text-white">Every Project</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sound familiar? You're not alone. These are the exact problems that keep project managers awake at night.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {crises.map((crisis, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <crisis.icon className="w-6 h-6 text-black dark:text-white" />
                <h3 className="text-xl font-bold text-black dark:text-white">{crisis.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {crisis.description}
              </p>
              <p className="text-sm font-medium text-black dark:text-white">
                {crisis.impact}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground">
            <span className="font-semibold text-black dark:text-white">Here's the truth:</span> These aren't just inconveniences. 
            They're the difference between thriving and barely surviving in project management.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
