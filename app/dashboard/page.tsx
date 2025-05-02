import ProtectedRoute from "@/components/auth/protected-route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { OverviewCards } from "@/components/dashboard/overview-cards"
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
import { AIInsights } from "@/components/dashboard/ai-insights"
import { SitePerformance } from "@/components/dashboard/site-performance"
import { TurbineAnalytics } from "@/components/dashboard/turbine-analytics"
import { OptimalLocations } from "@/components/dashboard/optimal-locations"
import { ROICalculator } from "@/components/dashboard/roi-calculator"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section with Key Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Bienvenido a tu Panel de Control
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Monitorea y optimiza tus proyectos de energía renovable con inteligencia artificial
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <OverviewCards />
                </div>
              </div>
            </div>
            <div>
              <RealTimeAlerts />
            </div>
          </div>

          {/* Interactive Map and Analytics */}
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

          {/* Energy Production and AI Insights */}
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
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Insights de IA</h3>
                </div>
                <div className="p-4">
                  <AIInsights />
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Tabs */}
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
                    <WeatherForecast />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <EnergyEfficiencyScore />
                    <CarbonSavings />
                    <MarketInsights />
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

          {/* Advanced Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Rendimiento del Sitio</h3>
              </div>
              <div className="p-4">
                <SitePerformance />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Análisis de Turbinas</h3>
              </div>
              <div className="p-4">
                <TurbineAnalytics />
              </div>
            </div>
          </div>

          {/* Planning and Optimization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Ubicaciones Óptimas</h3>
              </div>
              <div className="p-4">
                <OptimalLocations />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Calculadora de ROI</h3>
              </div>
              <div className="p-4">
                <ROICalculator />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
