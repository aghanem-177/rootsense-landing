import FadeIn from './FadeIn'

/* ─── SDG SVG Icons ─── */
function SdgIcon2() {
  // SDG 2: Zero Hunger — bowl with steam
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h18v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1z" fill="#DDA63A" opacity="0.2" stroke="#DDA63A" strokeWidth="1.5" />
      <path d="M3 17c0-4 4-7 9-7s9 3 9 7" stroke="#DDA63A" strokeWidth="1.5" fill="none" />
      <path d="M8 7c0-1 .5-2 1-2.5" stroke="#DDA63A" strokeWidth="1.5" />
      <path d="M12 6c0-1 .5-2.5 1-3" stroke="#DDA63A" strokeWidth="1.5" />
      <path d="M16 7c0-1 .5-2 1-2.5" stroke="#DDA63A" strokeWidth="1.5" />
    </svg>
  )
}

function SdgIcon6() {
  // SDG 6: Clean Water — water drop
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="#26BDE2" opacity="0.2" stroke="#26BDE2" strokeWidth="1.5" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#26BDE2" strokeWidth="1.5" />
    </svg>
  )
}

function SdgIcon12() {
  // SDG 12: Responsible Consumption — infinity/cycle
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" stroke="#BF8B2E" strokeWidth="1.5" />
      <path d="M18.178 8c5.096 0 5.096 8 0 8" fill="#BF8B2E" opacity="0.15" />
    </svg>
  )
}

function SdgIcon13() {
  // SDG 13: Climate Action — globe with leaf
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" fill="#3F7E44" opacity="0.15" stroke="#3F7E44" strokeWidth="1.5" />
      <path d="M12 3c-1 3-3 5-6 6" stroke="#3F7E44" strokeWidth="1.5" />
      <path d="M12 21c2-3 4-5 7-6" stroke="#3F7E44" strokeWidth="1.5" />
      <path d="M8 12c2-3 5-4 8-3" stroke="#3F7E44" strokeWidth="1.5" />
    </svg>
  )
}

const stats = [
  {
    number: '74%',
    unit: 'Water Saved',
    desc: 'Moisture-based irrigation efficiency vs. fixed schedules',
    sdg: 'SDG 6',
    sdgFull: 'Clean Water & Sanitation',
    icon: <SdgIcon6 />,
    sdgBg: 'rgba(38,189,226,0.15)',
    sdgColor: '#26BDE2',
    barWidth: '74%',
  },
  {
    number: '40%',
    unit: 'Yield Protected',
    desc: 'Preventing salinity-driven crop loss on salt-affected land',
    sdg: 'SDG 2',
    sdgFull: 'Zero Hunger',
    icon: <SdgIcon2 />,
    sdgBg: 'rgba(221,166,58,0.15)',
    sdgColor: '#DDA63A',
    barWidth: '40%',
  },
  {
    number: '1.8M',
    unit: 'Hectares at Risk',
    desc: "Salt-affected irrigated land across Egypt's Delta region",
    sdg: 'SDG 13',
    sdgFull: 'Climate Action',
    icon: <SdgIcon13 />,
    sdgBg: 'rgba(63,126,68,0.15)',
    sdgColor: '#3F7E44',
    barWidth: '35%',
  },
  {
    number: '30K',
    unit: 'EGP / Hectare',
    desc: 'Annual yield protection value from real-time soil monitoring',
    sdg: 'SDG 12',
    sdgFull: 'Responsible Consumption',
    icon: <SdgIcon12 />,
    sdgBg: 'rgba(191,139,46,0.15)',
    sdgColor: '#BF8B2E',
    barWidth: '60%',
  },
]

export default function ImpactSection() {
  return (
    <section
      id="impact"
      className="flex flex-col items-center"
      style={{
        background: 'var(--green-deep)',
        borderRadius: 'clamp(40px,5vw,60px) clamp(40px,5vw,60px) 0 0',
        padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,40px)',
        gap: 60,
      }}
    >
      <FadeIn>
        <p
          className="font-dm font-semibold uppercase tracking-[0.3em] text-center"
          style={{ color: '#6DBF6D', fontSize: '0.72rem' }}
        >
          Impact
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2
          className="light-heading font-playfair font-black uppercase text-center"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          Why It Matters
        </h2>
      </FadeIn>

      {/* SDG Badge Row */}
      <FadeIn delay={0.15}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { num: 2, label: 'Zero Hunger', color: '#DDA63A' },
            { num: 6, label: 'Clean Water', color: '#26BDE2' },
            { num: 12, label: 'Responsible Consumption', color: '#BF8B2E' },
            { num: 13, label: 'Climate Action', color: '#3F7E44' },
          ].map((sdg) => (
            <div
              key={sdg.num}
              className="flex items-center gap-2 rounded-full"
              style={{
                background: `${sdg.color}20`,
                border: `1px solid ${sdg.color}40`,
                padding: '6px 14px',
              }}
            >
              <span
                className="font-dm font-bold"
                style={{
                  fontSize: '0.72rem',
                  color: sdg.color,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: `${sdg.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {sdg.num}
              </span>
              <span className="font-dm font-medium" style={{ fontSize: '0.72rem', color: sdg.color }}>
                {sdg.label}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Stat Cards */}
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: 24,
          maxWidth: 1100,
        }}
      >
        {stats.map((s, i) => (
          <FadeIn key={i} delay={0.2 + i * 0.1}>
            <div
              className="flex flex-col transition-all duration-300 cursor-pointer"
              style={{
                padding: '36px 24px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.transform = 'translateY(-5px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* SDG Icon */}
              <div className="mb-4">{s.icon}</div>

              {/* Number */}
              <p
                className="font-playfair font-black"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', color: s.sdgColor, lineHeight: 1 }}
              >
                {s.number}
              </p>

              {/* Unit */}
              <p
                className="font-dm uppercase"
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  margin: '8px 0 6px',
                }}
              >
                {s.unit}
              </p>

              {/* Progress bar */}
              <div
                style={{
                  width: '100%',
                  height: 3,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 2,
                  marginBottom: 12,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: s.barWidth,
                    height: '100%',
                    background: s.sdgColor,
                    borderRadius: 2,
                    animation: 'barFill 1.5s ease-out forwards',
                  }}
                />
              </div>

              {/* Description */}
              <p
                className="font-dm"
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  marginBottom: 16,
                  flex: 1,
                }}
              >
                {s.desc}
              </p>

              {/* SDG Badge */}
              <div className="flex items-center gap-2">
                <span
                  className="font-dm font-medium px-3 py-1.5 rounded-full"
                  style={{ background: s.sdgBg, color: s.sdgColor, fontSize: '0.72rem' }}
                >
                  {s.sdg}
                </span>
                <span
                  className="font-dm"
                  style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem' }}
                >
                  {s.sdgFull}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Water Crisis Banner */}
      <FadeIn delay={0.5}>
        <div
          className="text-center"
          style={{
            maxWidth: 700,
            padding: 'clamp(32px, 4vw, 48px)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 24,
          }}
        >
          <p
            className="font-playfair font-black"
            style={{ fontSize: 'clamp(2rem,5vw,4rem)', color: '#6BB8FF' }}
          >
            500 m³
          </p>
          <p
            className="font-dm mt-4"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.6, maxWidth: 500, margin: '16px auto 0' }}
          >
            Egypt's per-capita water per year — below the UN's 1,000 m³ scarcity threshold. Agriculture uses 86% of it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#26BDE2' }} />
              <span className="font-dm" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                20–40% water savings per farm
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#DDA63A' }} />
              <span className="font-dm" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                20,000–30,000 EGP yield protected/ha
              </span>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
