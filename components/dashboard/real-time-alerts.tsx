"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, Info, CheckCircle, Clock, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Tipos para las alertas
interface Alert {
  id: string
  title: string
  message: string
  type: "error" | "warning" | "info" | "success"
  timestamp: string
  isNew: boolean
  source: string
  acknowledged: boolean
}

// Datos de ejemplo para las alertas
const INITIAL_ALERTS: Alert[] = [
  {
    id: "alert-1",
    title: "Fallo en inversor detectado",
    message: "El inversor #08 en Parque Solar Andalucía muestra lecturas anómalas.",
    type: "error",
    timestamp: "Hace 5 minutos",
    isNew: true,
    source: "Sistema de monitoreo",
    acknowledged: false,
  },
  {
    id: "alert-2",
    title: "Mantenimiento programado",
    message: "Mantenimiento programado para Parque Eólico Galicia mañana a las 10:00.",
    type: "info",
    timestamp: "Hace 1 hora",
    isNew: false,
    source: "Sistema de programación",
    acknowledged: true,
  },
  {
    id: "alert-3",
    title: "Rendimiento por debajo del umbral",
    message: "El rendimiento del Parque Solar Valencia está un 15% por debajo del umbral esperado.",
    type: "warning",
    timestamp: "Hace 30 minutos",
    isNew: true,
    source: "Sistema de análisis",
    acknowledged: false,
  },
  {
    id: "alert-4",
    title: "Turbina #14 reparada con éxito",
    message: "La turbina #14 en Parque Eólico Galicia ha sido reparada y está operativa.",
    type: "success",
    timestamp: "Hace 2 horas",
    isNew: false,
    source: "Equipo de mantenimiento",
    acknowledged: true,
  },
]

export function RealTimeAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS)
  const [filter, setFilter] = useState<"all" | "unacknowledged" | "error" | "warning" | "info" | "success">("all")

  // Simular la llegada de nuevas alertas
  useEffect(() => {
    const interval = setInterval(() => {
      // 20% de probabilidad de generar una nueva alerta
      if (Math.random() < 0.2) {
        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          title: "Nueva alerta detectada",
          message: `Se ha detectado una anomalía en ${
            Math.random() > 0.5 ? "Parque Solar Valencia" : "Microgrid Cataluña"
          }.`,
          type: Math.random() > 0.7 ? "error" : Math.random() > 0.4 ? "warning" : "info",
          timestamp: "Ahora mismo",
          isNew: true,
          source: "Sistema de monitoreo en tiempo real",
          acknowledged: false,
        }
        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]) // Mantener solo las 10 alertas más recientes
      }
    }, 30000) // Cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  // Filtrar alertas según el filtro seleccionado
  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true
    if (filter === "unacknowledged") return !alert.acknowledged
    return alert.type === filter
  })

  // Función para marcar una alerta como reconocida
  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, acknowledged: true, isNew: false } : alert)))
  }

  // Función para eliminar una alerta
  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  // Función para obtener el icono según el tipo de alerta
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  // Función para obtener el color de fondo según el tipo de alerta
  const getAlertBackground = (type: Alert["type"], isNew: boolean, acknowledged: boolean) => {
    if (acknowledged) return "bg-gray-50 dark:bg-gray-800"
    if (!isNew) return "bg-white dark:bg-gray-800"

    switch (type) {
      case "error":
        return "bg-red-50 dark:bg-red-900/10"
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/10"
      case "info":
        return "bg-blue-50 dark:bg-blue-900/10"
      case "success":
        return "bg-green-50 dark:bg-green-900/10"
      default:
        return "bg-white dark:bg-gray-800"
    }
  }

  // Función para obtener el color del borde según el tipo de alerta
  const getAlertBorder = (type: Alert["type"], isNew: boolean, acknowledged: boolean) => {
    if (acknowledged) return "border-gray-200 dark:border-gray-700"
    if (!isNew) return "border-gray-200 dark:border-gray-700"

    switch (type) {
      case "error":
        return "border-red-200 dark:border-red-800"
      case "warning":
        return "border-yellow-200 dark:border-yellow-800"
      case "info":
        return "border-blue-200 dark:border-blue-800"
      case "success":
        return "border-green-200 dark:border-green-800"
      default:
        return "border-gray-200 dark:border-gray-700"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Alertas en Tiempo Real</CardTitle>
            <CardDescription>Notificaciones y eventos del sistema</CardDescription>
          </div>
          <Badge className="bg-red-500" variant="secondary">
            {alerts.filter((a) => !a.acknowledged).length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex space-x-2 overflow-x-auto">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className="text-xs h-7"
            onClick={() => setFilter("all")}
          >
            Todas
          </Button>
          <Button
            variant={filter === "unacknowledged" ? "default" : "outline"}
            size="sm"
            className="text-xs h-7"
            onClick={() => setFilter("unacknowledged")}
          >
            Sin reconocer
          </Button>
          <Button
            variant={filter === "error" ? "default" : "outline"}
            size="sm"
            className="text-xs h-7"
            onClick={() => setFilter("error")}
          >
            Errores
          </Button>
          <Button
            variant={filter === "warning" ? "default" : "outline"}
            size="sm"
            className="text-xs h-7"
            onClick={() => setFilter("warning")}
          >
            Advertencias
          </Button>
          <Button
            variant={filter === "info" ? "default" : "outline"}
            size="sm"
            className="text-xs h-7"
            onClick={() => setFilter("info")}
          >
            Info
          </Button>
          <Button
            variant={filter === "success" ? "default" : "outline"}
            size="sm"
            className="text-xs h-7"
            onClick={() => setFilter("success")}
          >
            Éxitos
          </Button>
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {filteredAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <Bell className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm font-medium">No hay alertas</p>
              <p className="text-xs text-muted-foreground mt-1">
                No hay alertas que coincidan con los criterios de filtrado actuales.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-3 relative",
                    getAlertBackground(alert.type, alert.isNew, alert.acknowledged),
                    alert.isNew && !alert.acknowledged && "border-l-4",
                    alert.isNew && !alert.acknowledged && getAlertBorder(alert.type, alert.isNew, alert.acknowledged),
                  )}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-0.5">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <div className="flex items-center ml-2">
                          {alert.isNew && !alert.acknowledged && (
                            <Badge className="mr-2 bg-blue-500" variant="secondary">
                              Nuevo
                            </Badge>
                          )}
                          <button
                            onClick={() => dismissAlert(alert.id)}
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{alert.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{alert.timestamp}</span>
                          <span className="mx-1">•</span>
                          <span>{alert.source}</span>
                        </div>
                        {!alert.acknowledged && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => acknowledgeAlert(alert.id)}
                          >
                            Reconocer
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <p className="text-xs text-muted-foreground">
          Mostrando {filteredAlerts.length} de {alerts.length} alertas
        </p>
        <Button variant="outline" size="sm">
          Ver historial completo
        </Button>
      </CardFooter>
    </Card>
  )
}
