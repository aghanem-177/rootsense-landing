import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { ThemeId } from '../data/products'
import { hasNavigated, useLocation } from '../lib/router'
import Link from './Link'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/why', label: 'Why RootSense' },
  { to: '/shop', label: 'Shop' },
]

const socialLinks = [
  { label: 'Email', href: 'mailto:teamrootsense@gmail.com' },
  { label: 'Instagram', href: 'https://www.instagram.com/rootsense.eg/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61589778300080' },
]

function Nav() {
  const { path } = useLocation()
  const [open, setOpen] = useState(false)
  const isActive = (to: string) => (to === '/' ? path === '/' : path.startsWith(to))

  const linkClass = (to: string) =>
    `block rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
      to === '/shop' ? 'bg-[var(--fam-accent)] text-[var(--fam-accent-ink)]' : 'hover:bg-[var(--fam-line)]'
    } ${isActive(to) && to !== '/shop' ? 'underline underline-offset-8 decoration-2' : ''}`

  return (
    <header
      data-family="brand"
      className="sticky top-0 z-50 border-b border-line"
      style={{
        color: 'var(--fam-ink)',
        background: 'color-mix(in srgb, var(--fam-bg) 92%, transparent)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="RootSense home" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="" width={28} height={36} className="h-9 w-auto" />
          <span className="font-playfair text-lg font-black tracking-tight">RootSense</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass(link.to)} aria-current={isActive(link.to) ? 'page' : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={linkClass(link.to)}
                  aria-current={isActive(link.to) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-playfair text-xl font-black">RootSense</p>
          <p className="mt-2 text-muted">Know your soil.</p>
          <p className="mt-4 max-w-xs text-sm text-muted">Designed, assembled and supported in Egypt.</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Pages</p>
          <ul className="mt-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="inline-block py-2 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Contact</p>
          <ul className="mt-4 space-y-1">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-block py-2 hover:underline"
                  {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] justify-between gap-4 border-t border-line px-4 py-6 text-xs text-muted sm:px-6">
        <span>© 2026 RootSense</span>
        <span>Made in Egypt</span>
      </div>
    </footer>
  )
}

export default function Layout({ theme, children }: { theme: ThemeId; children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (hasNavigated()) mainRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <div className="family-scope min-h-screen" data-family={theme}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" ref={mainRef} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
