
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
            <h1 className="text-[60px] font-semibold leading-[72px] text-[#191F2E] mb-12 text-center">
              The AI Governance Layer That Watches, Understands, and Executes Work — Not Just Words
            </h1>
            
            {/* Comparison Table */}
            <div className="bg-white rounded-xl border-2 border-[#005EFF]/20 overflow-hidden mb-10">
              <div className="grid grid-cols-3 border-b-2 border-[#005EFF]/20">
                <div className="p-6"></div>
                <div className="p-6 bg-[#F5F5F5] border-l-2 border-[#005EFF]/20">
                  <p className="text-lg font-semibold text-[#191F2E] text-center">Regular Note-Takers</p>
                </div>
                <div className="p-6 bg-[#005EFF]/5 border-l-2 border-[#005EFF]/20">
                  <p className="text-lg font-semibold text-[#005EFF] text-center">Knowcap.ai</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 border-b-2 border-[#005EFF]/20">
                <div className="p-6 bg-[#F5F5F5]">
                  <p className="text-base font-semibold text-[#191F2E]">Session Context</p>
                </div>
                <div className="p-6 border-l-2 border-[#005EFF]/20">
                  <p className="text-base text-[#535862]">One meeting at a time</p>
                </div>
                <div className="p-6 bg-[#005EFF]/5 border-l-2 border-[#005EFF]/20">
                  <p className="text-base text-[#191F2E] font-medium">Understands the entire project — links meetings, docs, and workflows</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 border-b-2 border-[#005EFF]/20">
                <div className="p-6 bg-[#F5F5F5]">
                  <p className="text-base font-semibold text-[#191F2E]">Input Type</p>
                </div>
                <div className="p-6 border-l-2 border-[#005EFF]/20">
                  <p className="text-base text-[#535862]">Audio only</p>
                </div>
                <div className="p-6 bg-[#005EFF]/5 border-l-2 border-[#005EFF]/20">
                  <p className="text-base text-[#191F2E] font-medium">Audio + Screen + Docs — sees what happens and why</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3">
                <div className="p-6 bg-[#F5F5F5]">
                  <p className="text-base font-semibold text-[#191F2E]">Output</p>
                </div>
                <div className="p-6 border-l-2 border-[#005EFF]/20">
                  <p className="text-base text-[#535862]">Summaries</p>
                </div>
                <div className="p-6 bg-[#005EFF]/5 border-l-2 border-[#005EFF]/20">
                  <p className="text-base text-[#191F2E] font-medium">Live Documents + AI Agents trained on project memory</p>
                </div>
              </div>
            </div>

            <div className="space-y-8 mb-10 text-left max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed text-[#414651]">
                Knowcap observes calls and screens in real time, capturing what's said, shown, and decided.
              </p>
              
              <p className="text-lg leading-relaxed text-[#414651]">
                It links every action to its timestamped evidence, builds a continuous project memory, and from that memory generates AI agents that act on verified data.
              </p>
              
              <p className="text-lg leading-relaxed text-[#414651]">
                It natively understands mixed languages and produces SOPs, contracts, and presentations — all grounded in proof, not transcription.
              </p>
            </div>

            <div className="bg-[#F5F5F5] rounded-xl p-8 max-w-3xl mx-auto">
              <p className="text-sm font-semibold text-[#535862] uppercase tracking-wider mb-4">Example</p>
              <div className="space-y-4 text-left">
                <p className="text-lg text-[#414651] leading-relaxed">
                  <span className="inline-block mr-2">🧠</span>
                  <strong className="font-semibold text-[#191F2E]">Ask Knowcap:</strong> "Are our sales reps following the playbook?"
                </p>
                <p className="text-lg text-[#414651] leading-relaxed pl-8">
                  <span className="inline-block mr-2">➡️</span>
                  Knowcap reviews every call, measures sentiment, and returns a performance report — each insight linked to the exact video moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2: Validation & Traction */}
      <section className="py-28 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 2: Traction</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              7 Months From Prototype to Proof: 800 Source-Backed Docs, $84K ARR Pipeline
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              Our first live deployment proved the ROI of governed output.<br/>
              <strong className="font-semibold text-[#191F2E]">800+ source-backed documents</strong> generated across 12 client projects.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#F5F5F5] p-8 rounded-xl text-center">
                <p className="text-4xl font-bold text-[#005EFF] mb-3">46%</p>
                <p className="text-[#414651] font-medium">faster project delivery</p>
              </div>

              <div className="bg-[#F5F5F5] p-8 rounded-xl text-center">
                <p className="text-4xl font-bold text-[#005EFF] mb-3">40%</p>
                <p className="text-[#414651] font-medium">faster onboarding</p>
              </div>

              <div className="bg-[#F5F5F5] p-8 rounded-xl text-center">
                <p className="text-4xl font-bold text-[#005EFF] mb-3">50%</p>
                <p className="text-[#414651] font-medium">fewer support tickets</p>
              </div>
            </div>

            <div className="bg-[#F5F5F5] p-8 rounded-xl">
              <p className="text-lg text-[#414651] mb-6">
                <strong className="font-semibold text-[#191F2E]">$84K ARR pipeline</strong> from 7 signed Odoo partners (avg. $1K MRR).
              </p>
              <p className="text-base text-[#535862] font-medium">
                Timeline: Month 1–4: Prototype → Month 4–7: Production → Month 8: 7 LOIs
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl border-l-4 border-[#005EFF]">
              <p className="text-lg text-[#414651] italic leading-relaxed mb-4">
                "If the software performs like the demo, it will completely change how we handle implementation timelines."
              </p>
              <p className="text-base font-semibold text-[#191F2E]">
                — BI Solutions (KSA)
              </p>
            </div>

            <div className="p-6 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg font-medium">
                Takeaway: These results come from <strong className="font-semibold">traceable documentation</strong> — every output tied to its original meeting evidence.
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
              Every Call Becomes a Liability When There's No Proof
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              In a <strong className="font-semibold text-[#191F2E]">$3T services economy</strong>, meetings drive execution — but vanish without a trace.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start p-8 bg-white rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-base font-bold text-[#005EFF]">1</span>
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">Decisions disappear</h5>
                  <p className="text-[#414651] leading-relaxed">Projects drift, scope expands, blame spreads.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-8 bg-white rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-base font-bold text-[#005EFF]">2</span>
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">No audit trail</h5>
                  <p className="text-[#414651] leading-relaxed">Clients dispute what was agreed.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-8 bg-white rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-base font-bold text-[#005EFF]">3</span>
                </div>
                <div>
                  <h5 className="font-semibold text-[#191F2E] text-lg mb-2">No continuity</h5>
                  <p className="text-[#414651] leading-relaxed">Teams rebuild the same work again and again.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-xl font-semibold leading-relaxed mb-4">
                Without source-backed records, firms can't prove how decisions were made — they lose time, trust, and margin.
              </p>
              <p className="text-[#D5D7DA] text-lg leading-relaxed">
                When our pilot partners made every meeting a verifiable record, client disputes dropped to zero — and so did rework.
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
              From Conversation to Source-Backed Deliverable — Automatically
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              Knowcap captures what's said and what's shown — turning every meeting into governed, client-ready output.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 bg-[#F5F5F5] rounded-xl">
                  <h4 className="font-semibold text-[#191F2E] mb-2 text-lg">Understands context</h4>
                  <p className="text-[#414651]">Reads past contracts and project docs.</p>
                </div>

                <div className="p-6 bg-[#F5F5F5] rounded-xl">
                  <h4 className="font-semibold text-[#191F2E] mb-2 text-lg">Joins live calls</h4>
                  <p className="text-[#414651]">Records speech + screen, pairing every decision with evidence.</p>
                </div>

                <div className="p-6 bg-[#F5F5F5] rounded-xl">
                  <h4 className="font-semibold text-[#191F2E] mb-2 text-lg">Generates deliverables</h4>
                  <p className="text-[#414651]">GAP analyses, SOPs, and onboarding guides appear within 30 seconds — each linked to its timestamped evidence.</p>
                </div>

                <div className="p-6 bg-[#F5F5F5] rounded-xl">
                  <h4 className="font-semibold text-[#191F2E] mb-2 text-lg">Answers later</h4>
                  <p className="text-[#414651]">Ask, "When did we approve X?" → Get the exact clip and source.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-[#0A0D12] rounded-xl">
                  <p className="text-white text-lg font-semibold mb-4">
                    <strong className="text-[#005EFF]">Verification is built-in:</strong>
                  </p>
                  <p className="text-[#D5D7DA] leading-relaxed">
                    Every sentence can be traced to its original voice or screen moment.
                  </p>
                </div>

                <div className="p-6 bg-[#F5F5F5] rounded-xl border-l-4 border-[#005EFF]">
                  <p className="text-sm font-semibold text-[#535862] uppercase tracking-wider mb-3">Example</p>
                  <p className="text-base text-[#414651] leading-relaxed mb-4">
                    A consultant attends four client meetings. The manager asks Knowcap, "Did they follow our implementation strategy?"
                  </p>
                  <p className="text-base text-[#191F2E] font-medium leading-relaxed">
                    Knowcap instantly generates a performance review highlighting strengths and gaps — each backed by timestamps from those sessions.
                  </p>
                </div>

                <p className="text-base text-[#535862] italic leading-relaxed">
                  Each session trains the Visual Transcription Engine, making future work faster and more reliable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5: Differentiation */}
      <section className="py-28 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 5: Differentiation</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              The Only AI Engine That Proves What Really Happened
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              The <strong className="font-semibold text-[#191F2E]">Visual Transcription Engine (VTE)</strong> pairs speech with on-screen actions to create traceable artifacts — every element linked to its capture moment.
            </p>

            <p className="text-lg text-[#535862] italic leading-relaxed">
              It's not human review; it's structural verification.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-8 bg-white rounded-xl">
                <h4 className="font-semibold text-[#191F2E] mb-3 text-lg">Meeting bots</h4>
                <p className="text-[#414651]">hear words but see nothing.</p>
              </div>

              <div className="p-8 bg-white rounded-xl">
                <h4 className="font-semibold text-[#191F2E] mb-3 text-lg">Recorders</h4>
                <p className="text-[#414651]">see screens but understand nothing.</p>
              </div>

              <div className="p-8 bg-white rounded-xl">
                <h4 className="font-semibold text-[#191F2E] mb-3 text-lg">Summarizers</h4>
                <p className="text-[#414651]">read docs but miss real context.</p>
              </div>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-xl font-semibold mb-6 leading-relaxed">
                Knowcap unites all three in real time, producing timestamp-verified documentation that can stand up to audits, client reviews, or AI training.
              </p>
              <p className="text-[#D5D7DA] text-lg leading-relaxed">
                Each project strengthens the dataset and eliminates guesswork — <strong className="font-semibold text-white">zero drift, zero rework</strong>.
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
              $2B Market: Every Firm That Sells Expertise Needs Proof
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              The global professional-services sector exceeds <strong className="font-semibold text-[#191F2E]">$3T</strong>, but even a narrow slice — teams delivering complex, auditable work — forms a <strong className="font-semibold text-[#191F2E]">$2B addressable market</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-[#F5F5F5] rounded-xl">
                <p className="text-sm font-semibold text-[#535862] uppercase mb-3">Our Beachhead</p>
                <p className="text-2xl font-bold text-[#005EFF] mb-3">~3,500 firms</p>
                <p className="text-[#414651] leading-relaxed">Odoo and ERP partners</p>
                <p className="text-base text-[#535862] mt-2">$42M SAM</p>
              </div>

              <div className="p-8 bg-[#F5F5F5] rounded-xl">
                <p className="text-sm font-semibold text-[#535862] uppercase mb-3">Next Expansion</p>
                <p className="text-2xl font-bold text-[#005EFF] mb-3">160K+ firms</p>
                <p className="text-[#414651] leading-relaxed">Agencies, Salesforce, Oracle, DevOps, cybersecurity, consulting</p>
              </div>
            </div>

            <div className="border-t-2 border-[#E9EAEB] my-8"></div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-xl font-semibold mb-4 leading-relaxed">
                As AI automates creation, source-based verification becomes the new compliance layer — the ability to show where every deliverable came from.
              </p>
              <p className="text-[#D5D7DA] text-lg leading-relaxed">
                Knowcap owns the <strong className="font-semibold text-white">AI Governance Layer</strong> — the system that turns every deliverable into provable work.
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
              The Proof Economy Has Arrived — Three Forces Making AI Governance Inevitable
            </h2>
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-white rounded-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#005EFF] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                <div>
                  <h4 className="text-2xl font-semibold text-[#191F2E] mb-3">AI Saturation → Proof Is the Differentiator</h4>
                  <p className="text-[#414651] leading-relaxed mb-3">
                    After ChatGPT, every team uses AI. What no one has is evidence of what their AI or people actually produced.
                  </p>
                  <p className="text-[#191F2E] font-semibold leading-relaxed">
                    The next competitive edge isn't generation — it's verification.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white rounded-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#005EFF] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                <div>
                  <h4 className="text-2xl font-semibold text-[#191F2E] mb-3">Billing Models Are Changing → Accountability Over Hours</h4>
                  <p className="text-[#414651] leading-relaxed mb-3">
                    Fixed-price contracts replace hourly billing. Teams must prove completion, not time spent.
                  </p>
                  <p className="text-[#191F2E] font-semibold leading-relaxed">
                    Knowcap customers deliver projects 32% faster while maintaining verifiable audit trails.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white rounded-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#005EFF] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                <div>
                  <h4 className="text-2xl font-semibold text-[#191F2E] mb-3">Remote Work → Lost Context Everywhere</h4>
                  <p className="text-[#414651] leading-relaxed mb-3">
                    <strong className="font-semibold text-[#191F2E]">78%</strong> of professional-services firms now operate hybrid or remote (Deloitte 2024).
                  </p>
                  <p className="text-[#191F2E] font-semibold leading-relaxed">
                    More meetings, more screen shares, more untracked decisions. Knowcap restores the missing proof layer.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#E9EAEB] my-8"></div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-xl font-semibold leading-relaxed">
                Together these shifts mark the rise of a <strong className="text-[#005EFF]">$2B Proof Economy</strong> — and Knowcap is building the <strong className="text-[#005EFF]">AI Governance Layer</strong>, the system that makes every deliverable source-verifiable.
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
              Simple SaaS Pricing That Pays for Itself — and Then Locks In
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              Every plan delivers measurable ROI within 30 days; the longer you use Knowcap, the harder it is to leave.
            </p>

            <div className="bg-[#F5F5F5] rounded-xl overflow-hidden">
              <div className="p-6 bg-[#0A0D12]">
                <h4 className="text-white text-xl font-semibold">Three-Tier Subscription Model</h4>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-white rounded-xl border-2 border-[#E9EAEB]">
                    <p className="text-3xl font-bold text-[#005EFF] mb-2">$500</p>
                    <p className="text-[#535862]">per month</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl border-2 border-[#005EFF]">
                    <p className="text-3xl font-bold text-[#005EFF] mb-2">$1,000</p>
                    <p className="text-[#535862]">per month</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl border-2 border-[#E9EAEB]">
                    <p className="text-3xl font-bold text-[#005EFF] mb-2">$5,000</p>
                    <p className="text-[#535862]">per month</p>
                  </div>
                </div>
                <p className="text-center text-[#414651] italic">
                  Every plan includes unlimited recordings, captures, and AI-generated documents.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-[#F5F5F5] rounded-xl">
                <p className="text-sm font-semibold text-[#535862] uppercase mb-3">Average Customer</p>
                <p className="text-lg text-[#414651] leading-relaxed mb-2">
                  Pays <strong className="font-semibold text-[#191F2E]">$12K/year</strong>
                </p>
                <p className="text-lg text-[#414651] leading-relaxed mb-2">
                  Saves <strong className="font-semibold text-[#191F2E]">1,580 hours</strong> (≈$237K value)
                </p>
                <p className="text-lg text-[#414651] leading-relaxed">
                  Delivers projects <strong className="font-semibold text-[#191F2E]">30% faster</strong>
                </p>
              </div>

              <div className="p-8 bg-[#F5F5F5] rounded-xl">
                <p className="text-sm font-semibold text-[#535862] uppercase mb-3">Retention Compounds</p>
                <p className="text-lg text-[#414651] leading-relaxed">
                  Each customer builds their verified knowledge base — switching becomes impossible.
                </p>
              </div>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg font-semibold leading-relaxed">
                Why it works: Every document Knowcap generates strengthens the client's dataset, increasing ROI and long-term platform lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 9: Unit Economics */}
      <section className="py-28 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 9: Unit Economics</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              Built for High Margin and Fast Payback — by Design
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed mb-8">
              Knowcap's model is built for profitability from day one:
            </p>

            <div className="bg-white rounded-xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-6 text-[#414651] font-medium">Average contract</td>
                    <td className="p-6 text-[#191F2E] font-semibold">≈ $1K MRR per client</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-6 text-[#414651] font-medium">Target gross margin</td>
                    <td className="p-6 text-[#005EFF] font-bold text-xl">~85%</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-6 text-[#414651] font-medium">Acquisition cost</td>
                    <td className="p-6 text-[#191F2E] font-semibold">Expected to remain low through founder-led sales</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-6 text-[#414651] font-medium">Retention driver</td>
                    <td className="p-6 text-[#191F2E] font-semibold">Dataset compounds value, making churn progressively harder</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-6 text-[#414651] font-medium">Scalability</td>
                    <td className="p-6 text-[#191F2E] font-semibold">Cloud/AI costs scale linearly; dataset value grows exponentially</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-[#414651] font-medium">Break-even</td>
                    <td className="p-6 text-[#005EFF] font-bold">~50 paying clients (~$40K MRR) by Q4 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-lg font-semibold">
                Pilot behavior proves the model; scale will refine the ratios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 10: Go-to-Market */}
      <section className="py-28 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 10: Go-to-Market</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              From Founder-Led Wins → Funded Growth Engine
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              We proved demand with <strong className="font-semibold text-[#191F2E]">7 customers in 7 months</strong> through founder-led outreach across the Odoo partner network — <strong className="font-semibold text-[#191F2E]">$0 CAC and 15% conversion</strong>.
            </p>

            <p className="text-xl text-[#191F2E] font-semibold leading-relaxed">
              This raise funds the shift from manual selling to a repeatable, scalable system.
            </p>

            <div className="bg-[#F5F5F5] rounded-xl p-8">
              <h4 className="text-xl font-semibold text-[#191F2E] mb-6">Next Stage Plan</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#191F2E] mb-1">Performance Marketing</p>
                    <p className="text-[#414651]">Replicate founder messaging through Meta & LinkedIn campaigns.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#191F2E] mb-1">Referral Engine</p>
                    <p className="text-[#414651]">Turn early partners into resellers with 20% incentives.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#191F2E] mb-1">SDR + Customer Success</p>
                    <p className="text-[#414651]">Institutionalize outbound and onboarding to free founder bandwidth.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ArrowRight className="w-6 h-6 text-[#005EFF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#191F2E] mb-1">Integrations (Odoo, Salesforce)</p>
                    <p className="text-[#414651]">Shorten activation time and lower paid CAC.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-[#0A0D12] rounded-xl">
                <p className="text-sm font-semibold text-[#D5D7DA] uppercase mb-3">Goal</p>
                <p className="text-white text-2xl font-bold mb-2">100 customers by Q4 2026</p>
                <p className="text-[#D5D7DA]">(~$1.5M ARR)</p>
              </div>

              <div className="p-8 bg-[#0A0D12] rounded-xl">
                <p className="text-sm font-semibold text-[#D5D7DA] uppercase mb-3">Why Raise</p>
                <p className="text-white text-lg leading-relaxed">
                  Founder-led sales discovered the formula; capital builds the machine so growth no longer depends on one person.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 11: Financial Projections */}
      <section className="py-28 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 11: Financial Projections</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              Profitable Growth by Design — Break-Even 2026, Scaling 3× Annually
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              Knowcap's model compounds revenue as every client expands usage and retention strengthens.
            </p>

            <div className="bg-white rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0A0D12]">
                    <th className="text-left p-6 text-white font-semibold text-lg">Year</th>
                    <th className="text-left p-6 text-white font-semibold text-lg">ARR</th>
                    <th className="text-left p-6 text-white font-semibold text-lg">Growth Driver</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-6 text-[#191F2E] font-bold text-xl">2026</td>
                    <td className="p-6 text-[#005EFF] font-bold text-2xl">$1.2M</td>
                    <td className="p-6 text-[#414651]">100 clients; recurring documentation generation.</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB]">
                    <td className="p-6 text-[#191F2E] font-bold text-xl">2027</td>
                    <td className="p-6 text-[#005EFF] font-bold text-2xl">$3.5M</td>
                    <td className="p-6 text-[#414651]">Multi-vertical rollout (ERP, Agencies, Salesforce).</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-[#191F2E] font-bold text-xl">2028</td>
                    <td className="p-6 text-[#005EFF] font-bold text-2xl">$9M+</td>
                    <td className="p-6 text-[#414651]">AI-native automation (Vibe Tasking) + enterprise adoption.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-xl font-semibold leading-relaxed mb-4">
                Each phase adds new recurring layers — from documentation → governance → automation — driving margin expansion and retention.
              </p>
              <p className="text-[#D5D7DA] text-lg leading-relaxed">
                By 2026, profitability isn't a milestone — it's a feature of the model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 12: Path to 100 Customers */}
      <section className="py-28 bg-white">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 12: Path to 100 Customers</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              From 7 LOIs → 100 Customers in 12 Months
            </h2>
          </div>

          <div className="space-y-10">
            <p className="text-xl text-[#414651] leading-relaxed">
              Knowcap scales customer acquisition through three compounding channels — <strong className="font-semibold text-[#191F2E]">ads, referrals, and integrations</strong>.
            </p>

            <div className="bg-[#F5F5F5] rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0A0D12]">
                    <th className="text-left p-5 text-white font-semibold">Quarter</th>
                    <th className="text-left p-5 text-white font-semibold">Growth Driver</th>
                    <th className="text-center p-5 text-white font-semibold">New</th>
                    <th className="text-center p-5 text-white font-semibold">Total</th>
                    <th className="text-right p-5 text-white font-semibold">MRR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E9EAEB] bg-white">
                    <td className="p-5 text-[#191F2E] font-semibold">Q1 2026</td>
                    <td className="p-5 text-[#414651]">LOIs convert + early ads</td>
                    <td className="p-5 text-center text-[#005EFF] font-bold">+15</td>
                    <td className="p-5 text-center text-[#191F2E] font-semibold">22</td>
                    <td className="p-5 text-right text-[#191F2E] font-semibold">$22K</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB] bg-white">
                    <td className="p-5 text-[#191F2E] font-semibold">Q2 2026</td>
                    <td className="p-5 text-[#414651]">Paid + referral flywheel</td>
                    <td className="p-5 text-center text-[#005EFF] font-bold">+23</td>
                    <td className="p-5 text-center text-[#191F2E] font-semibold">45</td>
                    <td className="p-5 text-right text-[#191F2E] font-semibold">$45K</td>
                  </tr>
                  <tr className="border-b border-[#E9EAEB] bg-white">
                    <td className="p-5 text-[#191F2E] font-semibold">Q3 2026</td>
                    <td className="p-5 text-[#414651]">Integration-based inbound</td>
                    <td className="p-5 text-center text-[#005EFF] font-bold">+25</td>
                    <td className="p-5 text-center text-[#191F2E] font-semibold">70</td>
                    <td className="p-5 text-right text-[#191F2E] font-semibold">$70K</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-5 text-[#191F2E] font-semibold">Q4 2026</td>
                    <td className="p-5 text-[#414651]">Brand & network effects</td>
                    <td className="p-5 text-center text-[#005EFF] font-bold">+30</td>
                    <td className="p-5 text-center text-[#005EFF] font-bold text-xl">100</td>
                    <td className="p-5 text-right text-[#005EFF] font-bold text-xl">$125K</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl text-center">
              <p className="text-white text-2xl font-bold mb-2">
                $1.5M ARR by End of 2026
              </p>
              <p className="text-[#D5D7DA] text-lg">
                Funding activates the growth engine built in Slide 10 — automating what the founder already proved works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 13: The Team */}
      <section className="py-28 bg-[#F5F5F5]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 13: The Team</p>
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-6">
              The Domain Expert and the Architect — Built for AI Governance
            </h2>
          </div>

          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl">
                <h4 className="text-2xl font-semibold text-[#191F2E] mb-2">Hassan Sam Arslan</h4>
                <p className="text-[#005EFF] font-semibold mb-6 text-lg">Founder & CEO</p>
                <div className="space-y-3 text-[#414651] leading-relaxed">
                  <p>Former Odoo Gold Partner and co-founder of Ariika ($0→$20M revenue).</p>
                  <p className="font-medium text-[#191F2E]">Led 100+ ERP implementations — lived the pain of losing profit to undocumented decisions.</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl">
                <h4 className="text-2xl font-semibold text-[#191F2E] mb-2">Hesham Tarek</h4>
                <p className="text-[#005EFF] font-semibold mb-6 text-lg">Co-Founder & CTO</p>
                <div className="space-y-3 text-[#414651] leading-relaxed">
                  <p>AI systems architect and Firebase specialist.</p>
                  <p className="font-medium text-[#191F2E]">Built the Visual Transcription Engine — the core that makes Knowcap's documentation verifiable, not generative.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <p className="text-white text-xl font-semibold mb-4 leading-relaxed">
                Together they combine deep operational expertise and technical precision — one knows every workflow problem, the other engineered the infrastructure that solves it.
              </p>
              <p className="text-[#D5D7DA] text-lg leading-relaxed">
                Their firsthand experience unlocked 7 LOIs.
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
            <h2 className="text-5xl font-bold leading-[58px] text-[#191F2E] mb-4">
              From Documentation to the Work Genome — Building the Source-Verified Future of Work
            </h2>
            <p className="text-lg text-[#535862] italic leading-relaxed">
              (The Work Genome = the dataset of how verified work happens)
            </p>
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-[#F5F5F5] rounded-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#005EFF] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                <div>
                  <h4 className="text-2xl font-semibold text-[#191F2E] mb-3">Phase 1 (2026–2027): Documentation & Process Governance</h4>
                  <p className="text-[#005EFF] font-semibold mb-3 text-lg">The Wedge</p>
                  <p className="text-[#414651] leading-relaxed mb-2">
                    Capture meetings and screens to auto-generate source-backed client documents.
                  </p>
                  <p className="text-[#535862] italic">
                    Every artifact becomes a node in our governance dataset.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#F5F5F5] rounded-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#005EFF] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                <div>
                  <h4 className="text-2xl font-semibold text-[#191F2E] mb-3">Phase 2 (2028–2030): Vibe Tasking — AI-Native Project Management</h4>
                  <p className="text-[#005EFF] font-semibold mb-3 text-lg">The Expansion</p>
                  <p className="text-[#414651] leading-relaxed mb-2">
                    AI observes workflows and updates tasks autonomously.
                  </p>
                  <p className="text-[#535862] italic">
                    The dataset evolves into a living operational map of how work happens.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#0A0D12] rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white text-[#0A0D12] flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                <div>
                  <h4 className="text-2xl font-semibold text-white mb-3">Phase 3 (2031+): Work Genome — The Verification Standard for AI Agents</h4>
                  <p className="text-[#005EFF] font-semibold mb-3 text-lg">The Endgame</p>
                  <p className="text-[#D5D7DA] leading-relaxed mb-3">
                    Knowcap's dataset becomes the proof layer for AI labor.
                  </p>
                  <p className="text-white font-medium leading-relaxed">
                    Enterprises adopt "Knowcap Verified" standards — meaning every output carries built-in proof of origin, not human certification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 15: The Ask */}
      <section className="py-28 bg-[#0A0D12]">
        <div className="max-w-[1024px] mx-auto px-8">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-[1px] mb-4">SLIDE 15: The Ask</p>
            <h2 className="text-5xl font-bold leading-[58px] text-white mb-6">
              Raising $750K SAFE @ $10M Pre — To Build the Source-Verified Proof Economy Engine
            </h2>
          </div>

          <div className="space-y-10">
            <div className="bg-white p-10 rounded-xl">
              <h4 className="text-2xl font-semibold text-[#191F2E] mb-8 text-center">Use of Funds (18-Month Runway)</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-16 bg-[#005EFF] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">45%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#191F2E] text-lg mb-1">Growth Engine</p>
                    <p className="text-[#414651]">Scale beyond founder-led sales through paid ads, referral programs, and SDR operations.</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-24 h-16 bg-[#005EFF] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">30%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#191F2E] text-lg mb-1">Product Acceleration</p>
                    <p className="text-[#414651]">Launch mobile app, expand integrations (Odoo, Salesforce), and ship Vibe Tasking beta.</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-24 h-16 bg-[#005EFF] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">25%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#191F2E] text-lg mb-1">Core Team & Infrastructure</p>
                    <p className="text-[#414651]">Build AI and engineering capacity to scale the Visual Transcription Engine.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#181D27] p-10 rounded-xl">
              <h4 className="text-white text-2xl font-semibold mb-8 text-center">Outcomes by Dec 2026</h4>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-8 h-8 text-[#005EFF] flex-shrink-0" />
                  <p className="text-[#D5D7DA] text-xl">100 customers → <strong className="text-white font-semibold">$1.5M ARR</strong></p>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-8 h-8 text-[#005EFF] flex-shrink-0" />
                  <p className="text-[#D5D7DA] text-xl"><strong className="text-white font-semibold">Break-even by Q4 2026</strong></p>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-8 h-8 text-[#005EFF] flex-shrink-0" />
                  <p className="text-[#D5D7DA] text-xl">Established <strong className="text-white font-semibold">category leadership in AI Governance</strong></p>
                </div>
              </div>
            </div>

            <div className="text-center pt-8">
              <p className="text-[#D5D7DA] text-2xl mb-8 leading-relaxed">
                Your investment <strong className="text-white font-semibold">scales what's already working</strong> — the system that makes every meeting verifiable by design.
              </p>
              <Button 
                size="lg"
                className="bg-white text-[#0A0D12] hover:bg-gray-100 text-xl px-16 py-8 h-auto font-semibold"
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
          <p className="text-[#535862] text-lg mb-6">
            Ready to learn more?
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8"
              onClick={() => window.location.href = 'https://knowcap.ai/invest'}
            >
              Book a Demo
            </Button>
            <Button 
              size="lg"
              className="text-lg px-8"
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
