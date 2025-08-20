
import HeroSection from '@/components/hero-section'
import ProblemSection from '@/components/problem-section'
import PersonalMessageSection from '@/components/personal-message-section'
import VisionSection from '@/components/vision-section'
import BeyondObviousSection from '@/components/beyond-obvious-section'
import OfferSection from '@/components/offer-section'
import ApplicationSection from '@/components/application-section'
import PersonalNoteSection from '@/components/personal-note-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSection />
      <PersonalMessageSection />
      <VisionSection />
      <BeyondObviousSection />
      <OfferSection />
      <ApplicationSection />
      <PersonalNoteSection />
    </main>
  )
}
