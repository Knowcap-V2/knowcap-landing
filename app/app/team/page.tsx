
'use client'

import { useEffect } from 'react'

export default function TeamPage() {
  useEffect(() => {
    // Set page title
    document.title = 'Connect With the People Building Knowcap.ai'
    
    // Load the Reclaim script
    const script = document.createElement('script')
    script.src = 'https://meet.reclaimai.com/scripts/embed-scheduling-link.0.x.x.js'
    script.setAttribute('data-id', '6fb86eda-27d1-41c1-b807-726cad75a2e9')
    script.setAttribute('data-redirect', 'NONE')
    script.async = true
    
    const container = document.getElementById('reclaim-embed-container')
    if (container) {
      container.appendChild(script)
    }
    
    return () => {
      // Cleanup
      if (container && script.parentNode === container) {
        container.removeChild(script)
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Connect With the People Building Knowcap.ai
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              An open discussion about culture, direction, and the kind of people shaping Knowcap's evolution. A space to exchange ideas and explore how your mindset aligns with ours.
            </p>
          </div>

          {/* Embedded Scheduling Widget */}
          <div className="w-full min-h-[600px]">
            <div id="reclaim-embed-container" />
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center text-muted-foreground">
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
