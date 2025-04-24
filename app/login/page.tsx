"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

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
    </div>
  )
}
