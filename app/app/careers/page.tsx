'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/footer'

export default function CareersPage() {
  const [currentView, setCurrentView] = useState<string>('home')
  const [currentJobId, setCurrentJobId] = useState<string>('')

  useEffect(() => {
    document.title = 'Knowcap.ai | Careers'
    
    // Handle initial hash
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) || 'home'
      navigateTo(hash)
    }
    
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (pageId: string) => {
    if (pageId === 'home') {
      setCurrentView('home')
      setCurrentJobId('')
    } else {
      setCurrentView('detail')
      setCurrentJobId(pageId)
    }
    window.scrollTo(0, 0)
    window.location.hash = pageId
  }

  // Handle content injection when job changes
  useEffect(() => {
    if (currentView === 'detail' && currentJobId && typeof window !== 'undefined') {
      const container = document.getElementById('dynamic-job-content')
      if (container && (window as any).jobData && (window as any).jobData[currentJobId]) {
        const jobInfo = (window as any).jobData[currentJobId]
        const easyApplyForm = (window as any).easyApplyForm
        container.innerHTML = '<h1>' + jobInfo.title + '</h1>' + jobInfo.content + (easyApplyForm || '')
        
        // Attach form handler
        const form = container.querySelector('form')
        if (form) {
          form.addEventListener('submit', (window as any).handleFormSubmit)
        }
      }
    }
  }, [currentView, currentJobId])

  return (
    <>
      <style jsx global>{`
        /* --- GLOBAL VARIABLES & RESET --- */
        :root {
            --primary: #005EFF;
            --primary-hover: #004ecc;
            --dark: #191F2E;
            --gray-text: #414651;
            --bg-light: #F5F7FA;
            --white: #ffffff;
            --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            --card-border: 1px solid #e2e8f0;
        }

        .careers-page * { box-sizing: border-box; }
        .careers-page { font-family: 'Inter', sans-serif; background-color: var(--bg-light); color: var(--gray-text); line-height: 1.6; -webkit-font-smoothing: antialiased; }
        
        /* --- TYPOGRAPHY --- */
        .careers-page h1, .careers-page h2, .careers-page h3, .careers-page h4, .careers-page h5, .careers-page h6 { font-family: 'Space Grotesk', sans-serif; color: var(--dark); line-height: 1.2; margin-bottom: 1rem; }
        .careers-page h1 { font-size: 2.5rem; font-weight: 700; letter-spacing: -0.02em; }
        .careers-page h2 { font-size: 2rem; font-weight: 700; letter-spacing: -0.01em; margin-top: 2.5rem; }
        .careers-page h3 { font-size: 1.25rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary); margin-top: 3rem; margin-bottom: 1.5rem; }
        .careers-page h4 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }
        .careers-page p { margin-bottom: 1.5rem; font-size: 1.05rem; }
        .careers-page strong { color: var(--dark); font-weight: 600; }
        .careers-page ul { margin-bottom: 1.5rem; padding-left: 1.5rem; }
        .careers-page li { margin-bottom: 0.5rem; }

        /* --- LAYOUT UTILITIES --- */
        .careers-page .container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }
        .careers-page .text-center { text-align: center; }
        .careers-page .mx-auto { margin-left: auto; margin-right: auto; }
        .careers-page .max-w-prose { max-width: 75ch; }
        .careers-page .section { padding: 4rem 0; }
        .careers-page .grid-layout { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        @media (min-width: 992px) {
            .careers-page .grid-layout { grid-template-columns: 3fr 1fr; }
        }

        /* --- CORE COMPONENTS --- */
        .careers-page .card { background: var(--white); border-radius: 16px; padding: 2.5rem; box-shadow: var(--card-shadow); border: var(--card-border); margin-bottom: 2rem; display: flex; flex-direction: column; }
        .careers-page .job-card { height: 100%; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .careers-page .job-card:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); }
        .careers-page .job-card p { flex-grow: 1; }
        .careers-page .btn { display: inline-block; padding: 1rem 2rem; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 1rem; border-radius: 8px; text-decoration: none; cursor: pointer; transition: all 0.2s ease; border: none; align-self: flex-start; }
        .careers-page .btn-primary { background-color: var(--primary); color: white; box-shadow: 0 4px 14px rgba(0, 94, 255, 0.3); }
        .careers-page .btn-primary:hover { background-color: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0, 94, 255, 0.4); }

        /* --- HERO SECTION --- */
        .careers-page .hero-bg { background: radial-gradient(circle at 50% 0%, rgba(0, 94, 255, 0.1) 0%, rgba(245, 247, 250, 0) 70%); padding: 6rem 0 4rem 0; }
        .careers-page .location-badge { display: inline-block; background: white; padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.9rem; font-weight: 500; color: var(--dark); border: 1px solid rgba(0,0,0,0.05); margin-top: 1rem; }

        /* --- NAVIGATION --- */
        .careers-page .back-link { color: var(--gray-text); text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 0.5rem; margin: 2rem 0; }
        .careers-page .back-link:hover { color: var(--primary); }
        
        /* --- SIDEBAR & WHY WORK WITH US --- */
        .careers-page .sidebar .card { padding: 1.5rem; }
        .careers-page .sidebar h5 { font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gray-text); }
        .careers-page .sidebar ul { list-style-type: none; padding: 0; }
        .careers-page .sidebar li a { display: block; padding: 0.75rem 0; text-decoration: none; color: var(--dark); font-weight: 500; border-bottom: 1px solid #f0f0f0; }
        .careers-page .sidebar li a:hover { color: var(--primary); }
        .careers-page .sidebar li:last-child a { border-bottom: none; }
        .careers-page .team-section .grid-layout { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
        .careers-page .team-member-card { text-align: center; }
        .careers-page .team-photo-placeholder { width: 120px; height: 120px; border-radius: 50%; background-color: #e2e8f0; margin: 0 auto 1rem auto; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #9ca3af; }
        .careers-page .team-member-card h4 { font-size: 1.25rem; }
        .careers-page .team-member-card p { font-size: 1rem; color: var(--primary); }

        /* --- NEW: JOB GRID LAYOUT --- */
        .careers-page .job-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        @media (min-width: 768px) {
            .careers-page .job-grid {
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            }
        }

        /* --- FORM ELEMENTS (EASY APPLY) --- */
        .careers-page .form-group { margin-bottom: 1.5rem; }
        .careers-page label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: var(--dark); }
        .careers-page textarea, .careers-page input[type="text"], .careers-page input[type="email"], .careers-page input[type="url"] { width: 100%; padding: 0.875rem 1rem; border-radius: 8px; border: 1px solid #e2e8f0; font-family: 'Inter', sans-serif; font-size: 1rem; transition: all 0.2s; }
        .careers-page input[type="file"] { width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 1rem; background: white; cursor: pointer; }
        .careers-page textarea:focus, .careers-page input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(0, 94, 255, 0.1); }
        .careers-page textarea { resize: vertical; min-height: 100px; }
        
        /* --- UTILITY FOR JS ROUTING --- */
        .careers-page .page-view { display: none; animation: fadeIn 0.4s ease; }
        .careers-page .page-view.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        /* Responsive Tweaks */
        @media (min-width: 768px) {
            .careers-page h1 { font-size: 3.5rem; }
            .careers-page h2 { font-size: 2.5rem; }
            .careers-page .hero-bg { padding-top: 8rem; }
        }
      `}</style>

      <main className="careers-page">
        <div id="home" className="page-view" style={{ display: currentView === 'home' ? 'block' : 'none' }}>
          <header className="hero-bg">
            <div className="container text-center">
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ background: 'rgba(0, 94, 255, 0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  🚀 Join the Founding Team
                </span>
              </div>

              <h1 className="max-w-prose mx-auto">Stop Documenting Work.<br />Start Verifying It.</h1>
              
              <h2 style={{ fontSize: '1.5rem', opacity: 0.8, marginTop: '1rem', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                Help us build the AI that turns meetings and screen work into verifiable project memory.
              </h2>
              
              <div className="max-w-prose mx-auto" style={{ marginTop: '2rem' }}>
                <p>Every summary, task, and decision is automatically generated and linked to the exact moment in the video proof—giving professional teams context they finally trust.</p>
              </div>
              <div className="location-badge">
                📍 New Cairo HQ • In-Person High-Velocity Environment
              </div>
            </div>
          </header>

          <section className="container section">
            <div className="text-center">
              <h3 style={{ marginTop: 0 }}>WHY BUILD AT KNOWCAP.AI?</h3>
              <h2 style={{ marginTop: 0 }}>Join a Mission, Not Just a Company.</h2>
              <p className="max-w-prose mx-auto">We are a small, obsessed team building the missing layer of enterprise productivity. We believe that the chaos of service delivery is a solvable problem. If you are driven by solving hard problems with massive real-world impact, this is the place for you.</p>
            </div>

            <div style={{ marginTop: '4rem' }}>
              <h3 className="text-center" style={{ marginBottom: '2rem' }}>What We Offer (Beyond a Paycheck)</h3>
              <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div className="card" style={{ marginBottom: 0 }}>
                  <h4>Direct Ownership & Impact</h4>
                  <p style={{ marginBottom: 0 }}>You won&apos;t be a cog in a machine. You will own entire pillars of our business, and your work will directly influence our product and revenue from day one.</p>
                </div>
                <div className="card" style={{ marginBottom: 0 }}>
                  <h4>Solve a Hard, Meaningful Problem</h4>
                  <p style={{ marginBottom: 0 }}>We are tackling a complex, valuable problem that plagues millions of professionals. You will be working on cutting-edge AI and product challenges, not just another CRUD app.</p>
                </div>
                <div className="card" style={{ marginBottom: 0 }}>
                  <h4>No Bureaucracy, High Velocity</h4>
                  <p style={{ marginBottom: 0 }}>We are a small, focused team. You will work directly with the founders, make decisions quickly, and ship work that matters without layers of management slowing you down.</p>
                </div>
              </div>
            </div>

            <div className="team-section" style={{ marginTop: '6rem' }}>
              <h4 className="text-center" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Meet the Founding Team</h4>
              <div className="grid-layout" style={{ gap: '2rem', maxWidth: '600px', margin: '0 auto', gridTemplateColumns: '1fr 1fr' }}>
                <div className="team-member-card">
                  <div className="team-photo-placeholder"><i className="fa-solid fa-user"></i></div>
                  <h4>Hassan Sam Arslan</h4>
                  <p>Founder & CEO</p>
                </div>
                <div className="team-member-card">
                  <div className="team-photo-placeholder"><i className="fa-solid fa-user"></i></div>
                  <h4>Shady</h4>
                  <p>Founding Partner</p>
                </div>
              </div>
            </div>
          </section>

          <section id="open-roles" className="container section" style={{ paddingTop: 0 }}>
            <h2 className="text-center" style={{ marginBottom: '3rem' }}>Join the Founding Team</h2>
            
            <h3>TECHNICAL & AI</h3>
            <div className="job-grid">
              <article className="card job-card">
                <h4>Founding AI Engineer (Path to CTO)</h4>
                <p>The technical soul of the company. A partner to build the core AI engine from scratch and evolve into the CTO as we scale.</p>
                <p><strong>💰 Compensation:</strong> EGP 840k - 2.4M Annually + Founding Equity (2.0% - 10.0%)</p>
                <button onClick={() => navigateTo('founding-ai-engineer')} className="btn btn-primary">Learn More & Apply →</button>
              </article>
            </div>

            <h3>GROWTH & REVENUE</h3>
            <div className="job-grid">
              <article className="card job-card">
                <h4>Head of Growth (Revenue Partner)</h4>
                <p>The engine that turns our potential into a calendar full of qualified demos. You own the strategy, the funnel, and the data.</p>
                <button onClick={() => navigateTo('head-of-growth')} className="btn btn-primary">Learn More & Apply →</button>
              </article>
              <article className="card job-card">
                <h4>Content Creator Interns</h4>
                <p>Our frontline storytellers. Your mission is to turn our journey into a must-watch &apos;Build in Public&apos; reality show. (3 roles available).</p>
                <button onClick={() => navigateTo('content-creator-intern')} className="btn btn-primary">Learn More & Apply →</button>
              </article>
            </div>

            <h3>PRODUCT & OPERATIONS</h3>
            <div className="job-grid">
              <article className="card job-card">
                <h4>Product Manager</h4>
                <p>The CEO of our core intellectual property, owning the roadmap that transforms raw interactions into structured, verifiable insights.</p>
                <button onClick={() => navigateTo('product-manager')} className="btn btn-primary">Learn More & Apply →</button>
              </article>
              <article className="card job-card">
                <h4>AI Trust & Reliability Specialist (QA)</h4>
                <p>The guardian of our verification promise. You are the last line of defense protecting our users from a single piece of bad data.</p>
                <button onClick={() => navigateTo('qa-specialist')} className="btn btn-primary">Learn More & Apply →</button>
              </article>
              <article className="card job-card">
                <h4>Executive Assistant</h4>
                <p>The operational backbone of the company. Your mission is to create leverage and reclaim executive time as our most valuable resource.</p>
                <button onClick={() => navigateTo('executive-assistant')} className="btn btn-primary">Learn More & Apply →</button>
              </article>
            </div>
          </section>
        </div>

        <div id="job-detail-template" className="page-view" style={{ display: currentView === 'detail' ? 'block' : 'none' }}>
          <header className="container">
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="back-link"><i className="fa-solid fa-arrow-left"></i> Back to All Roles</a>
          </header>
          <div className="container section" style={{ paddingTop: '1rem' }}>
            <div className="grid-layout">
              <div className="main-content" id="dynamic-job-content">
                {/* Dynamic job content will be injected here */}
              </div>
              <aside className="sidebar">
                <div className="card" style={{ position: 'sticky', top: '2rem' }}>
                  <h5>Other Open Roles</h5>
                  <ul>
                    <li><a href="#founding-ai-engineer">Founding AI Engineer</a></li>
                    <li><a href="#head-of-growth">Head of Growth</a></li>
                    <li><a href="#content-creator-intern">Content Creator Intern</a></li>
                    <li><a href="#product-manager">Product Manager</a></li>
                    <li><a href="#qa-specialist">AI Trust & Reliability Specialist</a></li>
                    <li><a href="#executive-assistant">Executive Assistant</a></li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <Footer />
      </main>

      <script dangerouslySetInnerHTML={{ __html: `
        const jobData = {
          'founding-ai-engineer': {
            title: 'Founding AI Engineer (Path to CTO)',
            content: \\\`
              <div class="card">
                <h3 style="margin-top: 0;">The Opportunity</h3>
                <p style="font-size: 1.1rem;">We are looking for a partner, not an employee. We bring 10 years of domain expertise in Service Delivery and a 'hair-on-fire' sales pipeline of 500+ potential agency clients. We need You to build the technical soul of the company. You will start by shipping code Day 1, and as the team scales, you will have the path to evolve into the CTO role, owning the entire technical organization.</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0;">
                <h3 style="margin-top: 0;">Compensation</h3>
                <p>The total compensation for this role is a combination of a competitive salary and significant founding team equity. The expected salary range is <strong>EGP 840,000 - 2,400,000 annually (approx. EGP 70,000 - 200,000 monthly)</strong>.</p>
                <p style="margin-bottom: 0;"><strong>Our Compensation Philosophy:</strong> Our cash salary is benchmarked at the top of the Egyptian market. We believe in providing an exceptional living for our team locally. However, this is a founding team role, not a standard salaried position. The primary financial opportunity is not in the monthly salary, but in the <strong>significant, life-changing equity package (2.0% - 10.0%)</strong>. We are looking for a partner to build this company with us and share in the massive upside of that success.</p>
              </div>
              <div class="card">
                <h3 style="margin-top: 0;">The Mission (The "Evolution")</h3>
                <p><strong>Phase 1 (Months 1-6):</strong> You are the <strong>Lead Architect & Coder</strong>. You will build the <strong>Visual Transcription Engine (VTE)</strong>—the system that watches screens and audio to eliminate 20–40% of project rework. You optimize for <strong>Unit Economics</strong> and <strong>Latency</strong>.</p>
                <p><strong>Phase 2 (Months 6-12):</strong> You become the <strong>Engineering Lead</strong>. You will hire 2-3 junior engineers to scale what you built.</p>
                <p style="margin-bottom: 0;"><strong>Phase 3 (Year 1+):</strong> You become the <strong>CTO</strong>. You own the technical roadmap, security, and infrastructure for the entire company.</p>
              </div>
              <div class="card">
                <h3 style="margin-top: 0;">Our Engineering Philosophy: Is This You?</h3>
                <ul style="margin-bottom: 0;">
                  <li><strong>You treat LLMs as raw material, not magic.</strong> You don't just accept the first response. You understand the model's failure points and have a craftsman's approach to prompt engineering, fine-tuning, and output validation to force it to produce exceptional results.</li>
                  <li><strong>You are obsessed with the user's perception of speed.</strong> You know that a 3-second delay isn't just an inconvenience; it's a broken workflow. You think deeply about streaming tokens, optimistic UI, and caching strategies because you are driven to create a seamless user experience.</li>
                  <li><strong>You have a practical obsession with the 'state-of-the-art'.</strong> Your YouTube feed isn't just for entertainment; it's for reconnaissance. When a new model or coding tool is released, you don't just watch the demo. You have an immediate, hands-on need to stress-test it. You've probably pitted Claude 3.5's code generation against Gemini 1.5's, not for sport, but to understand its unique strengths and weaknesses. You're constantly looking for a new technique or a better tool that can give Knowcap a competitive edge.</li>
                  <li><strong>You automate your own life.</strong> Your GitHub isn't just course assignments. It's full of half-finished scripts, CLI tools, and bots you built to automate your own daily annoyances. You believe if you have to do a task twice, you should script it.</li>
                  <li><strong>You want to build "Intelligence," not just "Wrappers."</strong> You are bored of simple API calls. You want to solve the hard problems: syncing visual data with audio, grounding hallucinations in ground truth, and building memory that actually persists.</li>
                </ul>
              </div>
            \\\`
          },
          'head-of-growth': {
            title: 'Head of Growth (Revenue Partner)',
            content: \\\`
              <div class="card">
                <h3 style="margin-top: 0;">The Role: Scientist of Revenue</h3>
                <p style="font-size: 1.1rem;">We are looking for a Head of Growth who is actually a "Scientist of Revenue." You aren't here to manage an agency or approve blog post graphics. You are here to build the engine that acquires, activates, and retains customers. You will inherit a product with massive potential and a CEO ready to close, but you need to build the bridge between the two.</p>
                <div style="background: rgba(0, 94, 255, 0.05); border: 1px solid rgba(0, 94, 255, 0.2); border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;">
                  <h4 style="margin-top: 0; color: var(--primary); font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-triangle-exclamation"></i> The Reality Check: We are Pre-PMF</h4>
                  <p style="margin-bottom: 0; font-size: 1rem;">We have a strong initial hypothesis targeting Odoo Partners, but we are transparent: <strong>We are still finding Product-Market Fit.</strong> Our target market could shift at any moment. We need a Revenue Partner who thrives in ambiguity, tests segments, and invalidates bad ideas fast.</p>
                </div>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0;">
                <h3 style="margin-top: 0;">Compensation</h3>
                <p style="margin-bottom: 0;"><strong>Salary Range:</strong> EGP 600,000 - 1,800,000 annually (approx. EGP 50,000 - 150,000 monthly), plus performance-based options.</p>
              </div>
              <div class="card">
                <h3 style="margin-top: 0;">Key Responsibilities (The "What")</h3>
                <ul style="margin-bottom: 0;">
                  <li><strong>Own the "Full Funnel" Architecture:</strong> You aren't just generating leads; you are responsible for the entire lifecycle. From the first impression on LinkedIn to the moment they sign the contract (and renew). You will map, measure, and optimize every conversion point.</li>
                  <li><strong>Build the Outbound Machine:</strong> Since our target (Odoo Partners) is distinct, you will likely rely heavily on Account-Based Marketing (ABM). You will scrape data, enrich leads, design multi-channel sequences (Email, LinkedIn, Twitter), and automate the handover to the CEO for closing.</li>
                  <li><strong>The "Build in Public" Strategy:</strong> You will act as the Editor-in-Chief for our content interns. You don't need to edit the videos, but you must define the narrative, the hooks, and the distribution strategy to ensure our brand punch is well above our weight class.</li>
                  <li><strong>Data & Attribution:</strong> Implement the stack (e.g., HubSpot, Mixpanel, June.so). We need to know exactly how much it costs to acquire a customer (CAC) and where our best users are coming from. No vanity metrics.</li>
                  <li><strong>Rapid Experimentation:</strong> Run weekly growth sprints. Test a new cold email angle on Monday, analyze open rates by Wednesday, and pivot or double down by Friday.</li>
                </ul>
              </div>
              <div class="card">
                <h3 style="margin-top: 0;">Requirements (The "Who")</h3>
                <ul style="margin-bottom: 0;">
                  <li><strong>B2B SaaS Experience:</strong> You have scaled a B2B product from $0 to $1M+ ARR before. You understand the difference between selling to a developer vs. an agency owner.</li>
                  <li><strong>Technical Literacy:</strong> You can write your own SQL, or at least you are dangerous with tools like Clay, Zapier, Phantombuster, and HubSpot workflows. You don't wait for engineering to pull a CSV for you.</li>
                  <li><strong>Copywriting Chops:</strong> You understand that "Growth" is 90% psychology. You can write cold emails that don't sound like sales pitches and landing page headers that convert.</li>
                  <li><strong>Scrappy & Analytical:</strong> You treat the budget like it's your own money. You prefer organic reach and clever hacks over dumping cash into Facebook Ads (unless the ROAS proves it works).</li>
                </ul>
              </div>
              <div class="card">
                <h3 style="margin-top: 0;">What Success Looks Like (30-60-90 Days)</h3>
                <ul style="margin-bottom: 0;">
                  <li><strong>Day 30:</strong> The CRM is clean. The ICP (Ideal Customer Profile) list of 7,500 Odoo partners is enriched and segmented. The first outbound experiments are live.</li>
                  <li><strong>Day 60:</strong> You have established a predictable "Meeting Booked" metric. We are consistently getting 5-10 qualified demos per week from your machine.</li>
                  <li><strong>Day 90:</strong> You have hired/onboarded the content team. We have a clear playbook for expanding beyond Odoo partners into the broader ERP market.</li>
                </ul>
              </div>
            \\\`
          },
          'content-creator-intern': {
            title: 'Content Creator Interns (The "Build in Public" Squad)',
            content: \\\`
              <div class="card">
                <h3 style="margin-top: 0;">The Opportunity</h3>
                <p style="font-size: 1.1rem;">Forget boring internships where you just fetch coffee. You are our media team. We're a startup building world-changing AI, and your mission is to turn our journey into a viral 'Build in Public' show on TikTok, Reels, and LinkedIn. Your camera is your all-access pass to the startup reality show everyone wishes they could see.</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0;">
                <h3 style="margin-top: 0;">Compensation</h3>
                <p style="margin-bottom: 0;">This is a competitive paid internship, with an expected monthly stipend of <strong>EGP 8,000 - 12,000</strong>, depending on your portfolio and experience.</p>
              </div>
              <div class="card">
                <h3 style="margin-top: 0;">The Mission</h3>
                <ul style="margin-bottom: 1.5rem;">
                  <li><strong>Become the Voice of the Mission:</strong> You won't just post clips; you will learn to find the narrative gold. Your challenge is to take a complex technical debate about our AI engine and find the human story inside it—the frustration, the breakthrough, the passion.</li>
                  <li><strong>Capture the "Aha!" Moments:</strong> You will sit in on product meetings and customer discovery calls to capture the moments when a potential client says, "I lose thousands of dollars on that exact problem." Those moments are the hooks for our entire marketing strategy.</li>
                  <li><strong>Build a Community, Not Just an Audience:</strong> You'll engage with other builders, developers, and agency owners on social media, turning our followers into a community of evangelists who are invested in our success.</li>
                </ul>
                <p style="margin-bottom: 0; font-size: 0.9rem; color: var(--gray-text);"><em>Note: The application challenges for this role will be sent via email to qualified candidates after an initial screening.</em></p>
              </div>
            \\\`
          },
          'product-manager': {
            title: 'Product Manager (CEO of the Product Intelligence Layer)',
            content: \\\`
              <div class="card">
                <h3 style="margin-top: 0;">The Opportunity</h3>
                <p style="font-size: 1.1rem;">We are not building another project management tool. We are building the source of truth for all project work—the Verified Delivery OS. As our first Product Manager, you are the CEO of our core intellectual property. You will own the roadmap that transforms raw, messy service delivery interactions into structured, verifiable insights.</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0;">
                <h3 style="margin-top: 0;">Compensation</h3>
                <p style="margin-bottom: 0;"><strong>Salary Range:</strong> EGP 900,000 - 1,500,000 annually (approx. EGP 75,000 - 125,000 monthly), plus equity options.</p>
              </div>
              <div class="card">
                <h3 style="margin-top: 0;">The Mission</h3>
                <ul style="margin-bottom: 0;">
                  <li><strong>Translate Chaos into Clarity:</strong> You will live with our customers to deeply understand the pain of "decision drift" and "scope creep." Your core mission is to translate that pain into concrete technical specifications for our Visual Transcription Engine (VTE) and Verified Memory Graph.</li>
                  <li><strong>Own the 'Verification' Promise:</strong> You will be ruthless in prioritizing features that strengthen our core "verification" promise. You'll work hand-in-hand with the Founding AI Engineer to balance groundbreaking AI capabilities with the absolute need for reliability and source attribution.</li>
                  <li><strong>Build the Flywheel:</strong> You will define the product loops that make Knowcap indispensable. How does a verified decision in one project inform the next? How do our insights help an agency owner not just win a dispute, but also write better proposals in the future?</li>
                </ul>
              </div>
            \\\`
          },
          'qa-specialist': {
            title: 'AI Trust & Reliability Specialist (QA)',
            content: \\\`
              <div class="card">
                <h3 style="margin-top: 0;">The Opportunity</h3>
                <p style="font-size: 1.1rem;">In a world of AI hallucinations, trust is our most valuable asset. We are looking for a specialist who is obsessed with the truth. Your job is not just to find bugs, but to be the guardian of our verification promise. You are the last line of defense protecting our users from a single piece of bad data.</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0;">
                <h3 style="margin-top: 0;">Compensation</h3>
                <p style="margin-bottom: 0;"><strong>Salary Range:</strong> EGP 600,000 - 950,000 annually (approx. EGP 50,000 - 79,000 monthly).</p>
              </div>
              <div class="card">
                <h3 style="margin-top: 0;">The Mission</h3>
                <ul style="margin-bottom: 0;">
                  <li><strong>Become the Human Ground Truth:</strong> You will be the expert on what "good" looks like. You will manually review the outputs of our Product Intelligence Layer (PIL) against source videos, not just to find errors, but to deeply understand the nuances of where our AI excels and where it fails.</li>
                  <li><strong>Build the 'Golden Datasets':</strong> Your meticulous verification work is not disposable. You will be responsible for curating the high-quality evaluation datasets that are fed directly into our automated "LLM-as-a-Judge" pipeline. The bugs you find today will train the models of tomorrow.</li>
                  <li><strong>Champion the Edge Case:</strong> You have a natural talent for finding the scenarios that engineers miss. You think about different accents, low-quality video, overlapping speakers, and ambiguous jargon. Your curiosity and adversarial mindset are critical inputs into our engineering process.</li>
                </ul>
              </div>
            \\\`
          },
          'executive-assistant': {
            title: 'Executive Assistant (The Founder\'s Force Multiplier)',
            content: \\\`
              <div class="card">
                <h3 style="margin-top: 0;">The Opportunity</h3>
                <p style="font-size: 1.1rem;">We are looking for a true business partner to serve as the operational backbone of the company. This isn't a typical EA role; you are the CEO's force multiplier. Your primary mission is to create leverage and reclaim executive time as the company's most valuable resource. You will own the systems that allow leadership to focus exclusively on building the product, selling to customers, and hiring our team. You will have immense ownership, and your impact will be felt across the entire organization.</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0;">
                <h3 style="margin-top: 0;">Compensation</h3>
                <p style="margin-bottom: 0;"><strong>Salary Range:</strong> EGP 480,000 - 800,000 annually (approx. EGP 40,000 - 67,000 monthly).</p>
              </div>
              <div class="card">
                <h3 style="margin-top: 0;">The Mission: Architecting the CEO's Operating System</h3>
                <p>Your mission is to design, implement, and run the core operating system for the CEO's office. Success in this role means the CEO can operate at maximum efficiency, confident that nothing is falling through the cracks.</p>
                <ul style="margin-bottom: 0;">
                  <li><strong>Protect the "Deep Work" Blocks:</strong> You will be the guardian of the CEO's calendar, enforcing the "Perfect Week" principle. Mornings are for building the business (creative, high-focus work); afternoons are for meetings. Your defense of this schedule is critical to our success.</li>
                  <li><strong>Drive the Inbox to Zero:</strong> You will have full authority over the CEO's inbox. Your goal is to drive it to zero daily by aggressively filtering noise, archiving, handling all scheduling, and responding on the CEO's behalf. You will surface only the most critical communications that require direct executive attention.</li>
                  <li><strong>Read the Play & Look Ahead:</strong> You won't just manage today. You will be constantly looking 2-6 weeks ahead on the calendar, anticipating conflicts, confirming travel, and ensuring every upcoming meeting has a clear agenda and desired outcome.</li>
                </ul>
              </div>
            \\\`
          }
        };

        const mainContentContainer = document.querySelector('#job-detail-template .main-content');
        
        const easyApplyForm = \\\`
          <div class="easy-apply-form" style="margin-top: 3rem;">
            <h2>Join the Mission</h2>
            <div class="card">
              <p style="font-size: 0.9rem; color: var(--gray-text);">Submit your essentials here. If your profile is a strong match, we will reach out with the detailed application challenges for this role.</p>
              <form action="#" method="POST" onsubmit="handleFormSubmit(event)">
                <div class="form-group">
                  <label for="fullName">Full Name</label>
                  <input type="text" id="fullName" name="fullName" required>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                  <label for="linkedin">LinkedIn Profile (Optional)</label>
                  <input type="url" id="linkedin" name="linkedin">
                </div>
                <div class="form-group">
                  <label for="portfolio">Portfolio / GitHub (Optional)</label>
                  <input type="url" id="portfolio" name="portfolio">
                </div>
                <div class="form-group">
                  <label for="ai_project">Something Cool You Did with AI</label>
                  <textarea id="ai_project" name="ai_project" placeholder="Share a project you've built, or a concept you'd love to bring to life." rows="3"></textarea>
                </div>
                <div class="form-group">
                  <label for="resume">Resume / CV</label>
                  <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required>
                </div>
                <button type="submit" class="btn btn-primary">Submit Application</button>
              </form>
            </div>
          </div>
        \\\`;

        // Expose data to window for React component
        window.jobData = jobData;
        window.easyApplyForm = easyApplyForm;
        
        window.handleFormSubmit = function(event) {
          event.preventDefault();
          const formData = new FormData(event.target);
          const role = window.location.hash.substring(1);
          formData.append('role', role);

          fetch('/api/submit-recruitment', {
            method: 'POST',
            body: formData
          })
          .then(response => {
            if (response.ok) {
              alert('Thank you for your application! We will be in touch if your profile is a strong match.');
              event.target.reset();
            } else {
              throw new Error('Submission failed');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your application. Please try again.');
          });
        }
      `}} />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </>
  )
}
