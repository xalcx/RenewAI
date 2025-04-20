"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface GeoPoint {
  x: number
  y: number
  size: number
  pulseDelay: number
}

interface GeoMapProps {
  className?: string
  pointCount?: number
  lineCount?: number
  pointColor?: string
  lineColor?: string
  pulseColor?: string
}

export function GeoMap({
  className = "",
  pointCount = 12,
  lineCount = 8,
  pointColor = "rgba(16, 185, 129, 0.7)",
  lineColor = "rgba(59, 130, 246, 0.2)",
  pulseColor = "rgba(16, 185, 129, 0.3)",
}: GeoMapProps) {
  const points = useRef<GeoPoint[]>([])
  const lines = useRef<{ start: number; end: number }[]>([])

  // Generate points only once
  if (points.current.length === 0) {
    for (let i = 0; i < pointCount; i++) {
      points.current.push({
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: 2 + Math.random() * 4,
        pulseDelay: Math.random() * 2,
      })
    }

    // Generate random connections between points
    for (let i = 0; i < lineCount; i++) {
      const start = Math.floor(Math.random() * pointCount)
      let end = Math.floor(Math.random() * pointCount)
      while (end === start) {
        end = Math.floor(Math.random() * pointCount)
      }
      lines.current.push({ start, end })
    }
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Grid background */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {lines.current.map((line, index) => {
          const start = points.current[line.start]
          const end = points.current[line.end]
          return (
            <motion.line
              key={index}
              x1={`${start.x}%`}
              y1={`${start.y}%`}
              x2={`${end.x}%`}
              y2={`${end.y}%`}
              stroke={lineColor}
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.5,
                times: [0, 0.5, 1],
              }}
            />
          )
        })}
      </svg>

      {/* Data points */}
      {points.current.map((point, index) => (
        <div key={index} className="absolute" style={{ left: `${point.x}%`, top: `${point.y}%` }}>
          {/* Pulse effect */}
          <motion.div
            className="absolute rounded-full"
            style={{
              backgroundColor: pulseColor,
              width: `${point.size * 4}px`,
              height: `${point.size * 4}px`,
              marginLeft: `-${point.size * 2}px`,
              marginTop: `-${point.size * 2}px`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: point.pulseDelay,
            }}
          />

          {/* Point */}
          <motion.div
            className="absolute rounded-full"
            style={{
              backgroundColor: pointColor,
              width: `${point.size}px`,
              height: `${point.size}px`,
              marginLeft: `-${point.size / 2}px`,
              marginTop: `-${point.size / 2}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: point.pulseDelay,
            }}
          />
        </div>
      ))}
    </div>
  )
}
