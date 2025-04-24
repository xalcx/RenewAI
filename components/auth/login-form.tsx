"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Mostrar mensaje si el usuario se acaba de registrar
    if (searchParams?.get("registered") === "true") {
      setSuccess("Registro exitoso. Ahora puedes iniciar sesión.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      const { error, success } = await signIn(email, password)

      if (error) {
        setError(error.message || "Credenciales inválidas")
        return
      }

      if (success) {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("Ocurrió un error inesperado")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Iniciar sesión</h1>
        <p className="text-gray-500 dark:text-gray-400">Ingresa tus credenciales para acceder</p>
      </div>

      {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      {success && <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">{success}</div>}

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
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" /> : "Iniciar sesión"}
        </Button>
      </form>

      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Registrarse
        </Link>
      </div>
    </div>
  )
}
