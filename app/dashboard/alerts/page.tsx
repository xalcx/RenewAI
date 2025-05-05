"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import {
  ArrowLeft,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Cloud,
  Shield,
  Server,
} from "lucide-react"

export default function AlertsPage() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [alertSettings, setAlertSettings] = useState({
    maintenance: true,
    performance: true,
    weather: true,
    security: false,
    system: true,
  })

  const handleAlertSettingChange = (setting) => {
    setAlertSettings({
      ...alertSettings,
      [setting]: !alertSettings[setting],
    })
  }

  // Datos de ejemplo para las alertas
  const alerts = [
    {
      id: 1,
      title: "Mantenimiento Preventivo Requerido",
      description: "Turbina #14 en Parque Eólico Norte necesita mantenimiento preventivo según programación.",
      type: "maintenance",
      severity: "medium",
      date: "2023-05-08T10:30:00",
      status: "pending",
      location: "Parque Eólico Norte",
    },
    {
      id: 2,
      title: "Rendimiento Bajo",
      description:
        "La planta solar Sur está operando al 68% de su capacidad estimada. Verifique la acumulación de polvo en los paneles.",
      type: "performance",
      severity: "high",
      date: "2023-05-08T09:15:00",
      status: "pending",
      location: "Planta Solar Sur",
    },
    {
      id: 3,
      title: "Alerta Meteorológica",
      description:
        "Se pronostica un frente de tormenta para las próximas 48 horas que podría afectar las operaciones de los parques eólicos.",
      type: "weather",
      severity: "high",
      date: "2023-05-08T08:00:00",
      status: "pending",
      location: "Todos los parques eólicos",
    },
    {
      id: 4,
      title: "Error de Sensor",
      description: "El sensor de velocidad del viento en la turbina #22 está reportando datos inconsistentes.",
      type: "system",
      severity: "low",
      date: "2023-05-07T15:45:00",
      status: "pending",
      location: "Parque Eólico Central",
    },
    {
      id: 5,
      title: "Mantenimiento Programado Completado",
      description:
        "El mantenimiento programado para el transformador principal en la planta híbrida ha sido completado con éxito.",
      type: "maintenance",
      severity: "info",
      date: "2023-05-07T14:30:00",
      status: "resolved",
      location: "Proyecto Híbrido Este",
    },
    {
      id: 6,
      title: "Intento de Acceso No Autorizado",
      description:
        "Se detectó un intento de acceso no autorizado al sistema de control remoto del parque eólico Norte.",
      type: "security",
      severity: "critical",
      date: "2023-05-07T11:20:00",
      status: "pending",
      location: "Parque Eólico Norte",
    },
    {
      id: 7,
      title: "Actualización del Sistema Completada",
      description: "La actualización de firmware para los controladores de las turbinas ha sido completada con éxito.",
      type: "system",
      severity: "info",
      date: "2023-05-06T16:45:00",
      status: "resolved",
      location: "Todos los parques eólicos",
    },
  ]

  const getFilteredAlerts = () => {
    let filtered = [...alerts]

    if (filter !== "all") {
      if (filter === "resolved") {
        filtered = filtered.filter((alert) => alert.status === "resolved")
      } else if (filter === "pending") {
        filtered = filtered.filter((alert) => alert.status === "pending")
      } else if (filter === "critical") {
        filtered = filtered.filter((alert) => alert.severity === "critical")
      } else if (filter === "high") {
        filtered = filtered.filter((alert) => alert.severity === "high")
      }
    }

    return filtered
  }

  const filteredAlerts = getFilteredAlerts()

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case "maintenance":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "performance":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "weather":
        return <Cloud className="h-5 w-5 text-purple-500" />
      case "security":
        return <Shield className="h-5 w-5 text-red-500" />
      case "system":
        return <Server className="h-5 w-5 text-gray-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
    }
  }

  const getAlertSeverityBadge = (severity) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 hover:bg-red-100">
            Crítico
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-100">
            Alto
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-100">
            Medio
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-100">
            Bajo
          </Badge>
        )
      case "info":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-100">
            Info
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-100">
            Info
          </Badge>
        )
    }
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("alerts")}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-gray-100 dark:bg-gray-800" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                {t("filters")}
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Bell className="h-4 w-4 mr-2" />
                {t("configure-alerts")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-full mb-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                    {t("all")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                  >
                    {t("pending")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="resolved"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    {t("resolved")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="critical"
                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                  >
                    {t("critical")}
                  </TabsTrigger>
                  <TabsTrigger value="high" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                    {t("high")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="space-y-4">
                    {filteredAlerts.map((alert) => (
                      <Card
                        key={alert.id}
                        className={`
                        border-l-4 
                        ${
                          alert.severity === "critical"
                            ? "border-l-red-500"
                            : alert.severity === "high"
                              ? "border-l-amber-500"
                              : alert.severity === "medium"
                                ? "border-l-blue-500"
                                : alert.severity === "low"
                                  ? "border-l-green-500"
                                  : "border-l-gray-500"
                        }
                      `}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <div className="mr-4 mt-1">{getAlertTypeIcon(alert.type)}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{alert.title}</h3>
                                {getAlertSeverityBadge(alert.severity)}
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-2">{alert.description}</p>
                              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {new Date(alert.date).toLocaleString()}
                                </div>
                                <div>{alert.location}</div>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex flex-col gap-2">
                              {alert.status === "pending" ? (
                                <>
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    {t("resolve")}
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    {t("details")}
                                  </Button>
                                </>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 text-green-800 border-green-300 hover:bg-green-100"
                                >
                                  {t("resolved")}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="pending" className="mt-6">
                  <div className="space-y-4">
                    {filteredAlerts.map((alert) => (
                      <Card
                        key={alert.id}
                        className={`
                        border-l-4 
                        ${
                          alert.severity === "critical"
                            ? "border-l-red-500"
                            : alert.severity === "high"
                              ? "border-l-amber-500"
                              : alert.severity === "medium"
                                ? "border-l-blue-500"
                                : alert.severity === "low"
                                  ? "border-l-green-500"
                                  : "border-l-gray-500"
                        }
                      `}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <div className="mr-4 mt-1">{getAlertTypeIcon(alert.type)}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{alert.title}</h3>
                                {getAlertSeverityBadge(alert.severity)}
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-2">{alert.description}</p>
                              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {new Date(alert.date).toLocaleString()}
                                </div>
                                <div>{alert.location}</div>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex flex-col gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                {t("resolve")}
                              </Button>
                              <Button size="sm" variant="outline">
                                {t("details")}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="resolved" className="mt-6">
                  <div className="space-y-4">
                    {filteredAlerts.map((alert) => (
                      <Card key={alert.id} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <div className="mr-4 mt-1">{getAlertTypeIcon(alert.type)}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{alert.title}</h3>
                                {getAlertSeverityBadge(alert.severity)}
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-2">{alert.description}</p>
                              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {new Date(alert.date).toLocaleString()}
                                </div>
                                <div>{alert.location}</div>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 border-green-300 hover:bg-green-100"
                              >
                                {t("resolved")}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="critical" className="mt-6">
                  <div className="space-y-4">
                    {filteredAlerts.map((alert) => (
                      <Card key={alert.id} className="border-l-4 border-l-red-500">
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <div className="mr-4 mt-1">{getAlertTypeIcon(alert.type)}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{alert.title}</h3>
                                {getAlertSeverityBadge(alert.severity)}
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-2">{alert.description}</p>
                              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {new Date(alert.date).toLocaleString()}
                                </div>
                                <div>{alert.location}</div>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex flex-col gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                {t("resolve")}
                              </Button>
                              <Button size="sm" variant="outline">
                                {t("details")}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="high" className="mt-6">
                  <div className="space-y-4">
                    {filteredAlerts.map((alert) => (
                      <Card key={alert.id} className="border-l-4 border-l-amber-500">
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <div className="mr-4 mt-1">{getAlertTypeIcon(alert.type)}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{alert.title}</h3>
                                {getAlertSeverityBadge(alert.severity)}
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-2">{alert.description}</p>
                              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {new Date(alert.date).toLocaleString()}
                                </div>
                                <div>{alert.location}</div>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex flex-col gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                {t("resolve")}
                              </Button>
                              <Button size="sm" variant="outline">
                                {t("details")}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {showFilters && (
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("alert-settings")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="maintenance-alerts" className="flex items-center cursor-pointer">
                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                        {t("maintenance-alerts")}
                      </Label>
                      <Switch
                        id="maintenance-alerts"
                        checked={alertSettings.maintenance}
                        onCheckedChange={() => handleAlertSettingChange("maintenance")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="performance-alerts" className="flex items-center cursor-pointer">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        {t("performance-alerts")}
                      </Label>
                      <Switch
                        id="performance-alerts"
                        checked={alertSettings.performance}
                        onCheckedChange={() => handleAlertSettingChange("performance")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="weather-alerts" className="flex items-center cursor-pointer">
                        <Cloud className="h-4 w-4 text-purple-500 mr-2" />
                        {t("weather-alerts")}
                      </Label>
                      <Switch
                        id="weather-alerts"
                        checked={alertSettings.weather}
                        onCheckedChange={() => handleAlertSettingChange("weather")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="security-alerts" className="flex items-center cursor-pointer">
                        <Shield className="h-4 w-4 text-red-500 mr-2" />
                        {t("security-alerts")}
                      </Label>
                      <Switch
                        id="security-alerts"
                        checked={alertSettings.security}
                        onCheckedChange={() => handleAlertSettingChange("security")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="system-alerts" className="flex items-center cursor-pointer">
                        <Server className="h-4 w-4 text-gray-500 mr-2" />
                        {t("system-alerts")}
                      </Label>
                      <Switch
                        id="system-alerts"
                        checked={alertSettings.system}
                        onCheckedChange={() => handleAlertSettingChange("system")}
                      />
                    </div>

                    <div className="pt-4">
                      <Button className="w-full bg-green-600 hover:bg-green-700">{t("apply-filters")}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
