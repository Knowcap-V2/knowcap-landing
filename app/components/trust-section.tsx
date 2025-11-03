
'use client'

import { motion } from 'framer-motion'

const trustedCompanies = [
  { name: 'Ariika' },
  { name: 'Moko' },
  { name: 'BI Solutions' },
  { name: 'Smetools' },
  { name: 'Braincrew' }
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
            Trusted by Leading Odoo Partners
          </h2>
          <p className="hero-subheading max-w-3xl mx-auto">
            Professional teams around the world rely on Knowcap to deliver projects with confidence and control.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {trustedCompanies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="transform -rotate-45"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#005EFF]/10 to-[#443AFF]/5 rounded-2xl flex items-center justify-center border border-[#005EFF]/20 hover:border-[#005EFF]/40 transition-all duration-300 hover:shadow-lg">
                <span className="text-lg md:text-xl font-bold text-[#191F2E] rotate-45">
                  {company.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
