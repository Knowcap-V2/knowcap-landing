
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Calendar } from 'lucide-react'
import { useState } from 'react'
import BetaApplicationForm from '@/components/beta-application-form'

export default function FinalCTASection() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
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
            This isn't a sales form. It's a partnership application. We need to understand your challenges to give you verifiable control and help you deliver every project perfectly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg"
              onClick={() => setIsFormOpen(true)}
              className="bg-[#005EFF] hover:bg-[#0052CC] text-white text-lg px-8 py-6 rounded-lg btn-shadow"
            >
              Apply for Beta Access
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              onClick={() => window.location.href = 'https://knowcap.ai/book'}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-lg px-8 py-6 rounded-lg"
            >
              Schedule a Demo
              <Calendar className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <div className="flex items-center gap-2 text-[#D5D7DA]">
              <Check className="w-4 h-4 text-[#005EFF]" />
              <span className="text-sm">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2 text-[#D5D7DA]">
              <Check className="w-4 h-4 text-[#005EFF]" />
              <span className="text-sm">30-Day Free Trial</span>
            </div>
          </div>

          <p className="text-sm text-[#D5D7DA] mt-6">
            Join the professional teams who've moved from chaos → control
          </p>
        </motion.div>
      </div>

      <BetaApplicationForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </section>
  )
}
