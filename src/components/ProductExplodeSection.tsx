import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import FadeIn from './FadeIn'

/* ── Component data with label positions (% from top-left of exploded image) ── */
const parts = [
  {
    id: 'overview',
    title: 'Assembled View',
    subtitle: 'The Complete RootSense Stake',
    description:
      'A single electronic smart irrigation stake that combines automatic water delivery with real-time soil diagnostics. Push it into the ground, connect your water line, and start growing smarter. ~30 cm total length.',
    spec: 'Weight: ~350g | Length: ~30cm | IP67 waterproof',
    color: 'var(--green-mid)',
    labelPos: null,
  },
  {
    id: 'ceramic',
    title: 'Ceramic Cone',
    subtitle: 'Soil Water Tension Sensor & Valve',
    description:
      'The porous terracotta tip acts as both sensor and valve. Drier soil creates stronger suction, pulling water through the micropores. When soil is moist, suction weakens and flow stops automatically — pure physics.',
    spec: 'Material: Fired terracotta clay | Pore size: 1–3 μm',
    color: 'var(--brown-mid)',
    labelPos: { x: 15, y: 78, anchor: 'left' as const },
  },
  {
    id: 'shaft',
    title: 'Steel Shaft',
    subtitle: 'Water Reservoir & Conduit',
    description:
      "The cylindrical shaft holds the water supply and channels it to the ceramic cone. Medical-grade stainless steel resists corrosion from saline water — critical in Egypt's salt-affected soils.",
    spec: 'Material: 316L Stainless Steel | Length: ~20cm',
    color: '#8A9298',
    labelPos: { x: 28, y: 55, anchor: 'left' as const },
  },
  {
    id: 'sensor',
    title: 'Sensor Head',
    subtitle: 'Real-Time Soil Intelligence',
    description:
      'The rugged olive-green housing contains three electronic sensors: a capacitive moisture sensor, a glass-electrode pH sensor, and a conductivity (EC) probe for salinity. Readings update every 30 seconds. Solar-charged battery lasts 12+ months.',
    spec: 'pH: 3.5–9.0 (±0.1) | EC: 0–20 dS/m (±0.1) | Moisture: 0–100% VWC',
    color: 'var(--olive-housing)',
    labelPos: { x: 55, y: 30, anchor: 'right' as const },
  },
  {
    id: 'display',
    title: 'LCD Display',
    subtitle: 'Readings You Can See From 3 Meters',
    description:
      'The high-contrast LCD shows three key readings: soil moisture (% VWC), pH level, and electrical conductivity (EC in dS/m). A traffic-light color bar indicates safety: green = safe, amber = caution, red = action needed. No app required.',
    spec: 'Display: 1.2" backlit LCD | Update: every 30s | Visibility: 3m+',
    color: 'var(--green-bright)',
    labelPos: { x: 50, y: 12, anchor: 'right' as const },
  },
  {
    id: 'fittings',
    title: 'Brass Fittings',
    subtitle: 'Connects to Any Water Source',
    description:
      'Standard brass quick-connect fittings attach to existing drip lines, garden hoses, or gravity-fed water bottles. The clear medical-grade tubing resists kinking and UV degradation. One connection, no plumbing changes needed.',
    spec: 'Fitting: 1/4" brass quick-connect | Tubing: UV-resistant PVC',
    color: '#C8A84E',
    labelPos: { x: 75, y: 50, anchor: 'right' as const },
  },
]

/* ── Burst particles for explosion effect ── */
function BurstParticles({ active }: { active: boolean }) {
  if (!active) return null
  const particles = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * 360
    const rad = (angle * Math.PI) / 180
    const dist = 50 + Math.random() * 50
    return {
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      size: 2 + Math.random() * 5,
      delay: Math.random() * 0.12,
      color: i % 3 === 0 ? 'var(--green-mid)' : i % 3 === 1 ? 'var(--brown-mid)' : '#C8A84E',
    }
  })

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 15 }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
      {/* Central flash */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 120, height: 120, background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)' }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  )
}

