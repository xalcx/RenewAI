"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { EnergyProductionChart } from "@/components/dashboard/energy-production-chart"
import { LiveMapView } from "@/components/dashboard/live-map-view"
import { RealTimeAlerts } from "@/components/dashboard/real-time-alerts"
import { FeedbackWidget } from "@/components/dashboard/feedback-widget"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirigir al login si no hay usuario y no está cargando
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario y no está cargando, no renderizar nada (la redirección se encargará)
  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <SidebarNavigation />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <OverviewCards />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <EnergyProductionChart className="lg:col-span-2" />
              <QuickActions />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <LiveMapView />
              <RealTimeAlerts />
            </div>
            <ActivityFeed />
          </div>
        </main>
      </div>
      <FeedbackWidget />
      <Toaster />
    </div>
  )
}
