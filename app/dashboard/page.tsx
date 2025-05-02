import ProtectedRoute from "@/components/auth/protected-route"
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

export default function DashboardPage() {
  return (
    <ProtectedRoute>
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
      </div>
    </ProtectedRoute>
  )
}
