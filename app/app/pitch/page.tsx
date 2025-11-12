
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
        
        <div className="max-w-[1024px] mx-auto px-8 py-20 relative z-10">
          <div className={`transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-[60px] font-semibold leading-[72px] text-[#191F2E] mb-8 text-center">
              Knowcap Turns Meetings and Screen Work Into Verified Project Documents — Automatically
            </h1>
            
            <p className="text-xl leading-[34px] text-[#535862] mb-12 text-center max-w-4xl mx-auto">
              Category: AI Platform for Verified Project Documentation and Client Accountability
            </p>

            <div className="space-y-8 mb-12 text-center max-w-4xl mx-auto">
              <p className="text-xl leading-relaxed text-[#414651]">
                Knowcap records meetings and screen workflows, then automatically generates contracts, quotations, and SOPs — each line linked to the exact video moment every decision was made.
              </p>
            </div>

            <div className="bg-[#0A0D12] rounded-xl p-10 max-w-3xl mx-auto">
              <p className="text-sm font-semibold text-[#D5D7DA] uppercase tracking-wider mb-4">Result</p>
              <div className="space-y-4">
                <p className="text-xl text-white leading-relaxed">
                  The first platform that creates verified client documentation from real project activity. Projects document themselves, rework drops ≈ 30 %, and clients can confirm every decision through video-linked proof.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2: Traction */}
      <section className="py-28 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 2: Traction</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              1 pilot client, 7 projects, 30 % time saved — $84 K ARR in pre-orders
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              In our pilot with <strong className="font-semibold text-[#191F2E]">SMEtools</strong>, average project time dropped from 500 to 350 hours (–150 h).<br/>
              At $150 / hour, that's <strong className="font-semibold text-[#191F2E]">≈ $22.5 K saved per project</strong> — before the product was even finished.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#F5F5F5] p-8 rounded-xl text-center">
                <p className="text-4xl font-bold text-[#005EFF] mb-3">30%</p>
                <p className="text-[#414651] font-medium">reduction in billable hours</p>
              </div>

              <div className="bg-[#F5F5F5] p-8 rounded-xl text-center">
                <p className="text-4xl font-bold text-[#005EFF] mb-3">$84K</p>
                <p className="text-[#414651] font-medium">ARR in verified pre-orders</p>
              </div>

              <div className="bg-[#F5F5F5] p-8 rounded-xl text-center">
                <p className="text-4xl font-bold text-[#005EFF] mb-3">90%</p>
                <p className="text-[#414651] font-medium">of sessions produced usable docs</p>
              </div>
            </div>

            <div className="bg-[#F5F5F5] p-8 rounded-xl">
              <p className="text-lg text-[#414651] mb-4">
                Early pilot delivered measurable ROI within 60 days — a 30 % reduction in billable hours across 7 live projects.
              </p>
              <p className="text-lg text-[#414651] mb-4">
                Generated $84 K ARR in verified pre-orders from clients requesting expansion post-pilot.
              </p>
              <p className="text-lg text-[#414651]">
                90 % of recorded sessions produced usable client documents automatically; manual reporting time nearly eliminated.
              </p>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg font-medium">
                <strong className="font-semibold text-[#005EFF]">Result:</strong> Proven commercial demand and quantifiable efficiency gains — strong traction ahead of full launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3: The Problem */}
      <section className="py-28 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 3: The Problem</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              Service firms lose up to 30 % of billable time from process drift, scope creep, admin overhead, and knowledge loss
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              In a <strong className="font-semibold text-[#191F2E]">$3 T services market</strong> where payroll consumes 80 % of cost, even small inefficiencies erase profit — most caused by undocumented work and missing proof.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start p-8 bg-white rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-base font-bold text-[#005EFF]">1</span>
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Process Drift / Instruction Deviation</h5>
                  <p className="text-[#414651] leading-relaxed">Juniors follow steps out of sequence → timelines slip.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-8 bg-white rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-base font-bold text-[#005EFF]">2</span>
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Scope Creep / Requirements Drift</h5>
                  <p className="text-[#414651] leading-relaxed">Clients recall extra items months later → unpaid work absorbed.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-8 bg-white rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-base font-bold text-[#005EFF]">3</span>
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Manual Documentation Overhead</h5>
                  <p className="text-[#414651] leading-relaxed">Consultants spend 2–3 hours rewriting notes after calls instead of billing.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-8 bg-white rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-base font-bold text-[#005EFF]">4</span>
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Knowledge Loss</h5>
                  <p className="text-[#414651] leading-relaxed">Seniors re-explain tasks repeatedly; know-how never compounds.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg font-medium">
                <strong className="font-semibold text-[#005EFF]">Impact:</strong> With 70–90 % of cost locked in payroll, a 10 % loss of billable hours can erase 100 % of project profit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: The Solution */}
      <section className="py-28 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 4: The Solution</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              Knowcap recovers 20–30 % of lost billable time by automating capture, verification, and documentation
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed mb-8">
              From configuration errors to client disputes, Knowcap's <strong className="font-semibold text-[#191F2E]">AI project memory system</strong> solves the four biggest causes of margin loss — turning meetings and screen work into instant, timestamp-linked documents with video proof.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Process Drift */}
              <div className="bg-[#F5F5F5] p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#191F2E] mb-4">Process Drift</h4>
                <div className="space-y-3 text-[#414651]">
                  <p><strong className="text-[#191F2E]">Manager:</strong> "Did the junior follow our SOP?"</p>
                  <p><strong className="text-[#005EFF]">Knowcap:</strong> "Four steps correct, one missed. Timestamp 1:40 — click to review."</p>
                  <p className="text-sm font-semibold text-[#535862]">Outcome: Errors caught instantly, not after delivery.</p>
                </div>
              </div>

              {/* Scope Creep */}
              <div className="bg-[#F5F5F5] p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#191F2E] mb-4">Scope Creep</h4>
                <div className="space-y-3 text-[#414651]">
                  <p><strong className="text-[#191F2E]">Client:</strong> "We agreed you'd automate inventory alerts."</p>
                  <p><strong className="text-[#005EFF]">Knowcap:</strong> "Clip from March 5 — confirmed delivery only to step 3."</p>
                  <p className="text-sm font-semibold text-[#535862]">Outcome: Stops unpaid work before it starts.</p>
                </div>
              </div>

              {/* Admin Overhead */}
              <div className="bg-[#F5F5F5] p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#191F2E] mb-4">Admin Overhead</h4>
                <div className="space-y-3 text-[#414651]">
                  <p>After each meeting, Knowcap auto-creates structured docs with actions and owners.</p>
                  <p className="text-sm font-semibold text-[#535862]">Outcome: Saves ≈ 2 hours per meeting.</p>
                </div>
              </div>

              {/* Knowledge Loss */}
              <div className="bg-[#F5F5F5] p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#191F2E] mb-4">Knowledge Loss</h4>
                <div className="space-y-3 text-[#414651]">
                  <p><strong className="text-[#191F2E]">New consultant:</strong> "How do I handle multi-currency in Odoo?"</p>
                  <p><strong className="text-[#005EFF]">Knowcap:</strong> "Watch clip from May 10 — Hassan explained at 00:42."</p>
                  <p className="text-sm font-semibold text-[#535862]">Outcome: Onboarding compresses by weeks.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg font-medium">
                <strong className="font-semibold text-[#005EFF]">Result:</strong> Across pilots, these four improvements recovered ≈ 150 billable hours and eliminated 90 % of rework loops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: How It Works / Differentiation */}
      <section className="py-28 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 5: How It Works / Differentiation</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              The first AI that watches screens and listens to calls to build verifiable project memory
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              By combining <strong className="font-semibold text-[#191F2E]">screen vision, multilingual speech, and project-level memory</strong>, Knowcap creates a timestamped record of every action and decision — turning daily work into verified knowledge that can be audited or automated.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#005EFF] mb-3">Project-Level Context Graph</h4>
                <p className="text-[#414651]">Understands full projects, not isolated meetings; knows prior versions and approvals.</p>
              </div>

              <div className="bg-white p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#005EFF] mb-3">Visual Transcript Engine (VTE)</h4>
                <p className="text-[#414651]">Captures speech + screen in real time; indexes every click and step.</p>
              </div>

              <div className="bg-white p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#005EFF] mb-3">Multilingual & Mixed-Sentence Intelligence</h4>
                <p className="text-[#414651]">Handles English / French / Arabic mix to keep global teams aligned.</p>
              </div>

              <div className="bg-white p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#005EFF] mb-3">Timestamp-Linked Deliverables</h4>
                <p className="text-[#414651]">Every document or response links to the exact video moment it was captured — verification built in.</p>
              </div>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg font-medium">
                <strong className="font-semibold text-[#005EFF]">Result:</strong> Each verified step shortens delivery cycles and recovers lost billable hours, creating a compounding data advantage no other AI platform has.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6: Market Opportunity */}
      <section className="py-28 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 6: Market Opportunity</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              Entry Market: 7 500 Odoo Partners = $110 M ARR Opportunity
            </h2>
          </div>

          <div className="space-y-10">
            {/* TAM Visualization - Nested Rectangles */}
            <div className="bg-gradient-to-br from-[#F5F5F5] to-white p-8 rounded-xl">
              <h4 className="text-lg font-semibold text-[#191F2E] mb-8 text-center">Total Addressable Market</h4>
              
              {/* Outer Rectangle - $3T Professional Services */}
              <div className="bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] p-6 rounded-xl border-2 border-[#90CAF9]">
                <p className="text-sm font-semibold text-[#191F2E] mb-4">$3T Professional Services Market</p>
                
                {/* Middle Rectangle - $2.25B TAM */}
                <div className="bg-gradient-to-br from-[#90CAF9] to-[#64B5F6] p-6 rounded-xl border-2 border-[#42A5F5]">
                  <p className="text-sm font-semibold text-[#191F2E] mb-4">$2.25B TAM (Salesforce/SAP/Oracle)</p>
                  
                  {/* Inner Rectangle - $110M Entry Market */}
                  <div className="bg-gradient-to-br from-[#005EFF] to-[#1976D2] p-8 rounded-xl border-2 border-[#1565C0] shadow-lg">
                    <div className="text-center text-white">
                      <p className="text-3xl font-bold mb-2">$110M</p>
                      <p className="text-base font-semibold mb-1">Odoo Partners</p>
                      <p className="text-sm opacity-95">Entry Market</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F5F5] p-8 rounded-xl space-y-4">
              <p className="text-lg text-[#414651] leading-relaxed">
                Knowcap starts with <strong className="font-semibold text-[#191F2E]">7 500 Odoo implementation firms</strong> (7 500 × $15 K / year = ≈ $110 M addressable market). These firms lack a verification platform to prove what was done and when.
              </p>
              <p className="text-lg text-[#414651] leading-relaxed">
                Hassan's Odoo network (500 + direct contacts, 7 LOIs in 7 months, <strong className="font-semibold text-[#191F2E]">$0 CAC</strong>) provides immediate reach.
              </p>
              <p className="text-lg text-[#414651] leading-relaxed">
                <strong className="font-semibold text-[#191F2E]">Year 1 target:</strong> 100 customers = ≈ $1.2 M ARR (~1.1 % penetration).
              </p>
              <p className="text-lg text-[#414651] leading-relaxed">
                <strong className="font-semibold text-[#191F2E]">Years 2 – 3:</strong> Replicate to Salesforce, Oracle, and SAP partners (~150 000 firms = ≈ $2.25 B TAM).
              </p>
              <p className="text-lg text-[#414651] leading-relaxed">
                These teams lose 20–30 % of billable time to undocumented work — Knowcap recovers it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 7: Why Now */}
      <section className="py-28 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 7: Why Now</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              Service delivery AI adoption has exploded — but unverified output blocks enterprise rollout
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              Firms must use AI, but <strong className="font-semibold text-[#191F2E]">80 % cite 'lack of verification and accountability'</strong> as the barrier. Knowcap removes that risk.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start p-8 bg-white rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-[#005EFF]" />
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Behavioral Shift</h5>
                  <p className="text-[#414651]">Client work already runs on Zoom / Teams — fully recordable.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-8 bg-white rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-[#005EFF]" />
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Tech Inflection</h5>
                  <p className="text-[#414651]">Speech-to-text + screen vision hit commercial accuracy (2024).</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-8 bg-white rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-[#005EFF]" />
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Market Urgency</h5>
                  <p className="text-[#414651]">Big 4 firms need verifiable audit trails before AI deployment.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-8 bg-white rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-[#005EFF]" />
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Economic Pressure</h5>
                  <p className="text-[#414651]">Payroll-heavy firms must recover 20–30 % of lost billable time.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg font-medium">
                <strong className="font-semibold text-[#005EFF]">Window:</strong> AI delivery is inevitable. Knowcap arrives as the verification layer that enables trust in AI-assisted delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 8: Business Model */}
      <section className="py-28 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 8: Business Model</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              SaaS aligned with time saved — customers stay because every captured project builds their verified knowledge base
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              $500 – $5 K / month per firm — a fraction of hours saved. Value increases as each project adds verified data.
            </p>

            <div className="bg-[#F5F5F5] p-8 rounded-xl space-y-4">
              <p className="text-lg text-[#414651]">
                <strong className="font-semibold text-[#191F2E]">Pricing:</strong> Starter $500 / mo | Professional $1 K / mo | Enterprise $5 K / mo
              </p>
              <p className="text-lg text-[#414651]">
                <strong className="font-semibold text-[#191F2E]">Why It Works:</strong> One saved hour per day offsets the fee; alternatives can't verify or audit workflows.
              </p>
              <p className="text-lg text-[#414651]">
                <strong className="font-semibold text-[#191F2E]">Impact:</strong> Typical firm saves 1 500 + hours / year (≈ $230 K value) and delivers projects ≈ 30 % faster.
              </p>
              <p className="text-lg text-[#414651]">
                <strong className="font-semibold text-[#191F2E]">Retention:</strong> Each project expands a customer's verified dataset; churn drops as teams depend on their historical records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 9: Go-To-Market Strategy */}
      <section className="py-28 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 9: Go-To-Market Strategy</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              Starting with 7 500 Odoo partners to build the first network of AI-verified service firms
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              Launches in ERP ecosystem where the documentation gap is highest — then expands to all service teams running repeatable workflows.
            </p>

            <div className="bg-white p-8 rounded-xl space-y-4">
              <p className="text-lg text-[#414651]">
                <strong className="font-semibold text-[#191F2E]">Phase 1 (2025 – 2026):</strong> Target 7 500 Odoo partners → 100 firms → $1.5 M ARR.
              </p>
              <p className="text-lg text-[#414651]">
                <strong className="font-semibold text-[#191F2E]">Phase 2 (2026 – 2027):</strong> Expand into agencies and IT consultancies.
              </p>
              <p className="text-lg text-[#414651]">
                <strong className="font-semibold text-[#191F2E]">Phase 3 (2027 +):</strong> Open API + Agent Marketplace.
              </p>
              <p className="text-lg text-[#414651]">
                <strong className="font-semibold text-[#191F2E]">Pricing:</strong> Per-seat SaaS + usage-based credits (ACV $12 – 18 K).
              </p>
              <p className="text-lg text-[#414651]">
                <strong className="font-semibold text-[#191F2E]">Distribution Edge:</strong> Founder network cuts CAC ≈ 60 % and compresses sales cycles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 10: Financial Projections (v7) */}
      <section className="py-28 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 10: Financial Projections (v7)</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              Capital-Efficient Growth — Break-Even 2026, Scaling 3× Annually
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              $750 K raise funds go-to-market and product acceleration — not burn.
            </p>

            {/* Acquisition Flow Visualization */}
            <div className="bg-gradient-to-br from-[#005EFF]/5 to-[#443AFF]/5 p-8 rounded-xl">
              <h4 className="text-lg font-semibold text-[#191F2E] mb-6 text-center">Acquisition Flow Strategy</h4>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-2 border-[#005EFF]">
                  <p className="font-semibold text-[#005EFF]">Founder Network</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0" />
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-2 border-[#005EFF]">
                  <p className="font-semibold text-[#005EFF]">Referrals</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0" />
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-2 border-[#005EFF]">
                  <p className="font-semibold text-[#005EFF]">Integrations</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0" />
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-2 border-[#005EFF]">
                  <p className="font-semibold text-[#005EFF]">SDR</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0" />
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-2 border-[#005EFF]">
                  <p className="font-semibold text-[#005EFF]">Scale</p>
                </div>
              </div>
            </div>

            {/* Financial Table */}
            <div className="bg-[#F5F5F5] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0A0D12] text-white">
                    <tr>
                      <th className="text-left p-4 font-semibold">Year</th>
                      <th className="text-left p-4 font-semibold">Customers</th>
                      <th className="text-left p-4 font-semibold">ARR</th>
                      <th className="text-left p-4 font-semibold">Avg ACV</th>
                      <th className="text-left p-4 font-semibold">CAC Payback</th>
                      <th className="text-left p-4 font-semibold">Gross Margin</th>
                      <th className="text-left p-4 font-semibold">Primary Driver</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#414651]">
                    <tr className="border-b border-[#D5D7DA]">
                      <td className="p-4 font-medium text-[#191F2E]">2025 (Pilot)</td>
                      <td className="p-4">7 projects / 1 client</td>
                      <td className="p-4">Proof of ROI ($84 K pre-orders)</td>
                      <td className="p-4">—</td>
                      <td className="p-4">—</td>
                      <td className="p-4">80 %</td>
                      <td className="p-4">Founder sales + validation</td>
                    </tr>
                    <tr className="border-b border-[#D5D7DA]">
                      <td className="p-4 font-medium text-[#191F2E]">2026</td>
                      <td className="p-4">100</td>
                      <td className="p-4">$1.2 M</td>
                      <td className="p-4">$12 K</td>
                      <td className="p-4">{'< 2 mo'}</td>
                      <td className="p-4">85 %</td>
                      <td className="p-4">Funded GTM team + Odoo network</td>
                    </tr>
                    <tr className="border-b border-[#D5D7DA]">
                      <td className="p-4 font-medium text-[#191F2E]">2027</td>
                      <td className="p-4">300</td>
                      <td className="p-4">$3.6 M</td>
                      <td className="p-4">$12 K</td>
                      <td className="p-4">{'< 2 mo'}</td>
                      <td className="p-4">88 %</td>
                      <td className="p-4">Integrations + referrals</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-[#191F2E]">2028</td>
                      <td className="p-4">750 +</td>
                      <td className="p-4">$9 M +</td>
                      <td className="p-4">$12 K</td>
                      <td className="p-4">{'< 2 mo'}</td>
                      <td className="p-4">90 %</td>
                      <td className="p-4">AI-native automation (Vibe Tasking)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 bg-[#005EFF]/5 border-t-2 border-[#005EFF]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#005EFF] flex-shrink-0 mt-0.5" />
                  <p className="text-base text-[#191F2E] font-medium">
                    <strong>Financial Note:</strong> Assumes average monthly burn of ≈ $65K through 2026, including GTM hires and infrastructure.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F5F5] p-8 rounded-xl space-y-4">
              <p className="text-lg text-[#414651]">
                The $750 K SAFE funds transition from pilot proof to scalable sales engine — founder-led network to structured GTM team and integration channels.
              </p>
              <p className="text-lg text-[#414651]">
                85 % margins and 60-day payback keep growth capital-efficient; profitability by Q4 2026 is structural, not temporary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 11: Unit Economics (v8 – Final) */}
      <section className="py-28 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 11: Unit Economics (v8 – Final)</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              High-Margin SaaS — 60-Day Payback Proven by Pilot
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              Strong unit economics from day one; every new client compounds value through verified project memory.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#005EFF] mb-3">Average Contract</h4>
                <p className="text-[#414651]">≈ $1 K MRR / $12 K ARR per client (confirmed in pilot pre-orders)</p>
              </div>

              <div className="bg-white p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#005EFF] mb-3">CAC</h4>
                <p className="text-[#414651]">≈ $1 200 – $1 500 (founder network + referrals; early ads ≈ $10 K / mo projection)</p>
              </div>

              <div className="bg-white p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#005EFF] mb-3">Gross Margin</h4>
                <p className="text-[#414651]">≈ 85 % (software + cloud cost {'< 15 %}'})</p>
              </div>

              <div className="bg-white p-8 rounded-xl">
                <h4 className="text-lg font-semibold text-[#005EFF] mb-3">Payback Period</h4>
                <p className="text-[#414651]">≈ 1.2 months (1 saved hour per day offsets fee)</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl">
              <h4 className="text-lg font-semibold text-[#005EFF] mb-4">LTV: $36 K – $60 K</h4>
              <ul className="space-y-2 text-[#414651]">
                <li>• <strong className="text-[#191F2E]">Conservative:</strong> $12 K × 3 years = $36 K</li>
                <li>• <strong className="text-[#191F2E]">Expected:</strong> $12 K × 5 years = $60 K (10–15 % annual churn from pilot)</li>
                <li>• <strong className="text-[#191F2E]">High switching cost:</strong> Verified project memory makes replacement painful</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl">
              <h4 className="text-lg font-semibold text-[#005EFF] mb-3">Break-Even</h4>
              <p className="text-[#414651]">≈ 50 clients ($40 K MRR @ Q4 2026)</p>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg font-medium">
                <strong className="font-semibold text-[#005EFF]">Proof:</strong> Pilot clients already met target margins with $0 CAC; funded GTM maintains same economics at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 12: Path to 100 Customers (v7) */}
      <section className="py-28 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 12: Path to 100 Customers (v7)</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              From 7 Pre-Orders to 100 Paying Customers in 12 Months
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              Three compounding growth levers drive predictable ARR growth to $1.5 M by Q4 2026.
            </p>

            {/* Customer Growth Table */}
            <div className="bg-[#F5F5F5] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0A0D12] text-white">
                    <tr>
                      <th className="text-left p-4 font-semibold">Quarter (2026)</th>
                      <th className="text-left p-4 font-semibold">Primary Driver</th>
                      <th className="text-left p-4 font-semibold">New Customers</th>
                      <th className="text-left p-4 font-semibold">Cumulative</th>
                      <th className="text-left p-4 font-semibold">Projected MRR</th>
                      <th className="text-left p-4 font-semibold">CAC Note</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#414651]">
                    <tr className="border-b border-[#D5D7DA]">
                      <td className="p-4 font-medium text-[#191F2E]">Q1</td>
                      <td className="p-4">Convert 7 pre-orders + founder network outreach</td>
                      <td className="p-4">15</td>
                      <td className="p-4">22</td>
                      <td className="p-4">$22 K</td>
                      <td className="p-4">{'< $1 K'} (free reach)</td>
                    </tr>
                    <tr className="border-b border-[#D5D7DA]">
                      <td className="p-4 font-medium text-[#191F2E]">Q2</td>
                      <td className="p-4">Referral flywheel + case-study marketing</td>
                      <td className="p-4">23</td>
                      <td className="p-4">45</td>
                      <td className="p-4">$45 K</td>
                      <td className="p-4">≈ $1.2 K</td>
                    </tr>
                    <tr className="border-b border-[#D5D7DA]">
                      <td className="p-4 font-medium text-[#191F2E]">Q3</td>
                      <td className="p-4">Odoo App Store integration + co-marketing</td>
                      <td className="p-4">25</td>
                      <td className="p-4">70</td>
                      <td className="p-4">$70 K</td>
                      <td className="p-4">≈ $1.5 K</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-[#191F2E]">Q4</td>
                      <td className="p-4">SDR team + inbound brand content</td>
                      <td className="p-4">30</td>
                      <td className="p-4">100</td>
                      <td className="p-4">$125 K ($1.5 M ARR)</td>
                      <td className="p-4">≈ $1.5 K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visual Acquisition Flow */}
            <div className="bg-gradient-to-br from-[#005EFF]/5 to-[#443AFF]/5 p-8 rounded-xl">
              <h4 className="text-lg font-semibold text-[#191F2E] mb-6 text-center">Acquisition Flow Strategy</h4>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-2 border-[#005EFF]">
                  <p className="font-semibold text-[#005EFF]">Founder Network</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0" />
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-2 border-[#005EFF]">
                  <p className="font-semibold text-[#005EFF]">Referrals</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0" />
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-2 border-[#005EFF]">
                  <p className="font-semibold text-[#005EFF]">Integrations</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0" />
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-2 border-[#005EFF]">
                  <p className="font-semibold text-[#005EFF]">SDR</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0" />
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-2 border-[#005EFF]">
                  <p className="font-semibold text-[#005EFF]">Scale</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F5F5] p-8 rounded-xl">
              <p className="text-lg text-[#414651]">
                Sequential channels compound acquisition efficiency: founder network → referrals → integrations → SDR scale.
              </p>
              <p className="text-lg text-[#414651] mt-4">
                By Q4 2026, Knowcap reaches 100 customers, $1.5 M ARR, and break-even — a repeatable, capital-efficient growth engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 13: Team */}
      <section className="py-28 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 13: Team</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              The Domain Expert and the Architect — Built for AI Verification
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-[#191F2E] mb-2">Hassan Sam Arslan</h3>
              <p className="text-lg text-[#005EFF] mb-4 font-semibold">Founder & CEO</p>
              <p className="text-[#414651] leading-relaxed">
                Former Odoo Gold Partner and Co-Founder of Ariika ($0 → $20 M). Led 100 + ERP implementations; experienced the profit-leak problem firsthand.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-[#191F2E] mb-2">Hesham Tarek</h3>
              <p className="text-lg text-[#005EFF] mb-4 font-semibold">Co-Founder & CTO</p>
              <p className="text-[#414651] leading-relaxed">
                AI systems architect and Firebase specialist. Built the Visual Transcription Engine core to Knowcap's verifiable documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 14: Product Vision */}
      <section className="py-28 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 14: Product Vision</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              From Documentation to the Verified Work Genome — Building the Transparent Future of Work
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              The Work Genome is a verified dataset of timestamped actions — like a GitHub for how service teams actually deliver work.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start p-8 bg-[#F5F5F5] rounded-xl">
                <div className="w-12 h-12 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xl font-bold text-[#005EFF]">1</span>
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Phase 1 (2026 – 2027): Documentation & Verification</h5>
                  <p className="text-[#414651] leading-relaxed">
                    Capture meetings and screens to generate timestamp-backed docs; each artifact feeds the verified dataset.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-8 bg-[#F5F5F5] rounded-xl">
                <div className="w-12 h-12 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xl font-bold text-[#005EFF]">2</span>
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Phase 2 (2028 – 2030): Vibe Tasking — AI-Native Project Management</h5>
                  <p className="text-[#414651] leading-relaxed">
                    AI observes workflows and updates tasks autonomously. Dataset evolves into a live operational map.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-8 bg-[#F5F5F5] rounded-xl">
                <div className="w-12 h-12 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xl font-bold text-[#005EFF]">3</span>
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Phase 3 (2031 +): Work Genome</h5>
                  <p className="text-[#414651] leading-relaxed">
                    Becomes the verification layer for AI-driven labor. "Knowcap Verified" becomes the standard for trustworthy digital work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 15: The Ask */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#0A0D12] text-white">
        <div className="max-w-[1024px] mx-auto px-8 py-20">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 15: The Ask</p>
            <h2 className="text-5xl font-bold leading-[58px] mb-6">
              Raising $750 K SAFE @ $10 M Pre — Scaling the Automated Project Documentation for Service Firms
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-2xl text-[#D5D7DA] font-semibold">18-Month Runway</p>

            <div className="bg-white/10 p-8 rounded-xl">
              <h4 className="text-xl font-semibold mb-6">Use of Funds:</h4>
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-[#005EFF] flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">45%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Growth Engine</p>
                    <p className="text-[#D5D7DA]">Ads, referrals, SDR operations</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-[#005EFF] flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">30%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Product Acceleration</p>
                    <p className="text-[#D5D7DA]">Mobile app, integrations, Vibe Tasking beta</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-[#005EFF] flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">25%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Core Team & Infrastructure</p>
                    <p className="text-[#D5D7DA]">Expand AI and engineering capacity</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-8 rounded-xl">
              <h4 className="text-xl font-semibold mb-6">Expected Outcomes (by Dec 2026):</h4>
              <ul className="space-y-3 text-lg">
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#005EFF] flex-shrink-0 mt-1" />
                  <span>100 customers → $1.5 M ARR</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#005EFF] flex-shrink-0 mt-1" />
                  <span>Break-even by Q4 2026</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#005EFF] flex-shrink-0 mt-1" />
                  <span>Category leadership in AI Verifiability</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#005EFF] p-10 rounded-xl text-center">
              <p className="text-2xl font-bold mb-2">Thesis</p>
              <p className="text-xl leading-relaxed">
                Scale what's already working — the system that makes every meeting verifiable by design.
              </p>
            </div>

            <div className="text-center pt-8">
              <Button 
                size="lg" 
                className="bg-white text-[#0A0D12] hover:bg-[#D5D7DA] text-lg px-12 py-6 h-auto"
                onClick={() => window.location.href = 'https://knowcap.ai/invest'}
              >
                Schedule an Investor Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .hero-bg {
          background: linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%);
          position: relative;
        }
        
        .hero-blur {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 50%, rgba(0, 94, 255, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }
      `}</style>
    </main>
  )
}
