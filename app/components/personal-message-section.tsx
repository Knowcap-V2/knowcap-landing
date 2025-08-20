
'use client'

import { motion } from 'framer-motion'
import { Play, User, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function PersonalMessageSection() {
  const [showScript, setShowScript] = useState(false)

  const videoScript = `
Hi, I'm Hassan.

Three years ago, I was where you are right now. Running an Odoo consultancy, great at implementing systems, terrible at managing the chaos that came with it.

I remember the exact moment I knew something had to change. It was 2 AM, I was on a call with a client in Singapore, trying to figure out why their inventory module wasn't working after our latest update. 

My lead developer had quit the week before, taking all the project knowledge with him. The client was furious. My team was exhausted. And I realized I was running a business that depended entirely on keeping track of things in people's heads.

That night, I started sketching out what would eventually become Knowcap.ai.

Not another project management tool. Not another Odoo add-on. But a complete operating system for how Odoo Partners actually work.

I spent the next two years building it, testing it with my own team, refining it based on the real problems we face every day.

The result? Our project delivery time improved by 40%. Client satisfaction scores went through the roof. My team actually started enjoying their work again.

But here's what really convinced me this was something special: other Odoo Partners started asking what we were doing differently.

That's why I'm here. I don't want to sell you software. I want to share what I've learned with the people who understand the challenge.

Fellow Odoo Partners who know that our success depends on turning chaos into clarity, one project at a time.

If you're ready to stop fighting fires and start building systems, I'd love to show you what's possible.

- Hassan
Founder, Knowcap.ai
  `

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <User className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">Personal Message</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A Message from <span className="gradient-text">Hassan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Before we go further, I want to share the story of why Knowcap.ai exists, 
            and why I'm personally inviting you to be part of something bigger.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-8 mb-8"
        >
          {!showScript ? (
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                   onClick={() => setShowScript(true)}>
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Watch Hassan's Personal Message</h3>
              <p className="text-muted-foreground mb-6">
                A 3-minute story about why Knowcap.ai was built by an Odoo Partner, for Odoo Partners.
              </p>
              <Button 
                onClick={() => setShowScript(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <Play className="w-4 h-4 mr-2" />
                Play Video Message
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                *Video script available below for preview purposes
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Video Script - Personal Message from Hassan</h3>
                <Button variant="outline" size="sm" onClick={() => setShowScript(false)}>
                  Hide Script
                </Button>
              </div>
              <div className="prose prose-invert max-w-none">
                <div className="bg-secondary/30 rounded-lg p-6 whitespace-pre-line text-muted-foreground leading-relaxed">
                  {videoScript}
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                <span>This would be delivered as a personal video message from Hassan</span>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            size="lg"
            onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4"
          >
            I'm Ready to Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
