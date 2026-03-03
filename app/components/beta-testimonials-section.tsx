
'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function BetaTestimonialsSection() {
  const testimonials = [
    {
      quote: 'Knowcap cut our support tickets by 40% after implementation.',
      author: 'Ibrahim Abed',
      title: 'Plementus (Egypt)'
    },
    {
      quote: 'AI-generated PRDs reduced documentation time by half.',
      author: 'Mohamed Jamal',
      title: 'BI Solutions (KSA)'
    },
    {
      quote: 'Our teams stopped re-explaining projects to new members. Onboarding now takes minutes.',
      author: 'Ariika Tech Team',
      title: 'Odoo Implementation Partner'
    }
  ]

  return (
    <section className="py-20 md:py-24 bg-[#F5F5F5]">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="section-subheading text-[#005EFF]">// TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#191F2E] mb-6">
            What Our Customers Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-[#005EFF] mb-6" />
                
                {/* Quote Text */}
                <p className="text-[#191F2E] text-lg leading-relaxed mb-6 flex-grow">
                  "{testimonial.quote}"
                </p>
                
                {/* Author Info */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-[#191F2E] font-semibold">{testimonial.author}</p>
                  <p className="text-[#535862] text-sm">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
