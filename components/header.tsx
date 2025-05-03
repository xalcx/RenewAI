"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Actualizado para reflejar que la demo de turbinas está ahora en la sección de demos interactivas
  const navItems = [
    { href: "#beneficios", label: "Beneficios" },
    { href: "#como-funciona", label: "Cómo Funciona" },
    { href: "#casos-uso", label: "Casos de Uso" },
    { href: "/demo", label: "Demos Interactivas" },
    { href: "#contacto", label: "Contacto" },
    { href: "/dashboard", label: "Dashboard" }, // Asegurarse de que el enlace al dashboard sea "/dashboard"
  ]

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      suppressHydrationWarning
    >
      <div
        className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto"
        suppressHydrationWarning
      >
        <div className="flex items-center gap-2" suppressHydrationWarning>
          <Link href="/" className="flex items-center">
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              suppressHydrationWarning
            >
              RenewAI
            </motion.span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6" suppressHydrationWarning>
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              suppressHydrationWarning
            >
              <Link href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4" suppressHydrationWarning>
          {/* Añadir el botón de cambio de tema */}
          <ThemeToggle />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            suppressHydrationWarning
          >
            <Button
              asChild
              variant="default"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Link href="#contacto">Solicita una Demo</Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2" suppressHydrationWarning>
          {/* Añadir el botón de cambio de tema en móvil */}
          <ThemeToggle />

          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          id="mobile-menu"
          className="md:hidden fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm p-6 overflow-y-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          role="navigation"
          aria-label="Menú móvil"
          suppressHydrationWarning
        >
          <nav className="flex flex-col gap-6 text-center" suppressHydrationWarning>
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                suppressHydrationWarning
              >
                <Link
                  href={item.href}
                  className="text-lg font-medium py-2 transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              suppressHydrationWarning
            >
              <Button
                asChild
                variant="default"
                className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Link href="#contacto" onClick={() => setIsMenuOpen(false)}>
                  Solicita una Demo
                </Link>
              </Button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
