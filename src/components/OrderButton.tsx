export default function OrderButton() {
  return (
    <a
      href="mailto:teamrootsense@gmail.com"
      className="fixed flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
      style={{
        bottom: 'max(28px, env(safe-area-inset-bottom, 28px))',
        right: 20,
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
      aria-label="Contact RootSense"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4l-10 8L2 4" />
      </svg>
    </a>
  )
}
