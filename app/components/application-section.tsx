
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
    <section id="application" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className={`text-center mb-12 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Application Form</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a1d29]">
            Apply for the Beta Early Access
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            This isn't a sales form. It's a partnership application. 
            I need to understand your experience, your challenges, and your commitment level.
          </p>

          <Button 
            size="lg"
            onClick={() => setIsFormOpen(true)}
            className="bg-[#1a1d29] hover:bg-[#2a2d39] text-white font-medium px-8 py-6 rounded-lg transition-all duration-300 text-base"
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
