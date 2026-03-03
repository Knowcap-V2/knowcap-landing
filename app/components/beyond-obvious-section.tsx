
'use client'

import { motion } from 'framer-motion'

export default function BeyondObviousSection() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#E6F2FF] rounded-xl p-10 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-[#191F2E]">
            Knowcap doesn't just help you control projects.
          </h3>
          <p className="text-lg md:text-xl text-[#414651]">
            It helps you build a smarter, more profitable team.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
