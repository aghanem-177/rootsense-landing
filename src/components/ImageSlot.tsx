import type { Product } from '../data/products'
import { choiceLabel } from '../data/products'

interface ImageSlotProps {
  label: string
  aspect?: string
  className?: string
}

export default function ImageSlot({ label, aspect = '4 / 5', className = '' }: ImageSlotProps) {
  return (
    <div
      role="img"
      aria-label={`Image coming soon: ${label}`}
      className={`flex w-full items-center justify-center rounded-[28px] border-2 border-dashed text-center ${className}`}
      style={{
        aspectRatio: aspect,
        borderColor: 'color-mix(in srgb, var(--fam-muted) 40%, transparent)',
        background: 'color-mix(in srgb, var(--fam-surface) 55%, transparent)',
      }}
    >
      <div className="px-6">
        <svg className="mx-auto mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--fam-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <p className="text-sm font-medium text-muted">Image coming soon</p>
        <p className="mt-1 text-xs text-muted">{label}</p>
      </div>
    </div>
  )
}

export function ProductImage({ product, colour, aspect = '4 / 5' }: { product: Product; colour?: string; aspect?: string }) {
  const src = colour ? product.images[colour] : Object.values(product.images)[0]
  const colourName = choiceLabel(product, 'colour', colour)
  const label = colourName ? `${product.name} in ${colourName}` : product.name

  if (!src) return <ImageSlot label={label} aspect={aspect} />

  // Solo Sense is photographed at an angle in mid-air, so it gets the light pool but no floor shadow.
  const floating = product.family === 'solo'

  return (
    <div className={`product-stage ${floating ? 'product-stage--floating' : ''}`} style={{ aspectRatio: aspect }}>
      <img src={src} alt={label} width={1120} height={1400} loading="lazy" decoding="async" />
    </div>
  )
}
