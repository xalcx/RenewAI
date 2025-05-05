"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, Calendar, CheckCircle, ArrowRight, Settings, RefreshCw } from "lucide-react"

// Tipos de equipos
interface Equipment {
  id: string
  name: string
  type: "turbine" | "panel" | "inverter" | "transformer" | "battery"
  location: string
  health: number
  lastMaintenance: string
  nextMaintenance: string
  estimatedLifespan: number
  currentAge: number
  failureProbability: number
  criticalComponents: {
    name: string
    health: number
    estimatedRemainingDays: number
  }[]
}

// Datos simulados
const EQUIPMENT_DATA: Equipment[] = [
  {
    id: "turbine-01",
    name: "Turbina Eólica #01",
    type: "turbine",
    location: "Parque Eólico Norte",
    health: 78,
    lastMaintenance: "15/03/2025",
    nextMaintenance: "15/06/2025",
    estimatedLifespan: 20 * 365, // días
    currentAge: 3 * 365 + 120, // días
    failureProbability: 0.12,
    criticalComponents: [
      { name: "Rodamientos principales", health: 65, estimatedRemainingDays: 45 },
      { name: "Sistema de transmisión", health: 82, estimatedRemainingDays: 120 },
      { name: "Generador", health: 88, estimatedRemainingDays: 180 },
      { name: "Sistema de control", health: 91, estimatedRemainingDays: 210 },
    ],
  },
  {
    id: "panel-array-05",
    name: "Array de Paneles #05",
    type: "panel",
    location: "Parque Solar Este",
    health: 92,
    lastMaintenance: "10/04/2025",
    nextMaintenance: "10/10/2025",
    estimatedLifespan: 25 * 365, // días
    currentAge: 1 * 365 + 80, // días
    failureProbability: 0.05,
    criticalComponents: [
      { name: "Células fotovoltaicas", health: 94, estimatedRemainingDays: 300 },
      { name: "Conexiones eléctricas", health: 89, estimatedRemainingDays: 180 },
      { name: "Estructura de montaje", health: 96, estimatedRemainingDays: 400 },
    ],
  },
  {
    id: "inverter-03",
    name: "Inversor #03",
    type: "inverter",
    location: "Parque Solar Este",
    health: 62,
    lastMaintenance: "05/02/2025",
    nextMaintenance: "05/05/2025",
    estimatedLifespan: 10 * 365, // días
    currentAge: 4 * 365 + 45, // días
    failureProbability: 0.28,
    criticalComponents: [
      { name: "Capacitores", health: 58, estimatedRemainingDays: 30 },
      { name: "Sistema de refrigeración", health: 65, estimatedRemainingDays: 45 },
      { name: "Circuitos de control", health: 72, estimatedRemainingDays: 60 },
    ],
  },
  {
    id: "transformer-02",
    name: "Transformador #02",
    type: "transformer",
    location: "Subestación Central",
    health: 85,
    lastMaintenance: "20/01/2025",
    nextMaintenance: "20/07/2025",
    estimatedLifespan: 30 * 365, // días
    currentAge: 5 * 365 + 200, // días
    failureProbability: 0.08,
    criticalComponents: [
      { name: "Bobinados", health: 87, estimatedRemainingDays: 240 },
      { name: "Sistema de refrigeración", health: 83, estimatedRemainingDays: 180 },
      { name: "Aislamiento", health: 86, estimatedRemainingDays: 210 },
    ],
  },
  {
    id: "battery-storage-01",
    name: "Almacenamiento de Baterías #01",
    type: "battery",
    location: "Centro de Almacenamiento",
    health: 73,
    lastMaintenance: "12/03/2025",
    nextMaintenance: "12/06/2025",
    estimatedLifespan: 8 * 365, // días
    currentAge: 2 * 365 + 150, // días
    failureProbability: 0.15,
    criticalComponents: [
      { name: "Celdas de batería", health: 75, estimatedRemainingDays: 90 },
      { name: "Sistema de gestión (BMS)", health: 82, estimatedRemainingDays: 120 },
      { name: "Sistema de refrigeración", health: 70, estimatedRemainingDays: 75 },
    ],
  },
]

