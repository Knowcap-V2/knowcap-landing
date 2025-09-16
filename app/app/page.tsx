

import BetaHeroSection from '@/components/beta-hero-section'
import BetaFeaturesSection from '@/components/beta-features-section'
import BetaProblemSection from '@/components/beta-problem-section'
import BetaSolutionSection from '@/components/beta-solution-section'
import BetaTestimonialsSection from '@/components/beta-testimonials-section'
import BetaCTASection from '@/components/beta-cta-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <BetaHeroSection />
      <BetaProblemSection />
      <BetaFeaturesSection />
      <BetaSolutionSection />
      <BetaTestimonialsSection />
      <BetaCTASection />
    </main>
  )
}
