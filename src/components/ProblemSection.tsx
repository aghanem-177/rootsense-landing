import FadeIn from './FadeIn'

const problems = [
  {
    icon: '💧',
    title: 'Overwatering & Underwatering',
    body: 'Fixed schedules ignore actual soil needs. Plants drown or starve while farmers follow the clock instead of the ground.',
    stat: '74% water savings possible',
    borderColor: 'var(--blue-water)',
    iconBg: 'var(--blue-soft)',
    statColor: 'var(--blue-water)',
    statBg: 'var(--blue-soft)',
  },
  {
    icon: '🧂',
    title: 'Soil Salinity',
    body: "30–35% of Egypt's irrigated land is salt-affected. Yields drop 10–40% while farmers can't see the invisible killer below.",
    stat: '1.8M hectares affected',
    borderColor: 'var(--brown-mid)',
    iconBg: 'var(--brown-soft)',
    statColor: 'var(--brown-mid)',
    statBg: 'var(--brown-soft)',
  },
  {
    icon: '🔒',
    title: 'Hidden pH Blockage',
    body: 'Wrong pH locks nutrients in the soil. Farmers add expensive fertilizer to plants that physically cannot absorb it.',
    stat: 'Wasted money & chemicals',
    borderColor: 'var(--green-bright)',
    iconBg: 'var(--green-soft)',
    statColor: 'var(--green-mid)',
    statBg: 'var(--green-soft)',
  },
]

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="flex flex-col items-center"
      style={{
        background: 'var(--page-bg)',
        padding: 'clamp(80px,10vw,140px) 40px',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          maxWidth: 1100,
        }}
      >
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
                  fontSize: 24,
                }}
              >
                {p.icon}
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
