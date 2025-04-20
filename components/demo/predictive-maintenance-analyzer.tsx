"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertTriangle, CheckCircle, Upload, RotateCw } from "lucide-react"
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
} from "recharts"

// Tipos de sensores
const SENSOR_TYPES = [
  { id: "vibration", name: "Vibración", unit: "mm/s", threshold: 4.5, color: "#EF4444" },
  { id: "temperature", name: "Temperatura", unit: "°C", threshold: 75, color: "#F59E0B" },
  { id: "rotation", name: "Velocidad de rotación", unit: "RPM", threshold: 1800, color: "#3B82F6" },
  { id: "voltage", name: "Voltaje", unit: "V", threshold: 380, color: "#10B981" },
]

// Tipos de turbinas
const TURBINE_TYPES = [
  { id: "t1", name: "Turbina GE 1.5MW" },
  { id: "t2", name: "Turbina Vestas V90" },
  { id: "t3", name: "Turbina Siemens SWT-2.3" },
  { id: "t4", name: "Turbina Gamesa G87" },
]

// Interfaz para los datos de sensores
interface SensorData {
  timestamp: string
  value: number
}

// Interfaz para el análisis
interface AnalysisResult {
  status: "normal" | "warning" | "critical"
  message: string
  recommendation: string
}

