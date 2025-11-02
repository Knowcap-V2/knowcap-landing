
'use client'

import { motion } from 'framer-motion'
import { Play, Quote } from 'lucide-react'
import Image from 'next/image'

export default function BetaTestimonialsSection() {
  const testimonials = [
    {
      quote: 'Knowcap cut our support tickets by 70% after implementation.',
      author: 'Ibrahim Abed',
      title: 'Plementus (Egypt)',
      image: '/testimonial-1.jpg',
      featured: true
    },
    {
      quote: 'AI-generated PRDs reduced documentation time by half.',
      author: 'Mohamed Jamal',
      title: 'BI Solutions (KSA)',
      image: '/testimonial-2.jpg',
      featured: true
    },
    {
      quote: 'Our teams stopped re-explaining projects to new members. Onboarding now takes minutes.',
      author: 'Ariika Tech Team',
      title: '',
      image: '/testimonial-3.jpg',
      featured: false
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
              className={testimonial.featured ? 'md:col-span-1' : 'md:col-span-1'}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
                {/* Video Preview with Play Button */}
                <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#005EFF] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  
                  {/* Author Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                    {testimonial.title && (
                      <p className="text-white/90 text-xs">{testimonial.title}</p>
                    )}
                  </div>
                </div>

                {/* Quote */}
                <div className="p-6">
                  <Quote className="w-8 h-8 text-[#005EFF]/20 mb-3" />
                  <p className="text-[#535862] text-base leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
