
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
    <section id="application" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className={`text-center mb-12 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">Application Form</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Apply for the <span className="gradient-text">Beta Early Access</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            This isn't a sales form. It's a partnership application. 
            I need to understand your experience, your challenges, and your commitment level.
          </p>

          <Button 
            size="lg"
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
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
