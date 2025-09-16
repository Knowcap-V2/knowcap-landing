

'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Managing Director',
    company: 'TechConsult Partners',
    avatar: '/api/placeholder/64/64',
    rating: 5,
    testimonial: 'Knowcap has completely changed how we handle client knowledge. We went from spending hours answering the same questions to having AI agents that provide instant, accurate responses. Our clients love it.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Senior Project Manager', 
    company: 'Enterprise Solutions Group',
    avatar: '/api/placeholder/64/64',
    rating: 5,
    testimonial: 'The meeting intelligence feature is incredible. Every conversation is automatically structured and searchable. We never lose track of client decisions or requirements anymore.'
  },
  {
    name: 'Jennifer Park',
    role: 'Operations Director',
    company: 'Digital Strategy Co.',
    avatar: '/api/placeholder/64/64', 
    rating: 5,
    testimonial: 'Our team productivity has increased dramatically. The AI can instantly generate training materials from our recorded sessions, saving us days of manual work per project.'
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
            <span className="text-sm font-medium text-muted-foreground">Beta User Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Beta Users Are <span className="gradient-text">Saying</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't take our word for it. Here's what early adopters are experiencing.
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
            4.9/5 Average Rating from Beta Users
          </h3>
          <p className="text-lg text-muted-foreground">
            Based on feedback from 47+ professional services teams in our beta program.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

