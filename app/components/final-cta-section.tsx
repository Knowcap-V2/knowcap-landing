
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function FinalCTASection() {
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
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#005EFF] hover:bg-[#0052CC] text-white text-lg px-8 py-6 rounded-lg btn-shadow"
            >
              Apply for Beta Access
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/book'}
              className="border-[#D5D7DA] text-white hover:bg-white/10 text-lg px-8 py-6 rounded-lg"
            >
              Schedule a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <p className="text-sm text-[#D5D7DA] mt-6">
            Join the professional teams who've moved from chaos → control
          </p>
        </motion.div>
      </div>
    </section>
  )
}
