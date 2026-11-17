import { ProductImage } from '../components/ImageSlot'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { families, formatPrice, products } from '../data/products'
import { usePageTitle } from '../lib/router'

export default function Shop() {
  usePageTitle('Shop — RootSense')

  return (
    <Layout theme="brand">
      <div className="mx-auto max-w-[1280px] px-4 pb-24 pt-14 sm:px-6 sm:pt-20">
        <header className="text-center">
          <h1 className="font-playfair text-[clamp(2.75rem,9vw,5.5rem)] font-black leading-[0.95]">Choose your RootSense.</h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted">Preorders join the waitlist. No payment is taken now.</p>
        </header>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <li key={product.slug} className="flex flex-col items-center rounded-[28px] bg-surface p-6 text-center sm:p-8">
              <ProductImage product={product} />
              <p className="eyebrow mt-6">{families[product.family].name}</p>
              <h2 className="mt-2 font-playfair text-2xl font-black">{product.name}</h2>
              <p className="mt-1 text-lg">{formatPrice(product.price)}</p>
              <Link to={`/shop/${product.slug}`} className="btn-primary mt-6 w-full" aria-label={`Preorder now: ${product.name}`}>
                PREORDER NOW
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
