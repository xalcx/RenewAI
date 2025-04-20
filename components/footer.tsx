"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { motion } from "framer-motion"
import React from "react"

// Definir el componente sin exportarlo directamente
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <AnimatedSection className="md:col-span-2" delay={0.1}>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                RenewAI
              </span>
            </Link>
            <p className="mb-4 max-w-md">
              Transformamos la industria de energías renovables con inteligencia artificial y análisis geoespacial
              avanzado para un futuro más sostenible.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
              ].map((social, index) => (
                <motion.div key={social.label} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h3 className="text-lg font-semibold mb-4 text-white">Enlaces rápidos</h3>
            <ul className="space-y-2">
              {[
                { href: "#beneficios", label: "Beneficios" },
                { href: "#como-funciona", label: "Cómo Funciona" },
                { href: "#casos-uso", label: "Casos de Uso" },
                { href: "#contacto", label: "Contacto" },
              ].map((link) => (
                <motion.li key={link.href} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <h3 className="text-lg font-semibold mb-4 text-white">Empresa</h3>
            <ul className="space-y-2">
              {[
                { href: "#", label: "Sobre Nosotros" },
                { href: "#", label: "Equipo" },
                { href: "#", label: "Carreras" },
                { href: "#", label: "Blog" },
                { href: "#", label: "Prensa" },
              ].map((link) => (
                <motion.li key={link.label} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              {[
                { href: "#", label: "Política de Privacidad" },
                { href: "#", label: "Términos y Condiciones" },
                { href: "#", label: "Política de Cookies" },
              ].map((link) => (
                <motion.li key={link.label} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} RenewAI Technologies. Todos los derechos reservados.</p>
          <p className="mt-2 text-gray-400">GreenOps Intelligence™ es una marca registrada de RenewAI Technologies</p>
        </div>
      </div>
    </footer>
  )
}

// Exportar el componente envuelto en React.memo para optimizar el rendimiento
export default React.memo(Footer)
