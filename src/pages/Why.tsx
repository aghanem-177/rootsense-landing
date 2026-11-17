import type { ReactNode } from 'react'
import FadeIn from '../components/FadeIn'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { formatPrice, products } from '../data/products'
import { pressureFigures, researchFigure, sdgSource, type Figure, type Source } from '../data/sources'
import { usePageTitle } from '../lib/router'

const priceRange = `${formatPrice(Math.min(...products.map((p) => p.price)))} to ${formatPrice(Math.max(...products.map((p) => p.price)))}`

const reasons = [
  { title: 'A Sense for every plot', body: `One range of Senses, from ${priceRange}: a single pot, a greenhouse tunnel or a whole farm.` },
  { title: 'Reads and waters in one unit', body: 'The same unit that reads the root zone also delivers the water, so the two always agree.' },
  { title: 'Works without a phone', body: 'Solo Sense needs no phone, internet or mains power. Flow keeps watering if the connection drops.' },
  { title: 'Arabic and English', body: 'Every model comes with its own manual and a plant handbook, written in plain Arabic and English.' },
  { title: 'Made and supported here', body: 'Designed, assembled, calibrated and supported in Egypt, with help on WhatsApp in Arabic and English.' },
  { title: 'Built to be repaired', body: 'Parts can be replaced, and we take electronics back at the end of their life.' },
]

const sdgs = [
  {
    num: 9,
    img: '/sdg/sdg-9.webp',
    name: 'Industry, innovation and infrastructure',
    target: 'Goal 9',
    body: 'Terra Sense adds soil-led control to the drip and pivot systems farms already own, instead of replacing them. Every Sense is designed and assembled in Egypt.',
  },
  {
    num: 11,
    img: '/sdg/sdg-11.webp',
    name: 'Sustainable cities and communities',
    target: 'Goal 11',
    body: 'Solo Sense needs no wiring, phone or mains power, so balconies, rooftops and community gardens in towns and cities get water when the soil needs it.',
  },
  {
    num: 12,
    img: '/sdg/sdg-12.webp',
    name: 'Responsible consumption and production',
    target: 'Goal 12',
    body: 'Less water and fertiliser used per kilo grown, and parts that can be repaired, with electronics taken back at the end of their life.',
  },
]

function SourceLine({ source }: { source: Source }) {
  return (
    <p className="mt-4 text-xs leading-relaxed text-muted">
      Source: {source.publisher} ({source.year}).{' '}
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
        {source.title}
      </a>
    </p>
  )
}

function FigureCard({ figure }: { figure: Figure }) {
  return (
    <div className="flex h-full flex-col card-soft rounded-[24px] border border-line bg-surface p-7">
      <p className="font-playfair text-[clamp(2.5rem,7vw,3.5rem)] font-black leading-none" style={{ color: 'var(--fam-accent)' }}>
        {figure.value}
      </p>
      <p className="mt-3 flex-1 leading-relaxed">{figure.label}</p>
      <SourceLine source={figure.source} />
    </div>
  )
}

function Block({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
      <FadeIn>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-3 max-w-3xl font-playfair text-[clamp(2rem,6vw,3.25rem)] font-black leading-[1.05]">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
      </FadeIn>
      <div className="mt-10">{children}</div>
    </section>
  )
}

export default function Why() {
  usePageTitle('Why RootSense · The root cause')

  return (
    <Layout theme="brand">
      <header className="mx-auto max-w-[1200px] px-4 pb-8 pt-16 sm:px-6 sm:pt-24">
        <p className="eyebrow">Why RootSense</p>
        <h1 className="mt-4 font-playfair text-[clamp(3rem,10vw,6.5rem)] font-black leading-[0.95]">The root cause.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          Moisture, salt, pH and heat at the root decide a harvest, and none of them can be seen from above. Most growers water by schedule and by eye.
          That takes real skill, but it can't show what is happening underground.
        </p>
      </header>

      <Block id="why-pressure" eyebrow="The problem" title="Water is scarce. Salt is common.">
        <div className="grid gap-5 md:grid-cols-3">
          {pressureFigures.map((figure) => (
            <FigureCard key={figure.value} figure={figure} />
          ))}
        </div>
      </Block>

      <Block id="why-care" eyebrow="Why it matters to you" title="What you can't see costs you.">
        <ul className="grid gap-5 md:grid-cols-3">
          {[
            { title: 'Water and fuel', body: 'Water given when the soil is already moist is water, pumping and time you pay for twice.' },
            { title: 'Salt that builds up', body: 'Salt collects in the root zone long before the leaves show it. By then the yield has already dropped.' },
            { title: 'Fertiliser washed away', body: 'Too much water carries fertiliser below the roots, where the plant can no longer reach it.' },
          ].map((item) => (
            <li key={item.title} className="card-soft rounded-[24px] border border-line bg-surface p-7">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block
        id="why-research"
        eyebrow="What the research shows"
        title="Watering by the soil uses less water."
        intro="Published field trials have compared watering by soil readings with watering by a timer."
      >
        <div className="max-w-xl">
          <FigureCard figure={researchFigure} />
        </div>
      </Block>

      <Block id="why-us" eyebrow="Why choose us" title="Built for growers who know their land.">
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <li key={reason.title}>
              <h3 className="text-lg font-semibold">{reason.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{reason.body}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="why-growers" eyebrow="Our own testing · 2025–2026" title="Shaped by growers.">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card-soft rounded-[24px] border border-line bg-surface p-7">
            <h3 className="text-lg font-semibold">Tried in the field</h3>
            <p className="mt-2 leading-relaxed text-muted">
              We demonstrated three generations of prototype in greenhouses, open fields and home gardens in Egypt.
            </p>
          </div>
          <div className="card-soft rounded-[24px] border border-line bg-surface p-7">
            <h3 className="text-lg font-semibold">Changed by what growers said</h3>
            <p className="mt-2 leading-relaxed text-muted">
              Growers gave us feedback at every demonstration, and each new version was revised on what they told us.
            </p>
          </div>
        </div>
      </Block>

      <Block id="why-sdgs" eyebrow="Sustainable Development Goals" title="Where we help.">
        <ul className="grid gap-5 md:grid-cols-3">
          {sdgs.map((sdg) => (
            <li key={sdg.num} className="card-soft rounded-[24px] border border-line bg-surface p-7">
              <img src={sdg.img} alt={`SDG ${sdg.num}: ${sdg.name}`} width={88} height={88} loading="lazy" decoding="async" className="h-[88px] w-[88px] rounded-lg" />
              <p className="mt-4 text-sm font-semibold" style={{ color: 'var(--fam-accent)' }}>
                {sdg.target}
              </p>
              <p className="mt-2 leading-relaxed text-muted">{sdg.body}</p>
            </li>
          ))}
        </ul>
        <SourceLine source={sdgSource} />
      </Block>

      <section className="mx-auto max-w-[1200px] px-4 pb-24 pt-8 text-center sm:px-6">
        <h2 className="font-playfair text-[clamp(2.25rem,7vw,4rem)] font-black leading-[1.05]">Ready to know your soil?</h2>
        <Link to="/shop" className="btn-primary mt-8">
          Go to the shop
        </Link>
      </section>
    </Layout>
  )
}
