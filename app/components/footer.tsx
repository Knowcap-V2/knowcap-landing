'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative py-16 px-6" style={{ background: 'var(--dark-bg)', color: 'white' }}>
      <div className="max-w-[1100px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'white' }}>
              Knowcap.ai
            </h3>
            <p className="text-gray-400" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.6' }}>
              AI-powered governance platform that turns meetings and screen work into verified project documentation.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'white' }}>
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/MVP" 
                  className="text-gray-400 hover:text-white transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Knowcap MVP
                </Link>
              </li>
              <li>
                <Link 
                  href="/offer" 
                  className="text-gray-400 hover:text-white transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Pilot Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'white' }}>
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/meet-us" 
                  className="text-gray-400 hover:text-white transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Meet Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/careers" 
                  className="text-gray-400 hover:text-white transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact-us" 
                  className="text-gray-400 hover:text-white transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/policy" 
                  className="text-gray-400 hover:text-white transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
              © 2025 Knowcap.ai • Built for Professional Teams
            </p>
            <div className="flex gap-6">
              <Link href="/policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/contact-us" className="text-sm text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
