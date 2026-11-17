import type { CSSProperties } from 'react'
import Link from './Link'

function Arrow() {
  return (
    <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties

// Each root is drawn three times, shorter and thicker each time, so it tapers as it goes down.
const roots: { d: string; width: number; at: number }[] = [
  { d: 'M180 70C178 110 188 140 182 180S172 250 181 300S186 360 180 400', width: 1.3, at: 0.5 },
  { d: 'M180 70C178 110 188 140 182 180S172 250 181 300', width: 2.2, at: 0.35 },
  { d: 'M180 70C178 110 188 140 182 180', width: 3.4, at: 0.2 },
  { d: 'M181 104C166 112 150 116 132 132C122 141 114 150 106 164', width: 1.8, at: 0.8 },
  { d: 'M183 128C198 136 214 140 230 156C240 166 246 176 250 190', width: 1.7, at: 0.95 },
  { d: 'M182 182C168 196 152 206 140 226C133 238 130 250 128 262', width: 1.4, at: 1.1 },
  { d: 'M179 236C194 248 206 262 212 282C216 296 216 306 214 318', width: 1.2, at: 1.25 },
  { d: 'M181 292C170 304 162 318 158 336', width: 1, at: 1.4 },
  { d: 'M182 330C190 342 194 354 196 370', width: 0.8, at: 1.5 },
  { d: 'M150 117C146 128 140 136 134 146', width: 0.9, at: 1.2 },
  { d: 'M214 142C218 154 222 162 228 170', width: 0.9, at: 1.3 },
  { d: 'M154 204C146 210 138 214 128 216', width: 0.8, at: 1.4 },
]

const rootHairs = ['M132 132l-7-4', 'M106 164l-6 6', 'M230 156l8-3', 'M250 190l4 7', 'M140 226l-8 2', 'M128 262l-5 6', 'M212 282l7 4', 'M158 336l-6 4']

const pebbles = [
  { cx: 110, cy: 92, rx: 7, ry: 4.5 },
  { cx: 256, cy: 116, rx: 5.5, ry: 3.6 },
  { cx: 92, cy: 212, rx: 4.5, ry: 3 },
  { cx: 266, cy: 252, rx: 6.5, ry: 4 },
  { cx: 138, cy: 352, rx: 4, ry: 2.8 },
  { cx: 232, cy: 344, rx: 3.6, ry: 2.4 },
]

// Ground level sits at y = 70 of the 400-unit-tall drawing (17.5%); .ground draws the line at the same height.
function SeedlingAndRoot() {
  return (
    <svg className="ground-art" viewBox="0 0 360 400" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <defs>
        <linearGradient id="root-tone" gradientUnits="userSpaceOnUse" x1="0" y1="70" x2="0" y2="400">
          <stop offset="0" stopColor="var(--brown-dark)" />
          <stop offset="0.65" stopColor="var(--brown-dark)" stopOpacity="0.8" />
          <stop offset="1" stopColor="var(--brown-dark)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="leaf-left" x1="1" y1="0.6" x2="0" y2="0.2">
          <stop offset="0" stopColor="var(--green-mid)" />
          <stop offset="1" stopColor="#77A877" />
        </linearGradient>
        <linearGradient id="leaf-right" x1="0" y1="0.8" x2="1" y2="0.1">
          <stop offset="0" stopColor="var(--green-mid)" />
          <stop offset="1" stopColor="var(--green-light)" />
        </linearGradient>
        <radialGradient id="pebble" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#F5F0E8" />
          <stop offset="1" stopColor="var(--brown-light)" />
        </radialGradient>
      </defs>

      <g className="ground-leaf">
        <path d="M180 70C180 56 178 44 181 30" fill="none" stroke="var(--green-mid)" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M180 41C168 27 151 22 136 28C146 42 164 47 180 41Z" fill="url(#leaf-left)" />
        <path d="M180 41C167 35 153 31 141 29" fill="none" stroke="#F5F0E8" strokeOpacity="0.45" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M181 34C192 18 212 12 228 18C218 34 198 40 181 34Z" fill="url(#leaf-right)" />
        <path d="M181 34C194 26 208 21 223 19" fill="none" stroke="#F5F0E8" strokeOpacity="0.4" strokeWidth="0.8" strokeLinecap="round" />
      </g>

      <g className="ground-fade" style={delay(0.5)}>
        {pebbles.map((p) => (
          <ellipse key={`${p.cx}-${p.cy}`} {...p} fill="url(#pebble)" opacity="0.7" />
        ))}
        <g fill="var(--blue-water)" opacity="0.5">
          <path d="M120 186c0 0-4 5-4 7.5a4 4 0 008 0c0-2.5-4-7.5-4-7.5z" />
          <path d="M240 214c0 0-3 4-3 6a3 3 0 006 0c0-2-3-6-3-6z" />
          <path d="M150 288c0 0-3 4-3 6a3 3 0 006 0c0-2-3-6-3-6z" />
        </g>
      </g>

      <g fill="none" stroke="url(#root-tone)" strokeLinecap="round">
        {roots.map((r) => (
          <path key={r.d + r.width} className="ground-root" pathLength={1} strokeWidth={r.width} d={r.d} style={delay(r.at)} />
        ))}
      </g>
      <g className="ground-fade" style={delay(1.8)} fill="none" stroke="var(--brown-dark)" strokeOpacity="0.45" strokeWidth="0.6" strokeLinecap="round">
        {rootHairs.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  )
}

export default function GroundOpening() {
  return (
    <section aria-labelledby="home-title" className="relative flex min-h-[calc(100svh-64px)] flex-col">
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-14 text-center sm:px-6 sm:pt-20">
        <p className="eyebrow">RootSense · Made in Egypt</p>
        <h1 id="home-title" className="display mt-5 font-playfair text-[clamp(3.25rem,11vw,7.5rem)] font-black leading-[0.95]">
          Know your <span className="font-bold italic text-[var(--brown-dark)]">soil.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          Sensors that read your soil at the root, so you water when it needs it instead of by the clock. Three Senses, from a single pot to a whole farm.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="btn-primary btn-lg">
            Shop the range
            <Arrow />
          </Link>
          <Link to="/why" className="btn-secondary btn-lg">
            Why RootSense
          </Link>
        </div>
      </div>
      <div className="ground" aria-hidden="true">
        <SeedlingAndRoot />
      </div>
    </section>
  )
}
