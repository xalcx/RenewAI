"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
// Actualizar la importación al nuevo componente
import { FirebaseGoogleLogin } from "@/components/auth/firebase-google-login"

function LoginFormWrapper() {
  const searchParams = useSearchParams()
  const showRegisteredMessage = searchParams?.get("registered") === "true"
  const redirectTo = searchParams?.get("redirectTo") || "/dashboard"

  return <LoginForm showRegisteredMessage={showRegisteredMessage} redirectTo={redirectTo} />
}

export default function LoginPage() {
  return (
    <div className="container mx-auto py-8">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[300px]">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <LoginFormWrapper />
      </Suspense>
      {/* Actualizar el componente usado */}
      <div className="mt-4 relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">O continuar con</span>
        </div>
      </div>
      <div className="mt-4">
        <FirebaseGoogleLogin />
      </div>
    </div>
  )
}
