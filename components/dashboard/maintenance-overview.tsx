"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Clock, Calendar, PenToolIcon as Tool, ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MaintenanceOverview() {
  const [siteFilter, setSiteFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mantenimiento Predictivo</h2>
          <p className="text-muted-foreground">
            Monitoreo y planificación de mantenimiento basado en IA para tus instalaciones.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={siteFilter} onValueChange={setSiteFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por sitio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los sitios</SelectItem>
              <SelectItem value="solar1">Parque Solar Norte</SelectItem>
              <SelectItem value="wind1">Parque Eólico Este</SelectItem>
              <SelectItem value="hydro1">Central Hidroeléctrica Sur</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
          <TabsTrigger value="schedule">Programación</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MaintenanceMetricCard
              title="Alertas Críticas"
              value="2"
              icon={<AlertTriangle className="h-4 w-4" />}
              status="critical"
            />
            <MaintenanceMetricCard
              title="Mantenimiento Pendiente"
              value="5"
              icon={<Clock className="h-4 w-4" />}
              status="warning"
            />
            <MaintenanceMetricCard
              title="Equipos Óptimos"
              value="42"
              icon={<CheckCircle className="h-4 w-4" />}
              status="success"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alertas Activas</CardTitle>
              <CardDescription>Alertas detectadas por nuestro sistema de IA predictiva</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <MaintenanceAlert
                  title="Vibración excesiva en turbina #12"
                  location="Parque Eólico Este"
                  severity="critical"
                  timestamp="Hace 2 horas"
                  recommendation="Inspección inmediata requerida"
                />
                <MaintenanceAlert
                  title="Degradación de rendimiento en panel solar A-35"
                  location="Parque Solar Norte"
                  severity="critical"
                  timestamp="Hace 5 horas"
                  recommendation="Reemplazo recomendado en próximas 48h"
                />
                <MaintenanceAlert
                  title="Sobrecalentamiento en inversor #8"
                  location="Parque Solar Norte"
                  severity="warning"
                  timestamp="Hace 12 horas"
                  recommendation="Verificar sistema de refrigeración"
                />
                <MaintenanceAlert
                  title="Eficiencia reducida en turbina #7"
                  location="Parque Eólico Este"
                  severity="warning"
                  timestamp="Hace 1 día"
                  recommendation="Calibración recomendada"
                />
                <MaintenanceAlert
                  title="Desgaste detectado en generador #3"
                  location="Central Hidroeléctrica Sur"
                  severity="warning"
                  timestamp="Hace 2 días"
                  recommendation="Programar mantenimiento preventivo"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendario de Mantenimiento</CardTitle>
              <CardDescription>Mantenimientos programados para los próximos 30 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <MaintenanceSchedule
                  title="Mantenimiento preventivo de turbinas"
                  location="Parque Eólico Este"
                  date="25 abril, 2025"
                  technician="Equipo Alpha"
                  duration="8 horas"
                  status="scheduled"
                />
                <MaintenanceSchedule
                  title="Limpieza de paneles solares"
                  location="Parque Solar Norte"
                  date="27 abril, 2025"
                  technician="Equipo Beta"
                  duration="6 horas"
                  status="scheduled"
                />
                <MaintenanceSchedule
                  title="Reemplazo de panel solar A-35"
                  location="Parque Solar Norte"
                  date="28 abril, 2025"
                  technician="Equipo Beta"
                  duration="2 horas"
                  status="critical"
                />
                <MaintenanceSchedule
                  title="Calibración de sensores"
                  location="Central Hidroeléctrica Sur"
                  date="2 mayo, 2025"
                  technician="Equipo Gamma"
                  duration="4 horas"
                  status="scheduled"
                />
                <MaintenanceSchedule
                  title="Inspección de generadores"
                  location="Central Hidroeléctrica Sur"
                  date="10 mayo, 2025"
                  technician="Equipo Gamma"
                  duration="5 horas"
                  status="scheduled"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Mantenimiento</CardTitle>
              <CardDescription>Registro de mantenimientos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <MaintenanceHistory
                  title="Reemplazo de inversor #5"
                  location="Parque Solar Norte"
                  date="15 abril, 2025"
                  technician="Equipo Beta"
                  duration="3 horas"
                  result="success"
                />
                <MaintenanceHistory
                  title="Reparación de turbina #9"
                  location="Parque Eólico Este"
                  date="12 abril, 2025"
                  technician="Equipo Alpha"
                  duration="5 horas"
                  result="success"
                />
                <MaintenanceHistory
                  title="Mantenimiento preventivo de generadores"
                  location="Central Hidroeléctrica Sur"
                  date="8 abril, 2025"
                  technician="Equipo Gamma"
                  duration="8 horas"
                  result="success"
                />
                <MaintenanceHistory
                  title="Calibración de sensores meteorológicos"
                  location="Parque Eólico Este"
                  date="5 abril, 2025"
                  technician="Equipo Alpha"
                  duration="2 horas"
                  result="partial"
                  notes="Se requiere revisión adicional"
                />
                <MaintenanceHistory
                  title="Limpieza de paneles solares"
                  location="Parque Solar Norte"
                  date="1 abril, 2025"
                  technician="Equipo Beta"
                  duration="6 horas"
                  result="success"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MaintenanceMetricCard({
  title,
  value,
  icon,
  status,
}: {
  title: string
  value: string
  icon: React.ReactNode
  status: "critical" | "warning" | "success"
}) {
  const statusColors = {
    critical: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    success: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
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

function MaintenanceAlert({
  title,
  location,
  severity,
  timestamp,
  recommendation,
}: {
  title: string
  location: string
  severity: "critical" | "warning"
  timestamp: string
  recommendation: string
}) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg border">
      <div
        className={`mt-0.5 rounded-full p-1.5 ${
          severity === "critical"
            ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
        }`}
      >
        <AlertTriangle className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{title}</h4>
          <Badge variant={severity === "critical" ? "destructive" : "outline"}>
            {severity === "critical" ? "Crítico" : "Advertencia"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{location}</p>
        <p className="text-sm mt-2">{recommendation}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          <Button variant="ghost" size="sm" className="h-8">
            Ver detalles
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function MaintenanceSchedule({
  title,
  location,
  date,
  technician,
  duration,
  status,
}: {
  title: string
  location: string
  date: string
  technician: string
  duration: string
  status: "scheduled" | "critical"
}) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg border">
      <div
        className={`mt-0.5 rounded-full p-1.5 ${
          status === "critical"
            ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
            : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
        }`}
      >
        <Calendar className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{title}</h4>
          <Badge variant={status === "critical" ? "destructive" : "secondary"}>
            {status === "critical" ? "Urgente" : "Programado"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{location}</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Fecha</p>
            <p className="text-sm">{date}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duración</p>
            <p className="text-sm">{duration}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Técnico</p>
            <p className="text-sm">{technician}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MaintenanceHistory({
  title,
  location,
  date,
  technician,
  duration,
  result,
  notes,
}: {
  title: string
  location: string
  date: string
  technician: string
  duration: string
  result: "success" | "partial" | "failed"
  notes?: string
}) {
  const resultColors = {
    success: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    partial: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    failed: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
  }

  const resultLabels = {
    success: "Completado",
    partial: "Parcial",
    failed: "Fallido",
  }

  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg border">
      <div className={`mt-0.5 rounded-full p-1.5 ${resultColors[result]}`}>
        <Tool className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{title}</h4>
          <Badge variant={result === "success" ? "outline" : result === "partial" ? "secondary" : "destructive"}>
            {resultLabels[result]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{location}</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Fecha</p>
            <p className="text-sm">{date}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duración</p>
            <p className="text-sm">{duration}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Técnico</p>
            <p className="text-sm">{technician}</p>
          </div>
        </div>
        {notes && <p className="text-sm mt-2 italic">{notes}</p>}
      </div>
    </div>
  )
}
