

'use client'

import { motion } from 'framer-motion'
import { User, Mail, Heart } from 'lucide-react'

export default function PersonalNoteSectionGeneral() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">Final Call to Action</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Run Every Project on <span className="gradient-text">Proof</span>?
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-8 mb-8 text-center"
        >
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            See how Knowcap.ai can give you the verifiable control and intelligence you need to deliver every project perfectly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-12 py-4 text-xl rounded-lg shadow-lg transition-all duration-300"
            >
              Get Started Free
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://app.reclaim.ai/m/knowcap-group/knowcapai-demo', '_blank')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg underline transition-colors duration-300"
            >
              Schedule a Demo
            </motion.button>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-cyan-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4 text-cyan-400" />
                <span>30-Day Free Trial</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Join professional teams who've moved from chaos → control
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">Questions? Reach out directly</span>
          </div>
          <a 
            href="mailto:hsa@knowcap.ai" 
            className="text-xl font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            hsa@knowcap.ai
          </a>
          <p className="text-sm text-muted-foreground mt-2">
            Every message is read and answered personally within 24 hours.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            © 2025 Knowcap.ai • Built by Hassan, for Professional Teams
          </p>
        </motion.div>
      </div>
    </section>
  )
}
