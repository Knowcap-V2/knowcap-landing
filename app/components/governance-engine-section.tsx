
'use client'

import { motion } from 'framer-motion'
import { BookOpen, Shield, CheckCircle, ArrowRight, Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'

const governanceSolutions = [
  {
    title: 'Enforce Your Methodology with AI Governance',
    description: 'Upload your delivery playbook or SOP. Knowcap audits every client interaction against it — automatically flagging risks, backed by timestamp receipts you can click and verify.',
    icon: Shield
  },
  {
    title: 'Eliminate Repetition with AI Project Agents',
    description: 'Every project gets its own AI agent, trained on its meetings and documents. When a client repeats a question, the agent answers instantly — citing the exact meeting moment it was addressed.',
    icon: BookOpen
  },
  {
    title: 'Automate Documentation with Verifiable Artifacts',
    description: 'From project summaries to compliance reports, Knowcap generates artifacts instantly — each linked to the exact source.',
    icon: CheckCircle
  }
]

export default function GovernanceEngineSection() {
  return (
    <section className="py-20 bg-white" id="governance">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">The Solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a1d29]">
            Proof. Not Promises.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The First Platform That Turns Conversations Into Verifiable Control.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {governanceSolutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all duration-300 hover:border-blue-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#1a1d29] rounded-lg flex items-center justify-center flex-shrink-0">
                  <solution.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#1a1d29] mb-4">
                    {solution.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {solution.description}
                  </p>

                  {index === 1 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Receipt className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-bold text-blue-600">Timestamp Receipt Example</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        "Client asked about multi-currency billing at 14:23 in Meeting #3. 
                        <span className="underline cursor-pointer text-blue-600">Click here to view exact moment.</span>"
                      </p>
                    </div>
                  )}
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
          className="text-center mt-16 bg-gray-50 border border-gray-200 rounded-lg p-8"
        >
          <h3 className="text-3xl font-bold mb-4 text-[#1a1d29]">
            Every Decision. Every Moment. Every Receipt.
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            This isn't project management software.
            It's project governance you can trust — because every answer is backed by proof.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => window.location.href = '/book'}
              className="bg-[#1a1d29] hover:bg-[#2a2d39] text-white font-medium px-8 py-6 rounded-lg transition-all duration-300 text-base"
            >
              See It In Action
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8 py-6 rounded-lg transition-all duration-300 text-base"
            >
              Start Free Trial
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
