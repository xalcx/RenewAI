"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ children, redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, loading, isAdmin, isGuest } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user && !isAdmin && !isGuest) {
      router.push(redirectTo)
    }
  }, [loading, user, isAdmin, isGuest, router, redirectTo])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user && !isAdmin && !isGuest) {
    return null
  }

  return <>{children}</>
}