export function PredictiveMaintenancePanel() {
  const [selectedEquipment, setSelectedEquipment] = useState<string>(EQUIPMENT_DATA[0].id)
  const [timeframe, setTimeframe] = useState<"days" | "weeks" | "months">("days")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [locationFilter, setLocationFilter] = useState<string>("all")

  // Obtener el equipo seleccionado
  const equipment = EQUIPMENT_DATA.find((eq) => eq.id === selectedEquipment) || EQUIPMENT_DATA[0]

  // Filtrar equipos por ubicación
  const filteredEquipment = EQUIPMENT_DATA.filter((eq) => locationFilter === "all" || eq.location === locationFilter)

  // Obtener ubicaciones únicas para el filtro
  const uniqueLocations = Array.from(new Set(EQUIPMENT_DATA.map((eq) => eq.location)))

  // Función para convertir días a la unidad de tiempo seleccionada
  const formatTimeRemaining = (days: number): string => {
    if (timeframe === "weeks") {
      const weeks = Math.floor(days / 7)
      const remainingDays = days % 7
      return `${weeks} semanas${remainingDays > 0 ? ` y ${remainingDays} días` : ""}`
    } else if (timeframe === "months") {
      const months = Math.floor(days / 30)
      const remainingDays = days % 30
      return `${months} meses${remainingDays > 0 ? ` y ${remainingDays} días` : ""}`
    } else {
      return `${days} días`
    }
  }

  // Función para obtener el color según el estado de salud
  const getHealthColor = (health: number): string => {
    if (health >= 85) return "bg-green-500"
    if (health >= 70) return "bg-yellow-500"
    if (health >= 50) return "bg-orange-500"
    return "bg-red-500"
  }

  // Función para obtener la clase de color según el estado de salud
  const getHealthClass = (health: number): string => {
    if (health >= 85) return "text-green-600 dark:text-green-400"
    if (health >= 70) return "text-yellow-600 dark:text-yellow-400"
    if (health >= 50) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  // Función para obtener la clase de badge según el estado de salud
  const getHealthBadgeClass = (health: number): string => {
    if (health >= 85) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    if (health >= 70) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    if (health >= 50) return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  }

  // Simular actualización de datos
  const refreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  // Efecto para simular actualización periódica
  useEffect(() => {
    const interval = setInterval(() => {
      // Aquí se podría implementar una actualización real de datos
    }, 60000) // Actualizar cada minuto

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mantenimiento Predictivo</h2>
          <p className="text-muted-foreground">Predicción de fallos y planificación de mantenimiento basado en IA</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por ubicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ubicaciones</SelectItem>
              {uniqueLocations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={refreshData} disabled={isRefreshing} className="h-9 w-9">
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredEquipment.slice(0, 3).map((eq) => (
          <Card
            key={eq.id}
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              selectedEquipment === eq.id ? "ring-2 ring-green-500 dark:ring-green-400" : ""
            }`}
            onClick={() => setSelectedEquipment(eq.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{eq.name}</CardTitle>
                  <CardDescription>{eq.location}</CardDescription>
                </div>
                <Badge className={getHealthBadgeClass(eq.health)}>{eq.health}% Salud</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Estado de salud</span>
                    <span className={getHealthClass(eq.health)}>{eq.health}%</span>
                  </div>
                  <Progress value={eq.health} className="h-2" indicatorClassName={getHealthColor(eq.health)} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Próximo mantenimiento</span>
                  <span>{eq.nextMaintenance}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Prob. de fallo</span>
                  <span className={eq.failureProbability > 0.2 ? "text-red-500" : "text-green-500"}>
                    {(eq.failureProbability * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Detalles de Mantenimiento Predictivo</CardTitle>
              <CardDescription>
                {equipment.name} - {equipment.location}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeframe} onValueChange={(v) => setTimeframe(v as any)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Unidad de tiempo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Días</SelectItem>
                  <SelectItem value="weeks">Semanas</SelectItem>
                  <SelectItem value="months">Meses</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="components">Componentes</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tiempo estimado hasta el próximo fallo</p>
                      <p className="text-xl font-bold">
                        {formatTimeRemaining(
                          Math.min(...equipment.criticalComponents.map((c) => c.estimatedRemainingDays)),
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Probabilidad de fallo</p>
                      <p className="text-xl font-bold">{(equipment.failureProbability * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Próximo mantenimiento programado</p>
                      <p className="text-xl font-bold">{equipment.nextMaintenance}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Estado de salud general</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Estado actual</span>
                    <span className={getHealthClass(equipment.health)}>{equipment.health}%</span>
                  </div>
                  <Progress
                    value={equipment.health}
                    className="h-3"
                    indicatorClassName={getHealthColor(equipment.health)}
                  />
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Ciclo de vida</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Edad actual</span>
                        <span>{formatTimeRemaining(equipment.currentAge)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Vida útil estimada</span>
                        <span>{formatTimeRemaining(equipment.estimatedLifespan)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Porcentaje de vida consumido</span>
                        <span>{Math.round((equipment.currentAge / equipment.estimatedLifespan) * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Mantenimiento</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Último mantenimiento</span>
                        <span>{equipment.lastMaintenance}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Próximo mantenimiento</span>
                        <span>{equipment.nextMaintenance}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Costo estimado</span>
                        <span>€2,450</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="components" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Componentes críticos</h3>
                <div className="space-y-6">
                  {equipment.criticalComponents.map((component, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{component.name}</h4>
                        <Badge className={getHealthBadgeClass(component.health)}>{component.health}% Salud</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Estado de salud</span>
                          <span className={getHealthClass(component.health)}>{component.health}%</span>
                        </div>
                        <Progress
                          value={component.health}
                          className="h-2"
                          indicatorClassName={getHealthColor(component.health)}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tiempo estimado hasta fallo</span>
                        <span
                          className={
                            component.estimatedRemainingDays < 60
                              ? "text-red-500"
                              : component.estimatedRemainingDays < 120
                                ? "text-yellow-500"
                                : "text-green-500"
                          }
                        >
                          {formatTimeRemaining(component.estimatedRemainingDays)}
                        </span>
                      </div>
                      {index < equipment.criticalComponents.length - 1 && (
                        <div className="pt-4 border-b border-gray-200 dark:border-gray-700"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  Programar mantenimiento preventivo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Historial de mantenimiento</h3>
                <div className="space-y-4">
                  {[...Array(4)].map((_, index) => {
                    const date = new Date()
                    date.setMonth(date.getMonth() - (index + 1))
                    const formattedDate = date.toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })

                    return (
                      <div key={index} className="flex items-start space-x-4 p-3 rounded-lg border">
                        <div className="p-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">Mantenimiento {index === 0 ? "preventivo" : "rutinario"}</h4>
                            <span className="text-sm text-muted-foreground">{formattedDate}</span>
                          </div>
                          <p className="text-sm mt-1">
                            {index === 0
                              ? "Reemplazo de rodamientos y calibración del sistema de control"
                              : index === 1
                                ? "Inspección general y limpieza de componentes"
                                : index === 2
                                  ? "Actualización de firmware y ajuste de parámetros"
                                  : "Mantenimiento rutinario y verificación de sensores"}
                          </p>
                          <div className="flex justify-between mt-2">
                            <span className="text-xs text-muted-foreground">Técnico: Juan Pérez</span>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              Ver detalles
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Exportar datos</Button>
          <Button>Programar mantenimiento</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
