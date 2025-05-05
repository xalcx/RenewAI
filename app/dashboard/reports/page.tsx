"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, Download, FileText, BarChart, PieChart, RefreshCcw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportsPage() {
  const { t } = useLanguage()
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Volver al dashboard</span>
              </a>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("reports")}</h1>
          </div>

          <Tabs defaultValue="generation" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3 gap-4">
              <TabsTrigger
                value="generation"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                <FileText className="mr-2 h-4 w-4" />
                {t("generation")}
              </TabsTrigger>
              <TabsTrigger
                value="scheduled"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                <BarChart className="mr-2 h-4 w-4" />
                {t("scheduled")}
              </TabsTrigger>
              <TabsTrigger value="archived" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                <PieChart className="mr-2 h-4 w-4" />
                {t("archived")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generation">
              <Card>
                <CardHeader>
                  <CardTitle>{t("report-generation")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="report-type">{t("report-type")}</Label>
                      <Select defaultValue="performance">
                        <SelectTrigger id="report-type" className="mt-1">
                          <SelectValue placeholder={t("select-report-type")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="performance">{t("performance-report")}</SelectItem>
                          <SelectItem value="financial">{t("financial-report")}</SelectItem>
                          <SelectItem value="maintenance">{t("maintenance-report")}</SelectItem>
                          <SelectItem value="sustainability">{t("sustainability-report")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="report-period">{t("period")}</Label>
                      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger id="report-period" className="mt-1">
                          <SelectValue placeholder={t("select-period")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">{t("daily")}</SelectItem>
                          <SelectItem value="week">{t("weekly")}</SelectItem>
                          <SelectItem value="month">{t("monthly")}</SelectItem>
                          <SelectItem value="quarter">{t("quarterly")}</SelectItem>
                          <SelectItem value="year">{t("yearly")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="report-format">{t("format")}</Label>
                      <Select defaultValue="pdf">
                        <SelectTrigger id="report-format" className="mt-1">
                          <SelectValue placeholder={t("select-format")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleGenerateReport}
                      className="bg-green-600 hover:bg-green-700 mr-2"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                          {t("generating")}
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          {t("generate-report")}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("recent-reports")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Rendimiento Energético - Abril 2023", date: "12/04/2023", type: "performance" },
                        { name: "Informe Financiero - Q1 2023", date: "03/04/2023", type: "financial" },
                        { name: "Mantenimiento Predictivo - Marzo 2023", date: "31/03/2023", type: "maintenance" },
                      ].map((report, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{report.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{report.date}</p>
                            </div>
                          </div>
                          <Button size="icon" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("templates")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Rendimiento Mensual", description: t("monthly-performance-template") },
                        { name: "ROI de Proyecto", description: t("project-roi-template") },
                        { name: "Mantenimiento Predictivo", description: t("predictive-maintenance-template") },
                        { name: "Impacto Ambiental", description: t("environmental-impact-template") },
                      ].map((template, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{template.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            {t("use")}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scheduled">
              <Card>
                <CardHeader>
                  <CardTitle>{t("scheduled-reports")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Rendimiento Energético",
                        frequency: t("weekly"),
                        nextGeneration: "15/05/2023",
                        status: "active",
                      },
                      {
                        name: "Informe Financiero",
                        frequency: t("monthly"),
                        nextGeneration: "01/06/2023",
                        status: "active",
                      },
                      {
                        name: "Mantenimiento de Activos",
                        frequency: t("daily"),
                        nextGeneration: "09/05/2023",
                        status: "paused",
                      },
                    ].map((report, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div
                            className={`h-3 w-3 rounded-full mr-3 ${report.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                          ></div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{report.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {t("frequency")}: {report.frequency} | {t("next")}: {report.nextGeneration}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            {t("edit")}
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            {report.status === "active" ? t("pause") : t("resume")}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="archived">
              <Card>
                <CardHeader>
                  <CardTitle>{t("archived-reports")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Rendimiento Anual 2022", date: "15/01/2023", size: "4.2 MB" },
                      { name: "Análisis Comparativo Q4 2022", date: "05/01/2023", size: "3.8 MB" },
                      { name: "Optimización de Parques Eólicos 2022", date: "22/12/2022", size: "5.1 MB" },
                      { name: "Mantenimiento Predictivo H2 2022", date: "15/12/2022", size: "3.5 MB" },
                      { name: "Estudio de Impacto Ambiental 2022", date: "30/11/2022", size: "7.2 MB" },
                    ].map((report, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{report.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {report.date} • {report.size}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          {t("download")}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
