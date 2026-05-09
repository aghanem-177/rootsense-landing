import FadeIn from './FadeIn'

const services = [
  {
    num: '01',
    name: 'Moisture Sensing',
    desc: 'Automatic soil water tension detection through our ceramic cone — releases water when dry, stops when wet. Real-time volumetric water content displayed on the LCD.',
  },
  {
    num: '02',
    name: 'pH Diagnostics',
    desc: 'Built-in glass-electrode pH sensor detects when soil acidity is blocking nutrient uptake — saving wasted fertilizer and preventing invisible crop damage.',
  },
  {
    num: '03',
    name: 'Salinity Monitoring',
    desc: "Electronic EC probe calibrated per crop type detects dangerous salt levels before they destroy yields — critical for 35% of Egypt's irrigated land.",
  },
  {
    num: '04',
    name: 'Crop-Specific Guidance',
    desc: "Visual traffic-light system on the LCD matched to each crop's tolerance threshold. Tomatoes, wheat, onion, citrus — each gets its own reading.",
  },
  {
    num: '05',
    name: 'Water Conservation',
    desc: 'Moisture-based irrigation saves up to 74% of water without reducing yield. In a country with 500 m³ per capita, every drop counts.',
  },
]

export default function ServicesSection() {
  return (
    <section
      className="relative"
      style={{
        background: 'var(--cream)',
        borderRadius: 'clamp(40px,5vw,60px) clamp(40px,5vw,60px) 0 0',
        padding: 'clamp(80px,5vw,128px) clamp(20px,3vw,40px)',
        marginTop: -20,
      }}
    >
      <FadeIn>
        <h2
          className="font-playfair font-black uppercase text-center"
          style={{
            color: 'var(--text-primary)',
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            marginBottom: 'clamp(64px,5vw,112px)',
          }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-[900px] mx-auto">
        {services.map((s, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div
              className="flex items-start gap-6 md:gap-10"
              style={{
                padding: 'clamp(32px,2vw,48px) 0',
                borderBottom: i < services.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {/* Large Number */}
              <span
                className="font-playfair font-black shrink-0 hidden sm:block"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 7rem)',
                  color: 'var(--text-primary)',
                  opacity: 0.06,
                  lineHeight: 1,
                  width: 120,
                  textAlign: 'right',
                }}
              >
                {s.num}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3
                  className="font-dm font-medium uppercase"
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: 'clamp(1rem, 2.2vw, 1.8rem)',
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="font-dm font-light"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
                    lineHeight: 1.7,
                    maxWidth: '42rem',
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