export default function PredictiveMaintenanceAnalyzer() {
  // Estados para los parámetros de entrada
  const [turbineType, setTurbineType] = useState(TURBINE_TYPES[0].id)
  const [sensorType, setSensorType] = useState(SENSOR_TYPES[0].id)
  const [customValue, setCustomValue] = useState("")

  // Estados para los datos y la carga
  const [sensorData, setSensorData] = useState<SensorData[]>([])
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("realtime")

  // Obtener el sensor actual
  const currentSensor = SENSOR_TYPES.find((s) => s.id === sensorType) || SENSOR_TYPES[0]

  // Función para generar datos históricos simulados
  const generateHistoricalData = () => {
    const data: SensorData[] = []
    const now = new Date()
    const baseValue = currentSensor.threshold * 0.7 // Valor base normal

    for (let i = 30; i >= 0; i--) {
      const time = new Date(now)
      time.setDate(now.getDate() - i)

      // Valor normal con pequeñas fluctuaciones
      let value = baseValue + (Math.random() * 0.4 - 0.2) * baseValue

      // Añadir tendencia creciente en los últimos días
      if (i < 10) {
        value += (10 - i) * (currentSensor.threshold * 0.03)
      }

      // Añadir algunos picos aleatorios
      if (Math.random() > 0.9) {
        value *= 1.2
      }

      data.push({
        timestamp: time.toLocaleDateString(),
        value: Math.round(value * 100) / 100,
      })
    }

    return data
  }

  // Función para analizar los datos del sensor
  const analyzeSensorData = async (data: SensorData[]) => {
    // Simulamos una llamada a la API
    return new Promise<AnalysisResult>((resolve) => {
      setTimeout(() => {
        const latestValue = Number.parseFloat(customValue) || data[data.length - 1].value
        const threshold = currentSensor.threshold

        let result: AnalysisResult

        if (latestValue > threshold * 1.2) {
          result = {
            status: "critical",
            message: `Valor crítico detectado: ${latestValue} ${currentSensor.unit}`,
            recommendation: "Se recomienda detener la turbina inmediatamente y realizar una inspección completa.",
          }
        } else if (latestValue > threshold) {
          result = {
            status: "warning",
            message: `Valor por encima del umbral: ${latestValue} ${currentSensor.unit}`,
            recommendation: "Programar mantenimiento preventivo en los próximos 7 días.",
          }
        } else {
          result = {
            status: "normal",
            message: `Valores dentro de los parámetros normales: ${latestValue} ${currentSensor.unit}`,
            recommendation: "Continuar con el plan de mantenimiento regular.",
          }
        }

        resolve(result)
      }, 1500)
    })
  }

  // Función para cargar datos y realizar análisis
  const loadDataAndAnalyze = async () => {
    setIsLoading(true)

    try {
      // Generar datos históricos
      const data = generateHistoricalData()
      setSensorData(data)

      // Realizar análisis
      const result = await analyzeSensorData(data)
      setAnalysisResult(result)
    } catch (error) {
      console.error("Error al analizar datos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loadDataAndAnalyze()
  }

  // Cargar datos iniciales
  useEffect(() => {
    loadDataAndAnalyze()
  }, [])

  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-1">
          <div>
            <h2 className="text-2xl font-bold mb-4">Analizador de Mantenimiento Predictivo</h2>
            <p className="text-muted-foreground mb-6">
              Detecta anomalías en tiempo real en turbinas eólicas para prevenir fallos críticos, reducir paradas
              imprevistas y optimizar el mantenimiento, ahorrando hasta un 32% en costos operativos.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="realtime">Tiempo real</TabsTrigger>
              <TabsTrigger value="custom">Valor personalizado</TabsTrigger>
            </TabsList>

            <TabsContent value="realtime">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="turbine-type">Tipo de turbina</Label>
                  <Select value={turbineType} onValueChange={setTurbineType}>
                    <SelectTrigger id="turbine-type">
                      <SelectValue placeholder="Selecciona turbina" />
                    </SelectTrigger>
                    <SelectContent>
                      {TURBINE_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sensor-type">Tipo de sensor</Label>
                  <Select value={sensorType} onValueChange={setSensorType}>
                    <SelectTrigger id="sensor-type">
                      <SelectValue placeholder="Selecciona sensor" />
                    </SelectTrigger>
                    <SelectContent>
                      {SENSOR_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} ({type.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <RotateCw className="mr-2 h-4 w-4" />
                      Actualizar datos
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="custom">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="turbine-type">Tipo de turbina</Label>
                  <Select value={turbineType} onValueChange={setTurbineType}>
                    <SelectTrigger id="turbine-type">
                      <SelectValue placeholder="Selecciona turbina" />
                    </SelectTrigger>
                    <SelectContent>
                      {TURBINE_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sensor-type">Tipo de sensor</Label>
                  <Select value={sensorType} onValueChange={setSensorType}>
                    <SelectTrigger id="sensor-type">
                      <SelectValue placeholder="Selecciona sensor" />
                    </SelectTrigger>
                    <SelectContent>
                      {SENSOR_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} ({type.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="custom-value">Valor personalizado ({currentSensor.unit})</Label>
                  <Input
                    id="custom-value"
                    type="number"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    placeholder={`Umbral: ${currentSensor.threshold} ${currentSensor.unit}`}
                    step="0.1"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Analizar valor
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Resultado del análisis */}
          {analysisResult && (
            <Card
              className={`border-l-4 ${
                analysisResult.status === "critical"
                  ? "border-l-red-500"
                  : analysisResult.status === "warning"
                    ? "border-l-yellow-500"
                    : "border-l-green-500"
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  {analysisResult.status === "critical" ? (
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  ) : analysisResult.status === "warning" ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">Estado del sensor</h3>
                      <Badge
                        variant={
                          analysisResult.status === "critical"
                            ? "destructive"
                            : analysisResult.status === "warning"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {analysisResult.status === "critical"
                          ? "Crítico"
                          : analysisResult.status === "warning"
                            ? "Advertencia"
                            : "Normal"}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{analysisResult.message}</p>
                    <p className="text-sm text-muted-foreground">{analysisResult.recommendation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-80">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Analizando datos del sensor...</p>
              </div>
            </div>
          ) : sensorData.length > 0 ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Histórico de {SENSOR_TYPES.find((s) => s.id === sensorType)?.name || "sensor"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Datos de los últimos 30 días con umbral de alerta</p>

                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sensorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="timestamp" />
                      <YAxis
                        label={{
                          value: `${currentSensor.name} (${currentSensor.unit})`,
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle" },
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <ReferenceLine y={currentSensor.threshold} label="Umbral" stroke="red" strokeDasharray="3 3" />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={currentSensor.color}
                        name={currentSensor.name}
                        strokeWidth={2}
                        dot={{ r: 1 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Estadísticas del sensor */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-sm font-medium mb-1">Valor actual</h4>
                    <p className="text-2xl font-bold">
                      {customValue || sensorData[sensorData.length - 1].value} {currentSensor.unit}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-sm font-medium mb-1">Valor máximo</h4>
                    <p className="text-2xl font-bold">
                      {Math.max(...sensorData.map((data) => data.value))} {currentSensor.unit}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-sm font-medium mb-1">Umbral de alerta</h4>
                    <p className="text-2xl font-bold">
                      {currentSensor.threshold} {currentSensor.unit}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-80 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">Selecciona una turbina y un sensor para comenzar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
