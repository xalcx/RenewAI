"use client"

import Image from "next/image"
import { Sun, Wind, Satellite, Battery } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { GeoMap } from "@/components/ui/geo-map"
import { motion } from "framer-motion"

export default function UseCases() {
  const cases = [
    {
      icon: <Sun className="h-8 w-8 text-yellow-500" />,
      title: "Optimización fotovoltaica",
      description:
        "Incremento del 18% en producción mediante seguimiento solar algorítmico y detección temprana de degradación con visión computacional.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1744",
    },
    {
      icon: <Wind className="h-8 w-8 text-blue-500" />,
      title: "Gestión eólica avanzada",
      description:
        "Reducción del 32% en costos de mantenimiento mediante análisis vibracional predictivo y optimización aerodinámica en tiempo real.",
      image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1744",
    },
    {
      icon: <Satellite className="h-8 w-8 text-gray-500" />,
      title: "Monitoreo multisatelital",
      description:
        "Fusión de datos de 7 constelaciones satelitales para detección submétrica de anomalías y planificación predictiva de mantenimiento.",
      image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1744",
    },
    {
      icon: <Battery className="h-8 w-8 text-green-500" />,
      title: "Gestión inteligente de almacenamiento",
      description:
        "Algoritmos de carga/descarga que extienden vida útil de baterías un 24% mientras optimizan arbitraje energético en mercados dinámicos.",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1744",
    },
  ]

  return (
    <section id="casos-uso" className="py-20 bg-background relative">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Implementaciones sectoriales</h2>
          <p className="text-lg text-muted-foreground">
            Descubre cómo GreenOps Intelligence™ está transformando operaciones críticas en diversos sectores de la
            infraestructura energética renovable global.
          </p>
        </AnimatedSection>

        {/* Interactive geospatial map */}
        <div className="mb-16 h-64 md:h-80 rounded-xl overflow-hidden border shadow-sm">
          <GeoMap />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {cases.map((useCase, index) => (
            <AnimatedSection
              key={index}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border"
              delay={0.2 + index * 0.15}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <motion.div
                className="relative h-48 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={useCase.image || "/placeholder.svg"}
                  alt={useCase.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                  priority={index < 2} // Cargar con prioridad las primeras imágenes
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    // Fallback a una imagen de placeholder si hay error
                    e.currentTarget.src = "https://placehold.co/400x300/e2e8f0/64748b?text=Imagen+no+disponible"
                  }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

                {/* Animated energy dots */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.3 }}>
                    {useCase.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold">{useCase.title}</h3>
                </div>
                <p className="text-muted-foreground">{useCase.description}</p>

                {/* Animated indicator */}
                <motion.div
                  className="w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent mt-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
