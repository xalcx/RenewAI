import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function RecentProjects() {
  const projects = [
    {
      name: "Parque Solar Andalucía",
      status: "Operativo",
      health: 98,
      type: "solar",
      lastUpdate: "Hace 2 horas",
    },
    {
      name: "Parque Eólico Galicia",
      status: "Mantenimiento",
      health: 76,
      type: "wind",
      lastUpdate: "Hace 1 día",
    },
    {
      name: "Microgrid Cataluña",
      status: "Operativo",
      health: 94,
      type: "hybrid",
      lastUpdate: "Hace 5 horas",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proyectos Recientes</CardTitle>
        <CardDescription>Tus proyectos más activos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, i) => (
            <div
              key={i}
              className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      project.status === "Operativo"
                        ? "bg-green-500"
                        : project.status === "Mantenimiento"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <div className="flex items-center mt-1">
                      <Badge
                        className={`mr-2 ${
                          project.status === "Operativo"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100"
                            : project.status === "Mantenimiento"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100"
                        }`}
                      >
                        {project.status}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{project.lastUpdate}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium mr-2">Salud:</span>
                    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div
                        className={`h-2 rounded-full ${
                          project.health > 90 ? "bg-green-500" : project.health > 70 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${project.health}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Ver todos los proyectos
        </Button>
      </CardFooter>
    </Card>
  )
}
