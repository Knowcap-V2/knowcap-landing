

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, MessageCircle, Star } from 'lucide-react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000) // Show after 5 seconds

    return () => clearTimeout(timer)
  }, [])

  const scrollToApplication = () => {
    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })
    setIsMinimized(true)
  }

  const openDemo = () => {
    window.open('https://app.reclaim.ai/m/knowcap-group/knowcapai-demo', '_blank')
    setIsMinimized(true)
  }

  if (!isVisible) return null

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-card border border-border rounded-lg shadow-2xl max-w-sm animate-in slide-in-from-bottom-4 duration-500">
      <div className="relative p-6">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-cyan-400">Limited Spots</span>
          </div>
          <h3 className="font-bold text-lg mb-1">Ready to Transform?</h3>
          <p className="text-sm text-muted-foreground">
            Join 7 project managers revolutionizing how projects get done.
          </p>
        </div>

        <div className="space-y-2">
          <Button
            onClick={scrollToApplication}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300"
          >
            Apply Now
          </Button>
          <Button
            variant="outline"
            onClick={openDemo}
            className="w-full border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all duration-300"
          >
            Quick Demo
          </Button>
        </div>
      </div>
    </div>
  )
}
