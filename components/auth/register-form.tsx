"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setIsLoading(false)
      return
    }

    try {
      const { error, success } = await signUp(email, password)

      if (error) {
        console.error("Error de registro:", error)

        // Mensajes de error más amigables
        if (error.message?.includes("fetch")) {
          setError(
            "No se pudo conectar con el servidor de autenticación. Por favor, verifique su conexión a internet e intente nuevamente.",
          )
        } else {
          setError(error.message || "Error al registrarse")
        }
        return
      }

      if (success) {
        router.push("/login?registered=true")
      }
    } catch (err) {
      console.error("Error inesperado:", err)
      setError("Ocurrió un error inesperado. Por favor, intente más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Crear cuenta</h1>
        <p className="text-gray-500 dark:text-gray-400">Ingresa tus datos para registrarte</p>
      </div>

      {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
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
            minLength={6}
          />
          <p className="text-xs text-gray-500">La contraseña debe tener al menos 6 caracteres</p>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" /> : "Registrarse"}
        </Button>
      </form>

      <div className="text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Iniciar sesión
        </Link>
      </div>

      <div className="text-center text-xs p-2 bg-blue-50 dark:bg-blue-900/30 rounded-md">
        <p>
          <strong>Nota:</strong> Si tienes problemas para registrarte, puedes usar las credenciales predefinidas:
        </p>
        <p className="mt-1">
          <Link href="/login" className="text-blue-600 hover:underline">
            Ir a iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
