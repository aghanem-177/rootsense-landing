import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
  /** If true, animates immediately on mount instead of waiting for scroll into view */
  immediate?: boolean
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  immediate = false,
}: FadeInProps) {
  const transition = { duration, delay, ease: [0.25, 0.1, 0.25, 1] as const }

  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, x, y }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={transition}
        className={className}
        style={{ willChange: 'transform' }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={transition}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
}
