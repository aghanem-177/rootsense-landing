import Link from './Link'

function Arrow() {
  return (
    <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
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
      <div className="ground" aria-hidden="true" />
    </section>
  )
}
