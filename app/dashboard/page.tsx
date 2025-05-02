import ProtectedRoute from "@/components/auth/protected-route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RecentProjects } from "@/components/dashboard/recent-projects"
import { EnergyProductionChart } from "@/components/dashboard/energy-production-chart"
import { WeatherForecast } from "@/components/dashboard/weather-forecast"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel"
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

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <OverviewCards />
            </div>
            <div>
              <RealTimeAlerts />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <EnergyProductionChart />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <LiveMapView />
            </div>
            <div>
              <NotificationsPanel />
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full mb-8">
            <TabsList className="grid grid-cols-6 mb-6">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="projects">Proyectos</TabsTrigger>
              <TabsTrigger value="maintenance">Mantenimiento</TabsTrigger>
              <TabsTrigger value="analytics">Análisis</TabsTrigger>
              <TabsTrigger value="optimization">Optimización</TabsTrigger>
              <TabsTrigger value="reports">Informes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentProjects />
                <WeatherForecast />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  )
}
