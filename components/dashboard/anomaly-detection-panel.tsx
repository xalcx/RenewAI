"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, BarChart3, RefreshCw, Download, Filter, Zap, Activity } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts"

// Tipos para los datos de sensores
interface SensorReading {
  timestamp: string
  value: number
  upperBand?: number
  lowerBand?: number
  movingAverage?: number
  isAnomaly?: boolean
}

interface SensorData {
  id: string
  name: string
  unit: string
  location: string
  readings: SensorReading[]
  anomalyCount: number
  lastValue: number
  normalRange: [number, number]
}

// Función para generar datos simulados con anomalías
const generateSensorData = (
  id: string,
  name: string,
  unit: string,
  location: string,
  baseValue: number,
  volatility: number,
  anomalyFrequency: number,
  anomalyMagnitude: number,
  normalRange: [number, number],
): SensorData => {
  const readings: SensorReading[] = []
  let anomalyCount = 0
  const now = new Date()

  // Generar 100 lecturas (aproximadamente 1 día de datos con lecturas cada 15 minutos)
  for (let i = 99; i >= 0; i--) {
    const time = new Date(now)
    time.setMinutes(now.getMinutes() - i * 15) // Cada 15 minutos

    // Generar un valor base con algo de ruido
    let value = baseValue + (Math.random() * 2 - 1) * volatility

    // Añadir tendencia diaria (por ejemplo, más alto durante el día)
    const hour = time.getHours()
    const dayCycle = Math.sin((hour / 24) * Math.PI * 2) * volatility * 0.5
    value += dayCycle

    // Ocasionalmente introducir anomalías
    const isAnomaly = Math.random() < anomalyFrequency
    if (isAnomaly) {
      // Anomalía positiva o negativa
      value += (Math.random() > 0.5 ? 1 : -1) * anomalyMagnitude
      anomalyCount++
    }

    readings.push({
      timestamp: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      value: Number.parseFloat(value.toFixed(2)),
      isAnomaly,
    })
  }

  // Calcular bandas de Bollinger
  const period = 20 // Período para la media móvil
  const stdDevMultiplier = 2 // Multiplicador para las bandas

  for (let i = 0; i < readings.length; i++) {
    if (i >= period - 1) {
      // Calcular media móvil
      let sum = 0
      for (let j = 0; j < period; j++) {
        sum += readings[i - j].value
      }
      const movingAverage = sum / period

      // Calcular desviación estándar
      let sumSquaredDiff = 0
      for (let j = 0; j < period; j++) {
        sumSquaredDiff += Math.pow(readings[i - j].value - movingAverage, 2)
      }
      const stdDev = Math.sqrt(sumSquaredDiff / period)

      // Establecer bandas de Bollinger
      readings[i].movingAverage = Number.parseFloat(movingAverage.toFixed(2))
      readings[i].upperBand = Number.parseFloat((movingAverage + stdDevMultiplier * stdDev).toFixed(2))
      readings[i].lowerBand = Number.parseFloat((movingAverage - stdDevMultiplier * stdDev).toFixed(2))

      // Marcar anomalías basadas en las bandas de Bollinger
      const value = readings[i].value
      if (value > readings[i].upperBand || value < readings[i].lowerBand) {
        readings[i].isAnomaly = true
      }
    }
  }

  return {
    id,
    name,
    unit,
    location,
    readings,
    anomalyCount,
    lastValue: readings[readings.length - 1].value,
    normalRange,
  }
}

// Datos simulados de sensores
const SENSOR_DATA: SensorData[] = [
  generateSensorData(
    "voltage-sensor-01",
    "Voltaje Principal",
    "V",
    "Subestación Central",
    220,
    5,
    0.05,
    15,
    [210, 230],
  ),
  generateSensorData(
    "temperature-sensor-05",
    "Temperatura Turbina #5",
    "°C",
    "Parque Eólico Norte",
    65,
    3,
    0.08,
    12,
    [55, 75],
  ),
  generateSensorData(
    "vibration-sensor-03",
    "Vibración Rodamiento",
    "mm/s",
    "Parque Eólico Norte",
    2.5,
    0.5,
    0.1,
    2,
    [0, 4],
  ),
  generateSensorData("current-sensor-02", "Corriente Inversor", "A", "Parque Solar Este", 15, 1.2, 0.07, 5, [12, 18]),
  generateSensorData("power-output-01", "Potencia de Salida", "kW", "Parque Solar Este", 120, 10, 0.06, 30, [90, 150]),
]

