import Link from 'next/link'
import Image from 'next/image'

export default function PageHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
          <Image 
            src="/knowcap-logo.png" 
            alt="Knowcap.ai" 
            width={120} 
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  )
}
