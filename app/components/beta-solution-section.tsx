

'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const outcomes = [
  {
    metric: '70%',
    description: 'Reduction in Odoo support tickets'
  },
  {
    metric: '50%',
    description: 'Faster Odoo implementation cycles'
  },
  {
    metric: '85%',
    description: 'Better implementation knowledge retention'
  },
  {
    metric: '35%',
    description: 'Increase in Odoo project margins'
  }
]

export default function BetaSolutionSection() {
  const joinBeta = () => {
    document.getElementById('beta-cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">The Results</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Odoo Partners Are <span className="gradient-text">Experiencing</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Odoo partners in our beta program are seeing transformational results in their implementation operations within weeks.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {outcomes.map((outcome, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{outcome.metric}</div>
                  <div className="text-sm text-muted-foreground">{outcome.description}</div>
                </div>
              ))}
            </div>

            <Button 
              size="lg"
              onClick={joinBeta}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Join Beta Program
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border/20 shadow-2xl">
              <Image
                src="/dashboard2.png"
                alt="Knowcap Performance Analytics Dashboard"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
              Real Results
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center bg-card border border-border rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to Transform Your Odoo Implementations?
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Join forward-thinking Odoo partners that are already leveraging AI to scale their implementation expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={joinBeta}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Apply for Beta Access
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => window.open('https://app.reclaim.ai/m/knowcap-group/knowcapai-demo', '_blank')}
              className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

