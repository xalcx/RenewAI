"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, ArrowRight, Sun, Wind, Droplet, BarChart2, CheckCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function ProjectsOverview() {
  const [projectFilter, setProjectFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Proyectos Renovables</h2>
        <p className="text-muted-foreground">Gestiona y monitoriza todos tus proyectos de energía renovable.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={projectFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setProjectFilter("all")}
        >
          Todos
        </Button>
        <Button
          variant={projectFilter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => setProjectFilter("active")}
        >
          Activos
        </Button>
        <Button
          variant={projectFilter === "planning" ? "default" : "outline"}
          size="sm"
          onClick={() => setProjectFilter("planning")}
        >
          En Planificación
        </Button>
        <Button
          variant={projectFilter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setProjectFilter("completed")}
        >
          Completados
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="map">Mapa</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProjectMetricCard
              title="Proyectos Activos"
              value="8"
              icon={<CheckCircle className="h-4 w-4" />}
              status="success"
            />
            <ProjectMetricCard
              title="En Planificación"
              value="3"
              icon={<Clock className="h-4 w-4" />}
              status="warning"
            />
            <ProjectMetricCard
              title="Capacidad Total"
              value="245 MW"
              icon={<BarChart2 className="h-4 w-4" />}
              status="info"
            />
          </div>

          <div className="space-y-4">
            <ProjectCard
              name="Parque Solar Norte"
              location="Almería, España"
              type="solar"
              capacity="85 MW"
              status="active"
              completion={100}
              lastUpdate="Actualizado hace 2 horas"
            />
            <ProjectCard
              name="Parque Eólico Este"
              location="Cádiz, España"
              type="wind"
              capacity="120 MW"
              status="active"
              completion={100}
              lastUpdate="Actualizado hace 1 hora"
            />
            <ProjectCard
              name="Central Hidroeléctrica Sur"
              location="Granada, España"
              type="hydro"
              capacity="40 MW"
              status="active"
              completion={100}
              lastUpdate="Actualizado hace 3 horas"
            />
            <ProjectCard
              name="Parque Solar Oeste"
              location="Huelva, España"
              type="solar"
              capacity="65 MW"
              status="planning"
              completion={45}
              lastUpdate="Actualizado ayer"
            />
            <ProjectCard
              name="Parque Eólico Norte"
              location="Asturias, España"
              type="wind"
              capacity="90 MW"
              status="planning"
              completion={30}
              lastUpdate="Actualizado hace 2 días"
            />
          </div>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Distribución Geográfica</CardTitle>
              <CardDescription>Visualización de todos los proyectos en el mapa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Mapa interactivo de proyectos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProjectMetricCard({
  title,
  value,
  icon,
  status,
}: {
  title: string
  value: string
  icon: React.ReactNode
  status: "success" | "warning" | "info"
}) {
  const statusColors = {
    success: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className={`mr-2 rounded-full p-1 ${statusColors[status]}`}>{icon}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectCard({
  name,
  location,
  type,
  capacity,
  status,
  completion,
  lastUpdate,
}: {
  name: string
  location: string
  type: "solar" | "wind" | "hydro"
  capacity: string
  status: "active" | "planning" | "completed"
  completion: number
  lastUpdate: string
}) {
  const typeIcons = {
    solar: <Sun className="h-4 w-4" />,
    wind: <Wind className="h-4 w-4" />,
    hydro: <Droplet className="h-4 w-4" />,
  }

  const statusColors = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    planning: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
    completed: "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300",
  }

  const statusLabels = {
    active: "Activo",
    planning: "En Planificación",
    completed: "Completado",
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`rounded-full p-1 ${
                  type === "solar"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
                    : type === "wind"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                      : "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300"
                }`}
              >
                {typeIcons[type]}
              </div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <Badge variant="outline" className={statusColors[status]}>
                {statusLabels[status]}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {location}
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Capacidad</p>
                <p className="text-sm font-medium">{capacity}</p>
              </div>
              {status === "planning" && (
                <div>
                  <p className="text-xs text-muted-foreground">Progreso</p>
                  <div className="flex items-center gap-2">
                    <Progress value={completion} className="h-2 w-20" />
                    <span className="text-xs">{completion}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-xs text-muted-foreground">{lastUpdate}</div>
            <Button variant="outline" size="sm">
              Ver detalles
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
