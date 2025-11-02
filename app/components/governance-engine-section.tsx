
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
    <section className="py-20 md:py-24 bg-white" id="governance">
      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-[#005EFF]" />
            <span className="section-subheading">The Solution</span>
          </div>
          <h2 className="section-heading mb-6">
            Proof. Not Promises.
          </h2>
          <p className="hero-subheading max-w-3xl mx-auto">
            The First Platform That Turns Conversations Into Verifiable Control.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-6 max-w-4xl mx-auto">
          {governanceSolutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-[#F5F5F5] rounded-xl p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                  <solution.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-[#191F2E] mb-4">
                    {solution.title}
                  </h3>
                  
                  <p className="body-text">
                    {solution.description}
                  </p>

                  {index === 1 && (
                    <div className="bg-[#E6F2FF] rounded-lg p-4 mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Receipt className="w-5 h-5 text-[#005EFF]" />
                        <span className="text-sm font-semibold text-[#005EFF]">Timestamp Receipt Example</span>
                      </div>
                      <p className="text-sm text-[#535862]">
                        "Client asked about multi-currency billing at 14:23 in Meeting #3. 
                        <span className="underline cursor-pointer text-[#005EFF] font-semibold">Click here to view exact moment.</span>"
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
          className="text-center mt-16 bg-[#F5F5F5] rounded-xl p-10"
        >
          <h3 className="text-3xl font-semibold mb-4 text-[#191F2E]">
            Every Decision. Every Moment. Every Receipt.
          </h3>
          <p className="body-text mb-8 max-w-3xl mx-auto">
            This isn't project management software.
            It's project governance you can trust — because every answer is backed by proof.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => window.location.href = '/book'}
            >
              See It In Action
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Free Trial
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
