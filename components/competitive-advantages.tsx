"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Brain, Users, Leaf, Globe, Shield, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function CompetitiveAdvantages() {
  const advantages = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "Arquitectura IA Federada",
      description:
        "Modelos de aprendizaje federado que preservan la privacidad de datos mientras aprovechan insights colectivos de múltiples instalaciones globales.",
    },
    {
      icon: <Leaf className="h-10 w-10 text-green-500" />,
      title: "Modelos Específicos por Tecnología",
      description:
        "Algoritmos especializados por tipo de activo renovable, con precisión un 37% superior a soluciones generalistas del mercado.",
    },
    {
      icon: <Globe className="h-10 w-10 text-blue-500" />,
      title: "Fusión Geoespacial Multifuente",
      description:
        "Integración de 17 fuentes satelitales, datos meteorológicos de alta resolución y modelos topográficos 3D para análisis predictivo sin precedentes.",
    },
    {
      icon: <Users className="h-10 w-10 text-purple-500" />,
      title: "Equipo Interdisciplinario",
      description:
        "Colaboración entre físicos atmosféricos, ingenieros de ML, expertos en energía y científicos de datos para soluciones holísticas y fundamentadas.",
    },
    {
      icon: <Shield className="h-10 w-10 text-amber-500" />,
      title: "Seguridad Multinivel",
      description:
        "Infraestructura Zero-Trust con encriptación de extremo a extremo y cumplimiento con estándares IEC 62443 para sistemas energéticos críticos.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-indigo-500" />,
      title: "Innovación Continua",
      description:
        "Ciclo de actualización trimestral de modelos con mejoras incrementales validadas en entornos de producción de más de 500 MW instalados.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Fondo con patrón de grid */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Diferenciación tecnológica de{" "}
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">RenewAI</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Nuestra arquitectura de GreenOps Intelligence™ establece un nuevo paradigma en la gestión de energías
            renovables, con capacidades técnicas exclusivas que nos posicionan como líderes del sector.
          </p>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <AnimatedSection key={index} delay={0.1 * index} className="h-full">
              <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors duration-300 shadow-sm hover:shadow-md bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 h-full flex flex-col">
                  <motion.div
                    className="mb-4 p-3 rounded-full w-fit bg-primary/10"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {advantage.icon}
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground flex-grow">{advantage.description}</p>

                  <motion.div
                    className="w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mt-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16 text-center">
          <motion.div
            className="inline-block bg-card p-6 rounded-xl border shadow-md max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-3">Nuestro Compromiso Tecnológico</h3>
            <p className="text-muted-foreground">
              En RenewAI, fusionamos la vanguardia en inteligencia artificial con un profundo conocimiento del sector
              energético renovable. Nuestra plataforma GreenOps Intelligence™ no solo optimiza la eficiencia operativa
              actual, sino que evoluciona continuamente para anticipar los desafíos del mañana, escalando desde
              instalaciones individuales hasta portfolios energéticos globales.
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
