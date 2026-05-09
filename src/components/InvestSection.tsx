import { useRef } from 'react'
import { useInView } from 'framer-motion'
import FadeIn from './FadeIn'

const allocations = [
  { label: 'Field Trials', amount: '90K', pct: 30 },
  { label: 'Manufacturing', amount: '75K', pct: 25 },
  { label: 'Marketing', amount: '75K', pct: 25 },
  { label: 'Prototype', amount: '40K', pct: 13.3 },
  { label: 'Farmer Support', amount: '30K', pct: 10 },
  { label: 'Operations', amount: '25K', pct: 8.3 },
]

const roadmap = [
  { year: 'Year 1', revenue: '500K EGP', note: 'Pilot, net loss' },
  { year: 'Year 2', revenue: '3–5M EGP', note: 'Approaching break-even' },
  { year: 'Year 3', revenue: '10–20M EGP', note: 'Profitable' },
  { year: 'Year 4–5', revenue: '30–50M EGP', note: 'MENA expansion' },
]

function AllocationBar({ label, amount, pct, delay }: { label: string; amount: string; pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex items-center gap-3 mb-4">
      <span
        className="font-dm text-right shrink-0"
        style={{ width: 120, color: 'var(--text-secondary)', fontSize: '0.85rem' }}
      >
        {label}
      </span>
      <div className="flex-1 h-2 rounded" style={{ background: 'var(--sand)' }}>
        <div
          className="h-full rounded"
          style={{
            width: inView ? `${pct}%` : '0%',
            background: 'linear-gradient(90deg, var(--green-mid), var(--green-bright))',
            transition: `width 1.2s ${delay}s ease-out`,
          }}
        />
      </div>
      <span
        className="font-dm shrink-0"
        style={{ color: 'var(--text-tertiary)', fontSize: '0.78rem', width: 50 }}
      >
        {amount}
      </span>
    </div>
  )
}

export default function InvestSection() {
  return (
    <section
      id="invest"
      className="flex flex-col items-center"
      style={{
        background: 'var(--page-bg)',
        padding: 'clamp(80px,10vw,140px) 40px',
        gap: 60,
      }}
    >
      <FadeIn>
        <p
          className="font-dm font-semibold uppercase tracking-[0.3em] text-center"
          style={{ color: 'var(--green-mid)', fontSize: '0.72rem' }}
        >
          Investment
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="text-center">
          <p className="font-playfair font-black" style={{ fontSize: 'clamp(3rem,8vw,5rem)', color: 'var(--green-mid)' }}>
            300,000
          </p>
          <p className="font-dm mt-2" style={{ color: 'var(--text-tertiary)', fontSize: '1rem' }}>
            EGP to market-ready product
          </p>
        </div>
      </FadeIn>

      {/* Two-column layout */}
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 48,
          maxWidth: 1000,
        }}
      >
        {/* Left — Allocation */}
        <FadeIn delay={0.2}>
          <div>
            <h3
              className="font-playfair font-bold mb-6"
              style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}
            >
              Allocation
            </h3>
            {allocations.map((a, i) => (
              <AllocationBar key={i} {...a} delay={i * 0.15} />
            ))}
          </div>
        </FadeIn>

        {/* Right — Revenue Roadmap */}
        <FadeIn delay={0.3}>
          <div>
            <h3
              className="font-playfair font-bold mb-6"
              style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}
            >
              Revenue Roadmap
            </h3>
            {roadmap.map((r, i) => (
              <div
                key={i}
                className="transition-all duration-200 cursor-pointer"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-mid)'
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)'
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                }}
              >
                <span
                  className="font-dm font-bold uppercase"
                  style={{ color: 'var(--green-mid)', fontSize: '0.72rem', letterSpacing: '0.1em' }}
                >
                  {r.year}
                </span>
                <p className="font-playfair font-bold mt-1" style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                  {r.revenue}
                </p>
                <p className="font-dm" style={{ color: 'var(--text-tertiary)', fontSize: '0.78rem' }}>
                  {r.note}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
