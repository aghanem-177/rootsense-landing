import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'

import type { Breakdown, BreakdownPart } from '../data/breakdowns'


const particles = Array.from({ length: 16 }, (_, i) => {
  const rad = (i / 16) * 2 * Math.PI
  const dist = 50 + ((i * 37) % 50)
  return {
    x: Math.cos(rad) * dist,
    y: Math.sin(rad) * dist,
    size: 2 + ((i * 13) % 5),
    delay: ((i * 7) % 12) / 100,
    color: i % 3 === 0 ? 'var(--green-mid)' : i % 3 === 1 ? 'var(--brown-mid)' : '#C8A84E',
  }
})

/* ── Burst particles for explosion effect ── */
function BurstParticles({ active }: { active: boolean }) {
  if (!active) return null

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
        style={{ width: 120, height: 120, background: 'radial-gradient(circle, rgba(243,237,225,0.7) 0%, transparent 70%)' }}
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
  part: BreakdownPart
  isActive: boolean
  onClick: () => void
  index: number
}) {
  if (!part.labelPos) return null
  const { x, y, anchor } = part.labelPos

  return (
    <motion.button
      type="button"
      aria-label={part.title}
      aria-pressed={isActive}
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
          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-[1.5px] sm:border-2 transition-all duration-300"
          style={{
            background: isActive ? part.color : 'rgba(243,237,225,0.96)',
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
            width: isActive ? 20 : 10,
            height: 1,
            background: isActive ? part.color : 'rgba(0,0,0,0.15)',
          }}
        />
        {/* Label pill */}
        <motion.div
          className="font-dm font-semibold whitespace-nowrap rounded-full px-2 py-0.5 sm:px-3 sm:py-1 transition-all duration-300"
          style={{
            fontSize: 'clamp(0.5rem, 1.5vw, 0.65rem)',
            letterSpacing: '0.04em',
            background: isActive ? part.color : 'rgba(243,237,225,0.95)',
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
    </motion.button>
  )
}

/* ════════════════════════════════════════════════ */
export default function ProductExplodeSection({ breakdown }: { breakdown: Breakdown }) {
  const { parts, assembled, exploded } = breakdown
  const [activeState, setActiveState] = useState(0)
  const [burstKey, setBurstKey] = useState(0)

  const isExploded = activeState > 0

  const handleSelect = (index: number) => {
    // Trigger burst particles when transitioning from assembled → exploded
    if (index > 0 && activeState === 0) {
      setBurstKey((k) => k + 1)
    }
    setActiveState(index)
  }

  return (
    <div className="relative">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-[1300px] mx-auto">
        {/* ── Product Image Area ── */}
        <FadeIn delay={0.3} className="relative w-full lg:w-[55%]">
          <div className="relative flex items-center justify-center" style={{ minHeight: 300 }}>
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
              src={assembled.src}
              alt={assembled.alt}
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
                    src={exploded.src}
                    alt={exploded.alt}
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

            {/* "See the parts" button shown on assembled view */}
            <AnimatePresence>
              {!isExploded && (
                <motion.button
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 font-dm font-medium rounded-full px-5 py-2.5 cursor-pointer z-10"
                  style={{
                    fontSize: '0.78rem',
                    background: 'var(--fam-accent)',
                    color: 'var(--fam-accent-ink)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                    border: 'none',
                  }}
                  onClick={() => handleSelect(1)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    See the parts
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
                  color: 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: 16,
                  marginTop: 16,
                }}
              >
                {parts[activeState].spec}
              </p>

            </motion.div>
          </AnimatePresence>

          {/* Component Quick-Select Pills */}
          <div className="flex flex-wrap gap-2 mt-6 overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
            {parts.map((part, i) => (
              <button
                key={part.id}
                type="button"
                aria-pressed={i === activeState}
                onClick={() => handleSelect(i)}
                className="font-dm font-medium rounded-full cursor-pointer transition-all duration-200"
                style={{
                  fontSize: '0.72rem',
                  padding: '6px 14px',
                  background: i === activeState ? parts[activeState].color : 'var(--page-bg)',
                  color: i === activeState ? '#FFFFFF' : 'var(--text-secondary)',
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

      {/* Navigation arrows */}
      <div className="flex items-center justify-center gap-4 mt-12">
        <button
          type="button"
          aria-label="Previous part"
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
        <span className="font-dm text-sm" style={{ color: 'var(--fam-muted)' }}>
          {activeState + 1} / {parts.length}
        </span>
        <button
          type="button"
          aria-label="Next part"
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
    </div>
  )
}
