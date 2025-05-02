"use client"

import { useAuth } from "@/contexts/auth-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function ClientAuthCheck({ children, fallback }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return fallback
  }

  return children
}
