"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  speed: number
  opacity: number
}

interface FloatingParticlesProps {
  count?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  minSpeed?: number
  maxSpeed?: number
  className?: string
}

export function FloatingParticles({
  count = 20,
  colors = ["#10b981", "#3b82f6", "#6366f1"],
  minSize = 2,
  maxSize = 6,
  minSpeed = 0.5,
  maxSpeed = 1.5,
  className = "",
}: FloatingParticlesProps) {
  const particles = useRef<Particle[]>([])

  // Generate particles only once
  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      particles.current.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: minSize + Math.random() * (maxSize - minSize),
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
        opacity: 0.1 + Math.random() * 0.3, // Reduced opacity for subtlety
      })
    }
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.current.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            y: [`${particle.y}%`, `${(particle.y + 15) % 100}%`, `${particle.y}%`], // Reduced movement
            x: [`${particle.x}%`, `${(particle.x + (Math.random() > 0.5 ? 8 : -8)) % 100}%`, `${particle.x}%`], // Reduced movement
          }}
          transition={{
            duration: 10 / particle.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}
