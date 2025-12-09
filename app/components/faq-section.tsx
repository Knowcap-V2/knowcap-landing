
'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What is Knowcap?',
    answer: 'Knowcap is an AI governance platform. It ingests all your project assets—meetings, screen recordings, documents, and websites—to create a single, verifiable, and searchable project memory.'
  },
  {
    question: 'Can Knowcap join confidential meetings?',
    answer: 'Yes, and you have total control. You can invite Knowcap as a full participant (video + audio), as an audio-only bot, or even restrict it to transcript-only mode for maximum confidentiality. You set the rules.'
  },
  {
    question: 'What tools does Knowcap integrate with?',
    answer: 'Knowcap is designed to be your central governance layer. Our direct, one-click integrations are partner-driven. We are currently in active development on our Odoo integration based on partner demand, with Jira, Asana, and ClickUp on our roadmap.'
  },
  {
    question: 'Can I share projects with clients?',
    answer: 'Yes. Knowcap is built for collaboration. You can share entire projects or specific assets (like AI Agents) with internal teams and external clients, all managed by your role-based permissions.'
  }
]

export default function FAQSection() {
  return (
    <section className="py-20 md:py-24 bg-[#F5F5F5]" style={{ padding: '7rem 2rem', background: 'var(--bg-light-pitch)' }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="slide-label mb-4">FAQ</div>
          <h2 className="mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2', color: 'var(--dark-bg)' }}>
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-xl border border-[#D5D7DA] px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-[#191F2E] hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-[#414651] pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
