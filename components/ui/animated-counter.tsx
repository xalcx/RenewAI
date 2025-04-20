"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, motion, useSpring, useMotionValue } from "framer-motion"

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  delay?: number
  className?: string
  formatter?: (value: number) => string
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  className = "",
  formatter = (value) => Math.round(value).toString(),
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  const motionValue = useMotionValue(from)
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    delay: delay * 1000,
    bounce: 0,
  })

  const [displayValue, setDisplayValue] = useState(formatter(from))

  useEffect(() => {
    if (inView && !hasAnimated) {
      motionValue.set(to)
      setHasAnimated(true)
    }
  }, [inView, hasAnimated, motionValue, to])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(formatter(latest))
    })

    return unsubscribe
  }, [springValue, formatter])

  return (
    <motion.span
      ref={nodeRef}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {displayValue}
    </motion.span>
  )
}
