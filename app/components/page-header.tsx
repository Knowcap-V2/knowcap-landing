import Link from 'next/link'
import Image from 'next/image'

export default function PageHeader() {
  return (
    <Link 
      href="/" 
      className="fixed top-6 left-6 z-50 inline-block hover:opacity-80 transition-opacity"
    >
      <Image 
        src="/knowcap-logo.png" 
        alt="Knowcap.ai" 
        width={120} 
        height={40}
        className="h-10 w-auto"
        priority
      />
    </Link>
  )
}
