import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function MaintenanceAlerts() {
  const alerts = [
    {
      asset: "Turbina #14",
      issue: "Vibración anormal",
      priority: "Alta",
      location: "Parque Eólico Galicia",
      dueDate: "En 2 días",
    },
    {
      asset: "Inversor #08",
      issue: "Sobrecalentamiento",
      priority: "Media",
      location: "Parque Solar Andalucía",
      dueDate: "En 5 días",
    },
    {
      asset: "Panel Solar A-245",
      issue: "Rendimiento bajo",
      priority: "Baja",
      location: "Parque Solar Valencia",
      dueDate: "En 2 semanas",
    },
    {
      asset: "Transformador #03",
      issue: "Fluctuaciones de voltaje",
      priority: "Media",
      location: "Microgrid Cataluña",
      dueDate: "En 1 semana",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas de Mantenimiento</CardTitle>
        <CardDescription>Problemas detectados que requieren atención</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between">
                <p className="font-medium">{alert.asset}</p>
                <Badge
                  className={
                    alert.priority === "Alta"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100"
                      : alert.priority === "Media"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100"
                  }
                >
                  {alert.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{alert.issue}</p>
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{alert.location}</span>
                <span>{alert.dueDate}</span>
              </div>
              <div className="flex justify-end mt-2 space-x-2">
                <Button variant="outline" size="sm">
                  Posponer
                </Button>
                <Button size="sm">Resolver</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Ver todas las alertas
        </Button>
      </CardFooter>
    </Card>
  )
}
