
import HeroSectionGeneral from '@/components/hero-section-general'
import ProblemSectionGeneral from '@/components/problem-section-general'
import VisionSection from '@/components/vision-section'
import BeyondObviousSection from '@/components/beyond-obvious-section'
import OfferSectionGeneral from '@/components/offer-section-general'
import ApplicationSection from '@/components/application-section'
import PersonalNoteSectionGeneral from '@/components/personal-note-section-general'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSectionGeneral />
      <ProblemSectionGeneral />
      <VisionSection />
      <BeyondObviousSection />
      <OfferSectionGeneral />
      <ApplicationSection />
      <PersonalNoteSectionGeneral />
    </main>
  )
}
