
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BetaApplicationForm from '@/components/beta-application-form'

export default function PersonalNoteSectionGeneral() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      {/* CTA Section with Dark Background */}
      <section className="py-20 md:py-24 bg-[#0A0D12]">
        <div className="max-w-[1024px] mx-auto px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-[#E9EAEB]">
              Ready to Run Every Project on <span className="text-[#005EFF]">Proof</span>?
            </h2>
            <p className="hero-subheading text-[#D5D7DA] mb-10 max-w-3xl mx-auto">
              See how Knowcap.ai can give you the verifiable control and intelligence you need to deliver every project perfectly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <Button 
                size="lg"
                onClick={() => setIsFormOpen(true)}
              >
                Apply for Beta Access
              </Button>
              <Button 
                variant="link"
                size="lg"
                onClick={() => window.location.href = 'https://knowcap.ai/book'}
                className="text-white hover:text-[#005EFF]"
              >
                Schedule a Demo →
              </Button>
            </div>
            
            <div className="text-center">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#D5D7DA] mb-4">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-[#005EFF]" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-[#005EFF]" />
                  <span>30-Day Free Trial</span>
                </div>
              </div>
              <p className="text-sm text-[#D5D7DA]">
                Join professional teams who've moved from chaos → control
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section with Light Background */}
      <section className="py-16 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-[#005EFF]" />
              <span className="section-subheading">Questions? Reach out directly</span>
            </div>
            <a 
              href="mailto:hsa@knowcap.ai" 
              className="text-2xl font-semibold text-[#005EFF] hover:text-[#443AFF] transition-colors"
            >
              hsa@knowcap.ai
            </a>
            <p className="text-sm text-[#535862] mt-2">
              Every message is read and answered personally within 24 hours.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-[#535862]">
              © 2025 Knowcap.ai • Built by Hassan, for Professional Teams
            </p>
          </motion.div>
        </div>
      </section>

      <BetaApplicationForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </>
  )
}
