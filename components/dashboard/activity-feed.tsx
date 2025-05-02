"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, Clock, Filter, User, Settings, Wind, Sun, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Datos simulados de actividades
const activities = [
  {
    id: 1,
    type: "alert",
    title: "Alerta detectada",
    description: "Rendimiento por debajo del umbral en Parque Solar Valencia",
    time: "Hace 5 minutos",
    user: "Sistema",
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  {
    id: 2,
    type: "maintenance",
    title: "Mantenimiento completado",
    description: "Turbina #8 en Parque Eólico Galicia",
    time: "Hace 32 minutos",
    user: "María López",
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    id: 3,
    type: "system",
    title: "Actualización del sistema",
    description: "Nueva versión de software implementada",
    time: "Hace 1 hora",
    user: "Admin",
    icon: <Settings className="h-5 w-5 text-blue-500" />,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: 4,
    type: "production",
    title: "Récord de producción",
    description: "Parque Solar Andalucía alcanzó 45.2 MWh",
    time: "Hace 3 horas",
    user: "Sistema",
    icon: <Sun className="h-5 w-5 text-yellow-500" />,
    iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  {
    id: 5,
    type: "user",
    title: "Nuevo usuario",
    description: "Carlos Martínez se unió al equipo",
    time: "Hace 5 horas",
    user: "Admin",
    icon: <User className="h-5 w-5 text-indigo-500" />,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    id: 6,
    type: "alert",
    title: "Alerta resuelta",
    description: "Problema de conexión en Parque Eólico Asturias",
    time: "Hace 6 horas",
    user: "Juan Pérez",
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    id: 7,
    type: "production",
    title: "Baja producción",
    description: "Parque Eólico Galicia por condiciones meteorológicas",
    time: "Hace 8 horas",
    user: "Sistema",
    icon: <Wind className="h-5 w-5 text-blue-500" />,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
]

export function ActivityFeed() {
  const [filter, setFilter] = useState<string | null>(null)

  const filteredActivities = filter ? activities.filter((activity) => activity.type === filter) : activities

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Actividad Reciente</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter(null)}>Todos</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("alert")}>Alertas</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("maintenance")}>Mantenimiento</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("production")}>Producción</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("system")}>Sistema</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("user")}>Usuarios</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center`}
                  >
                    {activity.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{activity.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{activity.description}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Marcar como leído</DropdownMenuItem>
                          <DropdownMenuItem>Ocultar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-5 w-5 mr-1">
                          <AvatarImage src={`/placeholder.svg?height=20&width=20`} />
                          <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{activity.user}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No hay actividades que coincidan con el filtro seleccionado
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
