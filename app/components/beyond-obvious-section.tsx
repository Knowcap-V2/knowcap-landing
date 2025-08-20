
'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Rocket, Brain, Target, Sparkles } from 'lucide-react'

const creativityFeatures = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Pattern recognition across all your projects to identify what works, what doesn\'t, and what you should try next.'
  },
  {
    icon: Target,
    title: 'Predictive Analytics',
    description: 'Know which projects are at risk before your client does. Anticipate bottlenecks, resource needs, and scope changes.'
  },
  {
    icon: Rocket,
    title: 'Innovation Tracking',
    description: 'Document and replicate your team\'s creative solutions. Turn one-time fixes into reusable competitive advantages.'
  },
  {
    icon: Sparkles,
    title: 'Continuous Optimization',
    description: 'Every project teaches the system something new. Your processes get smarter, not just more documented.'
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
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <span className="text-sm font-medium text-muted-foreground">Beyond the Obvious</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A Platform for <span className="gradient-text">Creativity</span>, <br />
            Not Just <span className="text-muted-foreground">Compliance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Most project management tools are digital paper pushers. 
            Knowcap.ai is different. It's designed to amplify human creativity, 
            not replace it with bureaucracy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {creativityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-yellow-400/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-400/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-yellow-300">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Think of it as <span className="text-yellow-400">your team's collective intelligence</span>, 
            amplified and accessible.
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Every great Odoo implementation starts with creativity. 
            Understanding the client's unique needs. Finding elegant solutions to complex problems. 
            Building something that truly serves their business.
          </p>
          <p className="text-lg">
            Knowcap.ai doesn't manage that creativity out of existence. 
            <span className="text-yellow-400 font-semibold"> It captures it, learns from it, and helps you apply it more effectively.</span>
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground italic">
            "The best project management tool is the one that gets out of your way 
            while quietly making everything better in the background."
          </p>
          <p className="text-cyan-400 font-semibold mt-2">- Hassan, after three years of iteration</p>
        </motion.div>
      </div>
    </section>
  )
}
