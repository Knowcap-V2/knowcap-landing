

import HeroSectionGeneral from '@/components/hero-section-general'
import FeaturesContextSection from '@/components/features-context-section'
import HowItWorksSection from '@/components/how-it-works-section'
import ROISection from '@/components/roi-section'
import BetaTestimonialsSection from '@/components/beta-testimonials-section'
import BeyondObviousSection from '@/components/beyond-obvious-section'
import TrustSection from '@/components/trust-section'
import FAQSection from '@/components/faq-section'
import FinalCTASection from '@/components/final-cta-section'
import ApplicationSection from '@/components/application-section'
import PersonalNoteSectionGeneral from '@/components/personal-note-section-general'
import FloatingCTA from '@/components/floating-cta'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSectionGeneral />
      <FeaturesContextSection />
      <HowItWorksSection />
      <ROISection />
      <BetaTestimonialsSection />
      <BeyondObviousSection />
      <TrustSection />
      <FAQSection />
      <FinalCTASection />
      <ApplicationSection />
      <PersonalNoteSectionGeneral />
      <FloatingCTA />
    </main>
  )
}

