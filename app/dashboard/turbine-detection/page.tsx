"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation"
import { WindTurbineDetector } from "@/components/dashboard/wind-turbine-detector"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export default function TurbineDetectionPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsClient(true)

    // Redirigir al login si no hay usuario autenticado
    if (!loading && !user && isClient) {
      router.push("/login")
    }
  }, [user, loading, router, isClient])

  // Si está cargando o verificando la autenticación, mostrar un indicador de carga
  if (loading || !isClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
          <p className="text-lg font-medium">{t("loading")}</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario autenticado, no mostrar nada (la redirección se encargará)
  if (!user) {
    return null
  }

  // Si el usuario está autenticado, mostrar la página de detección de daños
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-2xl font-bold">{t("turbineDamageDetection")}</h1>

            <div className="grid gap-6">
              <WindTurbineDetector />
            </div>
          </div>
        </main>
      </div>

      <Toaster />
    </div>
  )
}
