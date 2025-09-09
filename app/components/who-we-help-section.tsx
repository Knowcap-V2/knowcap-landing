
'use client'

import { motion } from 'framer-motion'
import { Users, Scale, Code, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const solutions = [
  {
    icon: Scale,
    title: 'Law Firms',
    description: 'Governance for high-stakes legal projects where every conversation matters.',
    challenges: ['Client communication trails', 'Billing documentation', 'Compliance requirements'],
    cta: 'Learn More'
  },
  {
    icon: Code,
    title: 'Software Agencies',
    description: 'Verifiable project control for custom development and client deliverables.',
    challenges: ['Scope creep prevention', 'Change request tracking', 'Client approval records'],
    cta: 'See Solutions'
  },
  {
    icon: Users,
    title: 'Consulting Firms',
    description: 'AI governance for methodology compliance and knowledge management.',
    challenges: ['Methodology adherence', 'Knowledge retention', 'Quality assurance'],
    cta: 'Get Started'
  }
]

export default function WhoWeHelpSection() {
  return (
    <section className="py-20 bg-secondary/30" id="who-we-help">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Users className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">Purpose-Built Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A <span className="gradient-text">Governance Platform</span> for High-Stakes Professional Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Different industries. Same need for verifiable proof and project control.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-8 hover:shadow-xl transition-all duration-300 hover:border-cyan-500/30 group"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-cyan-300">{solution.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">{solution.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {solution.challenges.map((challenge, challengeIndex) => (
                  <div key={challengeIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-muted-foreground">{challenge}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant="outline"
                className="w-full border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white group-hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {solution.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-card border border-border rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-4">
            Don't See Your Industry? <span className="text-cyan-400">We Adapt to Your Needs.</span>
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Any professional services firm that needs verifiable project control can benefit from Knowcap.ai. 
            Our governance engine adapts to your methodology and compliance requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Discuss Your Needs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => window.open('https://app.reclaim.ai/m/knowcap-group/knowcapai-demo', '_blank')}
              className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
