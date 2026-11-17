import type { CSSProperties, ReactNode } from 'react'
import FadeIn from '../components/FadeIn'
import GroundOpening from '../components/GroundOpening'
import { ProductImage } from '../components/ImageSlot'
import Layout from '../components/Layout'
import Link from '../components/Link'
import ExplodedView from '../components/ProductExplodeSection'
import { flowPlusBreakdown, soloBreakdown } from '../data/breakdowns'
import { families, formatPrice, getProduct, lowestPrice, type FamilyId, type ThemeId } from '../data/products'
import { usePageTitle } from '../lib/router'

const solo = getProduct('solo-sense')!
const flow = getProduct('flow-sense')!
const flowPlus = getProduct('flow-sense-plus')!
const terra = getProduct('terra-sense')!

function Blend({ from, to }: { from: ThemeId; to: ThemeId }) {
  const style = { '--blend-from': `var(--bg-${from})`, '--blend-to': `var(--bg-${to})` } as CSSProperties
  return <div className="blend" style={style} aria-hidden="true" />
}

function Screen({ children, className = '', id, labelledBy }: { children: ReactNode; className?: string; id?: string; labelledBy?: string }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`mx-auto flex min-h-[80svh] max-w-[1200px] flex-col justify-center px-4 py-20 sm:px-6 sm:py-28 ${className}`}
    >
      {children}
    </section>
  )
}

function SectionHeading({ id, eyebrow, title, intro }: { id: string; eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h3 id={id} className="mt-3 font-playfair text-[clamp(2rem,6vw,3.5rem)] font-black leading-[1.05]">
        {title}
      </h3>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  )
}

function FamilyIntro({
  family,
  eyebrow,
  body,
  children,
  image,
}: {
  family: FamilyId
  eyebrow: string
  body: string
  children: ReactNode
  image?: ReactNode
}) {
  const fam = families[family]
  return (
    <Screen labelledBy={`${family}-title`} className="items-center text-center">
      <FadeIn>
        <p className="eyebrow">{eyebrow}</p>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 id={`${family}-title`} className="mt-4 font-playfair text-[clamp(4.5rem,18vw,11rem)] font-black leading-[0.9]">
          {fam.name}.
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mt-3 font-playfair text-[clamp(1.5rem,4.5vw,2.5rem)] italic">{fam.line}</p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">{body}</p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="mt-9 flex flex-wrap justify-center gap-3">{children}</div>
      </FadeIn>
      {image && (
        <FadeIn delay={0.25} className="mx-auto mt-14 w-full max-w-[340px]">
          {image}
        </FadeIn>
      )}
    </Screen>
  )
}

function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="rounded-[24px] border border-line bg-surface p-7">
          <span className="font-playfair text-4xl font-black" style={{ color: 'var(--fam-accent)' }} aria-hidden="true">
            {i + 1}
          </span>
          <h4 className="mt-3 text-lg font-semibold">{step.title}</h4>
          <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  )
}

function Check({ yes }: { yes: boolean }) {
  return yes ? (
    <span className="inline-flex items-center gap-1.5">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--fam-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span className="sr-only">Yes</span>
    </span>
  ) : (
    <span className="text-muted">
      <span aria-hidden="true">—</span>
      <span className="sr-only">No</span>
    </span>
  )
}

const flowComparison: { label: string; flow: ReactNode; plus: ReactNode }[] = [
  { label: 'Link to the valve', flow: 'Cable', plus: 'Bluetooth, no cable' },
  { label: 'Handles more servos', flow: <Check yes={false} />, plus: <Check yes /> },
  { label: 'Waters by the soil readings', flow: <Check yes />, plus: <Check yes /> },
  { label: 'Works with the RootSense app', flow: <Check yes />, plus: <Check yes /> },
  { label: 'Price', flow: formatPrice(flow.price), plus: formatPrice(flowPlus.price) },
]

