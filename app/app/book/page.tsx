
'use client'
import Footer from '@/components/footer'

import { useEffect } from 'react'

export default function BookPage() {
  useEffect(() => {
    // Set page title
    document.title = 'Book a Strategy Conversation - Knowcap.ai'
    
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
    <main className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a1d29]">
              Book a Strategy Conversation
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              In this session, we'll review your current project challenges and see how Knowcap.ai could help streamline documentation, follow-ups, and delivery.
            </p>
          </div>

          {/* Embedded Scheduling Widget */}
          <div className="w-full min-h-[600px]">
            <div id="reclaim-embed-container" />
          </div>


        </div>
      </div>
      <Footer />
      </main>
  )
}
