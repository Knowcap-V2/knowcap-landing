
'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export default function BookPage() {
  useEffect(() => {
    // Set page title
    document.title = 'Book a Call - Knowcap.ai'
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">K</span>
            </div>
            <span className="text-xl font-bold">Knowcap.ai</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Schedule Your Discovery Call
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how Knowcap can transform your Odoo implementations and help you build the future of project management together.
            </p>
          </div>

          {/* Embedded Scheduling Widget */}
          <div className="bg-card rounded-lg border border-border p-8 shadow-lg min-h-[600px]">
            <div 
              id="reclaim-embed-container"
              data-id="6fb86eda-27d1-41c1-b807-726cad75a2e9" 
              data-redirect="NONE"
            />
            <Script 
              src="https://meet.reclaimai.com/scripts/embed-scheduling-link.0.x.x.js"
              strategy="afterInteractive"
            />
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center text-muted-foreground">
            <p className="mb-4">
              Applications are reviewed personally by Hassan within 48 hours. If selected, you'll receive a direct email to schedule a discovery call.
            </p>
            <p className="text-sm">
              Need immediate assistance? Email us at{' '}
              <a href="mailto:hassan@knowcap.ai" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                hassan@knowcap.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
