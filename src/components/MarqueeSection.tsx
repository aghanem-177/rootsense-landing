import { useRef, useState, useEffect } from 'react'

const row1 = [
  { emoji: '🌱', label: 'Moisture' },
  { emoji: '🧪', label: 'pH Testing' },
  { emoji: '💧', label: 'Water Saving' },
  { emoji: '🌾', label: 'Crop Health' },
  { emoji: '🔬', label: 'EC Salinity' },
  { emoji: '☀️', label: 'Solar Powered' },
  { emoji: '🏗️', label: 'Ceramic Tech' },
  { emoji: '📊', label: 'Real-time LCD' },
  { emoji: '🌿', label: 'Sustainability' },
  { emoji: '💪', label: 'Durability' },
  { emoji: '🇪🇬', label: 'Made in Egypt' },
]

const row2 = [
  { emoji: '🍅', label: 'Tomatoes' },
  { emoji: '🥒', label: 'Cucumbers' },
  { emoji: '🌶️', label: 'Peppers' },
  { emoji: '🌾', label: 'Wheat' },
  { emoji: '🌽', label: 'Maize' },
  { emoji: '🧅', label: 'Onion' },
  { emoji: '🍊', label: 'Citrus' },
  { emoji: '🌴', label: 'Date Palm' },
  { emoji: '🫒', label: 'Olive' },
  { emoji: '🍇', label: 'Grape' },
]

// Triple for seamless loop
const tripled1 = [...row1, ...row1, ...row1]
const tripled2 = [...row2, ...row2, ...row2]

function Tile({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div
      className="flex items-center justify-center gap-3 shrink-0"
      style={{
        minWidth: 200,
        height: 100,
        borderRadius: 16,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <span style={{ fontSize: 32 }}>{emoji}</span>
      <span
        className="font-dm font-medium uppercase"
        style={{
          color: 'var(--text-tertiary)',
          fontSize: '0.82rem',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const val = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(val)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden"
      style={{
        background: 'var(--cream)',
        paddingTop: 'clamp(96px, 10vw, 160px)',
        paddingBottom: 40,
      }}
    >
      {/* Row 1 — moves RIGHT on scroll */}
      <div className="flex gap-3 mb-3" style={{ transform: `translateX(${offset}px)`, willChange: 'transform' }}>
        {tripled1.map((tile, i) => (
          <Tile key={`r1-${i}`} emoji={tile.emoji} label={tile.label} />
        ))}
      </div>

      {/* Row 2 — moves LEFT on scroll */}
      <div className="flex gap-3" style={{ transform: `translateX(${-offset}px)`, willChange: 'transform' }}>
        {tripled2.map((tile, i) => (
          <Tile key={`r2-${i}`} emoji={tile.emoji} label={tile.label} />
        ))}
      </div>
    </section>
  )
}
