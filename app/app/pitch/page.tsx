'use client'

import { useState, useEffect, useRef } from 'react'
import { Check, ArrowRight } from 'lucide-react'

// Fade In Component
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting))
    })
    if (domRef.current) {
      observer.observe(domRef.current)
    }
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// UI Components
const Section = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-20 px-6 md:px-8 ${className}`}>
    <div className="max-w-5xl mx-auto">{children}</div>
  </section>
)

const SlideLabel = ({ text }: { text: string }) => (
  <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-wider mb-4">{text}</p>
)

const Heading2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-5xl font-bold text-[#191F2E] leading-tight mb-6">{children}</h2>
)

const Heading4 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h4 className={`text-lg font-semibold text-[#191F2E] mb-4 ${className}`}>{children}</h4>
)

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl p-8 shadow-sm border border-gray-100 ${className}`}>{children}</div>
)

const CardGray = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#F5F5F5] rounded-xl p-8 ${className}`}>{children}</div>
)

const CardDark = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#0A0D12] rounded-xl p-6 text-white ${className}`}>{children}</div>
)

const NumberCircle = ({ number }: { number: number }) => (
  <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
    <span className="text-[#005EFF] font-bold">{number}</span>
  </div>
)

const IconCircle = () => (
  <div className="w-10 h-10 rounded-full bg-[#005EFF]/10 flex items-center justify-center flex-shrink-0 mt-1">
    <Check className="w-5 h-5 text-[#005EFF]" />
  </div>
)

