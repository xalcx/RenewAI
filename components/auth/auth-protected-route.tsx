"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface AuthProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthProtectedRoute({ children, redirectTo = "/login" }: AuthProtectedRouteProps) {
  const { user, loading, isAdmin, isGuest, firebaseUser } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Solo redirigir cuando estemos seguros de que no hay sesión
    if (!loading) {
      if (user || isAdmin || isGuest || firebaseUser) {
        setIsAuthorized(true)
      } else {
        console.log("No autorizado, redirigiendo a:", redirectTo)
        router.push(redirectTo)
      }
    }
  }, [user, loading, isAdmin, isGuest, firebaseUser, router, redirectTo])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-500">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-500">Redirigiendo...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