export default function Home() {
  usePageTitle('RootSense — Know Your Soil')

  return (
    <Layout theme="terra">
      {/* Opening */}
      <div data-family="brand" className="theme-band">
        <GroundOpening />

        {/* The three families */}
        <Screen id="families" labelledBy="families-title">
          <SectionHeading id="families-title" eyebrow="The range" title="Three families. One way of working." intro="Read the soil at the root, then water by what it says. Pick the size that fits your ground." />
          <ul className="grid gap-5 md:grid-cols-3">
            {(['solo', 'flow', 'terra'] as const).map((id, i) => (
              <li key={id}>
                <FadeIn delay={i * 0.08} className="h-full">
                  <a
                    href={`#${id}`}
                    data-family={id}
                    className="flex h-full flex-col rounded-[28px] p-8 transition-transform hover:-translate-y-1"
                    style={{ background: 'var(--fam-bg)', color: 'var(--fam-ink)', border: '1px solid var(--fam-line)' }}
                  >
                    <span className="font-playfair text-5xl font-black">{families[id].name}</span>
                    <span className="mt-2 font-playfair text-xl italic">{families[id].line}</span>
                    <span className="mt-5 text-muted">{families[id].forWho}</span>
                    <span className="mt-auto pt-8 text-sm font-semibold" style={{ color: 'var(--fam-accent)' }}>
                      From {formatPrice(lowestPrice(id))} →
                    </span>
                  </a>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Screen>
      </div>

      {/* Solo */}
      <Blend from="brand" to="solo" />
      <div id="solo" data-family="solo" className="theme-band">
        <FamilyIntro family="solo" eyebrow={`Solo Sense · ${formatPrice(solo.price)}`} body={solo.summary + ' No phone, no internet, no wiring.'}>
          <Link to={`/shop/${solo.slug}`} className="btn-primary">
            Preorder Solo Sense
          </Link>
          <a href="#solo-inside" className="btn-secondary">
            See inside
          </a>
        </FamilyIntro>

        <Screen labelledBy="solo-cone">
          <SectionHeading id="solo-cone" eyebrow="How it waters" title="Water that knows when to stop." />
          <Steps
            steps={[
              { title: 'Dry soil pulls', body: 'As the soil dries, it draws water out through the wall of the clay cone.' },
              { title: 'Wet soil lets go', body: 'As the soil gets wetter, the pull gets weaker and the flow slows down.' },
              { title: 'Nothing to switch', body: 'The cone does this by itself. No moving parts and no power needed to water.' },
            ]}
          />
        </Screen>

        <Screen id="solo-inside" labelledBy="solo-parts">
          <SectionHeading id="solo-parts" eyebrow="Inside Solo Sense" title="Every part has a job." intro="Tap a part to see what it does." />
          <ExplodedView breakdown={soloBreakdown} />
        </Screen>
      </div>

      {/* Flow */}
      <Blend from="solo" to="flow" />
      <div id="flow" data-family="flow" className="theme-band">
        <FamilyIntro
          family="flow"
          eyebrow={`Flow Sense · from ${formatPrice(flow.price)}`}
          body="Flow reads the soil at the root and opens the water only when the roots need it. Control stays on the unit, so watering carries on if your phone is off."
        >
          <Link to={`/shop/${flow.slug}`} className="btn-primary">
            Preorder Flow Sense
          </Link>
          <Link to={`/shop/${flowPlus.slug}`} className="btn-secondary">
            Preorder Flow Sense +
          </Link>
        </FamilyIntro>

        <Screen labelledBy="flow-compare">
          <SectionHeading id="flow-compare" eyebrow="Two models" title="Cable or wireless." intro="Both water by the soil readings and both work with the app. Flow Sense + drops the cable and handles more servos." />
          <div className="grid gap-6 sm:grid-cols-2">
            {[flow, flowPlus].map((p) => (
              <div key={p.slug} className="flex flex-col rounded-[28px] border border-line bg-surface p-6 sm:p-8">
                <ProductImage product={p} aspect="1 / 1" />
                <h4 className="mt-6 font-playfair text-3xl font-black">{p.name}</h4>
                <p className="mt-1 text-lg">{formatPrice(p.price)}</p>
                <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
                <Link to={`/shop/${p.slug}`} className="btn-primary mt-6 self-start">
                  Preorder
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 overflow-x-auto rounded-[24px] border border-line bg-surface">
            <table className="w-full min-w-[480px] text-left">
              <caption className="px-6 pt-6 text-left text-lg font-semibold">What Flow Sense + adds</caption>
              <thead>
                <tr className="text-sm text-muted">
                  <th scope="col" className="px-6 py-4 font-medium">
                    <span className="sr-only">Feature</span>
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium">
                    Flow Sense
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium">
                    Flow Sense +
                  </th>
                </tr>
              </thead>
              <tbody>
                {flowComparison.map((row) => (
                  <tr key={row.label} className="border-t border-line">
                    <th scope="row" className="px-6 py-4 font-medium">
                      {row.label}
                    </th>
                    <td className="px-6 py-4">{row.flow}</td>
                    <td className="px-6 py-4 font-semibold">{row.plus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Screen>

        <Screen labelledBy="flow-parts">
          <SectionHeading id="flow-parts" eyebrow="Inside Flow Sense +" title="Read, decide, water." intro="Tap a part to see what it does." />
          <ExplodedView breakdown={flowPlusBreakdown} />
        </Screen>
      </div>

      {/* Terra */}
      <Blend from="flow" to="terra" />
      <div id="terra" data-family="terra" className="theme-band">
        <FamilyIntro
          family="terra"
          eyebrow={`Terra Sense · ${formatPrice(terra.price)} · For agribusiness`}
          body={terra.summary + ' Built for commercial farms.'}
          image={<ProductImage product={terra} />}
        >
          <Link to={`/shop/${terra.slug}`} className="btn-primary">
            Preorder Terra Sense
          </Link>
        </FamilyIntro>

        <Screen labelledBy="terra-how">
          <SectionHeading id="terra-how" eyebrow="How it covers a farm" title="Zone by zone." intro="You keep your drip or pivot system. Terra decides when each zone gets water." />
          <Steps
            steps={[
              { title: 'Receptors read each zone', body: 'Solar-powered field receptors read moisture and temperature at root depth and report to the hub by radio.' },
              { title: 'The hub adds the rest', body: 'The hub adds pH, salinity, air and light readings, so you see the whole picture in one place.' },
              { title: 'Your valves follow the soil', body: 'The hub switches the valves and pump starters you already own. Add receptors to cover more ground.' },
            ]}
          />
          <p className="mt-8 text-center text-muted">Installation and a follow-up visit are included.</p>
        </Screen>
      </div>

      {/* Closing */}
      <div data-family="terra" className="theme-band">
        <Screen labelledBy="closing-title" className="items-center text-center">
          <p className="eyebrow">Shaped by growers</p>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Three generations of RootSense were tried in greenhouses, open fields and home gardens. Each one changed after growers told us what worked.
          </p>
          <h2 id="closing-title" className="mt-12 font-playfair text-[clamp(2.5rem,8vw,5rem)] font-black leading-[1]">
            Find the one that fits your ground.
          </h2>
          <Link to="/shop" className="btn-primary mt-10">
            Go to the shop
          </Link>
        </Screen>
      </div>
    </Layout>
  )
}
