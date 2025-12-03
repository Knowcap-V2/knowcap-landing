'use client'

import { useEffect } from 'react'

export default function OfferPage() {
  useEffect(() => {
    document.title = 'KnowCap Pilot Offer: Odoo Partner Edition'

    // Intersection Observer for fade-in animations
    const observerOptions = { threshold: 0.1 }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');

        :root {
          --primary: #005EFF;
          --primary-dark: #0046bd;
          --primary-light: rgba(0, 94, 255, 0.08);
          --dark: #191F2E;
          --gray-text: #414651;
          --bg-light: #F5F7FA;
          --surface-glass: rgba(255, 255, 255, 0.95);
          --shadow-sm: 0 2px 4px rgba(0,0,0,0.02);
          --shadow-md: 0 12px 24px -6px rgba(0,0,0,0.05);
          --shadow-lg: 0 20px 40px -10px rgba(0,0,0,0.1);
          --radius-lg: 16px;
          --success: #27C93F;
          --danger: #FF5F56;
        }

        .offer-page * { margin: 0; padding: 0; box-sizing: border-box; }

        .offer-page {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          color: var(--dark);
          background: var(--bg-light);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .offer-page h1, .offer-page h2, .offer-page h3, .offer-page h4, .offer-page h5 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--dark);
        }

        .offer-page h1 { font-size: 2.5rem; margin-bottom: 1rem; text-align: center; }
        .offer-page h2 { font-size: 2rem; margin-bottom: 1rem; }
        .offer-page h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .offer-page h5 { font-size: 1.1rem; margin-bottom: 0.5rem; }

        .offer-page .gradient-text {
          background: linear-gradient(135deg, #005EFF 0%, #00C6FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .offer-page p { margin-bottom: 1rem; color: var(--gray-text); font-size: 1rem; }
        .offer-page .text-center { text-align: center; }
        .offer-page .font-bold { font-weight: 700; }
        .offer-page .text-primary { color: var(--primary); }
        .offer-page .text-white { color: white; }
        .offer-page .text-sm { font-size: 0.875rem; }
        .offer-page .text-lg { font-size: 1.125rem; }
        .offer-page .text-xs { font-size: 0.75rem; }
        .offer-page .text-gray { color: var(--gray-text); }
        
        .offer-page section { padding: 4rem 1.5rem; position: relative; }
        .offer-page .container { max-width: 1000px; margin: 0 auto; }
        .offer-page .max-w-3xl { max-width: 768px; }
        .offer-page .mx-auto { margin-left: auto; margin-right: auto; }
        .offer-page .mb-12 { margin-bottom: 3rem; }
        .offer-page .mb-8 { margin-bottom: 2rem; }
        .offer-page .mb-6 { margin-bottom: 1.5rem; }
        .offer-page .mb-4 { margin-bottom: 1rem; }
        .offer-page .mb-2 { margin-bottom: 0.5rem; }
        .offer-page .mb-1 { margin-bottom: 0.25rem; }
        .offer-page .mb-0 { margin-bottom: 0; }
        .offer-page .mt-4 { margin-top: 1rem; }
        .offer-page .space-y-2 > * + * { margin-top: 0.5rem; }

        .offer-page .slide-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          display: inline-block;
          background: var(--primary-light);
          padding: 4px 12px;
          border-radius: 100px;
        }

        .offer-page .grid { display: grid; gap: 1.5rem; }
        .offer-page .grid-cols-2 { grid-template-columns: 1fr; }
        .offer-page .gap-8 { gap: 2rem; }
        .offer-page .items-center { align-items: center; }

        .offer-page .card {
          background: var(--surface-glass);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: var(--radius-lg);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          height: 100%;
          transition: transform 0.2s;
        }
        
        .offer-page .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

        .offer-page .card-dark {
          background: var(--dark);
          color: white;
          border: 1px solid #333;
          padding: 2rem;
          border-radius: var(--radius-lg);
          text-align: center;
        }
        .offer-page .card-dark p { color: #9ca3af; }
        .offer-page .card-dark .text-white { color: white; }

        .offer-page .hero-bg {
          background: radial-gradient(circle at 50% 0%, #E3F2FD 0%, #F8FAFC 70%);
          padding-top: 5rem;
          padding-bottom: 3rem;
        }

        .offer-page .price-strike {
          text-decoration: line-through;
          color: #9ca3af;
          font-size: 1.2rem;
        }

        .offer-page .price-main {
          font-size: 3rem;
          font-weight: 700;
          color: var(--primary);
          line-height: 1;
        }

        .offer-page .tag {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .offer-page .tag-live { background: #e6f4ea; color: #1e8e3e; }
        .offer-page .tag-future { background: #fef7e0; color: #b06000; }
        .offer-page .tag-service { background: #fce8e6; color: #c5221f; }

        .offer-page .btn-primary {
          display: inline-block;
          background: var(--primary);
          color: white;
          padding: 1rem 2.5rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(0, 94, 255, 0.3);
          transition: all 0.2s;
          margin-top: 1rem;
          cursor: pointer;
        }
        .offer-page .btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); }

        .offer-page .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .offer-page .visible { opacity: 1; transform: translateY(0); }

        .offer-page .urgency-badge {
          background: rgba(255, 95, 86, 0.15);
          border: 1px solid var(--danger);
          color: var(--danger);
          display: inline-block;
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 95, 86, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 95, 86, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 95, 86, 0); }
        }

        @media (min-width: 768px) {
          .offer-page h1 { font-size: 3.5rem; }
          .offer-page .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <main className="offer-page">
        {/* HERO SECTION */}
        <section className="hero-bg">
          <div className="container">
            <div className="fade-in text-center">
              <span className="slide-label">Pilot Program Invitation</span>
              <h1>The KnowCap <span className="gradient-text">Odoo Partner Edition</span></h1>
              <p className="text-lg" style={{ maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                Stop the 180-hour leak. Protect your margins. Automate your documentation.
              </p>
              
              <div className="card-dark max-w-3xl mx-auto" style={{ marginTop: '2rem' }}>
                <h3 className="text-white mb-2">The Cost of Inaction</h3>
                <p className="text-white text-lg mb-0" style={{ lineHeight: '1.6' }}>
                  You pay a Senior Consultant ~70k EGP/mo, but you bill them at <strong>$50 USD/hr</strong>.
                  <br /><br />
                  When they waste <strong>180 hours</strong> on rework and support, you aren&apos;t losing cheap EGP. You are losing <strong>$9,000 USD</strong> in billable revenue per project.
                  <br />
                  <span style={{ color: '#FF5F56', fontSize: '0.9rem' }}>(That is equal to 6 months of their salary burned.)</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE STACK SECTION */}
        <section>
          <div className="container fade-in">
            <div className="mb-12 text-center">
              <span className="slide-label">The Value Stack</span>
              <h2>What You Get (Pilot Access)</h2>
            </div>

            <div className="grid grid-cols-2">
              {/* Card 1: Core Software */}
              <div className="card">
                <span className="tag tag-live">Live Now</span>
                <h3 className="text-primary">1. The Core System</h3>
                <p className="text-sm font-bold mb-4">Unlimited Seats & Magic Links</p>
                <ul style={{ listStyle: 'none', padding: 0 }} className="text-sm space-y-2">
                  <li className="mb-2">✓ <strong>Visual Transcription Engine:</strong> Instantly converts video into Step-by-Step SOPs.</li>
                  <li className="mb-2">✓ <strong>Unlimited &quot;Magic Links&quot;:</strong> Replace Loom for your clients.</li>
                  <li className="mb-0">✓ <strong>Project Memory:</strong> Searchable proof of every decision.</li>
                </ul>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <p className="text-xs text-gray mb-0">Standard Value: <strong>$1,000/mo</strong></p>
                </div>
              </div>

              {/* Card 2: Future Tech */}
              <div className="card">
                <span className="tag tag-future">Q1 Future-Lock</span>
                <h3 className="text-primary">2. Tech Bonuses</h3>
                <p className="text-sm font-bold mb-4">Lifetime Enterprise Upgrades</p>
                <ul style={{ listStyle: 'none', padding: 0 }} className="text-sm space-y-2">
                  <li className="mb-2">✓ <strong>White Labeling:</strong> Your Brand, Your Domain, Your Colors.</li>
                  <li className="mb-2">✓ <strong>Bilingual Chatbot:</strong> Arabic/English Agent trained on your docs.</li>
                  <li className="mb-0">✓ <strong>Grandfathered Status:</strong> You never pay extra for these.</li>
                </ul>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <p className="text-xs text-gray mb-0">Future Value: <strong>+$500/mo</strong></p>
                </div>
              </div>

              {/* Card 3: Service 1 */}
              <div className="card" style={{ border: '1px solid #FFD7D5' }}>
                <span className="tag tag-service">Done-For-You Service</span>
                <h3 style={{ color: '#C5221F' }}>3. &quot;White Glove&quot; Ingestion</h3>
                <p className="text-sm font-bold mb-4">We Do The Work For You</p>
                <p className="text-sm">Send us your 10 most critical documents (PDFs, Docs, SOPs). My team will <strong>manually upload, tag, and structure them</strong> into KnowCap for you.</p>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <p className="text-xs text-gray mb-0">Service Value: <strong>$1,500 (One-Time)</strong></p>
                </div>
              </div>

              {/* Card 4: Service 2 */}
              <div className="card" style={{ border: '1px solid #FFD7D5' }}>
                <span className="tag tag-service">Done-For-You Service</span>
                <h3 style={{ color: '#C5221F' }}>4. On-Prem Strategy</h3>
                <p className="text-sm font-bold mb-4">60-Day Handholding</p>
                <p className="text-sm"><strong>8x Strategy Calls</strong> (4/mo for 2 months). We guide your infrastructure, workflow optimization, and team training personally.</p>
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <p className="text-xs text-gray mb-0">Consulting Value: <strong>$1,000 (Waived)</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section style={{ background: '#F5F7FA' }}>
          <div className="container fade-in">
            <div className="card-dark max-w-3xl mx-auto text-center" style={{ border: '1px solid var(--primary)' }}>
              <span className="slide-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>Limited Pilot Offer</span>
              <h2 className="text-white mb-2">The Pilot Investment</h2>
              
              <div className="urgency-badge">
                ⚠️ ONLY 2 SPOTS LEFT
              </div>
              
              <div className="grid grid-cols-2 gap-8 items-center mb-8" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ textAlign: 'right', borderRight: '1px solid #333', paddingRight: '2rem' }}>
                  <p className="text-sm text-gray mb-1">First Month Value</p>
                  <div className="price-strike">$4,000+</div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p className="text-sm text-primary mb-1">Your Pilot Price</p>
                  <div className="price-main">$350 <span style={{ fontSize: '1rem', color: 'white', fontWeight: '400' }}>USD/mo</span></div>
                </div>
              </div>

              <div style={{ background: 'rgba(39, 201, 63, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--success)', display: 'inline-block', marginBottom: '2rem' }}>
                <p className="mb-0" style={{ color: 'var(--success)', fontWeight: '700' }}>
                  📉 You save $13,800 USD per year
                </p>
              </div>

              <br />
              <a href="#" className="btn-primary">Activate Pilot License</a>
              <p className="text-xs text-gray mt-4">Offer expires when the last 2 spots are filled.</p>
            </div>
          </div>
        </section>

        {/* GUARANTEE SECTION */}
        <section>
          <div className="container fade-in">
            <div className="card text-center max-w-3xl mx-auto" style={{ borderTop: '4px solid var(--primary)' }}>
              <h3>The Risk-Free Performance Guarantee</h3>
              <p className="mt-4">We take all the risk. Put KnowCap on your messiest project.</p>
              <p>If within the first 30 days, KnowCap does not:</p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }} className="font-bold space-y-2">
                <li style={{ marginBottom: '0.5rem' }}>1. Create one complex SOP instantly (Visual Transcription)</li>
                <li style={{ marginBottom: '0.5rem' }}>2. Resolve a Scope Creep dispute using Video Evidence</li>
                <li style={{ marginBottom: '0.5rem' }}>3. Demonstrate a path to saving 50 hours per 500-hour project</li>
              </ul>
              <p className="text-primary font-bold">We will refund 100% of your subscription.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
