
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function PitchPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Slide 1: Title */}
      <section className="relative min-h-screen flex items-center justify-center hero-bg">
        <div className="hero-blur"></div>
        
        <div className="max-w-[1024px] mx-auto px-8 py-20 text-center relative z-10">
          <div className={`transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F2FF] border border-[#005EFF]/20 mb-6">
              <span className="text-sm font-semibold text-[#005EFF]">
                Teams using Knowcap cut onboarding time by 70%
              </span>
            </div>

            <h1 className="text-[60px] font-semibold leading-[72px] text-[#191F2E] mb-6">
              Knowcap.ai — The AI Governance Layer for{' '}
              <span className="text-[#005EFF]">Professional Services</span>
            </h1>
            
            <p className="text-xl leading-[30px] text-[#414651] mb-8 max-w-3xl mx-auto">
              We are building the AI accountability and governance platform for professional-services teams—consultants, agencies, and ERP implementers.
            </p>
            
            <p className="text-xl leading-[30px] text-[#414651] mb-12 max-w-3xl mx-auto">
              Knowcap ensures every discussion, decision, and workflow becomes measurable, verifiable output.
            </p>

            <div className="inline-flex items-center gap-3 px-8 py-4 bg-[#F5F5F5] rounded-xl mb-12">
              <div className="text-left">
                <p className="text-sm font-semibold text-[#535862] uppercase tracking-wider mb-1">Funding Ask</p>
                <p className="text-2xl font-semibold text-[#191F2E]">
                  Raising $750K SAFE @ $14M pre-money
                </p>
                <p className="text-base text-[#414651] mt-2">
                  To capture the Odoo partner market and reach $1.2M ARR by end of 2026
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button 
                size="lg"
                variant="outline"
                onClick={() => window.location.href = 'https://knowcap.ai/invest'}
                className="bg-white hover:bg-gray-50"
              >
                Book a Demo
              </Button>
              <Button 
                size="lg"
                onClick={() => window.location.href = 'https://knowcap.ai/beta'}
                className="bg-[#191F2E] hover:bg-[#2A303E] text-white"
              >
                Apply for Beta Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2: The Core Problem */}
      <section className="py-24 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 2</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              The Core Problem
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              Service Firms Leak Profit Every Time Knowledge Changes Hands
            </h3>
          </div>

          <div className="space-y-8">
            <p className="text-lg text-[#414651] leading-relaxed">
              The $3T+ global professional-services economy runs on thin margins (10–30%), where payroll consumes 70–90% of costs.
              Every lost hour directly reduces profit.
            </p>

            <div>
              <h4 className="text-xl font-semibold text-[#191F2E] mb-4">Knowledge is trapped in ungoverned formats:</h4>
              <div className="space-y-4">
                <div className="flex gap-4 items-start p-6 bg-[#F5F5F5] rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-[#E9EAEB] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-[#414651]">1</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#191F2E] mb-2">Meetings</h5>
                    <p className="text-[#414651]">Key decisions vanish in calls and chats.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-6 bg-[#F5F5F5] rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-[#E9EAEB] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-[#414651]">2</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#191F2E] mb-2">Workflows</h5>
                    <p className="text-[#414651]">Screen-shared processes are never documented.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-6 bg-[#F5F5F5] rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-[#E9EAEB] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-[#414651]">3</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#191F2E] mb-2">Onboarding</h5>
                    <p className="text-[#414651]">New hires take weeks to ramp up.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg font-semibold">
                This "knowledge–action gap" causes project delays, rework, and margin erosion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3: The Solution */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 3</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              The Solution
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              The AI That Turns Meetings Into Measurable Output
            </h3>
          </div>

          <div className="space-y-8">
            <p className="text-lg text-[#414651] leading-relaxed">
              Knowcap listens to meetings and watches workflows in real time.
              It transforms spoken and visual context into timestamp-backed documentation:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl">
                <h4 className="font-semibold text-[#191F2E] mb-3 text-lg">Instant SOPs & Guides</h4>
                <p className="text-[#414651]">Step-by-step, with embedded video clips.</p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h4 className="font-semibold text-[#191F2E] mb-3 text-lg">Verifiable Artifacts</h4>
                <p className="text-[#414651]">Timestamped PRDs and Gap Analyses.</p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h4 className="font-semibold text-[#191F2E] mb-3 text-lg">One-Click Onboarding</h4>
                <p className="text-[#414651]">New hires ramp in minutes, not weeks.</p>
              </div>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg">
                It handles mixed-language conversations (e.g., Arabic–English) natively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: Differentiation */}
      <section className="py-24 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 4</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              Differentiation
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              Our Moat: The Visual Transcription Engine (VTE)
            </h3>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold text-[#191F2E] mb-4">Existing tools each solve one part:</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#F5F5F5] rounded-lg">
                  <p className="font-semibold text-[#191F2E] mb-2">Loom</p>
                  <p className="text-sm text-[#414651]">captures actions</p>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded-lg">
                  <p className="font-semibold text-[#191F2E] mb-2">Otter.ai</p>
                  <p className="text-sm text-[#414651]">captures speech</p>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded-lg">
                  <p className="font-semibold text-[#191F2E] mb-2">NotebookLM & ChatGPT</p>
                  <p className="text-sm text-[#414651]">summarize text</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-xl font-semibold mb-4">
                Knowcap unifies them all with the VTE — its proprietary engine that ties every AI output to a verifiable visual event.
              </p>
              <p className="text-[#D5D7DA] text-lg">
                No hallucinations. Every insight backed by proof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: Why Now */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 5</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              Why Now
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              AI Adoption Without Governance Is Creating a Trust Crisis
            </h3>
          </div>

          <div className="space-y-8">
            <p className="text-lg text-[#414651] leading-relaxed">
              Teams are using many fragmented AI tools — recorders, note-takers, assistants — but none are verifiable.
            </p>

            <div>
              <h4 className="text-xl font-semibold text-[#191F2E] mb-4">The risks:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <p className="text-[#414651]">No central memory.</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <p className="text-[#414651]">No traceable accountability.</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <p className="text-[#414651]">No verifiable source of truth.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg font-semibold">
                Knowcap provides the AI governance layer for accountability and compliance in AI-assisted work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6: Market Opportunity */}
      <section className="py-24 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 6</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              Market Opportunity
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              Targeting the $3T+ Service Economy by Starting with 5,000 Odoo Partners
            </h3>
          </div>

          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#F5F5F5] rounded-xl">
                <p className="text-sm font-semibold text-[#535862] uppercase mb-2">TAM</p>
                <p className="text-3xl font-bold text-[#191F2E] mb-2">$3T+</p>
                <p className="text-[#414651]">global professional-services market</p>
              </div>

              <div className="p-6 bg-[#F5F5F5] rounded-xl">
                <p className="text-sm font-semibold text-[#535862] uppercase mb-2">SAM</p>
                <p className="text-3xl font-bold text-[#191F2E] mb-2">$10B+</p>
                <p className="text-[#414651]">AI productivity & governance tools</p>
              </div>

              <div className="p-6 bg-[#F5F5F5] rounded-xl">
                <p className="text-sm font-semibold text-[#535862] uppercase mb-2">Beachhead</p>
                <p className="text-3xl font-bold text-[#191F2E] mb-2">5,000+</p>
                <p className="text-[#414651]">Odoo ERP partners</p>
              </div>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <h4 className="text-white text-xl font-semibold mb-4">Why Odoo partners?</h4>
              <p className="text-[#D5D7DA] text-lg mb-4">
                They face chronic delivery friction — handoffs between sales, PMs, and developers.
              </p>
              <p className="text-[#D5D7DA] text-lg">
                Our founder is a 10-year Odoo expert with deep credibility and direct access to this ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 7: Validation & Traction */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 7</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              Validation & Traction
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              Validated Results: 1 Live Partner, 7 Pre-Orders
            </h3>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl">
              <h4 className="text-xl font-semibold text-[#191F2E] mb-4">
                Live production partner (MENA region) has completed 25+ client projects using Knowcap:
              </h4>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-[#F5F5F5] rounded-lg">
                  <p className="text-3xl font-bold text-[#005EFF] mb-2">70%</p>
                  <p className="text-[#414651]">fewer support tickets</p>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded-lg">
                  <p className="text-3xl font-bold text-[#005EFF] mb-2">30–50%</p>
                  <p className="text-[#414651]">faster delivery</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl">
              <h4 className="text-xl font-semibold text-[#191F2E] mb-4">
                7 pre-order partners (committed for Q1 2026 launch):
              </h4>
              <div className="flex items-baseline gap-3 mb-6">
                <p className="text-3xl font-bold text-[#005EFF]">$7K MRR</p>
                <ArrowRight className="w-6 h-6 text-[#414651]" />
                <p className="text-3xl font-bold text-[#005EFF]">$84K ARR</p>
                <p className="text-[#414651]">projected</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-[#191F2E]">Testimonials:</h4>
              
              <div className="p-6 bg-white rounded-xl border-l-4 border-[#005EFF]">
                <p className="text-[#414651] italic mb-4">
                  "If the actual software performs like the demo, it will completely change how we handle implementation timelines."
                </p>
                <p className="text-sm font-semibold text-[#191F2E]">
                  — Muhammad Jamal, BI Solutions (KSA)
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl border-l-4 border-[#005EFF]">
                <p className="text-[#414651] italic mb-4">
                  "For every functional consultant in our firm who could previously handle 4 Odoo projects simultaneously, they can now manage 6 thanks to Knowcap. Consultants are scarce — we don't need to hire more, just empower the ones we have."
                </p>
                <p className="text-sm font-semibold text-[#191F2E]">
                  — Alejandro, BeWealthics (Odoo Partner, U.S.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 8: Business Model */}
      <section className="py-24 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 8</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              Business Model
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              High-Margin B2B SaaS with Enterprise Licensing Potential
            </h3>
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-[#F5F5F5] rounded-xl">
              <h4 className="text-xl font-semibold text-[#191F2E] mb-4">Primary Model: B2B SaaS</h4>
              <div className="space-y-3">
                <p className="text-[#414651]">• $500–$1,000 / team / month</p>
                <p className="text-[#414651]">• Average client MRR: $1,000</p>
                <p className="text-[#414651]">• <span className="font-semibold text-[#005EFF]">85% gross margin</span></p>
              </div>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <h4 className="text-white text-xl font-semibold mb-4">Enterprise Model:</h4>
              <div className="space-y-3 text-[#D5D7DA]">
                <p>• Custom integrations, analytics, and compliance modules</p>
                <p>• Regional licensing for our Visual Transcription Engine</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 9: Unit Economics */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 9</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              Unit Economics
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              &lt;1 Month CAC Payback and 30:1 LTV:CAC
            </h3>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0A0D12]">
                    <th className="text-left p-4 text-white font-semibold">Metric</th>
                    <th className="text-left p-4 text-white font-semibold">Value</th>
                    <th className="text-left p-4 text-white font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-4 text-[#414651]">Avg. MRR / Client</td>
                    <td className="p-4 text-[#191F2E] font-semibold">$1,000</td>
                    <td className="p-4 text-[#535862]">1–2 teams per client</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-4 text-[#414651]">Variable Cost / Client</td>
                    <td className="p-4 text-[#191F2E] font-semibold">$150</td>
                    <td className="p-4 text-[#535862]">Cloud / LLM costs</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-4 text-[#414651]">Gross Margin</td>
                    <td className="p-4 text-[#005EFF] font-bold">85%</td>
                    <td className="p-4 text-[#535862]">$850 monthly contribution</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-4 text-[#414651]">CAC</td>
                    <td className="p-4 text-[#191F2E] font-semibold">&lt;$300</td>
                    <td className="p-4 text-[#535862]">Founder-led sales</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-4 text-[#414651]">CAC Payback</td>
                    <td className="p-4 text-[#005EFF] font-bold">&lt;1 Month</td>
                    <td className="p-4 text-[#535862]">—</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-4 text-[#414651]">LTV (90% retention)</td>
                    <td className="p-4 text-[#191F2E] font-semibold">$10,000</td>
                    <td className="p-4 text-[#535862]">—</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-[#414651]">LTV:CAC</td>
                    <td className="p-4 text-[#005EFF] font-bold">&gt;30:1</td>
                    <td className="p-4 text-[#535862]">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg">
                <span className="font-semibold">Break-even:</span> ~$41K MRR (~50 clients) projected by Q4 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 10: Product Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 10</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              Product Vision
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              From Project Memory to Project Execution — "Vibe Tasking"
            </h3>
          </div>

          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#F5F5F5] rounded-xl">
                <div className="w-12 h-12 rounded-full bg-[#005EFF] text-white flex items-center justify-center font-bold text-xl mb-4">1</div>
                <h4 className="text-xl font-semibold text-[#191F2E] mb-2">Phase 1 (Now)</h4>
                <p className="text-[#414651]">AI captures and verifies knowledge.</p>
              </div>

              <div className="p-6 bg-[#F5F5F5] rounded-xl">
                <div className="w-12 h-12 rounded-full bg-[#005EFF] text-white flex items-center justify-center font-bold text-xl mb-4">2</div>
                <h4 className="text-xl font-semibold text-[#191F2E] mb-2">Phase 2 (Next)</h4>
                <p className="text-[#414651]">Vibe Tasking — AI acts on that knowledge.</p>
              </div>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <h4 className="text-white text-xl font-semibold mb-4">Example:</h4>
              <p className="text-[#D5D7DA] text-lg mb-6">
                Knowcap hears a decision in a meeting, observes the implementation, and automatically closes the corresponding Jira ticket with proof video.
              </p>
              <div className="p-4 bg-[#181D27] rounded-lg">
                <p className="text-white font-semibold">
                  Early Tests: <span className="text-[#005EFF]">60%</span> of project tasks can already be auto-completed with human verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 11: Financial Projections */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 11</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              Financial Projections
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              Path to $1.2M ARR by End of 2026 — 85% Gross Margin
            </h3>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0A0D12]">
                    <th className="text-left p-4 text-white font-semibold">Year</th>
                    <th className="text-left p-4 text-white font-semibold">ARR</th>
                    <th className="text-left p-4 text-white font-semibold">Gross Margin</th>
                    <th className="text-left p-4 text-white font-semibold">Key Assumptions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-4 text-[#191F2E] font-semibold">2026</td>
                    <td className="p-4 text-[#005EFF] font-bold text-xl">$1.2M</td>
                    <td className="p-4 text-[#191F2E] font-semibold">85%</td>
                    <td className="p-4 text-[#535862]">Launch Jan 2026, grow to 100 clients. Break-even Q4 2026 (~50 clients).</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-4 text-[#191F2E] font-semibold">2027</td>
                    <td className="p-4 text-[#005EFF] font-bold text-xl">$3.5M</td>
                    <td className="p-4 text-[#191F2E] font-semibold">88%</td>
                    <td className="p-4 text-[#535862]">Regional expansion (EU / MENA).</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-[#191F2E] font-semibold">2028</td>
                    <td className="p-4 text-[#005EFF] font-bold text-xl">$9–10M</td>
                    <td className="p-4 text-[#191F2E] font-semibold">90%</td>
                    <td className="p-4 text-[#535862]">Enterprise scale and automation.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl">
                <p className="text-sm font-semibold text-[#535862] uppercase mb-2">Launch (Jan 2026)</p>
                <p className="text-3xl font-bold text-[#005EFF]">$7K MRR</p>
              </div>

              <div className="p-6 bg-white rounded-xl">
                <p className="text-sm font-semibold text-[#535862] uppercase mb-2">Break-even</p>
                <p className="text-3xl font-bold text-[#005EFF]">Q4 2026</p>
                <p className="text-[#414651] text-sm mt-2">~50 clients</p>
              </div>

              <div className="p-6 bg-white rounded-xl">
                <p className="text-sm font-semibold text-[#535862] uppercase mb-2">Runway</p>
                <p className="text-3xl font-bold text-[#005EFF]">18 months</p>
                <p className="text-[#414651] text-sm mt-2">post-raise</p>
              </div>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg">
                <span className="font-semibold">Monthly Burn:</span> ~$41K
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 12: Go-to-Market */}
      <section className="py-24 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 12</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              Go-to-Market
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              Land 1% of Odoo Partners → 50 Clients → Break-Even
            </h3>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-[#F5F5F5] rounded-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#005EFF] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                <div>
                  <h4 className="text-xl font-semibold text-[#191F2E] mb-2">Phase 1 (0–12 mo)</h4>
                  <p className="text-[#414651] mb-3">
                    Founder-led sales and community marketing in the Odoo ecosystem.
                  </p>
                  <p className="text-[#191F2E] font-semibold">
                    Goal: Capture 50 Odoo partners (1%) = ~$600K ARR = break-even
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#F5F5F5] rounded-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#005EFF] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                <div>
                  <h4 className="text-xl font-semibold text-[#191F2E] mb-2">Phase 2 (12–24 mo)</h4>
                  <p className="text-[#414651]">
                    Leverage partner case studies to expand into other ERP ecosystems (SAP, NetSuite).
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white text-[#0A0D12] flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Phase 3 (24+ mo)</h4>
                  <p className="text-[#D5D7DA]">
                    Move upmarket to enterprise consultancies and global system integrators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 13: The Team */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 13</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              The Team
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              Expert-Level Founder-Market Fit
            </h3>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl">
              <h4 className="text-2xl font-semibold text-[#191F2E] mb-3">Hassan Sam Arslan</h4>
              <p className="text-[#005EFF] font-semibold mb-4">Founder & CEO</p>
              <div className="space-y-2 text-[#414651]">
                <p>• 10+ years in ERP, e-commerce, and AI-driven operations</p>
                <p>• Founder of Ariika and SMEtools LLC (US)</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl">
              <h4 className="text-2xl font-semibold text-[#191F2E] mb-3">Hesham Tarek</h4>
              <p className="text-[#005EFF] font-semibold mb-4">Technical Founder / CTO</p>
              <div className="space-y-2 text-[#414651]">
                <p>• AI systems and Firebase specialist</p>
                <p>• Architect of Knowcap's memory and governance infrastructure</p>
              </div>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <h4 className="text-white text-xl font-semibold mb-4">Core Team (Q1 2026)</h4>
              <div className="space-y-2 text-[#D5D7DA]">
                <p>• Hiring 3 engineers in Egypt to optimize burn and accelerate development</p>
                <p>• Development based in Egypt; HQ in Dubai (Meydan FZCO)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 14: Advisors */}
      <section className="py-24 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 14</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-[#191F2E] mb-6">
              Advisors
            </h2>
            <h3 className="text-3xl font-semibold text-[#414651] mb-8">
              Guided by Proven SaaS and Growth Leaders
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#F5F5F5] p-8 rounded-xl">
              <h4 className="text-2xl font-semibold text-[#191F2E] mb-4">Dan Martell</h4>
              <p className="text-[#414651]">
                SaaS growth mentor and investor in Intercom and Udemy.
              </p>
            </div>

            <div className="bg-[#F5F5F5] p-8 rounded-xl">
              <h4 className="text-2xl font-semibold text-[#191F2E] mb-4">Tarek Sakr</h4>
              <p className="text-[#414651]">
                Founder of 4Sale (Kuwait's leading marketplace), regional scaling expert.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 15: The Ask */}
      <section className="py-24 bg-[#0A0D12]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-12">
            <p className="text-base font-semibold text-[#005EFF] uppercase tracking-[0.64px] mb-4">Slide 15</p>
            <h2 className="text-5xl font-semibold leading-[52.8px] text-white mb-6">
              The Ask
            </h2>
            <h3 className="text-3xl font-semibold text-[#D5D7DA] mb-8">
              $750K SAFE @ $14M Pre — 18 Months to Profitability
            </h3>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl">
              <h4 className="text-2xl font-semibold text-[#191F2E] mb-6">Use of Funds (18-Month Runway)</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-32 h-12 bg-[#005EFF] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">40%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#191F2E]">Product & Engineering</p>
                    <p className="text-sm text-[#535862]">CTO + 3 hires</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32 h-12 bg-[#005EFF] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">30%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#191F2E]">Growth & GTM</p>
                    <p className="text-sm text-[#535862]">marketing, pilots, partnerships</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32 h-12 bg-[#005EFF] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">30%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#191F2E]">Ops / Infra / Legal</p>
                    <p className="text-sm text-[#535862]">operations, cloud, compliance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#181D27] p-8 rounded-xl">
              <h4 className="text-white text-2xl font-semibold mb-6">Milestones by End of Runway</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#005EFF] flex-shrink-0" />
                  <p className="text-[#D5D7DA] text-lg">50+ paying partners</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#005EFF] flex-shrink-0" />
                  <p className="text-[#D5D7DA] text-lg">$1.2M ARR</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#005EFF] flex-shrink-0" />
                  <p className="text-[#D5D7DA] text-lg">Repeatable GTM playbook ready for scale into other ERP ecosystems</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-12">
              <Button 
                size="lg"
                className="bg-white text-[#0A0D12] hover:bg-gray-100 text-xl px-12 py-6 h-auto"
                onClick={() => window.location.href = 'https://knowcap.ai/invest'}
              >
                Let's Talk
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-white border-t border-[#E9EAEB]">
        <div className="max-w-[1024px] mx-auto px-8 text-center">
          <p className="text-[#535862] mb-4">
            Ready to learn more?
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = 'https://knowcap.ai/invest'}
            >
              Book a Demo
            </Button>
            <Button 
              size="lg"
              onClick={() => window.location.href = 'https://knowcap.ai'}
            >
              Visit Website
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
