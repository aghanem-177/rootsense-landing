// Vercel function: validates a waitlist sign-up and forwards it to the private Google Sheet.
// Needs two environment variables in Vercel: WAITLIST_SHEET_URL and WAITLIST_SECRET.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'bad-request' }, { status: 400 })
  }

  if (clean(body.website, 200)) return Response.json({ ok: true })

  const price = Number(body.price)
  const entry = {
    submittedAt: new Date().toISOString(),
    name: clean(body.name, 100),
    email: clean(body.email, 254).toLowerCase(),
    model: clean(body.model, 60),
    colour: clean(body.colour, 60),
    closing: clean(body.closing, 60),
    addOns: clean(body.addOns, 200) || 'None offered',
    price: Number.isFinite(price) ? price : null,
  }
  // Sign-ups from @example.com addresses are our own tests and are marked so they can be deleted.
  entry.test = entry.email.endsWith('@example.com')

  if (entry.name.length < 2 || !EMAIL_PATTERN.test(entry.email) || !entry.model || entry.price === null) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  const url = process.env.WAITLIST_SHEET_URL
  const secret = process.env.WAITLIST_SECRET
  if (!url || !secret) return Response.json({ ok: false, error: 'not-configured' }, { status: 503 })

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...entry, secret }),
    })
    const result = await res.json().catch(() => null)
    if (!res.ok || !result?.ok) throw new Error('sheet rejected the entry')
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false, error: 'save-failed' }, { status: 502 })
  }
}
