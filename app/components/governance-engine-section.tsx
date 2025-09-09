
'use client'

import { motion } from 'framer-motion'
import { BookOpen, Shield, CheckCircle, ArrowRight, Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const governanceSteps = [
  {
    step: 1,
    title: 'Choose Your Playbook',
    description: 'Instantly set up your governance by selecting a best-practice template from our Playbook Library or upload your own methodology.',
    visual: 'Image of a library of playbook templates',
    icon: BookOpen
  },
  {
    step: 2,
    title: 'Let AI Govern with Receipts',
    description: 'Our AI audits every client meeting against your playbook, automatically flagging deviations and risks. Every finding is backed by a clickable timestamp receipt, taking you to the exact moment it happened.',
    visual: 'Image of a project dashboard with red-flag alerts, each with a small \'receipt\' icon',
    icon: Receipt
  },
  {
    step: 3,
    title: 'Act with Proof',
    description: 'Move from insight to action instantly. Every "Action Bridge" embeds the proof. Generate a coaching snippet for Slack with the video proof attached, or create a Jira ticket that links directly to the client\'s request.',
    visual: 'Image of a flagged risk with actionable buttons',
    icon: CheckCircle
  }
]

export default function GovernanceEngineSection() {
  return (
    <section className="py-20 bg-background" id="governance">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">The Solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Proof. Not Promises.</span><br />
            The First Platform That Moves You From Conversation to Verifiable Control.
          </h2>
        </motion.div>

        <div className="space-y-16">
          {governanceSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-cyan-300">
                  Step {step.step}: {step.title}
                </h3>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {index === 1 && (
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Receipt className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-bold text-cyan-400">Timestamp Receipt Example</span>
                    </div>
                    <p className="text-sm text-cyan-100">
                      "Risk flagged: Client changed requirements without approval at 14:23 in Meeting #3. 
                      <span className="underline cursor-pointer">Click here to view exact moment.</span>"
                    </p>
                  </div>
                )}
              </div>

              {/* Visual Side */}
              <div className="flex-1">
                <div className="relative aspect-video bg-muted/50 rounded-lg border border-border/50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      {step.visual}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 bg-card border border-border rounded-lg p-8"
        >
          <h3 className="text-3xl font-bold mb-4">
            Every Decision. <span className="text-cyan-400">Every Moment.</span> Every Receipt.
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            This isn't project management software. It's project governance. 
            The difference? You can trust every insight because you can verify every source.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => window.open('https://app.reclaim.ai/m/knowcap-group/knowcapai-demo', '_blank')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              See It In Action
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              Start Free Trial
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
