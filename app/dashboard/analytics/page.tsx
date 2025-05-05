"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, BarChart2, TrendingUp, BarChart, Wind, Sun, Zap, Download, RefreshCw } from "lucide-react"

export default function AnalyticsPage() {
  const { t } = useLanguage()
  const [timePeriod, setTimePeriod] = useState("month")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" asChild className="mr-2">
                <a href="/dashboard">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Volver al dashboard</span>
                </a>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("general-analytics")}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("select-time-period")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">{t("last-week")}</SelectItem>
                  <SelectItem value="month">{t("last-month")}</SelectItem>
                  <SelectItem value="quarter">{t("last-quarter")}</SelectItem>
                  <SelectItem value="year">{t("last-year")}</SelectItem>
                  <SelectItem value="custom">{t("custom-range")}</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={handleRefreshData} disabled={isRefreshing}>
                {isRefreshing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                {t("refresh")}
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                {t("export")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("total-energy-production")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2">
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">843.5 GWh</div>
                    <div className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.3% {t("vs-previous")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("average-efficiency")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2">
                    <BarChart2 className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">38.7%</div>
                    <div className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.5% {t("vs-previous")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("carbon-offset")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2">
                    <Wind className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">562.1k {t("tons")}</div>
                    <div className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +18.7% {t("vs-previous")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("operational-costs")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2">
                    <BarChart className="h-8 w-8 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">€3.2M</div>
                    <div className="text-xs text-red-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                      -5.1% {t("vs-previous")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                {t("overview")}
              </TabsTrigger>
              <TabsTrigger
                value="production"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                {t("production")}
              </TabsTrigger>
              <TabsTrigger
                value="efficiency"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                {t("efficiency")}
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                {t("financial")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>{t("energy-production-by-source")}</CardTitle>
                  <CardDescription>{t("last-month-by-energy-source")}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="aspect-[4/3] bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="w-full h-full bg-cover bg-center rounded-lg overflow-hidden">
                        <img
                          src="/placeholder.svg?key=klmm5"
                          alt="Energy Production Chart"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="production">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("wind-energy-production")}</CardTitle>
                    <CardDescription>{t("by-wind-farm")}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="aspect-[4/3] bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-full h-full bg-cover bg-center rounded-lg overflow-hidden">
                          <img
                            src="/placeholder.svg?key=bqqs6"
                            alt="Wind Energy Production Chart"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("solar-energy-production")}</CardTitle>
                    <CardDescription>{t("by-solar-farm")}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="aspect-[4/3] bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-full h-full bg-cover bg-center rounded-lg overflow-hidden">
                          <img
                            src="/placeholder.svg?key=dz87g"
                            alt="Solar Energy Production Chart"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="efficiency">
              <Card>
                <CardHeader>
                  <CardTitle>{t("efficiency-metrics")}</CardTitle>
                  <CardDescription>{t("efficiency-by-installation-type")}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-[4/3] bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-full h-full bg-cover bg-center rounded-lg overflow-hidden">
                          <img
                            src="/placeholder.svg?key=vhthy"
                            alt="Efficiency Pie Chart"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Wind className="h-5 w-5 text-blue-500 mr-2" />
                          <div className="font-medium">{t("wind")}</div>
                          <div className="ml-auto font-bold">42.3%</div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "42.3%" }}></div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Sun className="h-5 w-5 text-amber-500 mr-2" />
                          <div className="font-medium">{t("solar")}</div>
                          <div className="ml-auto font-bold">38.7%</div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "38.7%" }}></div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Zap className="h-5 w-5 text-green-500 mr-2" />
                          <div className="font-medium">{t("hybrid")}</div>
                          <div className="ml-auto font-bold">45.1%</div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "45.1%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle>{t("financial-performance")}</CardTitle>
                  <CardDescription>{t("investment-and-returns")}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="aspect-[16/9] bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="w-full h-full bg-cover bg-center rounded-lg overflow-hidden">
                        <img
                          src="/placeholder.svg?key=h8cth"
                          alt="Financial Performance Chart"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("energy-source-distribution")}</CardTitle>
                <CardDescription>{t("by-installation-type")}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-[4/3] bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="w-full h-full bg-cover bg-center rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=300&width=400&query=energy+source+distribution+pie+chart"
                        alt="Energy Source Distribution"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("performance-comparison")}</CardTitle>
                <CardDescription>{t("vs-industry-benchmark")}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-[4/3] bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="w-full h-full bg-cover bg-center rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=300&width=400&query=renewable+energy+performance+comparison+radar+chart"
                        alt="Performance Comparison"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
