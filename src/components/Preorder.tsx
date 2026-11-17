import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import Link from './Link'

// The terracotta preorder style is reserved for preorder actions only.
function Chip() {
  return (
    <span className="btn-preorder-chip" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  )
}

type PreorderLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; children: ReactNode }

export function PreorderLink({ to, children, className = '', ...rest }: PreorderLinkProps) {
  return (
    <Link to={to} className={`btn-preorder ${className}`} {...rest}>
      <span>{children}</span>
      <Chip />
    </Link>
  )
}

export function PreorderButton({ children, className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`btn-preorder ${className}`} {...rest}>
      <span>{children}</span>
      <Chip />
    </button>
  )
}
