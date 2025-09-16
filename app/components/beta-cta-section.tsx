

'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Users, Calendar, Sparkles } from 'lucide-react'

const betaPerks = [
  'Free access during beta period',
  'Direct input on feature development', 
  'Priority customer support',
  'Lifetime grandfathered pricing',
  'Exclusive beta user community',
  'Early access to new features'
]

export default function BetaCTASection() {
  const openGoogleForm = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScDXh7m_JwK9RLCRkv94V9pEvU5qvSn9_tDotl8w_uk_MzrxA/viewform?usp=sharing&ouid=105175348828928124523', '_blank')
  }

  const bookDemo = () => {
    window.open('https://app.reclaim.ai/m/knowcap-group/knowcapai-demo', '_blank')
  }

  return (
    <section id="beta-cta" className="py-20 bg-gradient-to-r from-cyan-950/20 to-blue-950/20 border-t border-cyan-500/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Users className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20">Odoo Partners Only</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Odoo Partners <span className="gradient-text">Beta Program</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Be among the first Odoo partners to experience the future of implementation delivery. 
            Help us build the AI operating system specifically designed for Odoo partners.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-bold mb-6">Beta Program Benefits</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {betaPerks.map((perk, index) => (
              <div key={index} className="flex items-center gap-3 text-left">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground">{perk}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={openGoogleForm}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Apply for Beta Access
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={bookDemo}
              className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Schedule Demo First
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>23+ Odoo partners</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Odoo integration ready</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Questions about the beta program?{' '}
            <button 
              onClick={bookDemo}
              className="text-cyan-400 hover:underline"
            >
              Schedule a call with our team
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

