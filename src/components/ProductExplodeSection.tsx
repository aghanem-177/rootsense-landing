import { useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { ACESFilmicToneMapping } from 'three'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import FadeIn from './FadeIn'
import RootSenseStake from './three/RootSenseStake'

const explodeData = [
  {
    title: 'Assembled View',
    subtitle: 'The Complete RootSense Stake',
    description:
      'A single electronic smart irrigation stake that combines automatic water delivery with real-time soil diagnostics. Push it into the ground, connect your water line, and start growing smarter.',
    spec: 'Weight: ~350g | Total length: 35cm | IP67 waterproof',
  },
  {
    title: 'Ceramic Cone',
    subtitle: 'Soil Water Tension Sensor & Valve',
    description:
      'The porous ceramic tip acts as both sensor and valve. Drier soil creates stronger suction, pulling water through the micropores. When soil is moist, suction weakens and flow stops automatically. No electronics needed for the water delivery — pure physics.',
    spec: 'Material: Fired terracotta clay | Pore size: 1–3 μm',
  },
  {
    title: 'Stainless Steel Shaft',
    subtitle: 'Water Reservoir & Conduit',
    description:
      "The cylindrical shaft holds the water supply and channels it to the ceramic cone. Medical-grade stainless steel resists corrosion from saline water — critical in Egypt's salt-affected soils. The shaft connects to your drip line or water bottle via standard fittings.",
    spec: 'Material: 316L Stainless Steel | Length: 25cm',
  },
  {
    title: 'Smart Sensor Head',
    subtitle: 'Real-Time Soil Intelligence',
    description:
      'The rugged housing contains three electronic sensors: a capacitive moisture sensor, a glass-electrode pH sensor, and a conductivity (EC) probe for salinity. Readings update every 30 seconds on the built-in LCD. Solar-charged battery lasts 12+ months. IP67 waterproof rated.',
    spec: 'pH range: 3.5–9.0 (±0.1) | EC range: 0–20 dS/m (±0.1) | Moisture: 0–100% VWC',
  },
  {
    title: 'Live Dashboard Display',
    subtitle: 'Readings You Can See From 3 Meters',
    description:
      'The high-contrast LCD shows three key readings: soil moisture (% VWC), pH level, and electrical conductivity (EC in dS/m). A traffic-light color bar indicates crop-specific safety: green = safe, amber = caution, red = action needed. No app required — the answer is right on the stake.',
    spec: 'Display: 1.2" backlit LCD | Update: every 30s | Visibility: 3m+ in sunlight',
  },
  {
    title: 'Universal Fittings',
    subtitle: 'Connects to Any Water Source',
    description:
      'Standard brass quick-connect fittings attach to existing drip lines, garden hoses, or gravity-fed water bottles. The clear medical-grade tubing resists kinking and UV degradation. One connection, no plumbing changes needed.',
    spec: 'Fitting: 1/4" brass quick-connect | Tubing: UV-resistant PVC',
  },
]

export default function ProductExplodeSection() {
  const [activeState, setActiveState] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' })

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative"
      style={{
        background: '#FFFFFF',
        borderRadius: 'clamp(40px,5vw,60px) clamp(40px,5vw,60px) 0 0',
        padding: 'clamp(80px,10vw,140px)',
        minHeight: '100vh',
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <FadeIn>
          <p
            className="font-dm font-semibold uppercase tracking-[0.3em]"
            style={{ color: 'var(--green-mid)', fontSize: '0.72rem' }}
          >
            The Product
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            className="green-heading font-playfair font-black uppercase mt-4"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
          >
            RootSense
          </h2>
        </FadeIn>
      </div>

      {/* Main Content: 3D + Info Panel */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-[1200px] mx-auto">
        {/* 3D Canvas */}
        <div className="relative w-full lg:w-1/2" style={{ minHeight: 500 }}>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[500px]">
                <div
                  className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: 'var(--green-mid)', borderTopColor: 'transparent' }}
                />
              </div>
            }
          >
            <Canvas
              gl={{
                antialias: true,
                alpha: true,
                toneMapping: ACESFilmicToneMapping,
                toneMappingExposure: 1.1,
              }}
              dpr={[1, 2]}
              camera={{ position: [4, 3, 6], fov: 45 }}
              style={{ width: '100%', height: 500 }}
              shadows
            >
              <ambientLight intensity={0.6} />
              <directionalLight
                position={[5, 8, 5]}
                intensity={1.0}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <directionalLight position={[-3, 4, -2]} intensity={0.3} />
              <Environment preset="studio" />
              <RootSenseStake
                explodeState={activeState}
                autoRotate={activeState === 0}
                rotateSpeed={0.5}
              />
              <ContactShadows
                position={[0, -3.5, 0]}
                opacity={0.15}
                blur={2.5}
                far={8}
                color="#B0A898"
              />
            </Canvas>
          </Suspense>
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-1/2 relative" style={{ minHeight: 300 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeState}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                background: '#FFFFFF',
                boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 24,
                padding: 36,
              }}
            >
              <p
                className="font-dm font-semibold uppercase"
                style={{
                  color: 'var(--green-mid)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  marginBottom: 8,
                }}
              >
                {explodeData[activeState].subtitle}
              </p>
              <h3
                className="font-playfair font-bold"
                style={{
                  fontSize: '1.4rem',
                  color: 'var(--text-primary)',
                  marginBottom: 16,
                }}
              >
                {explodeData[activeState].title}
              </h3>
              <p
                className="font-dm"
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {explodeData[activeState].description}
              </p>
              <p
                className="font-dm"
                style={{
                  color: 'var(--text-tertiary)',
                  fontSize: '0.78rem',
                  borderTop: '1px solid var(--sand)',
                  paddingTop: 16,
                  marginTop: 16,
                }}
              >
                {explodeData[activeState].spec}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot Stepper Navigation — only visible when section is in view */}
      <div
        className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 transition-opacity duration-300"
        style={{ opacity: isInView ? 1 : 0, pointerEvents: isInView ? 'auto' : 'none' }}
      >
        {explodeData.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveState(i)}
            className="w-3 h-3 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: i === activeState ? 'var(--green-mid)' : 'var(--sand)',
              animation: i === activeState ? 'dotRing 2s ease-in-out infinite' : 'none',
              transform: i === activeState ? 'scale(1.3)' : 'scale(1)',
            }}
            aria-label={`View ${explodeData[i].title}`}
          />
        ))}
      </div>

      {/* Navigation arrows for desktop */}
      <div className="flex items-center justify-center gap-4 mt-12">
        <button
          onClick={() => setActiveState(Math.max(0, activeState - 1))}
          disabled={activeState === 0}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-default"
          style={{
            border: '1px solid var(--sand)',
            color: 'var(--text-secondary)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="font-dm text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {activeState + 1} / {explodeData.length}
        </span>
        <button
          onClick={() => setActiveState(Math.min(explodeData.length - 1, activeState + 1))}
          disabled={activeState === explodeData.length - 1}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-default"
          style={{
            border: '1px solid var(--sand)',
            color: 'var(--text-secondary)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
