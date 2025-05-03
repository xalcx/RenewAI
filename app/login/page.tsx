"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useAuth } from "@/contexts/auth-context"
import { FirebaseGoogleLogin } from "@/components/auth/firebase-google-login"

export default function LoginPage() {
  const { user, loading, signIn } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)

    // Si el usuario ya está autenticado, redirigir al dashboard
    if (user && !loading) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { error, success } = await signIn(email, password)

      if (error) {
        setError(error.message || "Credenciales incorrectas")
      } else if (success) {
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("Error inesperado:", err)
      setError("Ocurrió un error inesperado. Por favor, intente más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  const loginAsGuest = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const { error, success } = await signIn("invitado", "invitado")

      if (error) {
        setError(error.message || "Error al iniciar sesión como invitado")
      } else if (success) {
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("Error inesperado:", err)
      setError("Ocurrió un error inesperado. Por favor, intente más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  // Si está cargando o verificando la autenticación, mostrar un indicador de carga
  if (loading || !isClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
          <p className="text-lg font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si el usuario ya está autenticado, no mostrar nada (la redirección se encargará)
  if (user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Accede a tu Dashboard</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Inicia sesión para acceder a todas las funcionalidades de RenewAI
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col space-y-4">
            <div className="text-center">
              <Button
                onClick={loginAsGuest}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : "Entrar como Invitado"}
              </Button>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Acceso rápido sin necesidad de registro</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  O inicia sesión con
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email o Usuario
              </label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com o usuario"
                className="mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <LoadingSpinner size="sm" /> : "Iniciar sesión"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">O continúa con</span>
              </div>
            </div>

            <div className="mt-6">
              <FirebaseGoogleLogin />
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <button
              onClick={() => router.push("/")}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ← Volver a la página principal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
