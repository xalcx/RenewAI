"use client"

import { Zap, BarChart3, Globe, Satellite, Brain } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { motion } from "framer-motion"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Zap className="h-10 w-10 text-green-500" />,
      title: "Optimización algorítmica de producción",
      description:
        "Incremento de rendimiento del 15-30% mediante algoritmos predictivos que optimizan parámetros operativos en tiempo real.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-blue-500" />,
      title: "Mantenimiento predictivo avanzado",
      description:
        "Reducción de hasta un 45% en fallos críticos mediante detección temprana de anomalías con modelos de machine learning.",
    },
    {
      icon: <Globe className="h-10 w-10 text-green-500" />,
      title: "Análisis geoespacial multivariable",
      description:
        "Identificación de ubicaciones óptimas con precisión de 98.5% mediante análisis de más de 50 variables geoespaciales.",
    },
    {
      icon: <Satellite className="h-10 w-10 text-blue-500" />,
      title: "Monitoreo multiespectral integrado",
      description:
        "Fusión de datos satelitales, drones y sensores IoT para crear gemelos digitales de alta fidelidad de activos renovables.",
    },
    {
      icon: <Brain className="h-10 w-10 text-green-500" />,
      title: "Automatización decisional escalable",
      description:
        "Sistemas autónomos que aprenden y optimizan continuamente, reduciendo costos operativos hasta un 25% y escalando con su infraestructura.",
    },
  ]

  const stats = [
    { value: 98, label: "Precisión", suffix: "%" },
    { value: 30, label: "Ahorro", suffix: "%" },
    { value: 500, label: "Proyectos", suffix: "+" },
  ]

  return (
    <section id="beneficios" className="py-20 bg-background relative overflow-hidden">
      {/* Floating particles background - more subtle */}
      <FloatingParticles
        count={20}
        colors={["#10b981", "#3b82f6", "#6366f1"]}
        className="z-0 opacity-20"
        minSize={1}
        maxSize={3}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ventajas operativas de{" "}
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              GreenOps Intelligence™
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Nuestra plataforma integra lo último en inteligencia artificial con análisis geoespacial de precisión para
            transformar la gestión operativa de infraestructuras renovables a escala global.
          </p>
        </AnimatedSection>

        {/* Aspirational goals section */}
        <div className="max-w-3xl mx-auto mb-16">
          <AnimatedSection className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">Nuestros objetivos aspiracionales</h3>
            <p className="text-muted-foreground">
              Trabajamos constantemente para alcanzar estos ambiciosos estándares en todos nuestros proyectos
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={0.2 + index * 0.1} className="text-center relative">
                {/* Decorative circle */}
                <motion.div
                  className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-full -z-10"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                />

                <div className="text-4xl font-bold mb-2">
                  <AnimatedCounter
                    from={0}
                    to={stat.value}
                    formatter={(value) => `${Math.round(value)}${stat.suffix}`}
                    delay={0.5 + index * 0.2}
                  />
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <AnimatedSection
              key={index}
              className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border relative overflow-hidden group"
              delay={0.2 + index * 0.1}
            >
              {/* Animated gradient background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              <motion.div
                className="mb-4"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {benefit.icon}
              </motion.div>

              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>

              {/* Animated corner accent */}
              <motion.div
                className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-primary/20 to-transparent rounded-tl-xl"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
