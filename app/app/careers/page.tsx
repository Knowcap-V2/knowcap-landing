'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, User, Code, TrendingUp, Megaphone, Users as UsersIcon, Target, Rocket } from 'lucide-react'
import Footer from '@/components/footer'

export default function CareersPage() {
  const [currentView, setCurrentView] = useState<'home' | string>('home')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedin: '',
    portfolio: '',
    ai_project: '',
    resume: null as File | null,
    role: ''
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Handle URL hash navigation
    const hash = window.location.hash.substring(1) || 'home'
    setCurrentView(hash)
  }, [])

  useEffect(() => {
    // Update hash when view changes
    if (currentView !== 'home') {
      window.location.hash = currentView
    } else {
      window.location.hash = ''
    }
  }, [currentView])

  const jobData: Record<string, any> = {
    'founding-ai-engineer': {
      title: 'Founding AI Engineer (Path to CTO)',
      compensation: 'EGP 840k - 2.4M Annually + Founding Equity (2.0% - 10.0%)',
      sections: [
        {
          title: 'The Opportunity',
          content: 'We are looking for a partner, not an employee. We bring 10 years of domain expertise in Service Delivery and a "hair-on-fire" sales pipeline of 500+ potential agency clients. We need You to build the technical soul of the company. You will start by shipping code Day 1, and as the team scales, you will have the path to evolve into the CTO role, owning the entire technical organization.'
        },
        {
          title: 'Compensation',
          content: 'The total compensation for this role is a combination of a competitive salary and significant founding team equity. The expected salary range is **EGP 840,000 - 2,400,000 annually (approx. EGP 70,000 - 200,000 monthly)**. Our cash salary is benchmarked at the top of the Egyptian market. However, this is a founding team role, not a standard salaried position. The primary financial opportunity is in the **significant, life-changing equity package (2.0% - 10.0%)**. We are looking for a partner to build this company with us and share in the massive upside of that success.'
        },
        {
          title: 'The Mission (The "Evolution")',
          content: '**Phase 1 (Months 1-6):** You are the Lead Architect & Coder. You will build the Visual Transcription Engine (VTE)—the system that watches screens and audio to eliminate 20–40% of project rework. You optimize for Unit Economics and Latency.\n\n**Phase 2 (Months 6-12):** You become the Engineering Lead. You will hire 2-3 junior engineers to scale what you built.\n\n**Phase 3 (Year 1+):** You become the CTO. You own the technical roadmap, security, and infrastructure for the entire company.'
        }
      ]
    },
    'head-of-growth': {
      title: 'Head of Growth (Revenue Partner)',
      compensation: 'EGP 600,000 - 1,800,000 annually',
      sections: [
        {
          title: 'The Role: Scientist of Revenue',
          content: 'We are looking for a Head of Growth who is actually a "Scientist of Revenue." You are here to build the engine that acquires, activates, and retains customers. You will inherit a product with massive potential and a CEO ready to close, but you need to build the bridge between the two.'
        },
        {
          title: 'Key Responsibilities',
          content: '• Own the "Full Funnel" Architecture\n• Build the Outbound Machine\n• The "Build in Public" Strategy\n• Data & Attribution\n• Rapid Experimentation'
        }
      ]
    },
    'content-creator-intern': {
      title: 'Content Creator Interns',
      compensation: 'EGP 8,000 - 12,000 monthly',
      sections: [
        {
          title: 'The Opportunity',
          content: 'Forget boring internships where you just fetch coffee. You are our media team. We are a startup building world-changing AI, and your mission is to turn our journey into a viral Build in Public show on TikTok, Reels, and LinkedIn. Your camera is your all-access pass to the startup reality show everyone wishes they could see.'
        }
      ]
    },
    'product-manager': {
      title: 'Product Manager',
      compensation: 'EGP 900,000 - 1,500,000 annually',
      sections: [
        {
          title: 'The Opportunity',
          content: 'We are not building another project management tool. We are building the source of truth for all project work—the Verified Delivery OS. As our first Product Manager, you are the CEO of our core intellectual property.'
        }
      ]
    },
    'qa-specialist': {
      title: 'AI Trust & Reliability Specialist (QA)',
      compensation: 'EGP 600,000 - 950,000 annually',
      sections: [
        {
          title: 'The Opportunity',
          content: 'In a world of AI hallucinations, trust is our most valuable asset. We are looking for a specialist who is obsessed with the truth. Your job is not just to find bugs, but to be the guardian of our verification promise.'
        }
      ]
    },
    'executive-assistant': {
      title: 'Executive Assistant',
      compensation: 'EGP 480,000 - 800,000 annually',
      sections: [
        {
          title: 'The Opportunity',
          content: 'We are looking for a true business partner to serve as the operational backbone of the company. This is not a typical EA role; you are the CEO force multiplier. Your primary mission is to create leverage and reclaim executive time as the company most valuable resource.'
        }
      ]
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('submitting')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('fullName', formData.fullName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('linkedin', formData.linkedin)
      formDataToSend.append('portfolio', formData.portfolio)
      formDataToSend.append('ai_project', formData.ai_project)
      formDataToSend.append('role', formData.role)
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume)
      }

      const response = await fetch('/api/submit-recruitment', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          fullName: '',
          email: '',
          linkedin: '',
          portfolio: '',
          ai_project: '',
          resume: null,
          role: ''
        })
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      setSubmitStatus('error')
    }
  }

  if (currentView === 'home') {
    return (
      <main className="min-h-screen" style={{ background: 'var(--bg-light-pitch)' }}>
        {/* Hero */}
        <section className="relative py-24 bg-white" style={{ background: 'radial-gradient(circle at 50% 0%, #E3F2FD 0%, #F8FAFC 70%)' }}>
          <div className="hero-blur"></div>
          <div className="max-w-[1100px] mx-auto px-6 text-center relative z-10">
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '1.2', marginBottom: '1.5rem' }}>
              Stop Documenting Work.<br />Start Verifying It.
            </h1>
            <h2 style={{ fontSize: '1.5rem', opacity: 0.8, marginTop: '1rem', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
              AI That Turns Your Meetings and Screen Work Into Verifiable Project Memory.
            </h2>
            <div className="max-w-prose mx-auto" style={{ marginTop: '2rem' }}>
              <p>Every summary, task, and decision is automatically generated and linked to the exact moment in the video proof—giving your team context you can finally trust.</p>
            </div>
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', marginTop: '1rem' }}>
              📍 New Cairo HQ • In-Person High-Velocity Environment
            </div>
          </div>
        </section>

        {/* Why Work Here */}
        <section className="container max-w-[1100px] mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="slide-label mb-6">WHY BUILD AT KNOWCAP.AI?</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 700, marginTop: 0 }}>
              Join a Mission, Not Just a Company.
            </h2>
            <p className="max-w-prose mx-auto" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--gray-text)' }}>
              We are a small, obsessed team building the missing layer of enterprise productivity. If you are driven by solving hard problems with massive real-world impact, this is the place for you.
            </p>
          </div>

          {/* Team */}
          <h4 className="text-center text-xl mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Meet the Founding Team</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="text-center pitch-card" style={{ padding: '2rem' }}>
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.25rem' }}>Founder & CEO</h4>
              <p style={{ color: 'var(--primary-blue)' }}>Leadership Team</p>
            </div>
            <div className="text-center pitch-card" style={{ padding: '2rem' }}>
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.25rem' }}>Shady</h4>
              <p style={{ color: 'var(--primary-blue)' }}>Founding Partner</p>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="container max-w-[1100px] mx-auto px-6 pb-20">
          <h2 className="text-center mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem' }}>Join the Founding Team</h2>
          
          <h3 className="slide-label mb-6">TECHNICAL & AI</h3>
          <div className="grid md:grid-cols-1 gap-6 mb-12">
            <div className="pitch-card hover:scale-[1.02] transition-all" style={{ padding: '2.5rem' }}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', marginBottom: '1rem' }}>Founding AI Engineer (Path to CTO)</h4>
              <p style={{ marginBottom: '1rem' }}>The technical soul of the company. A partner to build the core AI engine from scratch and evolve into the CTO as we scale.</p>
              <p style={{ marginBottom: '1.5rem' }}><strong>💰 Compensation:</strong> EGP 840k - 2.4M Annually + Founding Equity (2.0% - 10.0%)</p>
              <button 
                onClick={() => { setCurrentView('founding-ai-engineer'); setFormData({...formData, role: 'Founding AI Engineer'}) }}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ background: 'var(--primary-blue)' }}
              >
                Learn More & Apply →
              </button>
            </div>
          </div>

          <h3 className="slide-label mb-6">GROWTH & REVENUE</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="pitch-card hover:scale-[1.02] transition-all" style={{ padding: '2.5rem' }}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', marginBottom: '1rem' }}>Head of Growth (Revenue Partner)</h4>
              <p style={{ marginBottom: '1.5rem' }}>The engine that turns our potential into a calendar full of qualified demos. You own the strategy, the funnel, and the data.</p>
              <button 
                onClick={() => { setCurrentView('head-of-growth'); setFormData({...formData, role: 'Head of Growth'}) }}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ background: 'var(--primary-blue)' }}
              >
                Learn More & Apply →
              </button>
            </div>
            <div className="pitch-card hover:scale-[1.02] transition-all" style={{ padding: '2.5rem' }}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', marginBottom: '1rem' }}>Content Creator Interns</h4>
              <p style={{ marginBottom: '1.5rem' }}>Our frontline storytellers. Your mission is to turn our journey into a must-watch Build in Public reality show. (3 roles available).</p>
              <button 
                onClick={() => { setCurrentView('content-creator-intern'); setFormData({...formData, role: 'Content Creator Intern'}) }}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ background: 'var(--primary-blue)' }}
              >
                Learn More & Apply →
              </button>
            </div>
          </div>

          <h3 className="slide-label mb-6">PRODUCT & OPERATIONS</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="pitch-card hover:scale-[1.02] transition-all" style={{ padding: '2.5rem' }}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', marginBottom: '1rem' }}>Product Manager</h4>
              <p style={{ marginBottom: '1.5rem' }}>The CEO of our core intellectual property, owning the roadmap that transforms raw interactions into structured, verifiable insights.</p>
              <button 
                onClick={() => { setCurrentView('product-manager'); setFormData({...formData, role: 'Product Manager'}) }}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ background: 'var(--primary-blue)' }}
              >
                Learn More & Apply →
              </button>
            </div>
            <div className="pitch-card hover:scale-[1.02] transition-all" style={{ padding: '2.5rem' }}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', marginBottom: '1rem' }}>AI Trust & Reliability Specialist (QA)</h4>
              <p style={{ marginBottom: '1.5rem' }}>The guardian of our verification promise. You are the last line of defense protecting our users from a single piece of bad data.</p>
              <button 
                onClick={() => { setCurrentView('qa-specialist'); setFormData({...formData, role: 'QA Specialist'}) }}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ background: 'var(--primary-blue)' }}
              >
                Learn More & Apply →
              </button>
            </div>
            <div className="pitch-card hover:scale-[1.02] transition-all" style={{ padding: '2.5rem' }}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', marginBottom: '1rem' }}>Executive Assistant</h4>
              <p style={{ marginBottom: '1.5rem' }}>The operational backbone of the company. Your mission is to create leverage and reclaim executive time as our most valuable resource.</p>
              <button 
                onClick={() => { setCurrentView('executive-assistant'); setFormData({...formData, role: 'Executive Assistant'}) }}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ background: 'var(--primary-blue)' }}
              >
                Learn More & Apply →
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  // Job Detail View
  const job = jobData[currentView]
  if (!job) {
    setCurrentView('home')
    return null
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-light-pitch)' }}>
      <div className="container max-w-[1100px] mx-auto px-6 py-8">
        <button 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Back to All Roles
        </button>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', marginBottom: '2rem' }}>{job.title}</h1>
            
            {job.sections.map((section: any, index: number) => (
              <div key={index} className="pitch-card mb-6" style={{ padding: '2.5rem' }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', marginBottom: '1rem', marginTop: 0 }}>{section.title}</h3>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                  {section.content}
                </div>
              </div>
            ))}

            {/* Application Form */}
            <div className="pitch-card" style={{ padding: '2.5rem', marginTop: '3rem' }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', marginBottom: '1.5rem' }}>Join the Mission</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-text)', marginBottom: '2rem' }}>
                Submit your essentials here. If your profile is a strong match, we will reach out with the detailed application challenges for this role.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block font-semibold mb-2" style={{ color: 'var(--dark-bg)' }}>Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#005EFF] focus:ring-2 focus:ring-[#005EFF]/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2" style={{ color: 'var(--dark-bg)' }}>Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#005EFF] focus:ring-2 focus:ring-[#005EFF]/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2" style={{ color: 'var(--dark-bg)' }}>LinkedIn Profile (Optional)</label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#005EFF] focus:ring-2 focus:ring-[#005EFF]/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2" style={{ color: 'var(--dark-bg)' }}>Portfolio / GitHub (Optional)</label>
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#005EFF] focus:ring-2 focus:ring-[#005EFF]/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2" style={{ color: 'var(--dark-bg)' }}>Something Cool You Did with AI</label>
                    <textarea
                      value={formData.ai_project}
                      onChange={(e) => setFormData({...formData, ai_project: e.target.value})}
                      rows={3}
                      placeholder="Share a project you have built, or a concept you would love to bring to life."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#005EFF] focus:ring-2 focus:ring-[#005EFF]/20 outline-none resize-vertical"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2" style={{ color: 'var(--dark-bg)' }}>Resume / CV</label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFormData({...formData, resume: e.target.files?.[0] || null})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white cursor-pointer"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">Failed to submit application. Please try again.</p>
                    </div>
                  )}

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-600 text-sm font-semibold">Application submitted successfully! We will be in touch if your profile is a strong match.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                    className="w-full py-4 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
                    style={{ background: 'var(--primary-blue)', fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {submitStatus === 'submitting' ? 'Submitting...' : submitStatus === 'success' ? 'Submitted!' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="pitch-card sticky top-8" style={{ padding: '1.5rem' }}>
              <h5 className="text-sm font-bold mb-4 uppercase" style={{ color: 'var(--gray-text)' }}>Other Open Roles</h5>
              <ul className="space-y-2">
                {Object.entries(jobData).map(([key, data]) => (
                  <li key={key}>
                    <button
                      onClick={() => { setCurrentView(key); setFormData({...formData, role: data.title}) }}
                      className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors text-sm font-medium"
                      style={{ color: currentView === key ? 'var(--primary-blue)' : 'var(--dark-bg)' }}
                    >
                      {data.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  )
}
