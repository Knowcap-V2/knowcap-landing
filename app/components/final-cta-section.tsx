
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Calendar } from 'lucide-react'
import { useState } from 'react'
import BetaApplicationForm from '@/components/beta-application-form'

export default function FinalCTASection() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <section className="py-20 md:py-24 relative overflow-hidden" style={{ 
      background: 'linear-gradient(135deg, #F7F9FC 0%, #E8F0FE 50%, #F0F4FF 100%)'
    }}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #005EFF 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      
      <div className="max-w-[1024px] mx-auto px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6" style={{ color: '#0A0D12' }}>
            Ready to Run Every Project on <span className="text-[#005EFF]">Proof</span>?
          </h2>
          <p className="hero-subheading mb-10 max-w-3xl mx-auto" style={{ color: '#4A5568' }}>
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
              className="bg-white hover:bg-gray-50 text-[#0A0D12] border border-gray-200 text-lg px-8 py-6 rounded-lg shadow-sm"
            >
              Schedule a Demo
              <Calendar className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
            <div className="flex items-center gap-2" style={{ color: '#4A5568' }}>
              <Check className="w-4 h-4 text-[#005EFF]" />
              <span className="text-sm">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: '#4A5568' }}>
              <Check className="w-4 h-4 text-[#005EFF]" />
              <span className="text-sm">30-Day Free Trial</span>
            </div>
          </div>

          <p className="text-sm mt-6" style={{ color: '#718096' }}>
            Join the professional teams who've moved from chaos → control
          </p>
        </motion.div>
      </div>

      <BetaApplicationForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </section>
  )
}
