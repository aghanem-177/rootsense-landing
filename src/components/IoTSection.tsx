import FadeIn from './FadeIn'

const sensors = [
  {
    color: '#E07C3A',
    title: 'Soil Salinity (EC)',
    desc: 'Tracks salt buildup in real time. Critical for groundwater irrigation and reclaimed land.',
  },
  {
    color: 'var(--blue-water)',
    title: 'Moisture Percentage',
    desc: 'Knows exact water content at the root zone. Irrigates only when soil actually needs it.',
  },
  {
    color: 'var(--green-mid)',
    title: 'Soil pH',
    desc: 'Catches pH imbalance before it locks out nutrients. Every fertilizer dollar counts.',
  },
  {
    color: '#C8A84E',
    title: 'Climate Temperature',
    desc: 'Reads ambient temperature to drive cooling, ventilation, and irrigation pump decisions.',
  },
]

const features = [
  { icon: 'pump', label: 'Automated Pump & Fertigation' },
  { icon: 'solar', label: 'Solar-Charged (12+ months)' },
  { icon: 'lcd', label: 'Real-Time LCD Display' },
  { icon: 'rain', label: 'Rain Detection Sensor' },
  { icon: 'wifi', label: 'Web Dashboard Monitoring' },
  { icon: 'fan', label: 'Controls Pumps & Ventilation' },
]

function FeatureIcon({ name }: { name: string }) {
  const s = { width: 22, height: 22, fill: 'none', stroke: 'var(--green-bright)', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'pump': return <svg viewBox="0 0 24 24" {...s}><path d="M12 2v6m0 0a4 4 0 100 8 4 4 0 000-8z"/><path d="M6 12H2m20 0h-4"/></svg>
    case 'solar': return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    case 'lcd': return <svg viewBox="0 0 24 24" {...s}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
    case 'rain': return <svg viewBox="0 0 24 24" {...s}><path d="M16 13v8M8 13v8M12 15v8"/><path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"/></svg>
    case 'wifi': return <svg viewBox="0 0 24 24" {...s}><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="var(--green-bright)"/></svg>
    case 'fan': return <svg viewBox="0 0 24 24" {...s}><path d="M12 12c-3-2.5-3-7 0-7s5 2 5 5-2.5 5-5 2z"/><path d="M12 12c2.5 3 7 3 7 0s-2-5-5-5-5 2.5-2 5z"/><path d="M12 12c3 2.5 3 7 0 7s-5-2-5-5 2.5-5 5-2z"/><path d="M12 12c-2.5-3-7-3-7 0s2 5 5 5 5-2.5 2-5z"/><circle cx="12" cy="12" r="1" fill="var(--green-bright)"/></svg>
    default: return null
  }
}

const steps = [
  { num: '1', title: 'Install', desc: 'Mount the IoT box and insert soil sensor probes into the ground.' },
  { num: '2', title: 'Monitor', desc: 'LCD screen shows real-time soil moisture, EC, pH, and temperature.' },
  { num: '3', title: 'Automate', desc: 'System controls pumps and fertigation based on live sensor readings.' },
]