export function AnomalyDetectionPanel() {
  const [selectedSensor, setSelectedSensor] = useState<string>(SENSOR_DATA[0].id)
  const [timeRange, setTimeRange] = useState<"1h" | "6h" | "12h" | "24h">("6h")
  const [detectionMethod, setDetectionMethod] = useState<"bollinger" | "zscore" | "iqr">("bollinger")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [locationFilter, setLocationFilter] = useState<string>("all")

  // Obtener el sensor seleccionado
  const sensor = SENSOR_DATA.find((s) => s.id === selectedSensor) || SENSOR_DATA[0]

  // Filtrar sensores por ubicación
  const filteredSensors = SENSOR_DATA.filter((s) => locationFilter === "all" || s.location === locationFilter)

  // Obtener ubicaciones únicas para el filtro
  const uniqueLocations = Array.from(new Set(SENSOR_DATA.map((s) => s.location)))

  // Filtrar lecturas según el rango de tiempo seleccionado
  const getFilteredReadings = () => {
    const readings = [...sensor.readings]
    const count = readings.length

    switch (timeRange) {
      case "1h":
        return readings.slice(count - 4) // Últimas 4 lecturas (1 hora)
      case "6h":
        return readings.slice(count - 24) // Últimas 24 lecturas (6 horas)
      case "12h":
        return readings.slice(count - 48) // Últimas 48 lecturas (12 horas)
      case "24h":
      default:
        return readings // Todas las lecturas (24 horas)
    }
  }

  // Obtener las lecturas filtradas
  const filteredReadings = getFilteredReadings()

  // Contar anomalías en las lecturas filtradas
  const anomalyCount = filteredReadings.filter((reading) => reading.isAnomaly).length

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
          <h2 className="text-2xl font-bold tracking-tight">Detección de Anomalías</h2>
          <p className="text-muted-foreground">
            Monitoreo en tiempo real con detección de anomalías mediante bandas de Bollinger
          </p>
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
        {filteredSensors.slice(0, 3).map((s) => (
          <Card
            key={s.id}
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              selectedSensor === s.id ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
            }`}
            onClick={() => setSelectedSensor(s.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{s.name}</CardTitle>
                  <CardDescription>{s.location}</CardDescription>
                </div>
                <Badge variant={s.anomalyCount > 0 ? "destructive" : "secondary"}>
                  {s.anomalyCount > 0 ? `${s.anomalyCount} anomalías` : "Normal"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Valor actual</span>
                  <span
                    className={s.lastValue < s.normalRange[0] || s.lastValue > s.normalRange[1] ? "text-red-500" : ""}
                  >
                    {s.lastValue} {s.unit}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rango normal</span>
                  <span>
                    {s.normalRange[0]} - {s.normalRange[1]} {s.unit}
                  </span>
                </div>
                <div className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={s.readings.slice(-20)}>
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" dot={false} strokeWidth={2} />
                      <ReferenceLine y={s.normalRange[0]} stroke="#64748b" strokeDasharray="3 3" />
                      <ReferenceLine y={s.normalRange[1]} stroke="#64748b" strokeDasharray="3 3" />
                    </LineChart>
                  </ResponsiveContainer>
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
              <CardTitle>Análisis de Anomalías</CardTitle>
              <CardDescription>
                {sensor.name} - {sensor.location}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 hora</SelectItem>
                  <SelectItem value="6h">6 horas</SelectItem>
                  <SelectItem value="12h">12 horas</SelectItem>
                  <SelectItem value="24h">24 horas</SelectItem>
                </SelectContent>
              </Select>
              <Select value={detectionMethod} onValueChange={(v) => setDetectionMethod(v as any)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bollinger">Bandas Bollinger</SelectItem>
                  <SelectItem value="zscore">Z-Score</SelectItem>
                  <SelectItem value="iqr">IQR</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Gráfico</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalías</TabsTrigger>
              <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="chart" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {sensor.name} ({sensor.unit})
                  </h3>
                  <Badge variant={anomalyCount > 0 ? "destructive" : "secondary"}>
                    {anomalyCount > 0 ? `${anomalyCount} anomalías detectadas` : "Sin anomalías"}
                  </Badge>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={filteredReadings}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="timestamp" />
                      <YAxis domain={["auto", "auto"]} />
                      <Tooltip />
                      <Legend />

                      {detectionMethod === "bollinger" && (
                        <>
                          <Area
                            type="monotone"
                            dataKey="upperBand"
                            fill="#3b82f6"
                            fillOpacity={0.1}
                            stroke="#3b82f6"
                            strokeDasharray="3 3"
                            name="Banda Superior"
                          />
                          <Area
                            type="monotone"
                            dataKey="lowerBand"
                            fill="#3b82f6"
                            fillOpacity={0.1}
                            stroke="#3b82f6"
                            strokeDasharray="3 3"
                            name="Banda Inferior"
                          />
                          <Line
                            type="monotone"
                            dataKey="movingAverage"
                            stroke="#64748b"
                            strokeWidth={1}
                            dot={false}
                            name="Media Móvil"
                          />
                        </>
                      )}

                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name={sensor.name}
                        dot={(props) => {
                          const { cx, cy, payload } = props
                          if (payload.isAnomaly) {
                            return <circle cx={cx} cy={cy} r={4} fill="#ef4444" stroke="#ef4444" />
                          }
                          return null
                        }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      <Activity className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Valor actual</p>
                      <p className="text-xl font-bold">
                        {sensor.lastValue} {sensor.unit}
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
                      <p className="text-sm text-muted-foreground">Anomalías detectadas</p>
                      <p className="text-xl font-bold">{anomalyCount}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rango normal</p>
                      <p className="text-xl font-bold">
                        {sensor.normalRange[0]} - {sensor.normalRange[1]} {sensor.unit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="anomalies" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Anomalías detectadas</h3>

                {anomalyCount > 0 ? (
                  <div className="space-y-4">
                    {filteredReadings
                      .filter((reading) => reading.isAnomaly)
                      .map((reading, index) => (
                        <div key={index} className="flex items-start space-x-4 p-3 rounded-lg border">
                          <div className="p-2 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            <AlertTriangle className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">Anomalía detectada</h4>
                              <span className="text-sm text-muted-foreground">{reading.timestamp}</span>
                            </div>
                            <p className="text-sm mt-1">
                              Valor:{" "}
                              <span className="font-medium text-red-500">
                                {reading.value} {sensor.unit}
                              </span>
                              {reading.upperBand && reading.lowerBand && (
                                <>
                                  {reading.value > reading.upperBand ? (
                                    <span>
                                      {" "}
                                      (por encima del umbral superior: {reading.upperBand} {sensor.unit})
                                    </span>
                                  ) : (
                                    <span>
                                      {" "}
                                      (por debajo del umbral inferior: {reading.lowerBand} {sensor.unit})
                                    </span>
                                  )}
                                </>
                              )}
                            </p>
                            <div className="flex justify-between mt-2">
                              <span className="text-xs text-muted-foreground">
                                Desviación:{" "}
                                {(
                                  (Math.abs(reading.value - (reading.movingAverage || 0)) /
                                    (reading.movingAverage || 1)) *
                                  100
                                ).toFixed(1)}
                                %
                              </span>
                              <Button variant="ghost" size="sm" className="h-7 text-xs">
                                Investigar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No se han detectado anomalías en el período seleccionado
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Estadísticas del sensor</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Resumen estadístico</h4>
                    <div className="space-y-2">
                      {(() => {
                        const values = filteredReadings.map((r) => r.value)
                        const min = Math.min(...values)
                        const max = Math.max(...values)
                        const sum = values.reduce((a, b) => a + b, 0)
                        const avg = sum / values.length

                        // Calcular desviación estándar
                        const squaredDiffs = values.map((value) => Math.pow(value - avg, 2))
                        const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b, 0) / values.length
                        const stdDev = Math.sqrt(avgSquaredDiff)

                        return (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Mínimo</span>
                              <span>
                                {min.toFixed(2)} {sensor.unit}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Máximo</span>
                              <span>
                                {max.toFixed(2)} {sensor.unit}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Promedio</span>
                              <span>
                                {avg.toFixed(2)} {sensor.unit}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Desviación estándar</span>
                              <span>
                                {stdDev.toFixed(2)} {sensor.unit}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Coeficiente de variación</span>
                              <span>{((stdDev / avg) * 100).toFixed(2)}%</span>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Métricas de anomalías</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total de lecturas</span>
                        <span>{filteredReadings.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Anomalías detectadas</span>
                        <span>{anomalyCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Porcentaje de anomalías</span>
                        <span>{((anomalyCount / filteredReadings.length) * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Método de detección</span>
                        <span>
                          {detectionMethod === "bollinger"
                            ? "Bandas de Bollinger"
                            : detectionMethod === "zscore"
                              ? "Z-Score"
                              : "Rango Intercuartil (IQR)"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sensibilidad</span>
                        <span>Media (2σ)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar datos
          </Button>
          <Button>
            <Zap className="mr-2 h-4 w-4" />
            Configurar alertas
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
