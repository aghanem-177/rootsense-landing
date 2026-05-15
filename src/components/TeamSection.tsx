import FadeIn from './FadeIn'

const team = [
  { name: 'Salaheldin Abdelwahab', role: 'CEO', initials: 'SA' },
  { name: 'Ali Ghanem', role: 'COO', initials: 'AG' },
  { name: 'Gisele ElFar', role: 'CFO', initials: 'GE' },
  { name: 'Daniel Mehany', role: 'CTO', initials: 'DM' },
  { name: 'Hassan El Naggar', role: 'CTO', initials: 'HN' },
  { name: 'Hoda El Etribi', role: 'CMO', initials: 'HE' },
]

export default function TeamSection() {
  return (
    <section
      id="team"
      className="flex flex-col items-center"
      style={{
        background: 'var(--cream)',
        padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,40px)',
        gap: 60,
      }}
    >
      <FadeIn>
        <h2
          className="hero-heading font-playfair font-black uppercase text-center"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          The Team
        </h2>
      </FadeIn>

      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: 20,
          maxWidth: 800,
        }}
      >
        {team.map((m, i) => (
          <FadeIn key={i} delay={0.1 + i * 0.08}>
            <div
              className="flex flex-col items-center gap-4 text-center transition-all duration-300 cursor-pointer"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-light)',
                borderRadius: 20,
                padding: '32px 24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-mid)'
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)'
              }}
            >
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-playfair font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--green-mid), var(--green-deep))',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1.2rem',
                }}
              >
                {m.initials}
              </div>

              {/* Name */}
              <h3
                className="font-playfair font-bold"
                style={{ fontSize: '1rem', color: 'var(--text-primary)' }}
              >
                {m.name}
              </h3>

              {/* Role */}
              <span
                className="font-dm font-semibold uppercase"
                style={{
                  color: 'var(--green-mid)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                }}
              >
                {m.role}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