export default function IoTSection() {
  return (
    <section
      id="iot"
      style={{
        background: 'var(--green-deep)',
        padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,40px)',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <p
              className="font-dm font-semibold uppercase tracking-[0.3em]"
              style={{ color: 'var(--green-bright)', fontSize: '0.72rem' }}
            >
              New Product
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="font-playfair font-black uppercase mt-4"
              style={{ color: '#F5F0E8', fontSize: 'clamp(2.2rem, 7vw, 4.5rem)' }}
            >
              RootSense IoT
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p
              className="font-playfair italic mt-3"
              style={{ color: 'var(--green-bright)', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' }}
            >
              IoT Smart Irrigation System
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="font-dm mt-6 mx-auto"
              style={{
                color: 'rgba(255,255,255,0.5)',
                maxWidth: 560,
                fontSize: '0.92rem',
                lineHeight: 1.7,
              }}
            >
              Real-time soil monitoring with automated pump and fertigation control.
              It reads the soil, decides the action, and streams live data to a web dashboard.
            </p>
          </FadeIn>
        </div>

        {/* Product Image */}
        <FadeIn delay={0.25} y={40}>
          <div className="flex justify-center mb-14">
            <div className="relative">
              {/* Glow behind product */}
              <div
                className="absolute inset-0 rounded-full blur-[80px] opacity-30"
                style={{ background: 'var(--green-bright)' }}
              />
              <img
                src="/iot-product.png"
                alt="RootSense IoT Smart Irrigation System"
                className="relative w-[220px] sm:w-[280px] md:w-[340px] h-auto drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
              />
            </div>
          </div>
        </FadeIn>

        {/* 4 Sensors Grid */}
        <div
          className="grid mb-16"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 16,
          }}
        >
          {sensors.map((s, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.1} y={30}>
              <div
                className="flex flex-col gap-3 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderLeft: `3px solid ${s.color}`,
                  borderRadius: 16,
                  padding: '28px 24px',
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: s.color }}
                />
                <h4 className="font-playfair font-bold" style={{ color: '#F5F0E8', fontSize: '1.05rem' }}>
                  {s.title}
                </h4>
                <p className="font-dm" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Key Features */}
        <FadeIn delay={0.3}>
          <div className="mb-16">
            <h3
              className="font-playfair font-bold text-center mb-8"
              style={{ color: 'var(--green-bright)', fontSize: '1.1rem' }}
            >
              Key Features
            </h3>
            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
                gap: 12,
              }}
            >
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 12,
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ width: 22, height: 22, flexShrink: 0 }}>
                    <FeatureIcon name={f.icon} />
                  </div>
                  <span className="font-dm" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem' }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* How It Works — 3 Steps */}
        <FadeIn delay={0.35}>
          <div className="mb-16">
            <h3
              className="font-playfair font-bold text-center mb-10"
              style={{ color: '#F5F0E8', fontSize: '1.1rem' }}
            >
              Three Simple Steps
            </h3>
            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: 20,
              }}
            >
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-playfair font-bold"
                    style={{
                      background: 'var(--green-mid)',
                      color: '#FFFFFF',
                      fontSize: '1.1rem',
                    }}
                  >
                    {step.num}
                  </div>
                  <h4
                    className="font-dm font-semibold uppercase tracking-wider"
                    style={{ color: '#F5F0E8', fontSize: '0.85rem' }}
                  >
                    {step.title}
                  </h4>
                  <p className="font-dm" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Pricing */}
        <div
          className="grid mb-12"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 20,
          }}
        >
          <FadeIn delay={0.4}>
            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                padding: '36px 32px',
              }}
            >
              <h4 className="font-playfair font-bold" style={{ color: '#F5F0E8', fontSize: '1.2rem' }}>
                Field Starter
              </h4>
              <div className="flex items-baseline gap-2 mt-3 mb-4">
                <span className="font-playfair font-black" style={{ fontSize: '2.5rem', color: 'var(--green-bright)', lineHeight: 1 }}>
                  9,999
                </span>
                <div className="flex flex-col">
                  <span className="font-dm font-semibold" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>EGP</span>
                  <span className="font-dm" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)' }}>single-zone system</span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 mt-4">
                {['1 IoT controller unit', 'EC, moisture, pH, temp sensors', '1 irrigation pump driver', 'Mobile dashboard access', 'Setup & training included'].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span style={{ color: 'var(--green-bright)', fontSize: '0.85rem' }}>+</span>
                    <span className="font-dm" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem' }}>{f}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:teamrootsense@gmail.com"
                className="block text-center rounded-full font-dm font-semibold uppercase tracking-widest mt-8 transition-all duration-200 cursor-pointer"
                style={{
                  fontSize: '0.75rem',
                  padding: '12px 20px',
                  border: '1px solid var(--green-mid)',
                  color: 'var(--green-bright)',
                  background: 'transparent',
                }}
              >
                Contact Us
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div
              className="relative overflow-hidden"
              style={{
                background: 'var(--green-mid)',
                border: '2px solid var(--green-bright)',
                borderRadius: 20,
                padding: '36px 32px',
                boxShadow: '0 20px 60px rgba(27,58,27,0.4)',
              }}
            >
              <div
                className="absolute top-0 right-0 font-dm font-semibold uppercase tracking-wider"
                style={{
                  fontSize: '0.6rem',
                  background: 'var(--green-bright)',
                  color: '#FFFFFF',
                  padding: '5px 16px',
                  borderRadius: '0 16px 0 10px',
                }}
              >
                Best Value
              </div>
              <h4 className="font-playfair font-bold" style={{ color: '#FFFFFF', fontSize: '1.2rem' }}>
                Farm Pro
              </h4>
              <div className="flex items-baseline gap-2 mt-3 mb-4">
                <span className="font-playfair font-black" style={{ fontSize: '2.5rem', color: '#FFFFFF', lineHeight: 1 }}>
                  29,999
                </span>
                <div className="flex flex-col">
                  <span className="font-dm font-semibold" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>EGP</span>
                  <span className="font-dm" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>multi-zone system</span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 mt-4">
                {['Up to 5 zones (field or greenhouse)', 'Full sensor array per zone', 'Fertigation + ventilation control', 'Well & reservoir management', 'Priority on-site support'].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span style={{ color: '#FFFFFF', fontSize: '0.85rem' }}>+</span>
                    <span className="font-dm" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem' }}>{f}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:teamrootsense@gmail.com"
                className="block text-center rounded-full font-dm font-semibold uppercase tracking-widest mt-8 transition-all duration-200 cursor-pointer"
                style={{
                  fontSize: '0.75rem',
                  padding: '12px 20px',
                  background: '#FFFFFF',
                  color: 'var(--green-deep)',
                }}
              >
                Contact Us
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Bottom quote */}
        <FadeIn delay={0.55}>
          <p
            className="font-playfair italic text-center mx-auto"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              maxWidth: 500,
              lineHeight: 1.7,
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: 32,
            }}
          >
            "Others water blindly. RootSense IoT decides intelligently."
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
