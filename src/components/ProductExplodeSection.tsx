import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import FadeIn from './FadeIn'

const explodeData = [
  {
    title: 'Assembled View',
    subtitle: 'The Complete RootSense Stake',
    description:
      'A single electronic smart irrigation stake that combines automatic water delivery with real-time soil diagnostics. Push it into the ground, connect your water line, and start growing smarter. ~30 cm total length.',
    spec: 'Weight: ~350g | Length: ~30cm | IP67 waterproof',
    hotspot: { top: '50%', left: '50%' },
    lineAngle: 'none',
    color: 'var(--green-mid)',
  },
  {
    title: 'Ceramic Cone',
    subtitle: 'Soil Water Tension Sensor & Valve',
    description:
      'The porous terracotta tip acts as both sensor and valve. Drier soil creates stronger suction, pulling water through the micropores. When soil is moist, suction weakens and flow stops automatically — pure physics.',
    spec: 'Material: Fired terracotta clay | Pore size: 1–3 μm',
    hotspot: { top: '78%', left: '22%' },
    lineAngle: 'bottom-left',
    color: 'var(--brown-mid)',
  },
  {
    title: 'Stainless Steel Shaft',
    subtitle: 'Water Reservoir & Conduit',
    description:
      "The cylindrical shaft holds the water supply and channels it to the ceramic cone. Medical-grade stainless steel resists corrosion from saline water — critical in Egypt's salt-affected soils.",
    spec: 'Material: 316L Stainless Steel | Length: ~20cm',
    hotspot: { top: '60%', left: '38%' },
    lineAngle: 'left',
    color: '#A0A8B0',
  },
  {
    title: 'Smart Sensor Head',
    subtitle: 'Real-Time Soil Intelligence',
    description:
      'The rugged olive-green housing contains three electronic sensors: a capacitive moisture sensor, a glass-electrode pH sensor, and a conductivity (EC) probe for salinity. Readings update every 30 seconds. Solar-charged battery lasts 12+ months.',
    spec: 'pH: 3.5–9.0 (±0.1) | EC: 0–20 dS/m (±0.1) | Moisture: 0–100% VWC',
    hotspot: { top: '28%', left: '58%' },
    lineAngle: 'top-right',
    color: 'var(--olive-housing)',
  },
  {
    title: 'Live Dashboard Display',
    subtitle: 'Readings You Can See From 3 Meters',
    description:
      'The high-contrast LCD shows three key readings: soil moisture (% VWC), pH level, and electrical conductivity (EC in dS/m). A traffic-light color bar indicates safety: green = safe, amber = caution, red = action needed. No app required.',
    spec: 'Display: 1.2" backlit LCD | Update: every 30s | Visibility: 3m+',
    hotspot: { top: '22%', left: '62%' },
    lineAngle: 'top-right',
    color: 'var(--green-bright)',
  },
  {
    title: 'Universal Brass Fittings',
    subtitle: 'Connects to Any Water Source',
    description:
      'Standard brass quick-connect fittings attach to existing drip lines, garden hoses, or gravity-fed water bottles. The clear medical-grade tubing resists kinking and UV degradation. One connection, no plumbing changes needed.',
    spec: 'Fitting: 1/4" brass quick-connect | Tubing: UV-resistant PVC',
    hotspot: { top: '35%', left: '72%' },
    lineAngle: 'right',
    color: '#C8A84E',
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
        padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,40px)',
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
        <FadeIn delay={0.2}>
          <p
            className="font-dm mt-4"
            style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}
          >
            Click any component to explore the engineering behind the stake
          </p>
        </FadeIn>
      </div>

      {/* Main Content: Product Image + Info Panel */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-[1300px] mx-auto">
        {/* Product Image with Hotspot Annotations */}
        <FadeIn delay={0.3} className="relative w-full lg:w-[55%]">
          <div className="relative" style={{ perspective: '1200px' }}>
            {/* Glow ring behind the product */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(ellipse at 50% 55%, ${explodeData[activeState].color}15 0%, transparent 65%)`,
                transition: 'background 0.6s ease',
              }}
            />

            {/* The real product image — high quality with 3D-like presentation */}
            <motion.div
              animate={{
                rotateY: activeState === 0 ? 0 : 0,
                scale: activeState === 0 ? 1 : 1.05,
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: 'relative',
                zIndex: 2,
              }}
            >
              <img
                src="/product.png"
                alt="RootSense Smart Irrigation Stake — ceramic cone, stainless steel shaft, olive sensor head with LCD, brass fittings with tubing"
                className="w-full h-auto object-contain"
                style={{
                  maxWidth: 640,
                  margin: '0 auto',
                  display: 'block',
                  filter: `drop-shadow(0 30px 60px rgba(0,0,0,0.18)) drop-shadow(0 10px 20px rgba(0,0,0,0.1))`,
                  transition: 'filter 0.5s ease',
                }}
              />
            </motion.div>

            {/* Interactive Hotspot Dots */}
            {explodeData.map((part, i) => {
              if (i === 0) return null // No dot for assembled view
              return (
                <button
                  key={i}
                  onClick={() => setActiveState(i)}
                  className="absolute z-10 group cursor-pointer"
                  style={{
                    top: part.hotspot.top,
                    left: part.hotspot.left,
                    transform: 'translate(-50%, -50%)',
                  }}
                  aria-label={`View ${part.title}`}
                >
                  {/* Pulse ring */}
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      width: 40,
                      height: 40,
                      top: -12,
                      left: -12,
                      background: i === activeState
                        ? `${part.color}30`
                        : 'transparent',
                      border: `2px solid ${i === activeState ? part.color : 'rgba(255,255,255,0.6)'}`,
                      borderRadius: '50%',
                      animation: i === activeState ? 'dotRing 2s ease-in-out infinite' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  {/* Inner dot */}
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: 16,
                      height: 16,
                      background: i === activeState ? part.color : 'rgba(255,255,255,0.85)',
                      border: `2px solid ${i === activeState ? '#fff' : 'rgba(0,0,0,0.15)'}`,
                      boxShadow: i === activeState
                        ? `0 0 20px ${part.color}60, 0 2px 8px rgba(0,0,0,0.2)`
                        : '0 2px 8px rgba(0,0,0,0.15)',
                      transform: i === activeState ? 'scale(1.2)' : 'scale(1)',
                    }}
                  />
                  {/* Mini label on hover */}
                  <span
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-dm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{
                      top: -28,
                      fontSize: '0.68rem',
                      color: part.color,
                      background: 'rgba(255,255,255,0.95)',
                      padding: '2px 8px',
                      borderRadius: 6,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    {part.title}
                  </span>
                </button>
              )
            })}
          </div>
        </FadeIn>

        {/* Info Panel */}
        <div className="w-full lg:w-[45%] relative" style={{ minHeight: 300 }}>
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
                padding: 'clamp(24px, 4vw, 40px)',
              }}
            >
              {/* Color accent bar */}
              <div
                style={{
                  width: 48,
                  height: 4,
                  borderRadius: 2,
                  background: explodeData[activeState].color,
                  marginBottom: 20,
                }}
              />
              <p
                className="font-dm font-semibold uppercase"
                style={{
                  color: explodeData[activeState].color,
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
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
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

              {/* FAO stat callout for assembled view */}
              {activeState === 0 && (
                <div
                  className="flex items-center gap-3 mt-6"
                  style={{
                    background: 'var(--green-soft)',
                    padding: '12px 16px',
                    borderRadius: 12,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-mid)" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="font-dm" style={{ fontSize: '0.82rem', color: 'var(--green-mid)' }}>
                    14% increase in effective crop growth (FAO 2018)
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Component Quick-Select Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {explodeData.map((part, i) => (
              <button
                key={i}
                onClick={() => setActiveState(i)}
                className="font-dm font-medium rounded-full cursor-pointer transition-all duration-200"
                style={{
                  fontSize: '0.72rem',
                  padding: '6px 14px',
                  background: i === activeState ? explodeData[activeState].color : 'var(--page-bg)',
                  color: i === activeState ? '#FFFFFF' : 'var(--text-tertiary)',
                  border: `1px solid ${i === activeState ? explodeData[activeState].color : 'var(--sand)'}`,
                  transform: i === activeState ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {i === 0 ? 'Overview' : part.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dot Stepper Navigation — fixed on right, visible when section is in view */}
      <div
        className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 flex-col gap-4 z-50 transition-opacity duration-300 hidden lg:flex"
        style={{ opacity: isInView ? 1 : 0, pointerEvents: isInView ? 'auto' : 'none' }}
      >
        {explodeData.map((part, i) => (
          <button
            key={i}
            onClick={() => setActiveState(i)}
            className="w-3 h-3 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: i === activeState ? part.color : 'var(--sand)',
              animation: i === activeState ? 'dotRing 2s ease-in-out infinite' : 'none',
              transform: i === activeState ? 'scale(1.3)' : 'scale(1)',
            }}
            aria-label={`View ${part.title}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
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
