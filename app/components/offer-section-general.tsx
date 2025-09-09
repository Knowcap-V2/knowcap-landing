

'use client'

import { motion } from 'framer-motion'
import { Users, Crown, Gift, ArrowRight, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  'Early access to Knowcap.ai platform',
  'Direct input on feature development',
  'Quarterly strategy sessions with Hassan',
  'Priority technical support',
  'Revenue share opportunities', 
  'Cross-referral network access',
  'Joint marketing opportunities'
]

const requirements = [
  'Active Project Manager with team responsibility',
  'Minimum 3 years project management experience',
  'Willingness to provide detailed feedback',
  'Commitment to testing new features',
  'Open to case study participation'
]

export default function OfferSectionGeneral() {
  const scrollToApplication = () => {
    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })
  }

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
            <Crown className="w-6 h-6 text-yellow-400" />
            <span className="text-sm font-medium text-muted-foreground">Exclusive Opportunity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="gradient-text">Founders Circle</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm not looking for customers. I'm looking for partners. 
            Seven Project Managers who want to shape the future of how we manage projects, 
            together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Gift className="w-6 h-6 text-green-400" />
              <h3 className="text-2xl font-bold text-green-300">What You Get</h3>
            </div>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-lg">
              <p className="text-black dark:text-white font-semibold text-sm">
                Estimated value: $50,000+ in platform access, consulting, and partnership opportunities
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h3 className="text-2xl font-bold text-cyan-300">What I Need</h3>
            </div>
            <ul className="space-y-4">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{requirement}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-lg">
              <p className="text-black dark:text-white font-semibold text-sm">
                This is about mutual value creation, not one-sided extraction
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-8 text-center"
        >
          <h3 className="text-3xl font-bold mb-4">
            Why Only <span className="text-cyan-400">Seven Partners</span>?
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            Because I want to work closely with each of you. This isn't a mass market play. 
            It's a partnership where your success directly influences the platform's development. 
            Seven gives us enough diversity of perspective without losing the intimacy needed for real collaboration.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>7 Total Spots</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span>3 Spots Filled</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>4 Spots Available</span>
            </div>
          </div>
          <Button 
            size="lg"
            onClick={scrollToApplication}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 text-lg"
          >
            Apply for Founders Circle
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
