

'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Odoo Practice Lead',
    company: 'TechConsult Partners',
    avatar: '/api/placeholder/64/64',
    rating: 5,
    testimonial: 'Knowcap has revolutionized our Odoo implementations. We went from spending hours explaining the same Odoo workflows to having AI agents that provide instant, module-specific guidance. Our clients are much more confident.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Senior Odoo Consultant', 
    company: 'Enterprise Solutions Group',
    avatar: '/api/placeholder/64/64',
    rating: 5,
    testimonial: 'Every Odoo requirement session is automatically captured and structured. We never lose track of configuration decisions or customization requirements anymore. It\'s a game-changer for complex implementations.'
  },
  {
    name: 'Jennifer Park',
    role: 'Odoo Partner Director',
    company: 'Business Process Solutions',
    avatar: '/api/placeholder/64/64', 
    rating: 5,
    testimonial: 'The AI generates comprehensive Odoo training materials from our implementation sessions automatically. What used to take our team days now happens instantly, and the quality is consistently high.'
  }
]

export default function BetaTestimonialsSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-6 h-6 text-yellow-400" />
            <span className="text-sm font-medium text-muted-foreground">Odoo Partner Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Odoo Partners Are <span className="gradient-text">Saying</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't take our word for it. Here's what Odoo partners in our beta program are experiencing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-cyan-400 mb-4" />
              
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.testimonial}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-cyan-400">
                    {testimonial.company}
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 bg-gradient-to-r from-cyan-950/30 to-blue-950/30 border border-cyan-500/20 rounded-lg p-8"
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h3 className="text-2xl font-bold mb-4">
            4.9/5 Average Rating from Odoo Partners
          </h3>
          <p className="text-lg text-muted-foreground">
            Based on feedback from 23+ Odoo partner firms in our beta program.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

