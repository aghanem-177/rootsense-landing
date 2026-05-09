import { useRef, Fragment } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.25'],
  })

  const totalChars = text.length
  const words = text.split(' ')

  return (
    <p
      ref={ref}
      className={`relative ${className}`}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        textAlign: 'center',
        maxWidth: 620,
        margin: '0 auto',
        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
        lineHeight: 1.8,
        color: 'var(--text-primary)',
      }}
    >
      {words.map((word, wi) => {
        // Calculate the global char index offset for this word
        const charOffset = words.slice(0, wi).reduce((sum, w) => sum + w.length + 1, 0)
        return (
          <Fragment key={wi}>
            <span style={{ whiteSpace: 'nowrap' }}>
              {word.split('').map((char, ci) => (
                <AnimatedChar
                  key={ci}
                  char={char}
                  index={charOffset + ci}
                  total={totalChars}
                  progress={scrollYProgress}
                />
              ))}
            </span>
            {wi < words.length - 1 && ' '}
          </Fragment>
        )
      })}
    </p>
  )
}

function AnimatedChar({
  char,
  index,
  total,
  progress,
}: {
  char: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(progress, [start, end], [0.12, 1])

  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span style={{ visibility: 'hidden' }}>{char}</span>
      <motion.span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          opacity,
        }}
      >
        {char}
      </motion.span>
    </span>
  )
}
