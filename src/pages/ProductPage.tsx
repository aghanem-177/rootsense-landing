import { useState } from 'react'
import { ProductImage } from '../components/ImageSlot'
import Layout from '../components/Layout'
import Link from '../components/Link'
import OptionPicker from '../components/OptionPicker'
import { families, formatPrice, missingChoices, waitlistUrl, type Product, type Selection } from '../data/products'
import { navigate, usePageTitle } from '../lib/router'

export default function ProductPage({ product }: { product: Product }) {
  usePageTitle(`${product.name} — RootSense`)
  const [selection, setSelection] = useState<Selection>({})
  const missing = missingChoices(product, selection)
  const ready = missing.length === 0
  const family = families[product.family]

  return (
    <Layout theme={product.family}>
      <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex gap-2">
            <li>
              <Link to="/shop" className="underline underline-offset-2">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductImage product={product} colour={selection.colour} />
          </div>

          <div>
            <p className="eyebrow">
              {family.name} · {family.line}
            </p>
            <h1 className="mt-3 font-playfair text-[clamp(2.5rem,7vw,4rem)] font-black leading-[1]">{product.name}</h1>
            <p className="mt-3 text-2xl">{formatPrice(product.price)}</p>
            <p className="mt-6 text-lg leading-relaxed text-muted">{product.description}</p>

            {product.choiceGroups.length > 0 && (
              <div className="mt-10 space-y-8">
                {product.choiceGroups.map((group) => (
                  <OptionPicker
                    key={group.id}
                    group={group}
                    value={selection[group.id]}
                    onChange={(choiceId) => setSelection((s) => ({ ...s, [group.id]: choiceId }))}
                  />
                ))}
              </div>
            )}

            <div className="mt-10">
              <button
                type="button"
                className="btn-primary w-full sm:w-auto sm:min-w-[240px]"
                disabled={!ready}
                aria-describedby="preorder-hint"
                onClick={() => navigate(waitlistUrl(product, selection))}
              >
                Preorder
              </button>
              <p id="preorder-hint" className="mt-3 text-sm text-muted" aria-live="polite">
                {ready
                  ? 'No payment now. This reserves your place on the waitlist.'
                  : `Choose ${missing.map((g) => g.legend.toLowerCase()).join(' and ')} to continue.`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-14 md:grid-cols-3">
          <section aria-labelledby="who-title">
            <h2 id="who-title" className="text-lg font-semibold">
              Who it's for
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{product.forWho}</p>
          </section>
          <section aria-labelledby="info-title">
            <h2 id="info-title" className="text-lg font-semibold">
              Key information
            </h2>
            <ul className="mt-3 space-y-2">
              {product.keyInfo.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden="true" style={{ color: 'var(--fam-accent)' }}>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="box-title">
            <h2 id="box-title" className="text-lg font-semibold">
              In the box
            </h2>
            <ul className="mt-3 space-y-2">
              {product.inTheBox.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden="true" style={{ color: 'var(--fam-accent)' }}>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="growers-title" className="mt-14 rounded-[28px] border border-line bg-surface p-8 sm:p-10">
          <p className="eyebrow">Our own testing · 2025–2026</p>
          <h2 id="growers-title" className="mt-3 font-playfair text-2xl font-black sm:text-3xl">
            Tried by growers
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            RootSense was demonstrated in greenhouses, open fields and home gardens across three prototype generations. Growers gave us feedback at
            every demonstration, and each version was revised on what they told us.
          </p>
        </section>
      </div>
    </Layout>
  )
}
