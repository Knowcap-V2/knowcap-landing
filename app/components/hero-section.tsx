
'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Code, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HeroSection() {
  const scrollToApplication = () => {
    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg">
      {/* Theme Toggle - Fixed position top right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-20 text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Users className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">For Odoo Partners Only</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            I'm an Odoo Partner. My projects were a mess—so I built the <span className="gradient-text">AI‑powered operating system</span> for Odoo partners.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            You know the feeling. Client expectations sky-high, documentation scattered, 
            team burning out, and you're firefighting instead of building.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="bg-card border border-border rounded-lg p-6 shadow-xl">
            <Image
              src="/image.png"
              alt="Knowcap.ai Interface"
              width={800}
              height={400}
              className="rounded-lg"
              priority
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            size="lg" 
            onClick={scrollToApplication}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Join the Founders Circle
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Code className="w-4 h-4" />
              <span>7 Partner Spots Available</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span>Invite Only</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
