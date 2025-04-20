"use client"

import type React from "react"
import Image from "next/image"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, CheckCircle, Loader2 } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar el formulario a GetForm.io
      if (formRef.current) {
        formRef.current.submit()

        // Mostrar mensaje de éxito
        setIsSubmitted(true)
        setFormState({
          name: "",
          email: "",
          message: "",
        })

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles count={15} colors={["#10b981", "#3b82f6"]} className="z-0 opacity-20" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Implemente GreenOps Intelligence™ en su infraestructura
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Solicite una demostración personalizada y descubra cómo nuestra plataforma puede transformar sus activos
              renovables en sistemas autónomos y optimizados, con ROI cuantificable desde el primer trimestre.
            </p>

            <div className="space-y-4 mb-8">
              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900">
                  <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span>renewai.ar@gmail.com</span>
              </motion.div>
              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900">
                  <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span>Buenos Aires, Argentina</span>
              </motion.div>
            </div>

            {/* Animated satellite image */}
            <motion.div
              className="relative h-48 mt-8 rounded-lg overflow-hidden border shadow-sm hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1744"
                alt="Satellite view"
                fill
                className="object-cover"
              />

              {/* Scanning effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
                style={{ top: "-100%" }}
                animate={{ top: ["100%", "-100%"] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />

              {/* Data points */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full border-2 border-primary"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>
          </AnimatedSection>

          <AnimatedSection
            direction="right"
            className="bg-card p-8 rounded-xl shadow-lg border relative overflow-hidden"
          >
            {/* Background grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

            <h3 className="text-xl font-semibold mb-6 relative">Solicita una Demo</h3>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 text-green-700 dark:text-green-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                        delay: 0.2,
                      }}
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-xl mb-2">¡Mensaje enviado con éxito!</p>
                      <p className="text-sm">Nos pondremos en contacto contigo a la mayor brevedad.</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  ref={formRef}
                  action="https://getform.io/f/bwnqrzpa"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-4 relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* GetForm.io honeypot field */}
                  <input type="hidden" name="_gotcha" style={{ display: "none" }} />

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                      rows={4}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Solicitar Demo
                          <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
