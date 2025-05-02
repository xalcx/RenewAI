"use client"

import { useState } from "react"
import { AlertTriangle, Bell, CheckCircle, Clock, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Datos simulados de alertas
const alerts = [
  {
    id: 1,
    title: "Mantenimiento requerido",
    message: "La turbina #12 muestra signos de desgaste en los rodamientos",
    time: "Hace 5 minutos",
    type: "warning",
    isRead: false,
  },
  {
    id: 2,
    title: "Producción óptima alcanzada",
    message: "El parque solar está operando al 98% de eficiencia",
    time: "Hace 12 minutos",
    type: "success",
    isRead: true,
  },
  {
    id: 3,
    title: "Alerta meteorológica",
    message: "Se esperan vientos fuertes en la región norte en las próximas 6 horas",
    time: "Hace 25 minutos",
    type: "warning",
    isRead: false,
  },
  {
    id: 4,
    title: "Fallo detectado",
    message: "Panel solar #45 no está generando energía",
    time: "Hace 32 minutos",
    type: "error",
    isRead: false,
  },
  {
    id: 5,
    title: "Mantenimiento completado",
    message: "Mantenimiento preventivo completado en la turbina #8",
    time: "Hace 1 hora",
    type: "success",
    isRead: true,
  },
  {
    id: 6,
    title: "Actualización de firmware",
    message: "Nueva actualización disponible para los controladores",
    time: "Hace 2 horas",
    type: "info",
    isRead: true,
  },
]

export function RealTimeAlerts() {
  const [filters, setFilters] = useState({
    success: true,
    warning: true,
    error: true,
    info: true,
  })

  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const filteredAlerts = alerts.filter((alert) => {
    if (showUnreadOnly && alert.isRead) return false
    return filters[alert.type as keyof typeof filters]
  })

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Bell className="h-5 w-5 text-yellow-500" />
          Alertas en Tiempo Real
        </CardTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={filters.success}
                onCheckedChange={(checked) => setFilters({ ...filters, success: checked })}
              >
                Éxito
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.warning}
                onCheckedChange={(checked) => setFilters({ ...filters, warning: checked })}
              >
                Advertencia
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.error}
                onCheckedChange={(checked) => setFilters({ ...filters, error: checked })}
              >
                Error
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.info}
                onCheckedChange={(checked) => setFilters({ ...filters, info: checked })}
              >
                Información
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showUnreadOnly} onCheckedChange={setShowUnreadOnly}>
                Solo no leídas
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${!alert.isRead ? "bg-gray-50 dark:bg-gray-800" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      {alert.type === "warning" ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      ) : alert.type === "error" ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      ) : alert.type === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <Bell className="h-5 w-5 text-blue-500 mt-0.5" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{alert.title}</h4>
                          {!alert.isRead && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            >
                              Nueva
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.time}
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      Ver detalles
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No hay alertas que coincidan con los filtros
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
