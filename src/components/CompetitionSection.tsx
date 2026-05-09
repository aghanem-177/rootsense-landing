import FadeIn from './FadeIn'

const blumatFeatures = [
  'Water control only',
  'No salinity diagnostics',
  'No pH monitoring',
  'European balcony market',
]

const rootsenseFeatures = [
  'Water + salinity + pH diagnostics',
  'Built for MENA salt-affected soils',
  'Arabic instructions, local supply',
  'Agri-shop + WhatsApp distribution',
]

export default function CompetitionSection() {
  return (
    <section
      className="flex flex-col items-center"
      style={{
        background: 'var(--page-bg)',
        borderRadius: 'clamp(40px,5vw,60px) clamp(40px,5vw,60px) 0 0',
        padding: 'clamp(80px,10vw,140px) 40px',
        gap: 60,
      }}
    >
      <FadeIn>
        <p
          className="font-dm font-semibold uppercase tracking-[0.3em] text-center"
          style={{ color: 'var(--brown-mid)', fontSize: '0.72rem' }}
        >
          Competition
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2
          className="font-playfair font-black uppercase text-center"
          style={{ color: 'var(--text-primary)', fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          Why We Win
        </h2>
      </FadeIn>

      {/* Two-column comparison */}
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          maxWidth: 900,
        }}
      >
        {/* Blumat Card */}
        <FadeIn delay={0.2}>
          <div
            style={{
              background: '#F0EDE8',
              border: '1px solid var(--sand)',
              borderRadius: 24,
              padding: '40px 36px',
              opacity: 0.7,
            }}
          >
            <h3 className="font-playfair font-bold" style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>
              Blumat
            </h3>
            <p className="font-dm mt-1 mb-6" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
              Austria &bull; &euro;8–15 &bull; European hobbyists
            </p>
            <div className="flex flex-col gap-3">
              {blumatFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0,0,0,0.04)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="3">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="font-dm" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* RootSense Card */}
        <FadeIn delay={0.3}>
          <div
            style={{
              background: 'var(--green-deep)',
              border: '2px solid var(--green-mid)',
              borderRadius: 24,
              padding: '40px 36px',
              boxShadow: '0 20px 60px rgba(27,58,27,0.2)',
            }}
          >
            <h3 className="font-playfair font-bold" style={{ fontSize: '1.4rem', color: '#F5F0E8' }}>
              RootSense
            </h3>
            <p className="font-dm mt-1 mb-6" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
              Egypt &bull; 300–400 EGP &bull; MENA agriculture
            </p>
            <div className="flex flex-col gap-3">
              {rootsenseFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--green-mid)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="font-dm" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Positioning Quote */}
      <FadeIn delay={0.4}>
        <p
          className="font-playfair italic text-center"
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            maxWidth: 600,
            borderTop: '2px solid var(--sand)',
            paddingTop: 32,
            lineHeight: 1.7,
          }}
        >
          "Blumat controls water. RootSense controls decisions — built for farms that face salinity, not European balconies."
        </p>
      </FadeIn>
    </section>
  )
}
