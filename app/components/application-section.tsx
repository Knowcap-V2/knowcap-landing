
'use client'

import { FileText, Loader } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ApplicationSection() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    
    // Hide loading state after a short delay to allow iframe to start loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
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
            Apply for the <span className="gradient-text">Founders Circle</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This isn't a sales form. It's a partnership application. 
            I need to understand your experience, your challenges, and your commitment level.
          </p>
        </div>

        <div className={`bg-card border border-border rounded-lg overflow-hidden transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-card/90 z-10 rounded-lg">
              <div className="text-center">
                <Loader className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-3" />
                <span className="text-muted-foreground">Loading application form...</span>
              </div>
            </div>
          )}

          {/* Typeform Container - Using iframe approach for better mobile compatibility */}
          <div className="relative">
            <iframe 
              src="https://form.typeform.com/to/01K34ZEG8XK9D4VV46M91TH3Q5?typeform-medium=embed-snippet"
              title="Founders Circle Application"
              className="w-full border-0"
              style={{ 
                height: '600px',
                minHeight: '600px'
              }}
              allow="camera; microphone; autoplay; encrypted-media; fullscreen"
              loading="lazy"
            />
          </div>

          {/* Footer Note */}
          <div className="p-6 bg-secondary/20 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Applications are reviewed personally by Hassan within 48 hours. 
              If selected, you'll receive a direct email to schedule a discovery call.
            </p>
          </div>
        </div>
      </div>


    </section>
  )
}
