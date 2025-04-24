"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import LogoutButton from "@/components/auth/logout-button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  // Cerrar el menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Demo", href: "/demo" },
  ]

  const handleSignOut = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-green-600 dark:text-green-400">RenewAI</span>
            </Link>
          </div>

          {/* Navegación de escritorio */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <ThemeToggle />

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Hola, {user.email}</span>
                </div>
                <LogoutButton />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Iniciar sesión</Button>
                </Link>
                <Link href="/register">
                  <Button>Registrarse</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Botón de menú móvil */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0">
                    <User size={24} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-gray-200">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-2 px-2">
                  <Link
                    href="/login"
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Registrarse
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
