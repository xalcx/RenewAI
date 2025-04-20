"use client"

import { Database, LineChart, Lightbulb } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { EnergyFlow } from "@/components/ui/energy-flow"
import { motion } from "framer-motion"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Database className="h-12 w-12 text-white" />,
      title: "Ingesta y normalización de datos",
      description:
        "Procesamiento de terabytes de datos heterogéneos mediante pipelines escalables que integran fuentes satelitales, IoT y sistemas SCADA.",
      color: "from-green-500 to-green-700 dark:from-green-600 dark:to-green-800",
    },
    {
      icon: <LineChart className="h-12 w-12 text-white" />,
      title: "Procesamiento cognitivo",
      description:
        "Aplicación de modelos de deep learning y análisis multivariable para detectar patrones, predecir comportamientos y generar recomendaciones operativas.",
      color: "from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800",
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-white" />,
      title: "Optimización adaptativa",
      description:
        "Implementación de ajustes paramétricos en tiempo real y planificación predictiva que maximiza el rendimiento y minimiza costos operativos.",
      color: "from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600",
    },
  ]

  return (
    <section id="como-funciona" className="py-20 bg-muted/50 relative overflow-hidden">
      {/* Energy flow animation */}
      <EnergyFlow className="z-0" color="rgba(16, 185, 129, 0.15)" count={8} width={3} />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Arquitectura operativa de{" "}
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              GreenOps Intelligence™
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Nuestra plataforma implementa un ciclo continuo de tres fases que transforma datos complejos en sistemas
            energéticos autónomos y optimizados a escala global.
          </p>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <AnimatedSection key={index} className="flex flex-col items-center text-center" delay={0.3 + index * 0.2}>
              <motion.div
                className={`flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r ${step.color} mb-6 relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    repeatDelay: 1,
                  }}
                />

                {/* Icon with subtle animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {step.icon}
                </motion.div>
              </motion.div>

              <div className="relative">
                <h3 className="text-xl font-semibold mb-2">
                  Paso {index + 1}: {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>

                {/* Connector line between steps (except last) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border"
                    initial={{ width: 0 }}
                    whileInView={{ width: 32 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                )}

                {/* Animated data flow along connector (except last) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-primary"
                    animate={{
                      x: [0, 32],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      repeatDelay: 0.5,
                      times: [0, 0.5, 1],
                    }}
                  />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Animated process diagram */}
        <motion.div
          className="mt-16 p-8 bg-card rounded-xl border shadow-sm max-w-3xl mx-auto relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-between items-center relative">
            {/* Process steps */}
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center z-10">
                <motion.div
                  className={`flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r ${step.color} mb-2`}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-6 w-6 text-white">{step.icon}</div>
                </motion.div>
                <p className="text-sm font-medium">{step.title}</p>
              </div>
            ))}

            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-border -z-0" />

            {/* Animated data flow */}
            <motion.div
              className="absolute top-6 left-0 h-0.5 bg-primary"
              style={{ width: "0%" }}
              animate={{
                width: ["0%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Nuestro proceso integrado garantiza resultados óptimos en cada proyecto de energía renovable
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
