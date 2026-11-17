import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import Layout from './components/Layout'
import Link from './components/Link'
import { getProduct } from './data/products'
import { useLocation, usePageTitle } from './lib/router'
import Home from './pages/Home'

const Why = lazy(() => import('./pages/Why'))
const Shop = lazy(() => import('./pages/Shop'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const Waitlist = lazy(() => import('./pages/Waitlist'))

function NotFound() {
  usePageTitle('Page not found · RootSense')
  return (
    <Layout theme="brand">
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-playfair text-5xl font-black">Page not found.</h1>
        <p className="mt-4 text-muted">That address doesn't lead anywhere on our site.</p>
        <Link to="/" className="btn-primary mt-8">
          Back to home
        </Link>
      </div>
    </Layout>
  )
}

function Loading() {
  return <div className="min-h-screen" aria-busy="true" />
}

export default function App() {
  const { path, params } = useLocation()

  let page
  if (path === '/') page = <Home />
  else if (path === '/why') page = <Why />
  else if (path === '/shop') page = <Shop />
  else if (path.startsWith('/shop/')) {
    const product = getProduct(path.slice('/shop/'.length))
    page = product ? <ProductPage key={product.slug} product={product} /> : <NotFound />
  } else if (path === '/waitlist') page = <Waitlist key={params.toString()} params={params} />
  else page = <NotFound />

  return (
    <MotionConfig reducedMotion="user">
      <div className="film-grain" aria-hidden="true" />
      <Suspense fallback={<Loading />}>{page}</Suspense>
    </MotionConfig>
  )
}
