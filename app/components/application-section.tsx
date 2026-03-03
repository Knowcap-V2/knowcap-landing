
'use client'

import { FileText } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import BetaApplicationForm from '@/components/beta-application-form'

export default function ApplicationSection() {
  const [mounted, setMounted] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="application" className="py-20 md:py-24 bg-white">
      <div className="max-w-[1024px] mx-auto px-8">
        <div className={`text-center mb-12 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-[#005EFF]" />
            <span className="section-subheading">Application Form</span>
          </div>
          <h2 className="section-heading mb-6">
            Apply for the Beta Early Access
          </h2>
          <p className="hero-subheading max-w-3xl mx-auto mb-10">
            This isn't a sales form. It's a partnership application. 
            I need to understand your experience, your challenges, and your commitment level.
          </p>

          <Button 
            size="lg"
            onClick={() => setIsFormOpen(true)}
          >
            Apply for Beta Access
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      <BetaApplicationForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </section>
  )
}
