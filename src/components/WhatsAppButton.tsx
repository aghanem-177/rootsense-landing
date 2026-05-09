export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
      style={{
        bottom: 28,
        right: 28,
        zIndex: 999,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#25D366',
        boxShadow: '0 8px 30px rgba(37,211,102,0.3)',
        animation: 'pulseRing 2s ease-out infinite',
        fontSize: '1.5rem',
        color: '#FFFFFF',
        textDecoration: 'none',
      }}
      aria-label="Contact via WhatsApp"
    >
      💬
    </a>
  )
}
