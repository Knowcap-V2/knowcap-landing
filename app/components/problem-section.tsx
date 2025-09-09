
'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Eye, MessageSquare, Clock, FileText, Settings, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const crises = [
  {
    icon: Eye,
    title: 'The Visibility Gap',
    description: 'You have no idea what your team is actually doing on client projects until it\'s too late. Tasks disappear into black holes, progress reports are fiction, and you find out about problems when clients complain.',
    impact: 'Result: Constant firefighting, blown budgets, damaged relationships.'
  },
  {
    icon: MessageSquare,
    title: 'The Support Drain',
    description: 'Your developers are drowning in client questions about basic Odoo functionality. Instead of building custom solutions, they\'re explaining how to create a purchase order for the hundredth time.',
    impact: 'Result: Billable hours wasted, developer frustration, client dissatisfaction.'
  },
  {
    icon: Clock,
    title: 'The Turnover Time Bomb',
    description: 'When a developer leaves, they take all the project knowledge with them. You\'re left scrambling to figure out what they built, how it works, and why the client is suddenly calling with issues.',
    impact: 'Result: Project delays, knowledge loss, expensive re-work.'
  },
  {
    icon: FileText,
    title: 'The SOP Creation Bottleneck',
    description: 'You know you need Standard Operating Procedures for client projects, but who has time to write them? Meanwhile, every project is a unique snowflake of chaos, and you can\'t scale your business.',
    impact: 'Result: Inconsistent delivery, quality issues, team confusion.'
  },
  {
    icon: Settings,
    title: 'The Customization Trap',
    description: 'Every client wants "just a small customization." But small changes compound into maintenance nightmares. You\'re stuck maintaining dozens of one-off modifications with zero documentation.',
    impact: 'Result: Technical debt, upgrade headaches, trapped revenue.'
  }
]

export default function ProblemSection() {
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
            The Five Crises of <span className="gradient-text">Every Odoo Project</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sound familiar? If you're nodding along, you're not alone. 
            Every Odoo Partner faces these same challenges. The question is: what are you going to do about it?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {crises.map((crisis, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-cyan-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-lg flex items-center justify-center">
                    <crisis.icon className="w-6 h-6 text-black dark:text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{crisis.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{crisis.description}</p>
                  <p className="text-sm text-black dark:text-white font-medium italic">{crisis.impact}</p>
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
          className="text-center bg-card border border-border rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-4">
            Here's the thing: <span className="text-cyan-400">These aren't Odoo problems.</span>
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            They're project management problems that happen to involve Odoo. 
            And that's exactly why I built Knowcap.ai. Not another Odoo module. 
            A complete project management platform designed specifically for how Odoo Partners actually work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              End the Chaos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              See How We Solve This
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
