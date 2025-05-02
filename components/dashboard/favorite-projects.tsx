"use client"

import { useState } from "react"
import { Star, StarOff, MoreHorizontal, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Datos simulados de proyectos
const initialProjects = [
  {
    id: 1,
    name: "Parque Solar Andalucía",
    type: "solar",
    status: "active",
    progress: 78,
    lastUpdate: "Hace 2 horas",
    isFavorite: true,
  },
  {
    id: 2,
    name: "Parque Eólico Galicia",
    type: "wind",
    status: "maintenance",
    progress: 45,
    lastUpdate: "Hace 1 día",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Microgrid Cataluña",
    type: "hybrid",
    status: "active",
    progress: 92,
    lastUpdate: "Hace 30 minutos",
    isFavorite: true,
  },
  {
    id: 4,
    name: "Parque Solar Valencia",
    type: "solar",
    status: "warning",
    progress: 65,
    lastUpdate: "Hace 4 horas",
    isFavorite: true,
  },
]

export function FavoriteProjects() {
  const [projects, setProjects] = useState(initialProjects)

  const toggleFavorite = (id: number) => {
    setProjects(
      projects.map((project) => (project.id === id ? { ...project, isFavorite: !project.isFavorite } : project)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "warning":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case "offline":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "maintenance":
        return "Mantenimiento"
      case "warning":
        return "Alerta"
      case "offline":
        return "Inactivo"
      default:
        return status
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "solar":
        return "☀️"
      case "wind":
        return "💨"
      case "hybrid":
        return "⚡"
      default:
        return "🔋"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-yellow-500"
    if (progress >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Proyectos Favoritos</CardTitle>
        <Button variant="outline" size="sm">
          Ver todos
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects
            .filter((p) => p.isFavorite)
            .map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getTypeIcon(project.type)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{project.name}</h4>
                        <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Última actualización: {project.lastUpdate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(project.id)}>
                      {project.isFavorite ? (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>Generar informe</DropdownMenuItem>
                        <DropdownMenuItem>Configurar alertas</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>Progreso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className={`h-2 ${getProgressColor(project.progress)}`} />
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
