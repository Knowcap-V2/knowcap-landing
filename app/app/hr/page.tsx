'use client'
import { useEffect } from 'react'
import Footer from '@/components/footer'

export default function HRPage() {
  useEffect(() => {
    // Set page title
    document.title = 'Schedule Your Interview - Knowcap.ai'
    
    // Load the Reclaim script
    const script = document.createElement('script')
    script.src = 'https://meet.reclaimai.com/scripts/embed-scheduling-link.0.x.x.js'
    script.setAttribute('data-id', '80fa948c-1355-4dc2-a272-ad176f0b9750')
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
    <>
      <main className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a1d29]">
              Schedule Your Interview
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select a convenient time slot for your interview with our HR team. We look forward to meeting you!
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
    </>
  )
}
