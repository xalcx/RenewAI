"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface EnergyFlowProps {
  className?: string
  color?: string
  speed?: number
  width?: number
  count?: number
}

export function EnergyFlow({
  className = "",
  color = "rgba(16, 185, 129, 0.2)",
  speed = 1,
  width = 2,
  count = 5,
}: EnergyFlowProps) {
  const lines = useRef<{ offset: number; delay: number; duration: number }[]>([])

  // Generate lines only once
  if (lines.current.length === 0) {
    for (let i = 0; i < count; i++) {
      lines.current.push({
        offset: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      })
    }
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {lines.current.map((line, index) => (
        <motion.div
          key={index}
          className="absolute h-full"
          style={{
            left: `${line.offset}%`,
            width: `${width}px`,
            background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
          }}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: line.duration / speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: line.delay,
            times: [0, 0.5, 1],
          }}
        />
      ))}
    </div>
  )
}
