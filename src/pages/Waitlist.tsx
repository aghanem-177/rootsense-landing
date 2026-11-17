import { useRef, useState, type FormEvent } from 'react'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { PreorderButton } from '../components/Preorder'
import { choiceLabel, formatPrice, getProduct, missingChoices, readSelection, type Product, type Selection } from '../data/products'
import { usePageTitle } from '../lib/router'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const CONTACT_EMAIL = 'teamrootsense@gmail.com'

type Errors = Partial<Record<'name' | 'email', string>>

function validate(name: string, email: string): Errors {
  const errors: Errors = {}
  if (name.trim().length < 2) errors.name = 'Please enter your name.'
  else if (name.trim().length > 100) errors.name = 'Please use 100 characters or fewer.'
  if (!email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email.trim()) || email.trim().length > 254) errors.email = 'Please enter a valid email address, like name@example.com.'
  return errors
}

function Summary({ product, selection }: { product: Product; selection: Selection }) {
  const rows = [
    { label: 'Model', value: product.name },
    ...product.choiceGroups.map((g) => ({ label: g.legend, value: choiceLabel(product, g.id, selection[g.id]) ?? '' })),
    { label: 'Price', value: formatPrice(product.price) },
  ]
  return (
    <dl className="divide-y divide-[var(--fam-line)] rounded-[24px] border border-line bg-surface">
      {rows.map((row) => (
        <div key={row.label} className="flex justify-between gap-4 px-6 py-4">
          <dt className="text-muted">{row.label}</dt>
          <dd className="text-right font-semibold">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function WaitlistForm({ product, selection }: { product: Product; selection: Selection }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'failed'>('idle')
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  // State updates land after a re-render, so a ref is what stops a fast double-click sending twice.
  const savingRef = useRef(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (savingRef.current) return

    const found = validate(name, email)
    setErrors(found)
    if (found.name) return nameRef.current?.focus()
    if (found.email) return emailRef.current?.focus()

    savingRef.current = true
    setStatus('saving')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          website,
          model: product.name,
          colour: choiceLabel(product, 'colour', selection.colour) ?? '',
          closing: choiceLabel(product, 'closing', selection.closing) ?? '',
          price: product.price,
        }),
      })
      const data = await res.json().catch(() => null)
      setStatus(res.ok && data?.ok ? 'done' : 'failed')
    } catch {
      setStatus('failed')
    } finally {
      savingRef.current = false
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="rounded-[28px] border border-line bg-surface p-8 text-center sm:p-12">
        <p className="eyebrow">Place reserved</p>
        <h1 className="mt-3 font-playfair text-[clamp(2rem,6vw,3rem)] font-black">You're on the list.</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          Thank you, {name.trim().split(' ')[0]}. We'll email {email.trim()} when {product.name} is ready to order. No payment has been taken.
        </p>
        <div className="mx-auto mt-8 max-w-md text-left">
          <Summary product={product} selection={selection} />
        </div>
        <Link to="/" className="btn-secondary mt-8">
          Back to home
        </Link>
      </div>
    )
  }

  const fieldClass = (hasError: boolean) =>
    `mt-2 block w-full rounded-2xl border bg-surface px-4 py-3.5 text-base ${hasError ? 'border-[var(--fam-error)]' : 'border-line'}`

  return (
    <>
    <p className="eyebrow">Preorder</p>
    <h1 className="mt-3 font-playfair text-[clamp(2.25rem,7vw,3.5rem)] font-black leading-[1.05]">Join the waitlist.</h1>
    <div className="mt-8">
      <Summary product={product} selection={selection} />
      <Link to={`/shop/${product.slug}`} className="mt-3 inline-block py-2 text-sm underline underline-offset-2">
        Change my choices
      </Link>
    </div>
    <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label htmlFor="wl-name" className="font-semibold">
          Name
        </label>
        <input
          ref={nameRef}
          id="wl-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'wl-name-error' : undefined}
          className={fieldClass(Boolean(errors.name))}
        />
        {errors.name && (
          <p id="wl-name-error" className="mt-2 text-sm font-medium text-[var(--fam-error)]">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="wl-email" className="font-semibold">
          Email
        </label>
        <input
          ref={emailRef}
          id="wl-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'wl-email-error' : undefined}
          className={fieldClass(Boolean(errors.email))}
        />
        {errors.email && (
          <p id="wl-email-error" className="mt-2 text-sm font-medium text-[var(--fam-error)]">
            {errors.email}
          </p>
        )}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="wl-website">Leave this empty</label>
        <input id="wl-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {status === 'failed' && (
        <p role="alert" className="rounded-2xl border border-[var(--fam-error)] px-4 py-3 text-sm font-medium text-[var(--fam-error)]">
          We couldn't save your place just now. Your details are still here, so please try again in a moment.
        </p>
      )}

      <PreorderButton type="submit" className="w-full" aria-busy={status === 'saving'} aria-disabled={status === 'saving'}>
        {status === 'saving' ? 'Saving…' : 'Reserve my spot'}
      </PreorderButton>

      <p className="text-sm leading-relaxed text-muted">
        This reserves a place on the waitlist. No payment is taken. We collect your name, your email and the model you chose only to contact you
        about this preorder. To be removed, email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </form>
    </>
  )
}

export default function Waitlist({ params }: { params: URLSearchParams }) {
  usePageTitle('Join the waitlist — RootSense')
  const product = getProduct(params.get('model') ?? '')
  const selection = product ? readSelection(product, params) : {}
  const valid = product !== undefined && missingChoices(product, selection).length === 0

  return (
    <Layout theme={product?.family ?? 'brand'}>
      <div className="mx-auto max-w-[640px] px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
        {valid ? (
          <WaitlistForm product={product} selection={selection} />
        ) : (
          <div className="text-center">
            <h1 className="font-playfair text-[clamp(2rem,6vw,3rem)] font-black">Choose your model first.</h1>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
              To join the waitlist, pick a model and its options on the product page, then press Preorder.
            </p>
            <Link to={product ? `/shop/${product.slug}` : '/shop'} className="btn-primary mt-8">
              {product ? `Back to ${product.name}` : 'Go to the shop'}
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}
