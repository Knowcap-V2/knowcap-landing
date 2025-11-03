
'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Users, FileCheck } from 'lucide-react'

const trustPillars = [
  {
    icon: Shield,
    headline: 'Your Data is Yours. Period.',
    subtext: 'We never, ever train our AI models on your private project data. All your ingested assets and generated artifacts are yours, and yours alone.'
  },
  {
    icon: Lock,
    headline: 'Encryption at-Rest & In-Transit',
    subtext: 'All your project files are secured using industry-standard AES-256 encryption on our servers (at-rest) and protected with TLS encryption during any transfer (in-transit).'
  },
  {
    icon: Users,
    headline: 'Granular Access Control',
    subtext: 'You are in complete command. Our Role-Based Access Control (RBAC) lets you manage exactly who can see, edit, or share any asset, from a single file to an entire project.'
  },
  {
    icon: FileCheck,
    headline: 'Secure, Auditable Sharing',
    subtext: 'All shared artifacts are generated via permission-controlled links. Full audit logs let you see who accessed what, and when—giving you true governance over your data.'
  }
]

export default function TrustSection() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-6">
            Your Projects, Secured & Governed
          </h2>
          <p className="hero-subheading max-w-3xl mx-auto">
            We're built for professional teams, which means security and control aren't features—they're our foundation. Your trust is our core metric.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#005EFF] rounded-xl flex items-center justify-center mx-auto mb-6">
                <pillar.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-[#191F2E]">
                {pillar.headline}
              </h3>
              <p className="body-text text-sm">
                {pillar.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
