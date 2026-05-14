import { useState, useEffect } from 'react'
import FadeIn from './FadeIn'

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Product', href: '#product' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Impact', href: '#impact' },
  { label: 'Team', href: '#team' },
]

const waterDrops = Array.from({ length: 6 }, (_, i) => ({
  left: `${12 + i * 15}%`,
  delay: `${i * 1.2}s`,
  duration: `${4 + (i % 3) * 1.5}s`,
  size: 6 + (i % 3) * 3,
  opacity: 0.06 + (i % 3) * 0.03,
}))

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className="relative flex flex-col"
      style={{
        height: '100vh',
        minHeight: 700,
        background: 'var(--page-bg)',
        overflowX: 'clip',
      }}
    >
      {/* Water Drop Particles — realistic with gradients */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="dropGrad" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#a8d4f0" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#5ba8d9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3B7DD8" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="dropHighlight" cx="0.35" cy="0.3" r="0.5">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {waterDrops.map((drop, i) => (
        <svg
          key={i}
          viewBox="0 0 20 28"
          style={{
            position: 'absolute',
            left: drop.left,
            top: '8%',
            width: drop.size,
            height: drop.size * 1.4,
            opacity: drop.opacity,
            pointerEvents: 'none',
            animation: `drip ${drop.duration} ${drop.delay} ease-in infinite`,
            zIndex: 1,
            filter: 'blur(0.3px)',
          }}
        >
          <path d="M10 0C10 0 0 13 0 18a10 10 0 0020 0C20 13 10 0 10 0z" fill="url(#dropGrad)" />
          <path d="M10 0C10 0 0 13 0 18a10 10 0 0020 0C20 13 10 0 10 0z" fill="url(#dropHighlight)" />
        </svg>
      ))}

      {/* ═══ NAVBAR ═══ */}
      <nav
        className="fixed top-0 left-0 w-full z-[1000] transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(250,250,247,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.04)' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.03)' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-8 md:px-12 lg:px-16 py-5 max-w-[1440px] mx-auto">
          {/* Logo */}
          <a href="#" className="cursor-pointer select-none flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="RootSense logo"
              className="h-9 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="font-playfair font-black text-[1.15rem] tracking-tight" style={{ color: 'var(--green-deep)' }}>
                RootSense
              </span>
              <span className="font-dm uppercase text-[0.5rem] tracking-[0.25em] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                Smart Irrigation
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div
            className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
            style={{
              background: scrolled ? 'transparent' : 'rgba(0,0,0,0.03)',
              border: scrolled ? 'none' : '1px solid rgba(0,0,0,0.04)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative font-dm font-medium uppercase tracking-wider text-[0.72rem] lg:text-[0.78rem] px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-[rgba(0,0,0,0.04)]"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-tertiary)'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact CTA in nav */}
          <a
            href="mailto:teamrootsense@gmail.com"
            className="hidden md:flex items-center gap-2 rounded-full font-dm font-medium uppercase tracking-wider text-[0.75rem] px-5 py-2.5 cursor-pointer transition-all duration-200"
            style={{
              background: 'var(--green-mid)',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--green-light)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--green-mid)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Contact Us
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-[2px] transition-all duration-300" style={{ background: 'var(--text-primary)', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span className="block w-6 h-[2px] transition-all duration-300" style={{ background: 'var(--text-primary)', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[2px] transition-all duration-300" style={{ background: 'var(--text-primary)', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className="md:hidden flex flex-col items-center gap-6 overflow-hidden transition-all duration-400"
          style={{
            maxHeight: menuOpen ? 500 : 0,
            paddingTop: menuOpen ? 24 : 0,
            paddingBottom: menuOpen ? 32 : 0,
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            opacity: menuOpen ? 1 : 0,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-dm font-medium uppercase tracking-wider text-base cursor-pointer transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:teamrootsense@gmail.com"
            className="rounded-full font-dm font-medium uppercase tracking-wider text-sm px-8 py-3 cursor-pointer"
            style={{ background: 'var(--green-mid)', color: '#FFFFFF' }}
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </a>
        </div>
      </nav>

      {/* ═══ HERO CONTENT ═══ */}
      <div className="flex-1 flex items-center justify-center relative z-[5] px-8 md:px-12 lg:px-16 pt-24 pb-16 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4 w-full">
          {/* LEFT — Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2">
            {/* Tag */}
            <FadeIn delay={0} y={-20} immediate>
              <p
                className="uppercase font-dm font-semibold tracking-[0.3em]"
                style={{ color: 'var(--green-mid)', fontSize: '0.72rem' }}
              >
                INJAZ Company Program &bull; Made in Egypt
              </p>
            </FadeIn>

            {/* Hero Heading */}
            <FadeIn delay={0.15} y={40} immediate>
              <h1
                className="hero-heading font-playfair font-black uppercase tracking-tight leading-[0.9]"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', marginTop: '1rem' }}
              >
                Root<br />Sense
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn delay={0.35} y={20} immediate>
              <p
                className="font-dm font-light uppercase tracking-wide leading-relaxed"
                style={{
                  color: 'var(--text-secondary)',
                  maxWidth: 420,
                  fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                  marginTop: '1.5rem',
                }}
              >
                Know when to water. Know when water isn't the answer.
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={0.5} y={20} immediate>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href="mailto:teamrootsense@gmail.com"
                  className="rounded-full font-dm font-medium uppercase tracking-widest text-sm px-8 py-3.5 cursor-pointer transition-all duration-200"
                  style={{
                    background: 'var(--green-mid)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(45,90,45,0.25)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--green-light)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(45,90,45,0.35)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--green-mid)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,90,45,0.25)'
                  }}
                >
                  Contact Us
                </a>
                <a
                  href="#how-it-works"
                  className="rounded-full font-dm font-medium uppercase tracking-widest text-sm px-8 py-3.5 cursor-pointer transition-all duration-200"
                  style={{
                    border: '2px solid var(--sand)',
                    color: 'var(--text-secondary)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--green-mid)'
                    e.currentTarget.style.color = 'var(--green-mid)'
                    e.currentTarget.style.background = 'rgba(45,90,45,0.03)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--sand)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  Learn More
                </a>
              </div>
            </FadeIn>

            {/* Stats bar */}
            <FadeIn delay={0.6} y={15} immediate>
              <div className="flex items-center gap-8 mt-10">
                <div>
                  <p className="font-playfair font-bold text-2xl" style={{ color: 'var(--green-mid)' }}>74%</p>
                  <p className="font-dm text-xs uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Water Saved</p>
                </div>
                <div style={{ width: 1, height: 36, background: 'var(--sand)' }} />
                <div>
                  <p className="font-playfair font-bold text-2xl" style={{ color: 'var(--green-mid)' }}>3-in-1</p>
                  <p className="font-dm text-xs uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Sensors</p>
                </div>
                <div style={{ width: 1, height: 36, background: 'var(--sand)' }} />
                <div>
                  <p className="font-playfair font-bold text-2xl" style={{ color: 'var(--green-mid)' }}>30s</p>
                  <p className="font-dm text-xs uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Updates</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — Product Photo */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <FadeIn delay={0.4} y={30} immediate>
              <div className="relative">
                <img
                  src="/product-nobg.png"
                  alt="RootSense Smart Irrigation Stake — ceramic cone, stainless steel shaft, sensor head with LCD, brass fittings"
                  className="w-[320px] sm:w-[400px] md:w-[480px] lg:w-[540px] h-auto object-contain transition-transform duration-700 hover:scale-105 hover:rotate-1"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 4px 12px rgba(0,0,0,0.08))',
                  }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[5]"
        style={{ bottom: 24 }}
      >
        <span
          className="font-dm uppercase tracking-widest"
          style={{ color: 'var(--text-tertiary)', fontSize: '0.6rem' }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 32,
            background: 'linear-gradient(to bottom, var(--text-tertiary), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
