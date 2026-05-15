import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'

const steps = [
  { label: 'Dry Soil Pulls Water', sub: 'Tension activates', color: 'var(--brown-mid)' },
  { label: 'Water Flows Through Cone', sub: 'Ceramic micropores open', color: 'var(--blue-water)' },
  { label: 'Soil Moistens', sub: 'Plant absorbs', color: 'var(--green-mid)' },
  { label: 'Flow Stops Automatically', sub: 'Tension equalizes', color: 'var(--sand)', textColor: 'var(--text-tertiary)' },
]

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="flex flex-col items-center"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,40px) clamp(40px,5vw,80px)',
        overflowX: 'clip',
      }}
    >
      <FadeIn>
        <h2
          className="green-heading font-playfair font-black uppercase text-center mb-16"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          The Science
        </h2>
      </FadeIn>

      {/* Step Loop */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-20 max-w-[900px] w-full">
        {steps.map((step, i) => (
          <FadeIn key={i} delay={0.1 + i * 0.15} className="flex items-center">
            <div className="flex flex-col items-center text-center gap-3 min-w-[160px]">
              {/* Dot */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-playfair font-bold text-white"
                style={{
                  background: step.color,
                  color: step.textColor || '#FFFFFF',
                  border: step.textColor ? `2px solid var(--sand)` : 'none',
                  boxShadow: `0 0 0 0 ${step.color}33`,
                  animation: `dotRing 3s ${i * 0.5}s ease-in-out infinite`,
                }}
              >
                {i + 1}
              </div>
              {/* Label */}
              <h4
                className="font-playfair font-bold"
                style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}
              >
                {step.label}
              </h4>
              <p
                className="font-dm"
                style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}
              >
                {step.sub}
              </p>
            </div>
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className="hidden md:block w-16 h-[2px] mx-2"
                style={{
                  background: `linear-gradient(90deg, ${step.color}, ${steps[i + 1].color})`,
                }}
              />
            )}
          </FadeIn>
        ))}
      </div>

      {/* Animated Description */}
      <AnimatedText
        text="RootSense is a solar-powered smart irrigation stake pushed into the ground next to a plant. The ceramic cone automatically releases water when soil dries and stops when wet — using soil water tension. The electronic sensor head adds real-time pH, salinity, moisture, and wind speed readings on dual built-in LCDs. Fully solar-charged, no batteries to replace. No app needed. The answer is right on the stake."
        className="px-4"
      />
    </section>
  )
}
