"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface LoginFormProps {
  showRegisteredMessage?: boolean
  redirectTo?: string
}

export default function LoginForm({ showRegisteredMessage = false, redirectTo = "/dashboard" }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(
    showRegisteredMessage ? "¡Registro exitoso! Ahora puedes iniciar sesión." : null,
  )
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsLoading(true)

    // Verificar si son las credenciales de administrador
    if (email === "admin" && password === "admin") {
      // Simular un pequeño retraso para dar feedback visual
      await new Promise((resolve) => setTimeout(resolve, 500))
      localStorage.setItem("adminSession", "true")
      router.push(redirectTo)
      return
    }

    try {
      const { error, success } = await signIn(email, password)

      if (error) {
        console.error("Error de inicio de sesión:", error)
        setError(error.message || "Credenciales incorrectas")
        return
      }

      if (success) {
        router.push(redirectTo)
      }
    } catch (err) {
      console.error("Error inesperado:", err)
      setError("Ocurrió un error inesperado. Por favor, intente más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestLogin = () => {
    setIsLoading(true)
    // Simular un pequeño retraso para dar feedback visual
    setTimeout(() => {
      localStorage.setItem("guestSession", "true")
      router.push(redirectTo)
    }, 500)
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Iniciar sesión</h1>
        <p className="text-gray-500 dark:text-gray-400">Ingresa tus credenciales para acceder</p>
      </div>

      {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
      {successMessage && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email o Usuario
          </label>
          <Input
            id="email"
            type="text"
            placeholder="tu@email.com o admin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Contraseña
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" /> : "Iniciar sesión"}
        </Button>
      </form>

      <div className="flex flex-col space-y-2">
        <Button variant="outline" onClick={handleGuestLogin} disabled={isLoading} className="w-full">
          {isLoading ? <LoadingSpinner size="sm" /> : "Entrar como invitado"}
        </Button>
        <div className="text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400 mb-1">Credenciales de administrador:</p>
          <p className="font-mono bg-gray-100 dark:bg-gray-700 p-1 rounded text-xs">
            Usuario: <span className="font-bold">admin</span> | Contraseña: <span className="font-bold">admin</span>
          </p>
        </div>
      </div>

      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Registrarse
        </Link>
      </div>
    </div>
  )
}
