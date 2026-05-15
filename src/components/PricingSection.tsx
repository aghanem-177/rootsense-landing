import { useState } from 'react'
import FadeIn from './FadeIn'

const plans = [
  {
    name: 'Solo Sense',
    price: '949',
    unit: 'EGP',
    period: 'per stake',
    description:
      'One smart irrigation stake for home gardens, balcony planters, or single-pot use. Everything you need to stop guessing.',
    features: [
      'Ceramic auto-irrigation cone',
      '4-in-1 sensors (pH, salinity, temp, wind)',
      'Dual LCD screens (soil + wind)',
      'Solar-charged battery (12+ months)',
      'Built-in anemometer',
      'IP67 waterproof rated',
    ],
    cta: 'Contact Us',
    popular: false,
    accent: 'var(--green-mid)',
    bg: 'var(--card-bg)',
  },
  {
    name: 'Drip Sense Kit',
    price: '3,999',
    unit: 'EGP',
    period: 'pack of 5 stakes',
    description:
      'Full greenhouse or small-farm package — 5 stakes with drip integration hub and water distribution manifold. Built for commercial growers.',
    features: [
      '5 RootSense stakes included',
      'Drip-line integration hub',
      'Water distribution manifold',
      'All brass fittings & tubing',
      'Commercial-grade components',
      'Scalable to any plot size',
      'Priority support & setup guide',
    ],
    cta: 'Contact Us',
    popular: true,
    accent: 'var(--green-bright)',
    bg: 'var(--green-deep)',
  },
]

export default function PricingSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="pricing"
      className="flex flex-col items-center"
      style={{
        background: 'var(--page-bg)',
        padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,40px)',
        gap: 60,
      }}
    >
      <FadeIn>
        <p
          className="font-dm font-semibold uppercase tracking-[0.3em] text-center"
          style={{ color: 'var(--green-mid)', fontSize: '0.72rem' }}
        >
          Pricing
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2
          className="green-heading font-playfair font-black uppercase text-center"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          Choose Your Scale
        </h2>
      </FadeIn>

      <FadeIn delay={0.15}>
        <p
          className="font-dm text-center"
          style={{
            color: 'var(--text-secondary)',
            maxWidth: 500,
            fontSize: '0.95rem',
            lineHeight: 1.7,
          }}
        >
          From a single balcony plant to a full greenhouse operation —
          RootSense scales with you.
        </p>
      </FadeIn>

      {/* Pricing Cards */}
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 28,
          maxWidth: 820,
        }}
      >
        {plans.map((plan, i) => (
          <FadeIn key={i} delay={0.2 + i * 0.15} y={50}>
            <div
              className="flex flex-col relative overflow-hidden transition-all duration-300"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: plan.popular ? plan.bg : plan.bg,
                border: plan.popular
                  ? '2px solid var(--green-mid)'
                  : '1px solid var(--border-light)',
                borderRadius: 24,
                padding: 'clamp(32px, 4vw, 44px)',
                boxShadow: hoveredIndex === i
                  ? '0 20px 60px rgba(0,0,0,0.12)'
                  : '0 4px 24px rgba(0,0,0,0.04)',
                transform: hoveredIndex === i ? 'translateY(-8px)' : 'translateY(0)',
                cursor: 'default',
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  className="absolute top-0 right-0 font-dm font-semibold uppercase tracking-wider"
                  style={{
                    fontSize: '0.62rem',
                    background: 'var(--green-bright)',
                    color: '#FFFFFF',
                    padding: '6px 20px',
                    borderRadius: '0 20px 0 12px',
                  }}
                >
                  Best Value
                </div>
              )}

              {/* Plan name */}
              <h3
                className="font-playfair font-bold"
                style={{
                  fontSize: '1.4rem',
                  color: plan.popular ? '#FFFFFF' : 'var(--text-primary)',
                  marginBottom: 8,
                }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className="font-playfair font-black"
                  style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                    color: plan.popular ? 'var(--green-bright)' : plan.accent,
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <div className="flex flex-col">
                  <span
                    className="font-dm font-semibold"
                    style={{
                      fontSize: '0.85rem',
                      color: plan.popular ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)',
                    }}
                  >
                    {plan.unit}
                  </span>
                  <span
                    className="font-dm"
                    style={{
                      fontSize: '0.72rem',
                      color: plan.popular ? 'rgba(255,255,255,0.4)' : 'var(--text-tertiary)',
                    }}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                className="font-dm"
                style={{
                  color: plan.popular ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: plan.popular
                    ? 'rgba(255,255,255,0.1)'
                    : 'var(--sand)',
                  marginBottom: 24,
                }}
              />

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={plan.popular ? 'var(--green-bright)' : plan.accent}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span
                      className="font-dm"
                      style={{
                        color: plan.popular ? 'rgba(255,255,255,0.75)' : 'var(--text-secondary)',
                        fontSize: '0.88rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="mailto:teamrootsense@gmail.com"
                className="block text-center rounded-full font-dm font-semibold uppercase tracking-widest transition-all duration-200 cursor-pointer"
                style={{
                  fontSize: '0.8rem',
                  padding: '14px 24px',
                  background: plan.popular ? 'var(--green-bright)' : plan.accent,
                  color: '#FFFFFF',
                  boxShadow: plan.popular
                    ? '0 4px 20px rgba(61,163,61,0.4)'
                    : '0 4px 20px rgba(45,90,45,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = plan.popular
                    ? '0 8px 30px rgba(61,163,61,0.5)'
                    : '0 8px 30px rgba(45,90,45,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = plan.popular
                    ? '0 4px 20px rgba(61,163,61,0.4)'
                    : '0 4px 20px rgba(45,90,45,0.2)'
                }}
              >
                {plan.cta}
              </a>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Bottom trust bar */}
      <FadeIn delay={0.5}>
        <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green-mid)" strokeWidth="2" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="font-dm" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
              IP67 Waterproof
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green-mid)" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-dm" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
              Solar-Powered
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green-mid)" strokeWidth="2" strokeLinecap="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="font-dm" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
              Made in Egypt
            </span>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
