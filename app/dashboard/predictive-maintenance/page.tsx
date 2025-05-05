"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation"
import { PredictiveMaintenancePanel } from "@/components/dashboard/predictive-maintenance-panel"
import { FeedbackWidget } from "@/components/dashboard/feedback-widget"
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from "@/contexts/auth-context"

export default function PredictiveMaintenancePage() {
  const { user, loading, isAdmin, isGuest } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Redirigir al login si no hay usuario autenticado
    if (!loading && !user && !isAdmin && !isGuest && isClient) {
      router.push("/login")
    }
  }, [user, loading, isAdmin, isGuest, router, isClient])

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

  // Si no hay usuario autenticado, no mostrar nada (la redirección se encargará)
  if (!user && !isAdmin && !isGuest) {
    return null
  }

  // Si el usuario está autenticado, mostrar la página
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <PredictiveMaintenancePanel />
        </main>
      </div>

      {/* Widget de Feedback */}
      <FeedbackWidget />

      {/* Toaster para notificaciones */}
      <Toaster />
    </div>
  )
}
