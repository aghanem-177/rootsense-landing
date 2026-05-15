import FadeIn from './FadeIn'

function WaterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue-water)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    </svg>
  )
}

function SaltIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brown-mid)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34"/>
      <path d="M17 8A5 5 0 008 17"/>
      <path d="M17 8c4-1 5-5 5-5s-4 1-5 5"/>
      <circle cx="15" cy="14" r="1" fill="var(--brown-mid)"/>
      <circle cx="11" cy="17" r="1" fill="var(--brown-mid)"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-mid)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
      <circle cx="12" cy="16" r="1" fill="var(--green-mid)"/>
    </svg>
  )
}

function HeatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E07C3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
      <path d="M11.5 14V6"/>
    </svg>
  )
}

const problems = [
  {
    iconComponent: <WaterIcon />,
    title: 'Overwatering & Underwatering',
    body: 'Fixed schedules ignore actual soil needs. Plants drown or starve while farmers follow the clock instead of the ground.',
    stat: '74% water savings possible',
    borderColor: 'var(--blue-water)',
    iconBg: 'var(--blue-soft)',
    statColor: 'var(--blue-water)',
    statBg: 'var(--blue-soft)',
  },
  {
    iconComponent: <SaltIcon />,
    title: 'Soil Salinity',
    body: "30–35% of Egypt's irrigated land is salt-affected. Yields drop 10–40% while farmers can't see the invisible killer below.",
    stat: '1.8M hectares affected',
    borderColor: 'var(--brown-mid)',
    iconBg: 'var(--brown-soft)',
    statColor: 'var(--brown-mid)',
    statBg: 'var(--brown-soft)',
  },
  {
    iconComponent: <LockIcon />,
    title: 'Hidden pH Blockage',
    body: 'Wrong pH locks nutrients in the soil. Farmers add expensive fertilizer to plants that physically cannot absorb it.',
    stat: 'Wasted money & chemicals',
    borderColor: 'var(--green-bright)',
    iconBg: 'var(--green-soft)',
    statColor: 'var(--green-mid)',
    statBg: 'var(--green-soft)',
  },
  {
    iconComponent: <HeatIcon />,
    title: 'Heat & Wind Stress',
    body: 'Rising temperatures and wind accelerate water loss from crops. In hot periods, plants can lose 4–6 mm of water per day — and without real-time data, farmers have no way to keep up.',
    stat: 'FAO 2022',
    borderColor: '#E07C3A',
    iconBg: 'rgba(224,124,58,0.1)',
    statColor: '#E07C3A',
    statBg: 'rgba(224,124,58,0.1)',
  },
]

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="flex flex-col items-center"
      style={{
        background: 'var(--page-bg)',
        padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,40px)',
        gap: 60,
      }}
    >
      <FadeIn>
        <p
          className="font-dm font-semibold uppercase tracking-[0.3em] text-center"
          style={{ color: 'var(--brown-mid)', fontSize: '0.72rem' }}
        >
          The Problem
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2
          className="hero-heading font-playfair font-black uppercase text-center"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          Farmers Are Guessing
        </h2>
      </FadeIn>

      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 24,
          maxWidth: 1100,
        }}
      >
        {/* $300M Market Callout */}
        <FadeIn delay={0.15} className="col-span-full">
          <div
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-2xl mx-auto text-center sm:text-left"
            style={{
              background: 'var(--brown-soft)',
              border: '1px solid rgba(184,92,56,0.12)',
              padding: '18px 24px',
              maxWidth: 600,
            }}
          >
            <span className="font-playfair font-black text-2xl" style={{ color: 'var(--brown-mid)', whiteSpace: 'nowrap' }}>$300M</span>
            <p className="font-dm" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Egypt's irrigation market — the problem is massive, the opportunity is real.
            </p>
          </div>
        </FadeIn>

        {problems.map((p, i) => (
          <FadeIn key={i} delay={0.2 + i * 0.15} y={50}>
            <div
              className="flex flex-col gap-5 transition-all duration-300 cursor-pointer"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-light)',
                borderLeft: `4px solid ${p.borderColor}`,
                borderRadius: 20,
                padding: '44px 36px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-mid)'
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)'
                e.currentTarget.style.borderLeftColor = p.borderColor
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.04)'
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: p.iconBg,
                }}
              >
                {p.iconComponent}
              </div>

              {/* Title */}
              <h3
                className="font-playfair"
                style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}
              >
                {p.title}
              </h3>

              {/* Body */}
              <p
                className="font-dm font-light"
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                }}
              >
                {p.body}
              </p>

              {/* Stat Badge */}
              <span
                className="font-dm font-medium self-start px-3 py-1.5 rounded-full"
                style={{
                  color: p.statColor,
                  background: p.statBg,
                  fontSize: '0.78rem',
                }}
              >
                {p.stat}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
