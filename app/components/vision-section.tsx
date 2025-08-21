
'use client'

import { motion } from 'framer-motion'
import { Eye, Shield, BookOpen, Zap, Users } from 'lucide-react'

const solutions = [
  {
    icon: Eye,
    problem: 'You can\'t see if consultants are following your methodology.',
    magicPrompt: 'Based on our Odoo implementation guidelines, analyze the last five meetings for Project X and flag any deviations from our standard procedure.',
    system: 'Knowcap Intelligence'
  },
  {
    icon: Users,
    problem: 'Your team wastes hours answering the same client questions.',
    magicPrompt: 'Show the client the exact training moment on how to do multi-currency vendor bill creation.',
    system: 'Knowcap Agent'
  },
  {
    icon: BookOpen,
    problem: 'Creating training guides from screen recordings is a manual nightmare.',
    magicPrompt: 'Generate a visual, step-by-step guide from the warehouse automation training video.',
    system: 'Knowcap Artifacts'
  },
  {
    icon: Shield,
    problem: 'A key consultant or client stakeholder leaves mid-project.',
    magicPrompt: 'The client\'s finance manager has left. Prepare an onboarding dashboard with timestamps of all key decisions.',
    system: 'Knowcap Memory'
  },
  {
    icon: Zap,
    problem: 'You\'re not sure if a requirement needs custom development or just configuration.',
    magicPrompt: 'Based on the client\'s meeting and Odoo 17 Documentation, tell me what can be done with standard features vs. what needs custom development.',
    system: 'Knowcap Assets'
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
            <span className="text-sm font-medium text-muted-foreground">The Vision</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A New Standard for <span className="gradient-text">Odoo Delivery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Imagine a World Where Every Odoo Project is Delivered Flawlessly.
          </p>
        </motion.div>

        <div className="space-y-8">
          {solutions.map((solution, index) => (
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
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-red-400 mb-2">Problem:</h4>
                    <p className="text-muted-foreground text-lg">{solution.problem}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 border-l-4 border-cyan-400 mb-4">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Magic Prompt:</h4>
                    <p className="text-cyan-100 italic">"{solution.magicPrompt}"</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-cyan-400">({solution.system})</span>
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
            These aren't just features - they're your daily AI assistants. 
            Built into every workflow, every client interaction, every project decision in Knowcap.ai. 
            Because when you can simply ask for what you need, magic happens.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
