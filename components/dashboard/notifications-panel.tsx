import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Check, AlertTriangle, Info, Settings } from "lucide-react"

export function NotificationsPanel() {
  const notifications = [
    {
      id: 1,
      type: "alert",
      message: "Alerta de mantenimiento en Turbina #14",
      time: "Hace 30 minutos",
      icon: AlertTriangle,
      color: "text-yellow-500 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      id: 2,
      type: "info",
      message: "Actualización de firmware disponible para inversores",
      time: "Hace 2 horas",
      icon: Info,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: 3,
      type: "success",
      message: "Mantenimiento completado en Parque Solar Andalucía",
      time: "Hace 5 horas",
      icon: Check,
      color: "text-green-500 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      id: 4,
      type: "alert",
      message: "Rendimiento bajo detectado en Panel Solar A-245",
      time: "Hace 1 día",
      icon: AlertTriangle,
      color: "text-yellow-500 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notificaciones
          </CardTitle>
          <CardDescription>Actualizaciones recientes</CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex">
                <div
                  className={`h-8 w-8 rounded-full ${notification.bgColor} ${notification.color} flex items-center justify-center mr-3 shrink-0`}
                >
                  <notification.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full">
          Ver todas las notificaciones
        </Button>
      </CardFooter>
    </Card>
  )
}
