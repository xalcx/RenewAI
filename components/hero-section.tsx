"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" aria-label="Sección principal">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2070')",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10 dark:from-black/90 dark:to-black/70"></div>
      </div>

      {/* Subtle data points and connections */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Data points */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400/70 dark:bg-blue-300/70 rounded-full"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Subtle connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          {[...Array(5)].map((_, i) => {
            const x1 = 15 + Math.random() * 70
            const y1 = 15 + Math.random() * 70
            const x2 = 15 + Math.random() * 70
            const y2 = 15 + Math.random() * 70

            return (
              <motion.line
                key={i}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="0.5"
                strokeDasharray="3,3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.8,
                  times: [0, 0.5, 1],
                }}
              />
            )
          })}
        </svg>
      </div>

      {/* Geospatial grid effect */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 dark:opacity-5"></div>
      </div>

      {/* Content */}
      <div className="container relative z-20 py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
              <span className="block mb-2">GreenOps Intelligence™</span>
              <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                para infraestructura renovable
              </span>
            </h1>

            {/* Animated energy pulse */}
            <motion.div
              className="absolute -right-10 -top-10 w-20 h-20 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <AnimatedSection delay={0.7}>
            <p className="text-xl text-gray-200 max-w-2xl">
              Transformamos activos renovables en sistemas autónomos, predictivos y optimizados mediante inteligencia
              artificial avanzada y análisis geoespacial de precisión.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.9}>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 relative overflow-hidden group shadow-lg shadow-primary/20 font-medium"
                aria-label="Solicitar una demostración"
              >
                <Link href="#contacto">
                  <span className="relative z-10 flex items-center">
                    Solicita una Demo
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 group">
                <Link href="#como-funciona">Cómo Funciona</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-blue-500/20 hover:bg-blue-500/30 text-white border-blue-500/30 relative overflow-hidden group shadow-lg shadow-blue-500/20 transition-all duration-300"
              >
                <Link href="/demo">
                  <span className="relative z-10 flex items-center">
                    Demos Interactivas
                    <motion.span
                      className="ml-2 h-4 w-4"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <ExternalLink aria-hidden="true" />
                    </motion.span>
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Earth globe visualization - more subtle and elegant */}
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 md:w-48 md:h-48 rounded-full hidden md:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="w-full h-full rounded-full bg-blue-900/20 dark:bg-blue-900/10 relative overflow-hidden border border-blue-500/20">
          {/* Continents - more subtle */}
          <motion.div
            className="absolute inset-4 rounded-full bg-green-800/20 dark:bg-green-800/15"
            style={{ clipPath: "polygon(30% 10%, 70% 20%, 90% 40%, 80% 70%, 50% 90%, 20% 80%, 10% 50%, 15% 30%)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Energy points - smaller and more subtle */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/70 rounded-full shadow-sm shadow-yellow-400/30"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Grid lines - more subtle */}
          <div className="absolute inset-0 border border-blue-500/10 rounded-full" />
          <div
            className="absolute inset-0 border border-blue-500/5 rounded-full"
            style={{ transform: "rotate(30deg)" }}
          />
          <div
            className="absolute inset-0 border border-blue-500/5 rounded-full"
            style={{ transform: "rotate(60deg)" }}
          />

          {/* Satellite orbit - more subtle */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-blue-400/20"
            style={{ transform: "rotate(45deg) scale(1.2)" }}
            animate={{ rotate: [45, 405] }}
            transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <motion.div
              className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-gray-200/80 rounded-full shadow-sm shadow-blue-500/20"
              animate={{
                boxShadow: [
                  "0 0 5px 1px rgba(59, 130, 246, 0.2)",
                  "0 0 8px 2px rgba(59, 130, 246, 0.3)",
                  "0 0 5px 1px rgba(59, 130, 246, 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="currentColor"
            fillOpacity="1"
            className="text-background"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
