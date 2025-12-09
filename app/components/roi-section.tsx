
'use client'

import { motion } from 'framer-motion'
import { TrendingUp, FileText, MessageSquareOff, Users } from 'lucide-react'

export default function ROISection() {
  const stats = [
    {
      icon: TrendingUp,
      headline: 'Deliver 1.4x - 1.8x More Projects',
      subtext: 'This isn\'t magic. It\'s what happens when onboarding is instant, docs are automated, and clients are self-sufficient. You get more velocity from the same team.',
      color: 'blue'
    },
    {
      icon: FileText,
      headline: 'Cut Documentation Time by 50%',
      subtext: 'Stop writing, start governing. Instantly generate contracts, SOPs, and PRDs from your project memory, freeing up your experts to focus on delivery.',
      color: 'green'
    },
    {
      icon: MessageSquareOff,
      headline: 'Cut Client Support Tickets by 40%',
      subtext: 'Why do our partners see a 40% drop? Our platform provides verifiable answers *before* clients can create a ticket. It\'s proactive governance, not reactive support.',
      color: 'purple'
    },
    {
      icon: Users,
      headline: 'Cut Onboarding Time by 70%',
      subtext: 'Stop repeating yourself. Give new hires the entire project memory on day one. Our AI agents answer their questions with timestamped proof, so your senior team stays focused.',
      color: 'orange'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      orange: 'bg-orange-50 border-orange-200'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-20 md:py-24 bg-white" style={{ padding: '7rem 2rem', background: 'var(--bg-light-pitch)' }}>
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="slide-label mb-4">ROI & Impact</div>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2', color: 'var(--dark-bg)' }}>
            The ROI of AI-Powered Governance
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--gray-text)' }}>
            It's not just about memory—it's about measurable results. See how teams like yours are changing the way they deliver projects.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`${getColorClasses(stat.color)} border-2 rounded-2xl p-8 h-full hover:shadow-lg transition-shadow duration-300`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <stat.icon className={`w-8 h-8 ${getIconColor(stat.color)}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#191F2E] leading-tight">
                    {stat.headline}
                  </h3>
                </div>
                <p className="text-[#535862] text-base leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
