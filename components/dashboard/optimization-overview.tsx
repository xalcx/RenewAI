"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, ArrowRight, Settings, Lightbulb, Check, AlertTriangle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function OptimizationOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Optimización Inteligente</h2>
        <p className="text-muted-foreground">
          Optimiza tus instalaciones renovables con recomendaciones basadas en IA.
        </p>
      </div>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
          <TabsTrigger value="scenarios">Escenarios</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <OptimizationMetricCard
              title="Ahorro Potencial"
              value="12.5%"
              icon={<TrendingUp className="h-4 w-4" />}
              description="Ahorro mensual estimado"
            />
            <OptimizationMetricCard
              title="Mejora de Eficiencia"
              value="8.3%"
              icon={<Zap className="h-4 w-4" />}
              description="Incremento de producción"
            />
            <OptimizationMetricCard
              title="Recomendaciones"
              value="7"
              icon={<Lightbulb className="h-4 w-4" />}
              description="Acciones sugeridas"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones de Optimización</CardTitle>
              <CardDescription>
                Sugerencias generadas por nuestro sistema de IA para mejorar el rendimiento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <OptimizationRecommendation
                  title="Ajuste de ángulo en paneles solares"
                  location="Parque Solar Norte"
                  impact="Alto"
                  improvement="5.2%"
                  complexity="Baja"
                  status="pending"
                />
                <OptimizationRecommendation
                  title="Redistribución de cargas en inversores"
                  location="Parque Solar Norte"
                  impact="Medio"
                  improvement="2.8%"
                  complexity="Media"
                  status="in_progress"
                />
                <OptimizationRecommendation
                  title="Optimización de pitch en turbinas"
                  location="Parque Eólico Este"
                  impact="Alto"
                  improvement="4.5%"
                  complexity="Media"
                  status="pending"
                />
                <OptimizationRecommendation
                  title="Ajuste de algoritmo de seguimiento solar"
                  location="Parque Solar Norte"
                  impact="Medio"
                  improvement="3.1%"
                  complexity="Baja"
                  status="pending"
                />
                <OptimizationRecommendation
                  title="Calibración de sensores meteorológicos"
                  location="Parque Eólico Este"
                  impact="Bajo"
                  improvement="1.2%"
                  complexity="Baja"
                  status="completed"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Simulación de Escenarios</CardTitle>
              <CardDescription>Analiza diferentes escenarios para optimizar tus instalaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ScenarioCard
                  title="Escenario Base"
                  description="Configuración actual sin cambios"
                  production="100%"
                  efficiency="Referencia"
                  isActive={true}
                />
                <ScenarioCard
                  title="Optimización Agresiva"
                  description="Aplicar todas las recomendaciones de alto impacto"
                  production="112.5%"
                  efficiency="+12.5%"
                  isActive={false}
                />
                <ScenarioCard
                  title="Optimización Conservadora"
                  description="Aplicar solo recomendaciones de baja complejidad"
                  production="104.3%"
                  efficiency="+4.3%"
                  isActive={false}
                />
                <ScenarioCard
                  title="Optimización Balanceada"
                  description="Equilibrio entre impacto y complejidad"
                  production="108.7%"
                  efficiency="+8.7%"
                  isActive={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Optimización</CardTitle>
              <CardDescription>Personaliza los parámetros del sistema de optimización</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Prioridades de Optimización</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Producción Energética</span>
                      <div className="w-32">
                        <Progress value={80} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Reducción de Costes</span>
                      <div className="w-32">
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Vida Útil de Equipos</span>
                      <div className="w-32">
                        <Progress value={40} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Frecuencia de Análisis</h3>
                  <div className="flex items-center space-x-2">
                    <Badge>Diario</Badge>
                    <Badge variant="outline">Semanal</Badge>
                    <Badge variant="outline">Mensual</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Notificaciones</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Recomendaciones de Alto Impacto</span>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      >
                        Activado
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Recomendaciones de Medio Impacto</span>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      >
                        Activado
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Recomendaciones de Bajo Impacto</span>
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300"
                      >
                        Desactivado
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración Avanzada
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OptimizationMetricCard({
  title,
  value,
  icon,
  description,
}: {
  title: string
  value: string
  icon: React.ReactNode
  description: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-1 rounded-full">{icon}</div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

function OptimizationRecommendation({
  title,
  location,
  impact,
  improvement,
  complexity,
  status,
}: {
  title: string
  location: string
  impact: "Alto" | "Medio" | "Bajo"
  improvement: string
  complexity: "Alta" | "Media" | "Baja"
  status: "pending" | "in_progress" | "completed"
}) {
  const impactColors = {
    Alto: "text-green-600",
    Medio: "text-blue-600",
    Bajo: "text-gray-600",
  }

  const statusIcons = {
    pending: <Clock className="h-4 w-4" />,
    in_progress: <AlertTriangle className="h-4 w-4" />,
    completed: <Check className="h-4 w-4" />,
  }

  const statusLabels = {
    pending: "Pendiente",
    in_progress: "En Progreso",
    completed: "Completado",
  }

  const statusColors = {
    pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
    in_progress: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  }

  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg border">
      <div className={`mt-0.5 rounded-full p-1.5 ${statusColors[status]}`}>{statusIcons[status]}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{title}</h4>
          <Badge variant="outline" className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{location}</p>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Impacto</p>
            <p className={`text-sm ${impactColors[impact]}`}>{impact}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Mejora</p>
            <p className="text-sm text-green-600">{improvement}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Complejidad</p>
            <p className="text-sm">{complexity}</p>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Button variant="ghost" size="sm" className="h-8">
            Aplicar
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ScenarioCard({
  title,
  description,
  production,
  efficiency,
  isActive,
}: {
  title: string
  description: string
  production: string
  efficiency: string
  isActive: boolean
}) {
  return (
    <div className={`p-4 rounded-lg border ${isActive ? "border-primary bg-primary/5" : ""}`}>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{title}</h4>
        {isActive && <Badge variant="default">Activo</Badge>}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div>
          <p className="text-xs text-muted-foreground">Producción</p>
          <p className="text-sm font-medium">{production}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Eficiencia</p>
          <p className="text-sm font-medium">{efficiency}</p>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        {!isActive ? (
          <Button variant="outline" size="sm">
            Activar Escenario
          </Button>
        ) : (
          <Button variant="ghost" size="sm" disabled>
            Escenario Activo
          </Button>
        )}
      </div>
    </div>
  )
}
