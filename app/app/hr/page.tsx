'use client';
import { useEffect } from 'react';

export default function KnowcapHRPage() {
  useEffect(() => {
    document.title = 'HR Consultation | Knowcap.ai';
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Schedule HR Consultation
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Book a session with our HR team to discuss recruitment strategies, 
              candidate management, and AI-powered hiring solutions.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Benefits */}
            <div className="space-y-8">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  What We'll Cover
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-[#005EFF] text-xl">✓</span>
                    <span className="text-gray-300">AI-powered candidate screening and scoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#005EFF] text-xl">✓</span>
                    <span className="text-gray-300">Recruitment workflow optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#005EFF] text-xl">✓</span>
                    <span className="text-gray-300">Interview scheduling automation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#005EFF] text-xl">✓</span>
                    <span className="text-gray-300">Candidate communication best practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#005EFF] text-xl">✓</span>
                    <span className="text-gray-300">Custom hiring dashboard setup</span>
                  </li>
                </ul>
              </div>

              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Session Details
                </h2>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-white">Duration:</strong> 45 minutes</p>
                  <p><strong className="text-white">Format:</strong> Video call via Google Meet</p>
                  <p><strong className="text-white">Preparation:</strong> No prior setup required</p>
                  <p><strong className="text-white">Follow-up:</strong> Summary and action items shared after session</p>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Widget */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold mb-6 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Select Your Preferred Time
              </h2>
              <div>
                <script 
                  src="https://meet.reclaimai.com/scripts/embed-scheduling-link.0.x.x.js" 
                  data-id="80fa948c-1355-4dc2-a272-ad176f0b9750" 
                  data-redirect="NONE"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
