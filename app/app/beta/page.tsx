

import HeroSectionGeneral from '@/components/hero-section-general'
import ProblemSectionGeneral from '@/components/problem-section-general'
import GovernanceEngineSection from '@/components/governance-engine-section'
import WhoWeHelpSection from '@/components/who-we-help-section'
import BeyondObviousSection from '@/components/beyond-obvious-section'
import ApplicationSection from '@/components/application-section'
import PersonalNoteSectionGeneral from '@/components/personal-note-section-general'
import FloatingCTA from '@/components/floating-cta'

export default function BetaPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSectionGeneral />
      <ProblemSectionGeneral />
      <GovernanceEngineSection />
      <WhoWeHelpSection />
      <BeyondObviousSection />
      <ApplicationSection />
      <PersonalNoteSectionGeneral />
      <FloatingCTA />
    </main>
  )
}

