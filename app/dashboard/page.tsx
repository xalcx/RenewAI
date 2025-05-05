"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RecentProjects } from "@/components/dashboard/recent-projects"
import { WeatherForecast } from "@/components/dashboard/weather-forecast"
import { EnergyEfficiencyScore } from "@/components/dashboard/energy-efficiency-score"
import { CarbonSavings } from "@/components/dashboard/carbon-savings"
import { MarketInsights } from "@/components/dashboard/market-insights"
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview"
import { LiveMapView } from "@/components/dashboard/live-map-view"
import { RealTimeAlerts } from "@/components/dashboard/real-time-alerts"
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation"
import { FeedbackWidget } from "@/components/dashboard/feedback-widget"
import { KPIDashboard } from "@/components/dashboard/kpi-dashboard"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { FavoriteProjects } from "@/components/dashboard/favorite-projects"
import { PredictiveMaintenancePanel } from "@/components/dashboard/predictive-maintenance-panel"
import { AnomalyDetectionPanel } from "@/components/dashboard/anomaly-detection-panel"
import { ImprovedDashboardButtons } from "@/components/dashboard/improved-dashboard-buttons"
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, BarChart2, AlertTriangle } from "lucide-react"

export default function DashboardPage() {
  const { user, loading, isAdmin, isGuest } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

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

  // Si el usuario está autenticado, mostrar el dashboard
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Botones mejorados y barra de búsqueda */}
          <div className="mb-8">
            <ImprovedDashboardButtons />
          </div>

          {/* Panel de KPIs */}
          <div className="mb-8">
            <KPIDashboard />
          </div>

          {/* Pestañas Principales */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <TabsList className="grid grid-cols-4 gap-2">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    Resumen
                  </TabsTrigger>
                  <TabsTrigger
                    value="maintenance"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    Mantenimiento Predictivo
                  </TabsTrigger>
                  <TabsTrigger
                    value="anomalies"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    Detección de Anomalías
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    Análisis
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="overview">
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

                <TabsContent value="maintenance">
                  <PredictiveMaintenancePanel />
                </TabsContent>

                <TabsContent value="anomalies">
                  <AnomalyDetectionPanel />
                </TabsContent>

                <TabsContent value="analytics">
                  <AnalyticsOverview />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Proyectos Favoritos y Actividad Reciente */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <FavoriteProjects />
            <ActivityFeed />
          </div>

          {/* Tarjetas de acceso rápido */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-green-500" />
                  Optimización Energética
                </CardTitle>
                <CardDescription>Mejora la eficiencia de tus instalaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analiza y optimiza el rendimiento de tus instalaciones renovables para maximizar la producción.
                </p>
                <Button variant="outline" className="w-full">
                  Explorar
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-blue-500" />
                  Análisis Predictivo
                </CardTitle>
                <CardDescription>Anticipa la producción y demanda</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Utiliza modelos de IA para predecir la producción energética y optimizar la distribución.
                </p>
                <Button variant="outline" className="w-full">
                  Explorar
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                  Gestión de Alertas
                </CardTitle>
                <CardDescription>Configura y gestiona notificaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Personaliza las alertas y notificaciones para mantenerte informado sobre eventos críticos.
                </p>
                <Button variant="outline" className="w-full">
                  Explorar
                </Button>
              </CardContent>
            </Card>
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
