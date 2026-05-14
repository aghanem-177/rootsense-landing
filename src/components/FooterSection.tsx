const socialLinks = [
  {
    label: 'Email',
    href: 'mailto:teamrootsense@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4l-10 8L2 4" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rootsense.eg/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61589672343460',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
]

export default function FooterSection() {
  return (
    <footer
      style={{
        background: 'var(--green-deep)',
        padding: 'clamp(60px, 8vw, 80px) clamp(20px, 5vw, 40px) 40px',
      }}
    >
      <div
        className="grid gap-10 mx-auto"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          maxWidth: 1100,
        }}
      >
        {/* Brand */}
        <div style={{ gridColumn: 'span 1' }}>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="RootSense logo"
              className="h-12 w-auto object-contain"
              style={{ filter: 'brightness(1.3)' }}
            />
            <div className="flex flex-col leading-none">
              <span className="font-playfair font-black text-[1.3rem] tracking-tight" style={{ color: '#FFFFFF' }}>
                RootSense
              </span>
              <span className="font-dm text-[0.55rem] uppercase tracking-[0.2em] font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Sense Deep. Irrigate Smart.
              </span>
            </div>
          </div>
          <p
            className="font-dm mt-3"
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
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2.5 font-dm mb-3 cursor-pointer transition-colors duration-200 no-underline"
              style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#6DBF6D')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="flex flex-wrap justify-between items-center gap-4 mx-auto mt-10 pt-6"
        style={{
          maxWidth: 1100,
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <p className="font-dm" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
          &copy; 2025 RootSense — INJAZ Company Program
        </p>
        <p className="font-dm" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
          Made in Egypt
        </p>
      </div>
    </footer>
  )
}
