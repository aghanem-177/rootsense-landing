import Link from './Link'

function Arrow() {
  return (
    <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

// Ground level sits at y = 56 of the 320-unit-tall drawing (17.5%); .ground draws the line at the same height.
function SeedlingAndRoot() {
  return (
    <svg className="ground-art" viewBox="0 0 240 320" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <g className="ground-leaf">
        <path d="M120 56V30" stroke="var(--green-mid)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M120 38c-4-12-15-18-27-16 2 12 13 19 27 16z" fill="var(--green-light)" />
        <path d="M120 32c5-13 17-19 30-16-2 13-15 20-30 16z" fill="var(--green-mid)" />
      </g>
      <g fill="none" stroke="var(--brown-dark)" strokeLinecap="round">
        <path className="ground-root" pathLength={1} strokeWidth="2.6" d="M120 56c-3 40 9 70 1 108s-9 82 0 156" />
        <path className="ground-root ground-root--late" pathLength={1} strokeWidth="1.6" d="M121 104c-14 10-27 14-40 32" />
        <path className="ground-root ground-root--late" pathLength={1} strokeWidth="1.6" d="M122 150c15 12 27 22 36 44" />
        <path className="ground-root ground-root--late" pathLength={1} strokeWidth="1.4" d="M119 222c-12 12-20 26-26 46" />
        <path className="ground-root ground-root--late" pathLength={1} strokeWidth="1.2" d="M120 268c10 10 16 22 18 40" />
      </g>
      <g fill="var(--brown-light)" opacity="0.35">
        <circle cx="66" cy="92" r="2" />
        <circle cx="176" cy="120" r="1.6" />
        <circle cx="54" cy="198" r="1.4" />
        <circle cx="190" cy="240" r="2" />
        <circle cx="150" cy="292" r="1.4" />
      </g>
    </svg>
  )
}

export default function GroundOpening() {
  return (
    <section aria-labelledby="home-title" className="relative flex min-h-[calc(100svh-64px)] flex-col">
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-14 text-center sm:px-6 sm:pt-20">
        <p className="eyebrow">RootSense · Made in Egypt</p>
        <h1 id="home-title" className="mt-4 font-playfair text-[clamp(3.25rem,11vw,7.5rem)] font-black leading-[0.95]">
          Know your soil.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          Read the ground at the root, then water by what it tells you. Three Senses, from a single pot to a whole farm.
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
