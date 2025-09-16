

'use client'

import { motion } from 'framer-motion'
import { Brain, MessageCircle, FileText, Shield, Zap, Eye } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Meeting Intelligence',
    description: 'Automatically capture, analyze, and structure insights from every client interaction.',
    benefits: ['Real-time transcription', 'Action item extraction', 'Decision tracking']
  },
  {
    icon: MessageCircle,
    title: 'Instant AI Agents',
    description: 'Create intelligent agents that can answer client questions using your project knowledge.',
    benefits: ['24/7 client support', 'Consistent responses', 'Shareable links']
  },
  {
    icon: FileText,
    title: 'Smart Artifacts',
    description: 'Generate training guides, documentation, and project materials automatically.',
    benefits: ['Visual step-by-step guides', 'Video-to-text conversion', 'Timestamp references']
  },
  {
    icon: Shield,
    title: 'Knowledge Governance',
    description: 'Ensure methodology compliance and maintain institutional knowledge.',
    benefits: ['Process adherence tracking', 'Methodology enforcement', 'Quality assurance']
  },
  {
    icon: Eye,
    title: 'Project Analytics',
    description: 'Get deep insights into project performance, team dynamics, and client satisfaction.',
    benefits: ['Performance dashboards', 'Risk identification', 'Predictive insights']
  },
  {
    icon: Zap,
    title: 'Instant Context',
    description: 'Access any project information instantly with natural language queries.',
    benefits: ['Magic prompt interface', 'Cross-project insights', 'Historical analysis']
  }
]

export default function BetaFeaturesSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">The Solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Knowledge, <span className="gradient-text">Amplified by AI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform scattered conversations into intelligent systems that work for your business 24/7.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-cyan-500/30"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

