import { useRef, useState, useEffect } from 'react'

const row1 = [
  { label: 'Moisture', icon: 'droplet' },
  { label: 'pH Testing', icon: 'flask' },
  { label: 'Water Saving', icon: 'water' },
  { label: 'Crop Health', icon: 'leaf' },
  { label: 'EC Salinity', icon: 'gauge' },
  { label: 'Solar Powered', icon: 'sun' },
  { label: 'Ceramic Tech', icon: 'layers' },
  { label: 'Real-time LCD', icon: 'monitor' },
  { label: 'Sustainability', icon: 'recycle' },
  { label: 'Durability', icon: 'shield' },
  { label: 'Made in Egypt', icon: 'globe' },
]

const row2 = [
  { label: 'Tomatoes' },
  { label: 'Cucumbers' },
  { label: 'Peppers' },
  { label: 'Wheat' },
  { label: 'Maize' },
  { label: 'Onion' },
  { label: 'Citrus' },
  { label: 'Date Palm' },
  { label: 'Olive' },
  { label: 'Grape' },
]

// Triple for seamless loop
const tripled1 = [...row1, ...row1, ...row1]
const tripled2 = [...row2, ...row2, ...row2]

function IconSvg({ name }: { name?: string }) {
  const s = { width: 24, height: 24, fill: 'none', stroke: 'var(--green-mid)', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'droplet': return <svg viewBox="0 0 24 24" {...s}><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
    case 'flask': return <svg viewBox="0 0 24 24" {...s}><path d="M9 3h6M10 3v7.4a2 2 0 01-.5 1.3L4 19a2 2 0 001.5 3h13a2 2 0 001.5-3l-5.5-7.3a2 2 0 01-.5-1.3V3"/></svg>
    case 'water': return <svg viewBox="0 0 24 24" {...s}><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>
    case 'leaf': return <svg viewBox="0 0 24 24" {...s}><path d="M17 8C8 10 5.9 16.17 3.82 21.34M17 8A5 5 0 008 17M17 8c4-1 5-5 5-5s-4 1-5 5"/></svg>
    case 'gauge': return <svg viewBox="0 0 24 24" {...s}><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1.08z"/></svg>
    case 'sun': return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    case 'layers': return <svg viewBox="0 0 24 24" {...s}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    case 'monitor': return <svg viewBox="0 0 24 24" {...s}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
    case 'recycle': return <svg viewBox="0 0 24 24" {...s}><path d="M7 19H4.815a1.83 1.83 0 01-1.57-.881 1.785 1.785 0 01-.004-1.784L7.196 9.5M14.5 3.5l2.196 3.8M7.196 9.5L5 13h3"/><path d="M10.5 3.5a1.83 1.83 0 011.574-.881 1.785 1.785 0 011.57.88L17 9.5M17 9.5h-4.5l1.5 2.5"/><path d="M19.184 16.5H21.5l-1.5 2.5-4 .001a1.83 1.83 0 01-1.57-.881L12 13.5"/></svg>
    case 'shield': return <svg viewBox="0 0 24 24" {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    case 'globe': return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
    default: return <svg viewBox="0 0 24 24" {...s}><path d="M17 8C8 10 5.9 16.17 3.82 21.34M17 8A5 5 0 008 17M17 8c4-1 5-5 5-5s-4 1-5 5"/></svg>
  }
}

function Tile({ label, icon }: { label: string; icon?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-3 shrink-0"
      style={{
        minWidth: 150,
        height: 72,
        borderRadius: 14,
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {icon && (
        <div style={{ width: 28, height: 28, flexShrink: 0 }}>
          <IconSvg name={icon} />
        </div>
      )}
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
        paddingTop: 'clamp(48px, 8vw, 160px)',
        paddingBottom: 32,
      }}
    >
      {/* Row 1 — moves RIGHT on scroll */}
      <div className="flex gap-3 mb-3" style={{ transform: `translateX(${offset}px)`, willChange: 'transform' }}>
        {tripled1.map((tile, i) => (
          <Tile key={`r1-${i}`} label={tile.label} icon={tile.icon} />
        ))}
      </div>

      {/* Row 2 — moves LEFT on scroll (crop names) */}
      <div className="flex gap-3" style={{ transform: `translateX(${-offset}px)`, willChange: 'transform' }}>
        {tripled2.map((tile, i) => (
          <Tile key={`r2-${i}`} label={tile.label} icon="leaf" />
        ))}
      </div>
    </section>
  )
}
