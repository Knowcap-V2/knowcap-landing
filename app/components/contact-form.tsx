'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

interface ContactFormProps {
  onClose?: () => void
  isModal?: boolean
}

export default function ContactForm({ onClose, isModal = false }: ContactFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        // Redirect to thank you page
        router.push('/thank-you?type=contact')
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to submit')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: 'var(--dark-bg)' }}>
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#005EFF] focus:ring-2 focus:ring-[#005EFF]/20 outline-none transition"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--dark-bg)' }}>
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#005EFF] focus:ring-2 focus:ring-[#005EFF]/20 outline-none transition"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-semibold mb-2" style={{ color: 'var(--dark-bg)' }}>
          Company / Organization
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#005EFF] focus:ring-2 focus:ring-[#005EFF]/20 outline-none transition"
          style={{ fontFamily: "'Inter', sans-serif" }}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold mb-2" style={{ color: 'var(--dark-bg)' }}>
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#005EFF] focus:ring-2 focus:ring-[#005EFF]/20 outline-none transition"
          style={{ fontFamily: "'Inter', sans-serif" }}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: 'var(--dark-bg)' }}>
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#005EFF] focus:ring-2 focus:ring-[#005EFF]/20 outline-none transition resize-none"
          style={{ fontFamily: "'Inter', sans-serif" }}
          placeholder="Tell us how we can help..."
        />
      </div>

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errorMessage}</p>
        </div>
      )}

      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm font-semibold">Message sent successfully! We'll get back to you within 24 hours.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting' || status === 'success'}
        className="w-full py-4 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ 
          background: status === 'success' ? '#10B981' : 'var(--primary-blue)',
          fontFamily: "'Space Grotesk', sans-serif"
        }}
      >
        {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
      </button>
    </form>
  )

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--dark-bg)' }}>
              Contact Us
            </h2>
            {onClose && (
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
          <div className="px-8 py-6">
            {formContent}
          </div>
        </div>
      </div>
    )
  }

  return formContent
}
