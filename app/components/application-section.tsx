
'use client'

import { FileText } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ApplicationSection() {
  const [mounted, setMounted] = useState(false)

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
            Apply for the <span className="gradient-text">Founders Circle</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This isn't a sales form. It's a partnership application. 
            I need to understand your experience, your challenges, and your commitment level.
          </p>
        </div>

        <div className={`bg-card border border-border rounded-lg overflow-hidden transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Google Form Container */}
          <div className="relative w-full">
            <div className="w-full overflow-hidden rounded-t-lg">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLScDXh7m_JwK9RLCRkv94V9pEvU5qvSn9_tDotl8w_uk_MzrxA/viewform?embedded=true" 
                className="w-full border-none"
                style={{ height: 'min(2592px, 80vh)' }}
                title="Founders Circle Application Form"
              >
                Loading application form...
              </iframe>
            </div>
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
