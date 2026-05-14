import FadeIn from './FadeIn'

const stats = [
  {
    number: '74%',
    unit: 'Water Saved',
    desc: 'Moisture-based irrigation efficiency vs. fixed schedules',
    sdg: 'SDG 6',
    sdgFull: 'Clean Water & Sanitation',
    sdgIcon: '/sdg-6.jpg',
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
    sdgIcon: '/sdg-2.jpg',
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
    sdgIcon: '/sdg-13.jpg',
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
    sdgIcon: '/sdg-12.jpg',
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

      {/* SDG Icon Row — official UN icons */}
      <FadeIn delay={0.15}>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { num: 2, src: '/sdg-2.jpg', label: 'Zero Hunger' },
            { num: 6, src: '/sdg-6.jpg', label: 'Clean Water' },
            { num: 12, src: '/sdg-12.jpg', label: 'Responsible Consumption' },
            { num: 13, src: '/sdg-13.jpg', label: 'Climate Action' },
          ].map((sdg) => (
            <div
              key={sdg.num}
              className="flex flex-col items-center gap-2 transition-transform duration-200 cursor-default"
              style={{ transform: 'scale(1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              <img
                src={sdg.src}
                alt={`SDG ${sdg.num}: ${sdg.label}`}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 10,
                  objectFit: 'cover',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
              />
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
              {/* SDG Icon — real image */}
              <img
                src={s.sdgIcon}
                alt={s.sdg}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  objectFit: 'cover',
                  marginBottom: 16,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              />

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
