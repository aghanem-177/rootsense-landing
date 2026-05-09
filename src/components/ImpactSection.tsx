import FadeIn from './FadeIn'

const stats = [
  {
    number: '74%',
    unit: 'Water Saved',
    desc: 'Moisture-based irrigation efficiency vs. fixed schedules',
    sdg: 'SDG 6',
    sdgBg: 'rgba(74,144,217,0.15)',
    sdgColor: '#6BB8FF',
  },
  {
    number: '40%',
    unit: 'Yield Protected',
    desc: 'Preventing salinity-driven crop loss on affected land',
    sdg: 'SDG 2',
    sdgBg: 'rgba(109,191,109,0.15)',
    sdgColor: '#6DBF6D',
  },
  {
    number: '1.8M',
    unit: 'Hectares at Risk',
    desc: "Salt-affected irrigated land across Egypt's Delta region",
    sdg: 'SDG 13',
    sdgBg: 'rgba(184,92,56,0.15)',
    sdgColor: '#D4956A',
  },
  {
    number: '500',
    unit: 'm³ per Capita',
    desc: "Egypt's water — half the UN scarcity threshold of 1,000 m³",
    sdg: 'SDG 12',
    sdgBg: 'rgba(212,196,168,0.15)',
    sdgColor: '#D4C4A8',
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

      {/* Stat Cards */}
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
          maxWidth: 1100,
        }}
      >
        {stats.map((s, i) => (
          <FadeIn key={i} delay={0.2 + i * 0.1}>
            <div
              className="text-center transition-all duration-300 cursor-pointer"
              style={{
                padding: '40px 20px',
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
              <p className="font-playfair font-black" style={{ fontSize: 'clamp(2.5rem,5vw,3.5rem)', color: '#6DBF6D' }}>
                {s.number}
              </p>
              <p className="font-dm uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', letterSpacing: '0.1em', margin: '8px 0' }}>
                {s.unit}
              </p>
              <p className="font-dm" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 16 }}>
                {s.desc}
              </p>
              <span
                className="font-dm font-medium px-3 py-1 rounded-full inline-block"
                style={{ background: s.sdgBg, color: s.sdgColor, fontSize: '0.72rem' }}
              >
                {s.sdg}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Water Stat Banner */}
      <FadeIn delay={0.5}>
        <div
          className="text-center"
          style={{
            maxWidth: 700,
            padding: 48,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 24,
          }}
        >
          <p className="font-playfair font-black" style={{ fontSize: 'clamp(2rem,5vw,4rem)', color: '#6BB8FF' }}>
            500 m³
          </p>
          <p className="font-dm mt-4" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.6 }}>
            Egypt's per-capita water per year — below the UN's 1,000 m³ scarcity threshold. Agriculture uses 86% of it.
          </p>
        </div>
      </FadeIn>
    </section>
  )
}
