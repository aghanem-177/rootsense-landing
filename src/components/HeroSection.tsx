import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { ACESFilmicToneMapping } from 'three'
import FadeIn from './FadeIn'
import Magnet from './Magnet'
import RootSenseStake from './three/RootSenseStake'

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Product', href: '#product' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Impact', href: '#impact' },
  { label: 'Team', href: '#team' },
]

const waterDrops = Array.from({ length: 8 }, (_, i) => ({
  left: `${10 + i * 11}%`,
  delay: `${i * 0.7}s`,
  duration: `${3 + (i % 3)}s`,
  size: 8 + (i % 3) * 2,
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
      {/* Water Drop Particles */}
      {waterDrops.map((drop, i) => (
        <svg
          key={i}
          viewBox="0 0 12 16"
          style={{
            position: 'absolute',
            left: drop.left,
            top: '10%',
            width: drop.size,
            height: drop.size * 1.3,
            fill: 'var(--blue-water)',
            opacity: 0.12,
            pointerEvents: 'none',
            animation: `drip ${drop.duration} ${drop.delay} ease-in infinite`,
            zIndex: 1,
          }}
        >
          <path d="M6 0C6 0 0 8 0 11a6 6 0 0012 0C12 8 6 0 6 0z" />
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
          <a href="#" className="font-playfair font-black text-[1.6rem] cursor-pointer select-none flex items-center gap-0.5">
            <span style={{ color: 'var(--brown-mid)' }}>Root</span>
            <span style={{ color: 'var(--blue-water)' }}>Sense</span>
          </a>

          {/* Desktop Nav Links — pill-shaped container */}
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
                className="relative font-dm font-medium uppercase tracking-wider text-[0.75rem] lg:text-[0.8rem] px-4 py-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-[rgba(0,0,0,0.04)]"
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

          {/* Order CTA in nav */}
          <a
            href="#product"
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
            Order Now
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
            maxHeight: menuOpen ? 400 : 0,
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
            href="#product"
            className="rounded-full font-dm font-medium uppercase tracking-wider text-sm px-8 py-3 cursor-pointer"
            style={{ background: 'var(--green-mid)', color: '#FFFFFF' }}
            onClick={() => setMenuOpen(false)}
          >
            Order Now
          </a>
        </div>
      </nav>

      {/* ═══ HERO CONTENT — Two columns: Text LEFT, Product RIGHT ═══ */}
      <div className="flex-1 flex items-center justify-center relative z-[5] px-8 md:px-12 lg:px-16 pt-24 pb-16 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4 w-full">
          {/* LEFT — Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2">
            {/* Tag */}
            <FadeIn delay={0} y={-20}>
              <p
                className="uppercase font-dm font-semibold tracking-[0.3em]"
                style={{ color: 'var(--green-mid)', fontSize: '0.72rem' }}
              >
                INJAZ Company Program &bull; Made in Egypt
              </p>
            </FadeIn>

            {/* Hero Heading */}
            <FadeIn delay={0.15} y={40}>
              <h1
                className="hero-heading font-playfair font-black uppercase tracking-tight leading-[0.9]"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', marginTop: '1rem' }}
              >
                Root<br />Sense
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn delay={0.35} y={20}>
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
            <FadeIn delay={0.5} y={20}>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href="#product"
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
                  Order Now
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
            <FadeIn delay={0.6} y={15}>
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

          {/* RIGHT — 3D Product (NO overlap with text) */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <FadeIn delay={0.5} y={30}>
              <Magnet padding={100} strength={4} className="w-[300px] h-[380px] sm:w-[380px] sm:h-[460px] md:w-[440px] md:h-[520px] lg:w-[500px] lg:h-[580px]">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--green-mid)', borderTopColor: 'transparent' }} />
                    </div>
                  }
                >
                  <Canvas
                    gl={{
                      antialias: true,
                      alpha: true,
                      toneMapping: ACESFilmicToneMapping,
                      toneMappingExposure: 1.1,
                    }}
                    dpr={[1, 2]}
                    camera={{ position: [3, 2, 5], fov: 45 }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 8, 5]} intensity={1.0} castShadow />
                    <Environment preset="studio" />
                    <RootSenseStake autoRotate rotateSpeed={0.5} />
                    <ContactShadows
                      position={[0, -3, 0]}
                      opacity={0.15}
                      blur={2.5}
                      far={6}
                      color="#B0A898"
                    />
                  </Canvas>
                </Suspense>
              </Magnet>
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
