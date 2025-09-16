


import HeroSection from '@/components/hero-section'
import ProblemSection from '@/components/problem-section'
import VisionSection from '@/components/vision-section'
import BeyondObviousSection from '@/components/beyond-obvious-section'
import OfferSection from '@/components/offer-section'
import ApplicationSection from '@/components/application-section'
import PersonalNoteSection from '@/components/personal-note-section'
import FloatingCTA from '@/components/floating-cta'

export default function AlphaPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSection />
      <VisionSection />
      <BeyondObviousSection />
      <OfferSection />
      <ApplicationSection />
      <PersonalNoteSection />
      <FloatingCTA />
    </main>
  )
}

