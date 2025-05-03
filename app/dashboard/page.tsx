"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RecentProjects } from "@/components/dashboard/recent-projects"
import { EnergyProductionChart } from "@/components/dashboard/energy-production-chart"
import { WeatherForecast } from "@/components/dashboard/weather-forecast"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { EnergyEfficiencyScore } from "@/components/dashboard/energy-efficiency-score"
import { CarbonSavings } from "@/components/dashboard/carbon-savings"
import { MarketInsights } from "@/components/dashboard/market-insights"
import { ProjectsOverview } from "@/components/dashboard/projects-overview"
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview"
import { MaintenanceOverview } from "@/components/dashboard/maintenance-overview"
import { OptimizationOverview } from "@/components/dashboard/optimization-overview"
import { ReportsOverview } from "@/components/dashboard/reports-overview"
import { LiveMapView } from "@/components/dashboard/live-map-view"
import { RealTimeAlerts } from "@/components/dashboard/real-time-alerts"
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation"
import { FeedbackWidget } from "@/components/dashboard/feedback-widget"
import { KPIDashboard } from "@/components/dashboard/kpi-dashboard"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { FavoriteProjects } from "@/components/dashboard/favorite-projects"
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from "@/contexts/auth-context"
import { FirebaseGoogleLogin } from "@/components/auth/firebase-google-login"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function DashboardPage() {
  const { user, loading, signIn, isGuest, isAdmin } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginSuccess, setLoginSuccess] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Efecto para forzar la recarga de la página después de un inicio de sesión exitoso
  useEffect(() => {
    if (loginSuccess) {
      // Forzar una recarga completa de la página para asegurar que se actualice el estado de autenticación
      window.location.href = "/dashboard"
    }
  }, [loginSuccess])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { error, success } = await signIn(email, password)

      if (error) {
        setError(error.message || "Credenciales incorrectas")
      } else if (success) {
        setLoginSuccess(true)
      }
    } catch (err) {
      console.error("Error inesperado:", err)
      setError("Ocurrió un error inesperado. Por favor, intente más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  const loginAsGuest = async () => {
    setEmail("invitado")
    setPassword("invitado")
    setError(null)
    setIsLoading(true)

    try {
      const { error, success } = await signIn("invitado", "invitado")

      if (error) {
        setError(error.message || "Error al iniciar sesión como invitado")
      } else if (success) {
        // Marcar el inicio de sesión como exitoso para activar la recarga
        setLoginSuccess(true)
      }
    } catch (err) {
      console.error("Error inesperado:", err)
      setError("Ocurrió un error inesperado. Por favor, intente más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  // Si está cargando, mostrar un indicador de carga
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

  // Si el usuario está autenticado o es invitado o admin, mostrar el dashboard
  if (user || isGuest || isAdmin) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <SidebarNavigation />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto p-6">
            {/* Panel de KPIs */}
            <div className="mb-8">
              <KPIDashboard />
            </div>

            {/* Proyectos Favoritos y Actividad Reciente */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <FavoriteProjects />
              <ActivityFeed />
            </div>

            {/* Mapa Interactivo y Alertas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Vista en Tiempo Real</h3>
                  </div>
                  <div className="p-0">
                    <LiveMapView />
                  </div>
                </div>
              </div>
              <div>
                <RealTimeAlerts />
              </div>
            </div>

            {/* Producción de Energía y Acciones Rápidas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Producción de Energía</h3>
                  </div>
                  <div className="p-4">
                    <EnergyProductionChart />
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-full">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Acciones Rápidas</h3>
                  </div>
                  <div className="p-4">
                    <QuickActions />
                  </div>
                </div>
              </div>
            </div>

            {/* Pestañas Principales */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
              <Tabs defaultValue="overview" className="w-full">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <TabsList className="grid grid-cols-6 gap-2">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                    >
                      Resumen
                    </TabsTrigger>
                    <TabsTrigger
                      value="projects"
                      className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                    >
                      Proyectos
                    </TabsTrigger>
                    <TabsTrigger
                      value="maintenance"
                      className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                    >
                      Mantenimiento
                    </TabsTrigger>
                    <TabsTrigger
                      value="analytics"
                      className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                    >
                      Análisis
                    </TabsTrigger>
                    <TabsTrigger
                      value="optimization"
                      className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                    >
                      Optimización
                    </TabsTrigger>
                    <TabsTrigger
                      value="reports"
                      className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                    >
                      Informes
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <RecentProjects />
                      <div className="grid grid-cols-1 gap-6">
                        <EnergyEfficiencyScore />
                        <CarbonSavings />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <MarketInsights />
                      <WeatherForecast />
                    </div>
                  </TabsContent>

                  <TabsContent value="projects">
                    <ProjectsOverview />
                  </TabsContent>

                  <TabsContent value="maintenance">
                    <MaintenanceOverview />
                  </TabsContent>

                  <TabsContent value="analytics">
                    <AnalyticsOverview />
                  </TabsContent>

                  <TabsContent value="optimization">
                    <OptimizationOverview />
                  </TabsContent>

                  <TabsContent value="reports">
                    <ReportsOverview />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </main>
        </div>

        {/* Widget de Feedback */}
        <FeedbackWidget />

        {/* Toaster para notificaciones */}
        <Toaster />
      </div>
    )
  }

  // Si no hay usuario autenticado, mostrar la pantalla de login
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Accede a tu Dashboard</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Inicia sesión para acceder a todas las funcionalidades de RenewAI
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col space-y-4">
            <div className="text-center">
              <Button
                onClick={loginAsGuest}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : "Entrar como Invitado"}
              </Button>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Acceso rápido sin necesidad de registro</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  O inicia sesión con
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email o Usuario
              </label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com o usuario"
                className="mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <LoadingSpinner size="sm" /> : "Iniciar sesión"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">O continúa con</span>
              </div>
            </div>

            <div className="mt-6">
              <FirebaseGoogleLogin />
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <button
              onClick={() => router.push("/")}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ← Volver a la página principal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
