import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { ACESFilmicToneMapping } from 'three'
import FadeIn from './FadeIn'
import Magnet from './Magnet'
import RootSenseStake from './three/RootSenseStake'

const navLinks = ['Problem', 'Product', 'How It Works', 'Impact', 'Team', 'Invest']

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
        minHeight: 600,
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
            opacity: 0.15,
            pointerEvents: 'none',
            animation: `drip ${drop.duration} ${drop.delay} ease-in infinite`,
            zIndex: 1,
          }}
        >
          <path d="M6 0C6 0 0 8 0 11a6 6 0 0012 0C12 8 6 0 6 0z" />
        </svg>
      ))}

      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="relative z-[1001]">
        <nav
          className="fixed top-0 left-0 w-full z-[1000] transition-all duration-300"
          style={{
            background: scrolled ? 'rgba(250,250,247,0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(0,0,0,0.04)' : 'none',
          }}
        >
          <div className="flex items-center justify-between px-6 md:px-10 py-4 md:py-5 max-w-[1400px] mx-auto">
            {/* Logo */}
            <div className="font-playfair font-black text-2xl cursor-pointer">
              <span style={{ color: 'var(--brown-mid)' }}>Root</span>
              <span style={{ color: 'var(--blue-water)' }}>Sense</span>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                  className="relative font-dm font-medium uppercase tracking-wider text-sm lg:text-[1.1rem] transition-colors duration-200 cursor-pointer group"
                  style={{ color: 'var(--text-tertiary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                >
                  {link}
                  <span
                    className="absolute bottom-[-4px] left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: 'var(--green-mid)' }}
                  />
                </a>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-[2px] transition-all" style={{ background: 'var(--text-primary)', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span className="block w-6 h-[2px] transition-all" style={{ background: 'var(--text-primary)', opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-6 h-[2px] transition-all" style={{ background: 'var(--text-primary)', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </button>
          </div>

          {/* Mobile Menu Drawer */}
          {menuOpen && (
            <div className="md:hidden flex flex-col items-center gap-6 py-8" style={{ background: '#FFFFFF' }}>
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                  className="font-dm font-medium uppercase tracking-wider text-lg cursor-pointer"
                  style={{ color: 'var(--text-secondary)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
          )}
        </nav>
      </FadeIn>

      {/* 3D Hero Product — BEHIND text as a background layer */}
      <div className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none">
        <FadeIn delay={0.6} y={30} className="pointer-events-auto">
          <Magnet padding={150} strength={3} className="w-[280px] h-[340px] sm:w-[350px] sm:h-[420px] md:w-[420px] md:h-[500px] lg:w-[500px] lg:h-[580px]">
            <Suspense fallback={null}>
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

      {/* Main Hero Content — ON TOP of 3D */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-[5] px-6 pt-20 pointer-events-none">
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
            className="hero-heading font-playfair font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center"
            style={{ fontSize: 'clamp(3rem, 14vw, 17.5vw)', marginTop: '0.5rem' }}
          >
            RootSense
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-dm font-light uppercase tracking-wide leading-snug text-center mx-auto"
            style={{
              color: 'var(--text-secondary)',
              maxWidth: 480,
              fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
              marginTop: '1rem',
            }}
          >
            Know when to water. Know when water isn't the answer.
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={0.5} y={20}>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pointer-events-auto">
            <a
              href="https://wa.me/"
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
              Order via WhatsApp
            </a>
            <a
              href="#product"
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
      </div>

      {/* Bottom Bar */}
      <FadeIn delay={0.7} y={20} className="relative z-[5]">
        <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
          <p
            className="font-dm font-light uppercase tracking-wide text-left"
            style={{
              color: 'var(--text-tertiary)',
              maxWidth: 200,
              fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
            }}
          >
            No batteries. No guesswork. Just science.
          </p>
          <p
            className="font-dm font-light uppercase tracking-wide text-right"
            style={{
              color: 'var(--text-tertiary)',
              maxWidth: 200,
              fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
            }}
          >
            Saving up to 74% of water per plant
          </p>
        </div>
      </FadeIn>

      {/* Scroll Hint */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[5]"
        style={{ bottom: 40 }}
      >
        <span
          className="font-dm uppercase tracking-widest"
          style={{ color: 'var(--text-tertiary)', fontSize: '0.65rem' }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, var(--text-tertiary), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