/* ── Part indicator label overlay on the exploded image ── */
function PartLabel({
  part,
  isActive,
  onClick,
  index,
}: {
  part: (typeof parts)[number]
  isActive: boolean
  onClick: () => void
  index: number
}) {
  if (!part.labelPos) return null
  const { x, y, anchor } = part.labelPos

  return (
    <motion.div
      className="absolute cursor-pointer z-20"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      {/* Pulsing dot */}
      <motion.div
        className="relative"
        animate={isActive ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={isActive ? { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } : {}}
      >
        <div
          className="w-4 h-4 rounded-full border-2 transition-all duration-300"
          style={{
            background: isActive ? part.color : 'rgba(255,255,255,0.95)',
            borderColor: part.color,
            boxShadow: isActive
              ? `0 0 0 6px ${part.color}25, 0 0 12px ${part.color}40`
              : `0 2px 8px rgba(0,0,0,0.18)`,
          }}
        />
      </motion.div>

      {/* Label connector line + text pill */}
      <div
        className="absolute flex items-center gap-1"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          ...(anchor === 'right'
            ? { left: '100%', marginLeft: 6, flexDirection: 'row' as const }
            : { right: '100%', marginRight: 6, flexDirection: 'row-reverse' as const }),
        }}
      >
        {/* Connector line */}
        <div
          className="transition-all duration-300"
          style={{
            width: isActive ? 28 : 16,
            height: 1.5,
            background: isActive ? part.color : 'rgba(0,0,0,0.15)',
          }}
        />
        {/* Label pill */}
        <motion.div
          className="font-dm font-semibold whitespace-nowrap rounded-full px-3 py-1 transition-all duration-300"
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.04em',
            background: isActive ? part.color : 'rgba(255,255,255,0.92)',
            color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
            boxShadow: isActive
              ? `0 4px 16px ${part.color}35`
              : '0 2px 10px rgba(0,0,0,0.1)',
            border: `1px solid ${isActive ? 'transparent' : 'rgba(0,0,0,0.06)'}`,
            backdropFilter: 'blur(8px)',
          }}
          animate={{ scale: isActive ? 1.08 : 1 }}
        >
          {part.title}
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════ */
export default function ProductExplodeSection() {
  const [activeState, setActiveState] = useState(0)
  const [burstKey, setBurstKey] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' })

  const isExploded = activeState > 0

  const handleSelect = (index: number) => {
    // Trigger burst particles when transitioning from assembled → exploded
    if (index > 0 && activeState === 0) {
      setBurstKey((k) => k + 1)
    }
    setActiveState(index)
  }

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative"
      style={{
        background: 'var(--page-bg)',
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
            Click any component to explore the stake
          </p>
        </FadeIn>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-[1300px] mx-auto">
        {/* ── Product Image Area ── */}
        <FadeIn delay={0.3} className="relative w-full lg:w-[55%]">
          <div className="relative flex items-center justify-center" style={{ minHeight: 400 }}>
            {/* Ambient glow behind product */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: `radial-gradient(ellipse at 50% 50%, ${parts[activeState].color}15 0%, transparent 65%)`,
              }}
              transition={{ duration: 0.8 }}
            />

            {/* Burst particles on first explosion */}
            <BurstParticles key={burstKey} active={burstKey > 0} />

            {/* ─ Assembled product image ─ */}
            <motion.img
              src="/product-nobg.png"
              alt="RootSense assembled view"
              className="w-full h-auto object-contain"
              animate={{
                opacity: isExploded ? 0 : 1,
                scale: isExploded ? 1.08 : 1,
                filter: isExploded ? 'blur(8px)' : 'blur(0px)',
              }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                position: isExploded ? 'absolute' : 'relative',
                top: 0,
                left: 0,
                maxWidth: 580,
                margin: '0 auto',
                display: 'block',
                zIndex: isExploded ? 1 : 2,
                filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.12))',
              }}
            />

            {/* ─ Exploded product image + part labels ─ */}
            <AnimatePresence>
              {isExploded && (
                <motion.div
                  className="relative w-full"
                  style={{ maxWidth: 580, margin: '0 auto', zIndex: 2 }}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <motion.img
                    src="/product-exploded-nobg.png"
                    alt="RootSense exploded view — all components separated"
                    className="w-full h-auto object-contain"
                    initial={{ filter: 'blur(6px)' }}
                    animate={{ filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                      filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.1))',
                    }}
                  />

                  {/* Part indicator labels overlaid on the exploded image */}
                  {parts.slice(1).map((part, i) => (
                    <PartLabel
                      key={part.id}
                      part={part}
                      isActive={activeState === i + 1}
                      onClick={() => handleSelect(i + 1)}
                      index={i}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* "Explore Components" button shown on assembled view */}
            <AnimatePresence>
              {!isExploded && (
                <motion.button
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 font-dm font-medium rounded-full px-5 py-2.5 cursor-pointer z-10"
                  style={{
                    fontSize: '0.78rem',
                    background: 'var(--green-mid)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(45,90,45,0.3)',
                    border: 'none',
                  }}
                  onClick={() => handleSelect(1)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(45,90,45,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    Explore Components
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* ── Info Panel ── */}
        <div className="w-full lg:w-[45%] relative" style={{ minHeight: 300 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeState}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                background: 'var(--card-bg)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
                border: '1px solid var(--border-light)',
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
                  background: parts[activeState].color,
                  marginBottom: 20,
                }}
              />
              <p
                className="font-dm font-semibold uppercase"
                style={{
                  color: parts[activeState].color,
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  marginBottom: 8,
                }}
              >
                {parts[activeState].subtitle}
              </p>
              <h3
                className="font-playfair font-bold"
                style={{
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                  color: 'var(--text-primary)',
                  marginBottom: 16,
                }}
              >
                {parts[activeState].title}
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
                {parts[activeState].description}
              </p>
              <p
                className="font-dm"
                style={{
                  color: 'var(--text-tertiary)',
                  fontSize: '0.78rem',
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: 16,
                  marginTop: 16,
                }}
              >
                {parts[activeState].spec}
              </p>

              {/* FAO callout for assembled view */}
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
            {parts.map((part, i) => (
              <button
                key={part.id}
                onClick={() => handleSelect(i)}
                className="font-dm font-medium rounded-full cursor-pointer transition-all duration-200"
                style={{
                  fontSize: '0.72rem',
                  padding: '6px 14px',
                  background: i === activeState ? parts[activeState].color : 'var(--page-bg)',
                  color: i === activeState ? '#FFFFFF' : 'var(--text-tertiary)',
                  border: `1px solid ${i === activeState ? parts[activeState].color : 'var(--sand)'}`,
                  transform: i === activeState ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {i === 0 ? 'Overview' : part.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dot Stepper Navigation */}
      <div
        className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 flex-col gap-4 z-50 transition-opacity duration-300 hidden lg:flex"
        style={{ opacity: isInView ? 1 : 0, pointerEvents: isInView ? 'auto' : 'none' }}
      >
        {parts.map((part, i) => (
          <button
            key={part.id}
            onClick={() => handleSelect(i)}
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
          onClick={() => handleSelect(Math.max(0, activeState - 1))}
          disabled={activeState === 0}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-default"
          style={{
            border: '1px solid var(--sand)',
            color: 'var(--text-secondary)',
            background: 'var(--card-bg)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="font-dm text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {activeState + 1} / {parts.length}
        </span>
        <button
          onClick={() => handleSelect(Math.min(parts.length - 1, activeState + 1))}
          disabled={activeState === parts.length - 1}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-default"
          style={{
            border: '1px solid var(--sand)',
            color: 'var(--text-secondary)',
            background: 'var(--card-bg)',
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
