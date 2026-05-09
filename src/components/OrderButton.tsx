export default function OrderButton() {
  return (
    <a
      href="#product"
      className="fixed flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
      style={{
        bottom: 28,
        right: 28,
        zIndex: 999,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'var(--green-mid)',
        boxShadow: '0 8px 30px rgba(45,90,45,0.3)',
        animation: 'pulseRing 2s ease-out infinite',
        color: '#FFFFFF',
        textDecoration: 'none',
      }}
      aria-label="Order RootSense"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    </a>
  )
}
