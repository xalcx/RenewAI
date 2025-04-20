"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/ui/animated-section"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { Wind, Sun, Zap, Database, BarChart3, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DemoHeader() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-background relative overflow-hidden">
      {/* Botón para volver al inicio - Más visible */}
      <div className="container relative z-20">
        <Link href="/" passHref>
          <Button
            variant="outline"
            className="absolute top-0 left-4 flex items-center gap-2 bg-background/20 backdrop-blur-sm hover:bg-background/40 text-white border-white/20"
          >
            <Home className="h-4 w-4" />
            <span>Volver al inicio</span>
          </Button>
        </Link>
      </div>

      {/* Resto del contenido igual */}
      {/* Partículas flotantes */}
      <FloatingParticles
        count={30}
        colors={["#10b981", "#3b82f6", "#6366f1", "#8b5cf6"]}
        className="z-0 opacity-20"
        minSize={1}
        maxSize={4}
      />

      {/* Elementos decorativos */}
      <div className="absolute inset-0 z-0">
        {/* Círculos decorativos */}
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-green-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Líneas de conexión */}
        <svg className="absolute inset-0 w-full h-full">
          {[...Array(6)].map((_, i) => {
            const x1 = 20 + Math.random() * 60
            const y1 = 20 + Math.random() * 60
            const x2 = 20 + Math.random() * 60
            const y2 = 20 + Math.random() * 60

            return (
              <motion.line
                key={i}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="1"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 5,
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

      <div className="container relative z-10 mt-12">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <motion.div
            className="inline-block mb-6 p-2 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-background/30 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium text-white">
              Experimenta con nuestra tecnología
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="block text-white mb-2">Demos Interactivas</span>
            <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
              Optimización Energética con IA
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Experimenta con nuestras simulaciones interactivas impulsadas por GreenOps Intelligence™ y descubre cómo
            nuestra tecnología propietaria está transformando la gestión operativa de infraestructuras renovables a
            escala global.
          </motion.p>

          {/* Iconos animados */}
          <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {[
              { icon: <Wind className="h-6 w-6" />, color: "bg-green-500/20 text-green-400" },
              { icon: <Sun className="h-6 w-6" />, color: "bg-yellow-500/20 text-yellow-400" },
              { icon: <Zap className="h-6 w-6" />, color: "bg-blue-500/20 text-blue-400" },
              { icon: <Database className="h-6 w-6" />, color: "bg-purple-500/20 text-purple-400" },
              { icon: <BarChart3 className="h-6 w-6" />, color: "bg-red-500/20 text-red-400" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-full ${item.color} shadow-lg`}
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {item.icon}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 text-sm text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {[
              {
                label: "Predicción Energética Avanzada",
                color: "bg-green-500/20 border-green-500/30 shadow-green-500/10",
              },
              {
                label: "Mantenimiento Predictivo con IA",
                color: "bg-blue-500/20 border-blue-500/30 shadow-blue-500/10",
              },
              {
                label: "Optimización Algorítmica de Despacho",
                color: "bg-yellow-500/20 border-yellow-500/30 shadow-yellow-500/10",
              },
              {
                label: "Monitoreo Multivariable en Tiempo Real",
                color: "bg-purple-500/20 border-purple-500/30 shadow-purple-500/10",
              },
              {
                label: "Detección Automática de Anomalías",
                color: "bg-red-500/20 border-red-500/30 shadow-red-500/10",
              },
            ].map((item, index) => (
              <motion.span
                key={index}
                className={`px-3 py-1.5 ${item.color} rounded-full border shadow-sm`}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.label}
              </motion.span>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Wave divider mejorado */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="currentColor"
            fillOpacity="1"
            className="text-background"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
