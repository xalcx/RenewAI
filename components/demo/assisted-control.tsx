"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Wind, BarChart2, Zap, Clock, ArrowUp, Terminal, Battery } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Tipos para los puntos del parque
interface ParkPoint {
  id: string
  name: string
  type: "turbine" | "inverter" | "battery"
  x: number
  y: number
  currentEnergy: number
  optimizedEnergy: number
  uplift: number
  status: "normal" | "warning" | "critical"
  recommendation?: string
  action?: string
  impact?: number
}

// Tipos para los datos de series temporales
interface TimeSeriesData {
  time: string
  current: number
  optimized: number
  marker?: boolean
  markerLabel?: string
}

// Tipos para los logs
interface LogEntry {
  id: string
  timestamp: Date
  type: "info" | "success" | "warning" | "error"
  message: string
}

export default function AssistedControl() {
  // Estados
  const [isPilotMode, setIsPilotMode] = useState(false)
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [parkPoints, setParkPoints] = useState<ParkPoint[]>([])
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("map")
  const [appliedRecommendations, setAppliedRecommendations] = useState<string[]>([])
  const [totalUplift, setTotalUplift] = useState(0)
  const [totalEnergyGain, setTotalEnergyGain] = useState(0)

  const logsEndRef = useRef<HTMLDivElement>(null)

  // Generar datos iniciales
  useEffect(() => {
    generateInitialData()
  }, [])

  // Scroll automático para los logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs])

  // Función para generar datos iniciales
  const generateInitialData = () => {
    setIsLoading(true)

    // Generar puntos del parque
    const points: ParkPoint[] = [
      {
        id: "t1",
        name: "Turbina 1",
        type: "turbine",
        x: 20,
        y: 30,
        currentEnergy: 420,
        optimizedEnergy: 432,
        uplift: 2.9,
        status: "normal",
      },
      {
        id: "t2",
        name: "Turbina 2",
        type: "turbine",
        x: 35,
        y: 25,
        currentEnergy: 380,
        optimizedEnergy: 410,
        uplift: 7.9,
        status: "critical",
        recommendation: "Ajustar ángulo yaw +3.5°",
        action: "Enviar set-point yaw +3.5°",
        impact: 30,
      },
      {
        id: "t3",
        name: "Turbina 3",
        type: "turbine",
        x: 50,
        y: 20,
        currentEnergy: 405,
        optimizedEnergy: 415,
        uplift: 2.5,
        status: "warning",
        recommendation: "Ajustar ángulo pitch -1.2°",
        action: "Enviar set-point pitch -1.2°",
        impact: 10,
      },
      {
        id: "t4",
        name: "Turbina 4",
        type: "turbine",
        x: 65,
        y: 30,
        currentEnergy: 390,
        optimizedEnergy: 390,
        uplift: 0,
        status: "normal",
      },
      {
        id: "t5",
        name: "Turbina 5",
        type: "turbine",
        x: 80,
        y: 25,
        currentEnergy: 350,
        optimizedEnergy: 385,
        uplift: 10,
        status: "critical",
        recommendation: "Ajustar ángulo yaw -2.8°",
        action: "Enviar set-point yaw -2.8°",
        impact: 35,
      },
      {
        id: "i1",
        name: "Inversor 1",
        type: "inverter",
        x: 30,
        y: 60,
        currentEnergy: 780,
        optimizedEnergy: 810,
        uplift: 3.8,
        status: "warning",
        recommendation: "Optimizar MPPT",
        action: "Actualizar parámetros MPPT",
        impact: 30,
      },
      {
        id: "i2",
        name: "Inversor 2",
        type: "inverter",
        x: 70,
        y: 60,
        currentEnergy: 760,
        optimizedEnergy: 760,
        uplift: 0,
        status: "normal",
      },
      {
        id: "b1",
        name: "Batería 1",
        type: "battery",
        x: 50,
        y: 75,
        currentEnergy: 120,
        optimizedEnergy: 150,
        uplift: 25,
        status: "critical",
        recommendation: "Ejecutar ciclo de ecualización",
        action: "Iniciar ciclo de ecualización",
        impact: 30,
      },
    ]

    // Generar datos de series temporales
    const timeData: TimeSeriesData[] = []
    const now = new Date()
    const baseValue = 2500

    for (let i = 0; i < 24; i++) {
      const time = new Date(now)
      time.setHours(now.getHours() - 23 + i)

      // Patrón diurno para la generación
      const hourFactor = Math.sin(((time.getHours() - 6) * Math.PI) / 12)
      const dayFactor = hourFactor > 0 ? hourFactor : 0

      // Valores actuales y optimizados
      const current = Math.round(baseValue * dayFactor * (0.85 + Math.random() * 0.1))
      const optimized = i < 18 ? current : Math.round(current * (1.05 + Math.random() * 0.05))

      timeData.push({
        time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        current,
        optimized,
        marker: i === 18,
        markerLabel: i === 18 ? "Inicio optimización" : undefined,
      })
    }

    // Logs iniciales
    const initialLogs: LogEntry[] = [
      {
        id: "log1",
        timestamp: new Date(Date.now() - 3600000),
        type: "info",
        message: "Sistema GreenOps Intelligence iniciado en modo Shadow",
      },
      {
        id: "log2",
        timestamp: new Date(Date.now() - 1800000),
        type: "info",
        message: "Análisis de rendimiento completado",
      },
      {
        id: "log3",
        timestamp: new Date(Date.now() - 900000),
        type: "warning",
        message: "Detectada desalineación en Turbina 2 y Turbina 5",
      },
      {
        id: "log4",
        timestamp: new Date(Date.now() - 600000),
        type: "info",
        message: "Recomendaciones generadas: 4 acciones disponibles",
      },
    ]

    // Actualizar estados
    setParkPoints(points)
    setTimeSeriesData(timeData)
    setLogs(initialLogs)

    // Calcular uplift total inicial
    const initialUplift = calculateTotalUplift(points, [])
    setTotalUplift(initialUplift.upliftPercentage)
    setTotalEnergyGain(initialUplift.energyGain)

    setIsLoading(false)
  }

  // Función para calcular el uplift total
  const calculateTotalUplift = (points: ParkPoint[], applied: string[]) => {
    let totalCurrent = 0
    let totalOptimized = 0

    points.forEach((point) => {
      totalCurrent += point.currentEnergy

      // Si la recomendación ya se aplicó, usar el valor optimizado
      if (point.recommendation && applied.includes(point.id)) {
        totalOptimized += point.optimizedEnergy
      } else {
        totalOptimized += point.currentEnergy
      }
    })

    const upliftPercentage = Number.parseFloat(((totalOptimized / totalCurrent - 1) * 100).toFixed(1))
    const energyGain = totalOptimized - totalCurrent

    return { upliftPercentage, energyGain }
  }

  // Función para aplicar una recomendación
  const applyRecommendation = (pointId: string) => {
    if (!isPilotMode) return

    const point = parkPoints.find((p) => p.id === pointId)
    if (!point || !point.recommendation || appliedRecommendations.includes(pointId)) return

    // Añadir logs
    addLog("info", `Aplicando recomendación: ${point.recommendation} en ${point.name}`)

    // Simular tiempo de procesamiento
    setTimeout(() => {
      // Añadir a recomendaciones aplicadas
      const newApplied = [...appliedRecommendations, pointId]
      setAppliedRecommendations(newApplied)

      // Actualizar uplift total
      const newUplift = calculateTotalUplift(parkPoints, newApplied)
      setTotalUplift(newUplift.upliftPercentage)
      setTotalEnergyGain(newUplift.energyGain)

      // Actualizar series temporales
      updateTimeSeriesAfterRecommendation(point)

      // Añadir log de éxito
      addLog("success", `Recomendación aplicada con éxito en ${point.name}. Ganancia estimada: ${point.impact} kWh`)
    }, 1500)
  }

  // Función para actualizar series temporales después de aplicar recomendación
  const updateTimeSeriesAfterRecommendation = (point: ParkPoint) => {
    const newTimeSeriesData = [...timeSeriesData]

    // Añadir un marcador en el punto actual
    const currentHour = new Date().getHours()
    const currentIndex = newTimeSeriesData.findIndex((d) => {
      const hour = Number.parseInt(d.time.split(":")[0])
      return hour === currentHour
    })

    if (currentIndex >= 0) {
      newTimeSeriesData[currentIndex] = {
        ...newTimeSeriesData[currentIndex],
        marker: true,
        markerLabel: `Aplicado: ${point.name}`,
      }

      // Actualizar valores futuros para mostrar mejora
      for (let i = currentIndex + 1; i < newTimeSeriesData.length; i++) {
        const upliftFactor = 1 + point.uplift / 100
        newTimeSeriesData[i] = {
          ...newTimeSeriesData[i],
          current: Math.round(newTimeSeriesData[i].optimized),
        }
      }

      setTimeSeriesData(newTimeSeriesData)
    }
  }

  // Función para añadir un log
  const addLog = (type: "info" | "success" | "warning" | "error", message: string) => {
    const newLog: LogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date(),
      type,
      message,
    }

    setLogs((prev) => [...prev, newLog])
  }

  // Función para cambiar entre modos Shadow y Pilot
  const togglePilotMode = () => {
    const newMode = !isPilotMode
    setIsPilotMode(newMode)

    if (newMode) {
      addLog("warning", "¡MODO PILOTO ACTIVADO! Las recomendaciones se aplicarán directamente al sistema")
    } else {
      addLog("info", "Modo Shadow activado. Las recomendaciones se mostrarán sin aplicarse")
    }
  }

  // Obtener recomendaciones ordenadas por impacto
  const getOrderedRecommendations = () => {
    return parkPoints
      .filter((point) => point.recommendation && !appliedRecommendations.includes(point.id))
      .sort((a, b) => (b.impact || 0) - (a.impact || 0))
  }

  // Renderizar el mapa del parque
  const renderParkMap = () => {
    return (
      <div className="relative h-[500px] border rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {/* Grid de fondo */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border border-gray-400 dark:border-gray-600"></div>
          ))}
        </div>

        {/* Puntos del parque */}
        {parkPoints.map((point) => {
          const isApplied = appliedRecommendations.includes(point.id)
          const isSelected = selectedPoint === point.id

          return (
            <div
              key={point.id}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300",
                isSelected ? "z-10" : "z-0",
              )}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              onClick={() => setSelectedPoint(point.id)}
            >
              {/* Pulso de fondo para puntos críticos */}
              {point.status !== "normal" && !isApplied && (
                <motion.div
                  className={cn(
                    "absolute inset-0 rounded-full -z-10",
                    point.status === "critical" ? "bg-red-500" : "bg-yellow-500",
                  )}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Icono del punto */}
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2",
                  isSelected ? "ring-2 ring-primary" : "",
                  isApplied
                    ? "bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-400"
                    : point.status === "critical"
                      ? "bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-400"
                      : point.status === "warning"
                        ? "bg-yellow-100 border-yellow-500 dark:bg-yellow-900 dark:border-yellow-400"
                        : "bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-400",
                )}
              >
                {point.type === "turbine" ? (
                  <Wind
                    className={cn(
                      "h-5 w-5",
                      isApplied
                        ? "text-green-600 dark:text-green-400"
                        : point.status === "critical"
                          ? "text-red-600 dark:text-red-400"
                          : point.status === "warning"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-blue-600 dark:text-blue-400",
                    )}
                  />
                ) : point.type === "inverter" ? (
                  <Zap
                    className={cn(
                      "h-5 w-5",
                      isApplied
                        ? "text-green-600 dark:text-green-400"
                        : point.status === "critical"
                          ? "text-red-600 dark:text-red-400"
                          : point.status === "warning"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-blue-600 dark:text-blue-400",
                    )}
                  />
                ) : (
                  <Battery
                    className={cn(
                      "h-5 w-5",
                      isApplied
                        ? "text-green-600 dark:text-green-400"
                        : point.status === "critical"
                          ? "text-red-600 dark:text-red-400"
                          : point.status === "warning"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-blue-600 dark:text-blue-400",
                    )}
                  />
                )}
              </div>

              {/* Tooltip */}
              {isSelected && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-20 w-64">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{point.name}</h4>
                    <Badge
                      variant={
                        isApplied
                          ? "default"
                          : point.status === "critical"
                            ? "destructive"
                            : point.status === "warning"
                              ? "outline"
                              : "secondary"
                      }
                    >
                      {isApplied
                        ? "Optimizado"
                        : point.status === "critical"
                          ? "Crítico"
                          : point.status === "warning"
                            ? "Advertencia"
                            : "Normal"}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Energía actual:</span>
                      <span>{point.currentEnergy} kWh</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Energía optimizada:</span>
                      <span className="font-medium">{point.optimizedEnergy} kWh</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uplift potencial:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">+{point.uplift}%</span>
                    </div>

                    {point.recommendation && (
                      <>
                        <div className="pt-2 border-t">
                          <p className="font-medium">Recomendación:</p>
                          <p className="text-muted-foreground">{point.recommendation}</p>
                        </div>

                        {isPilotMode && !isApplied && (
                          <Button
                            size="sm"
                            className="w-full mt-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              applyRecommendation(point.id)
                            }}
                          >
                            {point.action || "Aplicar recomendación"}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Control Asistido GreenOps Intelligence™</h2>
            <p className="text-muted-foreground">
              Optimización en tiempo real con recomendaciones asistidas por IA para maximizar la producción energética
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="pilot-mode" checked={isPilotMode} onCheckedChange={togglePilotMode} />
              <Label htmlFor="pilot-mode" className="font-medium">
                {isPilotMode ? "Modo Pilot" : "Modo Shadow"}
              </Label>
            </div>

            <Badge
              variant={isPilotMode ? "default" : "outline"}
              className={cn("text-sm py-1 px-3", isPilotMode ? "bg-green-500 hover:bg-green-600" : "")}
            >
              {isPilotMode ? "ACTIVO" : "INACTIVO"}
            </Badge>
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUp className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Uplift actual</h3>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">+{totalUplift}%</p>
                <p className="text-sm text-muted-foreground">en producción</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Ganancia energética</h3>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">+{totalEnergyGain} kWh</p>
                <p className="text-sm text-muted-foreground">diarios</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium">Tiempo de respuesta</h3>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">-30%</p>
                <p className="text-sm text-muted-foreground">MTTR</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido principal */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <span>Mapa del parque</span>
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex items-center gap-2">
              <span>Análisis temporal</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <span>Recomendaciones</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="m-0">
            {isLoading ? (
              <div className="flex items-center justify-center h-[500px] bg-muted/20 rounded-lg">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Cargando mapa del parque...</p>
                </div>
              </div>
            ) : (
              renderParkMap()
            )}
          </TabsContent>

          <TabsContent value="chart" className="m-0">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Producción energética (24h)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comparativa entre producción actual y optimizada con GreenOps Intelligence™
                </p>

                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="time" />
                      <YAxis
                        label={{
                          value: "Energía (kWh)",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle" },
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="current"
                        name="Producción actual"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{ r: 1 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="optimized"
                        name="Producción optimizada"
                        stroke="#10B981"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 1 }}
                        activeDot={{ r: 5 }}
                      />
                      {timeSeriesData.map((entry, index) =>
                        entry.marker ? (
                          <ReferenceDot
                            key={`marker-${index}`}
                            x={entry.time}
                            y={entry.current}
                            r={6}
                            fill="#EF4444"
                            stroke="none"
                          />
                        ) : null,
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Leyenda de marcadores */}
                <div className="flex items-center gap-2 mt-4 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-muted-foreground">Marcadores de aplicación de recomendaciones</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="m-0">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-4">Recomendaciones ordenadas por ROI</h3>

                {getOrderedRecommendations().length > 0 ? (
                  <div className="space-y-4">
                    {getOrderedRecommendations().map((point) => (
                      <Card key={point.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {point.type === "turbine" ? (
                                  <Wind className="h-4 w-4 text-blue-500" />
                                ) : point.type === "inverter" ? (
                                  <Zap className="h-4 w-4 text-yellow-500" />
                                ) : (
                                  <Battery className="h-4 w-4 text-green-500" />
                                )}
                                <h4 className="font-medium">{point.name}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{point.recommendation}</p>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                                >
                                  +{point.uplift}% → +{point.impact} kWh
                                </Badge>
                              </div>
                            </div>

                            {isPilotMode && (
                              <Button size="sm" onClick={() => applyRecommendation(point.id)}>
                                Aplicar
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 border rounded-lg bg-muted/10">
                    <p className="text-muted-foreground">
                      {appliedRecommendations.length > 0
                        ? "Todas las recomendaciones han sido aplicadas"
                        : "No hay recomendaciones disponibles"}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="h-5 w-5" />
                  <h3 className="text-lg font-medium">Logs del sistema</h3>
                </div>

                <div className="border rounded-lg h-[400px] overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 font-mono text-sm">
                  {logs.map((log) => (
                    <div key={log.id} className="mb-2">
                      <span className="text-gray-500 mr-2">{log.timestamp.toLocaleTimeString()}</span>
                      <span
                        className={cn(
                          log.type === "info"
                            ? "text-blue-600 dark:text-blue-400"
                            : log.type === "success"
                              ? "text-green-600 dark:text-green-400"
                              : log.type === "warning"
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-red-600 dark:text-red-400",
                        )}
                      >
                        [{log.type.toUpperCase()}]
                      </span>
                      <span className="ml-2">{log.message}</span>
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Beneficios */}
        <div className="mt-4 p-6 border rounded-lg bg-muted/10">
          <h3 className="text-lg font-medium mb-4">Beneficios del Control Asistido GreenOps Intelligence™</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                <ArrowUp className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">+1 MWh diario</p>
                <p className="text-sm text-muted-foreground">
                  Incremento de producción mediante optimización en tiempo real
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">-30% MTTR</p>
                <p className="text-sm text-muted-foreground">
                  Reducción del tiempo medio de respuesta ante incidencias
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                <BarChart2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">ROI en &lt; 3 meses</p>
                <p className="text-sm text-muted-foreground">
                  Retorno de inversión rápido gracias al incremento de producción
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
