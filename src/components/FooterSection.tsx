export default function FooterSection() {
  return (
    <footer
      style={{
        background: 'var(--green-deep)',
        padding: '80px 40px 40px',
      }}
    >
      <div
        className="grid gap-10 mx-auto"
        style={{
          gridTemplateColumns: '2fr 1fr 1fr',
          maxWidth: 1100,
        }}
      >
        {/* Brand */}
        <div>
          <div className="font-playfair font-black" style={{ fontSize: '1.8rem' }}>
            <span style={{ color: 'var(--brown-light)' }}>Root</span>
            <span style={{ color: '#6BB8FF' }}>Sense</span>
          </div>
          <p
            className="font-dm mt-4"
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.88rem',
              lineHeight: 1.7,
              maxWidth: 340,
            }}
          >
            Helping farmers know not only when to water, but when water may not be the real solution. Built in Egypt for Egyptian soil.
          </p>
        </div>

        {/* Regions */}
        <div>
          <h4
            className="font-dm font-semibold uppercase mb-5"
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
            }}
          >
            Regions
          </h4>
          {['Nubaria', 'Ismailia', 'Fayoum', 'West Delta'].map((r) => (
            <p key={r} className="font-dm mb-2.5" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
              {r}
            </p>
          ))}
        </div>

        {/* Connect */}
        <div>
          <h4
            className="font-dm font-semibold uppercase mb-5"
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
            }}
          >
            Connect
          </h4>
          {['WhatsApp', 'Instagram', 'TikTok', 'X (Twitter)'].map((c) => (
            <p
              key={c}
              className="font-dm mb-2.5 cursor-pointer transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#6DBF6D')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              {c}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="flex flex-wrap justify-between items-center mx-auto mt-10 pt-6"
        style={{
          maxWidth: 1100,
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <p className="font-dm" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
          &copy; 2026 RootSense — INJAZ Company Program
        </p>
        <p className="font-dm" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
          Made in Egypt 🇪🇬
        </p>
      </div>
    </footer>
  )
}
