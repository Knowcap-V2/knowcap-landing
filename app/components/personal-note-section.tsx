
'use client'

import { motion } from 'framer-motion'
import { User, Mail, Heart } from 'lucide-react'
import Script from 'next/script'

export default function PersonalNoteSection() {
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
            <Heart className="w-6 h-6 text-red-400" />
            <span className="text-sm font-medium text-muted-foreground">A Personal Note</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From <span className="gradient-text">Hassan</span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-300">Hassan</h3>
              <p className="text-sm text-muted-foreground">Founder, Knowcap.ai • Fellow Odoo Partner</p>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              If you've read this far, you probably recognize yourself in the stories I've shared. 
              The late-night fire drills. The feeling of being one team member away from disaster. 
              The frustration of knowing there has to be a better way.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I've been where you are. I've felt that weight of responsibility, that pressure to 
              keep everything together while also growing the business. And I've spent the last 
              three years building something that I wish had existed when I needed it most.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              This isn't about selling you software. It's about sharing what I've learned with 
              people who understand the challenge. The Founders Circle isn't a customer acquisition 
              strategy—it's a collaboration between peers who want to solve the same problems together.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              If this resonates with you, if you're ready to move beyond the chaos and build 
              something systematic and sustainable, I'd love to hear from you.
            </p>
            
            <p className="text-lg font-semibold text-cyan-300">
              Here's to building businesses that work for us, not against us.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">Ready to get started? Apply now</span>
          </div>
          
          {/* Typeform Embed */}
          <div 
            data-tf-live="01K34ZEG8XK9D4VV46M91TH3Q5"
            className="w-full"
            style={{ 
              height: '500px',
              minHeight: '500px'
            }}
          />
          
          <div className="text-center mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              Or reach out directly at:
            </p>
            <a 
              href="mailto:hsa@knowcap.ai" 
              className="text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              hsa@knowcap.ai
            </a>
            <p className="text-xs text-muted-foreground mt-1">
              I personally read and respond to every email within 24 hours.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            © 2024 Knowcap.ai • Built by Hassan, for Odoo Partners
          </p>
        </motion.div>
      </div>
      
      {/* Typeform Script */}
      <Script
        src="//embed.typeform.com/next/embed.js"
        strategy="afterInteractive"
      />
    </section>
  )
}