export default function PitchPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Slide 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#F5F7FA] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(0,94,255,0.08)_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold text-[#191F2E] text-center leading-tight mb-6">
              Knowcap Turns Meetings & Screen Work Into Verified Project Documents
            </h1>
            <div className="text-center max-w-4xl mx-auto mb-12">
              <p className="text-xl text-[#005EFF] font-medium leading-relaxed">
                Already saving 150 hours per project (30% reduction from 500-hour baseline) — $1.85K MRR pre-launch
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <CardGray>
                <p className="text-xs text-[#414651] uppercase tracking-wider font-semibold mb-4">What it does</p>
                <p className="text-base text-[#191F2E] leading-relaxed font-medium">
                  Automatically converts calls + screen actions into timestamp-linked contracts, SOPs, PRDs, and quotations.
                </p>
              </CardGray>
              <CardDark>
                <p className="text-xs text-[#D5D7DA] uppercase tracking-wider font-semibold mb-4">Why it matters</p>
                <p className="text-base text-white leading-relaxed">
                  Teams eliminate rework, deliver projects faster, and maintain a verifiable proof trail for every decision.
                </p>
              </CardDark>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Slide 2: Traction */}
      <Section className="bg-white">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 2: Traction" />
            <Heading2>$1.85K MRR pre-launch — 150 hours saved per project (pilot-confirmed)</Heading2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CardGray>
              <Heading4>Timeline</Heading4>
              <ul className="space-y-4 text-[#414651]">
                <li><strong className="text-[#191F2E] block mb-1">August</strong>1 pilot partner → validated execution gap & workflow model</li>
                <li><strong className="text-[#191F2E] block mb-1">September</strong>Expanded to 4 paying partners → $1.85K MRR</li>
                <li><strong className="text-[#191F2E] block mb-1">October</strong>Added $4K/mo committed pipeline pending Zoom/Teams integration</li>
                <li><strong className="text-[#005EFF] block mb-1">Next milestone</strong>4 partners at $1K/mo each once integration ships</li>
              </ul>
            </CardGray>
            <CardGray>
              <Heading4>Live Results</Heading4>
              <ul className="space-y-4 text-[#414651]">
                <li className="flex items-start gap-3"><div className="mt-2 w-2 h-2 rounded-full bg-[#005EFF] flex-shrink-0"/>150 hours saved per project (500 → 350 hours)</li>
                <li className="flex items-start gap-3"><div className="mt-2 w-2 h-2 rounded-full bg-[#005EFF] flex-shrink-0"/>90% of recorded sessions produce usable documents</li>
                <li className="flex items-start gap-3"><div className="mt-2 w-2 h-2 rounded-full bg-[#005EFF] flex-shrink-0"/>Manual reporting nearly eliminated</li>
                <li className="flex items-start gap-3"><div className="mt-2 w-2 h-2 rounded-full bg-[#005EFF] flex-shrink-0"/>Early pilots confirm strong ROI and demand</li>
              </ul>
            </CardGray>
          </div>
        </FadeIn>
      </Section>

      {/* Slide 3: The Problem */}
      <Section className="bg-[#F5F5F5]">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 3: The Problem" />
            <Heading2>Service firms lose up to 30% of billable time due to undocumented work and execution drift.</Heading2>
          </div>
          <div className="space-y-10">
            <div className="space-y-6">
              <Heading4>Where margin evaporates</Heading4>
              {[
                { title: "Process Drift", desc: "Juniors skip or sequence steps incorrectly" },
                { title: "Scope Creep", desc: "Clients 'remember' extra work without proof" },
                { title: "Manual Documentation", desc: "2-3 hours/meeting rewriting notes" },
                { title: "Knowledge Loss", desc: "Seniors repeatedly explain the same workflows" }
              ].map((item, i) => (
                <Card key={i} className="flex gap-4 items-center">
                  <NumberCircle number={i + 1} />
                  <div><span className="text-lg font-semibold text-[#191F2E] mr-2">{item.title}:</span><span className="text-[#414651]">{item.desc}</span></div>
                </Card>
              ))}
            </div>
            <CardDark>
              <Heading4 className="text-white">Why this is deadly</Heading4>
              <div className="space-y-2 text-white/90 text-lg">
                <p>• Payroll = 80% of cost</p>
                <p>• Losing 10% of billable hours erases 100% of project profit</p>
              </div>
              <p className="mt-4 text-[#005EFF] font-bold">This is a hair-on-fire problem.</p>
            </CardDark>
          </div>
        </FadeIn>
      </Section>

      {/* Slide 4: The Solution */}
      <Section className="bg-white">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 4: The Solution" />
            <Heading2>Knowcap recovers 150 hours per project (30% of total delivery time).</Heading2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardGray>
              <Heading4>How it works</Heading4>
              <ul className="space-y-3 text-[#414651]">
                <li><strong className="text-[#191F2E]">Captures context:</strong> Joins calls + observes real screen work</li>
                <li><strong className="text-[#191F2E]">Understands execution:</strong> Detects fields, clicks, steps, and configurations</li>
                <li><strong className="text-[#191F2E]">Compares against expectations:</strong> Matches actions to requirements, SOPs, and meeting agreements</li>
                <li><strong className="text-[#191F2E]">Flags drift & missed steps:</strong> "Step 4 skipped — timestamp 02:14."</li>
                <li><strong className="text-[#191F2E]">Generates verifiable artifacts:</strong> Contracts, quotations, SOPs, gap analyses — all with video proof</li>
              </ul>
            </CardGray>
            <div className="space-y-6">
              <CardGray>
                <Heading4>Examples</Heading4>
                <ul className="space-y-3 text-[#414651]">
                  <li>"Step 4 skipped — timestamp 02:14."</li>
                  <li>"March 5 clip shows agreement was limited to Step 3."</li>
                  <li>"Clip at 00:42 explains multi-currency — added to training."</li>
                </ul>
              </CardGray>
              <CardGray>
                <Heading4>Outcome</Heading4>
                <ul className="space-y-3 text-[#414651]">
                  <li>• 150 hours saved per project</li>
                  <li>• Rework loops eliminated</li>
                  <li>• Documentation produced in minutes</li>
                </ul>
              </CardGray>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Slide 5: Why Knowcap Wins */}
      <Section className="bg-[#F5F5F5]">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 5: Why Knowcap Wins" />
            <Heading2>Competitors see fragments. Knowcap sees full execution.</Heading2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <Heading4 className="text-[#535862] mb-6">Fragmented Tools</Heading4>
              <ul className="space-y-4">
                <li><strong className="block text-[#191F2E] text-lg">Note-takers</strong><span className="text-[#414651]">Speech only</span></li>
                <li><strong className="block text-[#191F2E] text-lg">Screen recorders</strong><span className="text-[#414651]">Pixels only</span></li>
                <li><strong className="block text-[#191F2E] text-lg">Workspace AI</strong><span className="text-[#414651]">Text only</span></li>
              </ul>
            </Card>
            <CardDark className="border-2 border-[#005EFF]/20">
              <Heading4 className="text-[#005EFF] mb-6">Knowcap = Execution Understanding</Heading4>
              <ul className="space-y-4">
                <li><strong className="block text-white text-lg">Visual Transcription Engine (VTE)</strong><span className="text-gray-300">Detects steps, clicks, fields</span></li>
                <li><strong className="block text-white text-lg">Speech + Screen Fusion</strong><span className="text-gray-300">Multimodal capture in real time</span></li>
                <li><strong className="block text-white text-lg">Project Memory</strong><span className="text-gray-300">Remembers months of work</span></li>
                <li><strong className="block text-white text-lg">Verified Artifacts</strong><span className="text-gray-300">Every output links to exact video timestamps</span></li>
              </ul>
            </CardDark>
          </div>
        </FadeIn>
      </Section>

      {/* Slide 6: Why Now */}
      <Section className="bg-white">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 6: Why Now" />
            <Heading2>Multimodal AI only became capable of understanding workflows in 2024–2025.</Heading2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xl font-semibold text-[#191F2E] mb-6">What changed</p>
              <div className="space-y-4">
                {["Models interpret UI, screens, and workflows", "Million-token context windows enable project-level memory", "Mixed-language models handle real consultant conversations", "New APIs combine speech + screen capture", "Vector DB + RAG support multi-month retrieval"].map((item, i) => (
                  <CardGray key={i} className="py-4 flex gap-4 items-start"><IconCircle /><p className="text-lg font-medium text-[#191F2E]">{item}</p></CardGray>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <CardDark className="w-full"><p className="text-white text-2xl font-bold text-center leading-relaxed">18 months ago, this was not technically possible.</p></CardDark>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Slide 7: Market */}
      <Section className="bg-[#F5F5F5]">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 7: Market Opportunity" />
            <Heading2>Beachhead TAM: $90M from Odoo partners; Expansion to $690M pathable.</Heading2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card><Heading4 className="text-[#005EFF]">Beachhead</Heading4><p className="text-lg font-bold text-[#191F2E] mb-2">Odoo Partners</p><p className="text-[#414651]">7,500 partners</p><p className="text-[#414651]">× $12K ACV</p><div className="mt-4 pt-4 border-t border-gray-100"><p className="text-2xl font-bold text-[#191F2E]">$90M</p></div></Card>
            <Card><Heading4 className="text-[#005EFF]">ERP/CRM Partners</Heading4><p className="text-lg font-bold text-[#191F2E] mb-2">Wider Ecosystem</p><p className="text-[#414651]">15,000 firms</p><p className="text-[#414651]">× $12K ACV</p><div className="mt-4 pt-4 border-t border-gray-100"><p className="text-2xl font-bold text-[#191F2E]">$180M</p></div></Card>
            <Card><Heading4 className="text-[#005EFF]">Professional Services</Heading4><p className="text-lg font-bold text-[#191F2E] mb-2">Broad Market</p><p className="text-[#414651]">35,000 firms</p><p className="text-[#414651]">× $12K ACV</p><div className="mt-4 pt-4 border-t border-gray-100"><p className="text-2xl font-bold text-[#191F2E]">$420M</p></div></Card>
          </div>
          <CardDark><p className="text-white text-lg font-medium text-center"><strong className="font-semibold text-[#005EFF] block mb-2">Pathable TAM</strong>$90M → $270M → $690M</p></CardDark>
        </FadeIn>
      </Section>

      {/* Slide 8: Business Model */}
      <Section className="bg-white">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 8: Business Model" />
            <Heading2>Value-based SaaS: $500–$5,000 per firm per month.</Heading2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <CardGray>
              <Heading4>Pricing</Heading4>
              <ul className="space-y-4 text-[#414651] text-lg">
                <li className="flex justify-between"><span className="font-medium text-[#191F2E]">Starter</span><span>$500/mo</span></li>
                <li className="flex justify-between"><span className="font-medium text-[#191F2E]">Pro</span><span>$1,000/mo</span></li>
                <li className="flex justify-between"><span className="font-medium text-[#191F2E]">Enterprise</span><span>$5,000/mo</span></li>
              </ul>
            </CardGray>
            <CardGray>
              <Heading4>Why customers pay</Heading4>
              <ul className="space-y-3 text-[#414651] text-lg">
                <li className="flex items-start gap-3"><IconCircle /><span className="pt-1">150 hours saved per project</span></li>
                <li className="flex items-start gap-3"><IconCircle /><span className="pt-1">Recover 30% of lost billable time</span></li>
                <li className="flex items-start gap-3"><IconCircle /><span className="pt-1">Verified memory compounds value and reduces churn</span></li>
              </ul>
            </CardGray>
          </div>
        </FadeIn>
      </Section>

      {/* Slide 9: GTM */}
      <Section className="bg-[#F5F5F5]">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 9: Go-To-Market Strategy" />
            <Heading2>Clear path to 100 customers → $1.2M ARR.</Heading2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card><Heading4 className="text-[#005EFF]">Phase 1</Heading4><p className="font-bold text-[#191F2E] mb-2">Odoo Partner Network (Zero CAC)</p><p className="text-[#414651]">Convert 7 pre-orders + 500+ founder contacts → 20–30 customers</p></Card>
            <Card><Heading4 className="text-[#005EFF]">Phase 2</Heading4><p className="font-bold text-[#191F2E] mb-2">Referrals & Case Studies</p><p className="text-[#414651]">Verified ROI expands into IT consultancies and agencies</p></Card>
            <Card><Heading4 className="text-[#005EFF]">Phase 3</Heading4><p className="font-bold text-[#191F2E] mb-2">Integrations & Marketplaces</p><p className="text-[#414651]">Odoo App Store, Zoom/Teams integration, agent marketplace</p></Card>
          </div>
        </FadeIn>
      </Section>

      {/* Slide 10: Financials */}
      <Section className="bg-white">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 10: Financial Projections" />
            <Heading2>Capital-efficient path — break-even December 2026.</Heading2>
          </div>
          <div className="space-y-10">
            <CardGray className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-300 pb-4"><span className="text-xl font-bold text-[#191F2E]">2025</span><span className="text-xl text-[#414651]">4 orders pending integration, $1.85K MRR</span></div>
              <div className="flex items-center justify-between border-b border-gray-300 pb-4"><span className="text-xl font-bold text-[#191F2E]">2026</span><span className="text-xl text-[#414651]">100 customers → $1.2M ARR → break-even</span></div>
              <div className="flex items-center justify-between"><span className="text-xl font-bold text-[#191F2E]">2027</span><span className="text-xl text-[#414651]">300 customers → $3.6M ARR</span></div>
            </CardGray>
            <CardDark>
              <Heading4 className="text-white mb-4">Profile</Heading4>
              <div className="flex flex-wrap gap-8 text-white/90 text-lg">
                <span>• Gross margin: 85%</span><span>• Low CAC</span><span>• Compounding project memory moat</span>
              </div>
            </CardDark>
          </div>
        </FadeIn>
      </Section>

      {/* Slide 11: Unit Economics */}
      <Section className="bg-[#F5F5F5]">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 11: Unit Economics" />
            <Heading2>High-margin SaaS with fast payback.</Heading2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card><Heading4 className="text-[#005EFF]">Avg Subscription</Heading4><p className="text-xl font-bold text-[#191F2E]">$12K/year</p></Card>
            <Card><Heading4 className="text-[#005EFF]">Gross Margin</Heading4><p className="text-xl font-bold text-[#191F2E]">85%</p></Card>
            <Card><Heading4 className="text-[#005EFF]">CAC</Heading4><p className="text-xl font-bold text-[#191F2E]">$1,200–$1,500</p></Card>
            <Card><Heading4 className="text-[#005EFF]">Payback</Heading4><p className="text-xl font-bold text-[#191F2E]">~1.2 months</p></Card>
            <Card><Heading4 className="text-[#005EFF]">LTV</Heading4><p className="text-xl font-bold text-[#191F2E]">$36K–$60K</p></Card>
            <Card><Heading4 className="text-[#005EFF]">Break-even</Heading4><p className="text-xl font-bold text-[#191F2E]">50 customers</p></Card>
          </div>
        </FadeIn>
      </Section>

      {/* Slide 12: Path to 100 */}
      <Section className="bg-white">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 12: Path to 100 Customers" />
            <Heading2>Execution-driven quarterly plan for predictable scale.</Heading2>
          </div>
          <div className="space-y-10">
            <CardGray>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[{ label: "Q1", val: "+15 customers" }, { label: "Q2", val: "+23 customers" }, { label: "Q3", val: "+25 customers" }, { label: "Q4", val: "+30 customers" }].map((item, i) => (
                  <div key={i} className="p-4"><p className="text-2xl font-bold text-[#005EFF] mb-2">{item.label}</p><p className="text-lg text-[#191F2E] font-medium">{item.val}</p></div>
                ))}
              </div>
            </CardGray>
            <CardDark>
              <p className="text-white text-lg font-medium text-center"><strong className="font-semibold text-[#005EFF] block mb-2">Outcome</strong>100 customers → $1.2M ARR → break-even December 2026</p>
            </CardDark>
          </div>
        </FadeIn>
      </Section>

      {/* Slide 13: Team */}
      <Section className="bg-[#F5F5F5]">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 13: Team" />
            <Heading2>The Domain Expert + The Architect</Heading2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <h3 className="text-2xl font-bold text-[#191F2E] mb-1">Hassan Sam Arslan</h3>
              <p className="text-lg text-[#005EFF] mb-4 font-semibold">Founder & CEO</p>
              <p className="text-[#414651] leading-relaxed">Former Odoo Gold Partner, co-founder of Ariika ($0 → $20M), 100+ implementations</p>
            </Card>
            <Card>
              <h3 className="text-2xl font-bold text-[#191F2E] mb-1">Hesham Tarek</h3>
              <p className="text-lg text-[#005EFF] mb-4 font-semibold">Co-Founder & CTO</p>
              <p className="text-[#414651] leading-relaxed">AI systems architect; built Knowcap's VTE core</p>
            </Card>
          </div>
          <CardDark><p className="text-white text-center font-medium text-lg">Founders who lived the problem and can build the solution.</p></CardDark>
        </FadeIn>
      </Section>

      {/* Slide 14: Product Vision */}
      <Section className="bg-white">
        <FadeIn>
          <div className="mb-16">
            <SlideLabel text="SLIDE 14: Product Vision" />
            <Heading2>From documentation → automation → the Work Genome.</Heading2>
          </div>
          <div className="space-y-6 mb-8">
            {["Phase 1: Documentation & Verification", "Phase 2: Vibe Tasking (AI-native execution)", "Phase 3: Work Genome (verified standard for digital labor)"].map((text, i) => (
              <CardGray key={i} className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-[#005EFF] flex items-center justify-center flex-shrink-0 shadow-md text-white font-bold">{i + 1}</div>
                <h5 className="text-xl font-semibold text-[#191F2E]">{text}</h5>
              </CardGray>
            ))}
          </div>
          <CardDark><p className="text-white font-medium text-lg">This becomes the long-term defensible data moat.</p></CardDark>
        </FadeIn>
      </Section>

      {/* Slide 15: The Ask */}
      <section className="bg-[#0A0D12] min-h-screen flex items-center justify-center py-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto text-white">
          <FadeIn>
            <div className="mb-16">
              <p className="text-sm font-semibold text-[#005EFF] uppercase tracking-wider mb-4">SLIDE 15: The Ask</p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-white">Raising $750K SAFE @ $10M Pre to reach 100 customers and break-even</h2>
            </div>
            <div className="space-y-10">
              <CardDark className="border border-gray-800">
                <h4 className="text-xl font-semibold mb-6 text-white">Use of Funds (Milestones)</h4>
                <ul className="space-y-4 text-lg text-white">
                  {["Deliver Zoom/Teams multimodal integration → unlock $4K/mo committed pipeline", "Launch publicly with 20–25 paying customers", "Scale to 100 customers → $1.2M ARR", "Break-even December 2026"].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start"><div className="mt-1"><Check className="w-5 h-5 text-[#005EFF]" /></div><span>{item}</span></li>
                  ))}
                </ul>
              </CardDark>
              <div className="bg-[#005EFF]/10 border border-[#005EFF] p-8 rounded-xl">
                <p className="text-[#005EFF] font-bold text-lg mb-2 uppercase tracking-wide">Thesis</p>
                <p className="text-white text-xl leading-relaxed">Accelerate dominance in Odoo partner ecosystem — the highest-density market for AI-verified delivery — before funded competitors emerge.</p>
              </div>
              <div className="text-center pt-8">
                <a href="https://knowcap.ai/invest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold bg-white text-[#0A0D12] rounded-lg hover:bg-gray-200 transition-colors shadow-lg">
                  Schedule an Investor Call <ArrowRight className="ml-2 w-6 h-6" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
