import { lazy, Suspense } from 'react'
import HeroSection from './components/HeroSection'
import OrderButton from './components/OrderButton'

// Lazy load sections below the fold
const MarqueeSection = lazy(() => import('./components/MarqueeSection'))
const ProblemSection = lazy(() => import('./components/ProblemSection'))
const ProductExplodeSection = lazy(() => import('./components/ProductExplodeSection'))
const HowItWorksSection = lazy(() => import('./components/HowItWorksSection'))
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const ImpactSection = lazy(() => import('./components/ImpactSection'))
const CompetitionSection = lazy(() => import('./components/CompetitionSection'))
const TeamSection = lazy(() => import('./components/TeamSection'))
const FooterSection = lazy(() => import('./components/FooterSection'))

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-40">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--green-mid)', borderTopColor: 'transparent' }}
      />
    </div>
  )
}

function App() {
  return (
    <div style={{ overflowX: 'clip' }}>
      {/* Film Grain Overlay */}
      <div className="film-grain" />

      {/* 1. Hero */}
      <HeroSection />

      <Suspense fallback={<SectionFallback />}>
        {/* 2. Marquee */}
        <MarqueeSection />

        {/* 3. Problem */}
        <ProblemSection />

        {/* 4. Product Explode (Centerpiece) */}
        <ProductExplodeSection />

        {/* 5. How It Works */}
        <HowItWorksSection />

        {/* 6. Services */}
        <ServicesSection />

        {/* 7. Impact */}
        <ImpactSection />

        {/* 8. Competition */}
        <CompetitionSection />

        {/* 9. Team */}
        <TeamSection />

        {/* 10. Footer */}
        <FooterSection />
      </Suspense>

      {/* Floating Order Button */}
      <OrderButton />
    </div>
  )
}

export default App
