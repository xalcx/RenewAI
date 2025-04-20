"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Loader2, Battery, Zap, TrendingDown, Home, BarChart2 } from "lucide-react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
} from "recharts"

// Tipos de escenarios
const SCENARIOS = [
  { id: "residential", name: "Comunidad Residencial", icon: <Home className="h-4 w-4" /> },
  { id: "commercial", name: "Centro Comercial", icon: <BarChart2 className="h-4 w-4" /> },
  { id: "industrial", name: "Parque Industrial", icon: <Zap className="h-4 w-4" /> },
]

// Tipos de servicios de flexibilidad
const FLEXIBILITY_SERVICES = [
  { id: "none", name: "Sin servicios de flexibilidad" },
  { id: "basic", name: "Servicios básicos (peak shaving)" },
  { id: "advanced", name: "Servicios avanzados (regulación frecuencia)" },
]

// Interfaz para los datos de energía
interface EnergyData {
  hour: string
  solarGeneration: number
  demand: number
  gridPrice: number
  batteryCharge?: number
  batteryDischarge?: number
  gridImport?: number
  gridExport?: number
  flexibilityService?: number
}

// Interfaz para los resultados de optimización
interface OptimizationResult {
  selfConsumptionRate: number
  costSavings: number
  flexibilityRevenue: number
  co2Reduction: number
  peakReduction: number
  batteryLifetime: number
}

export default function MicrogridOptimizer() {
  // Estados para los parámetros de entrada
  const [scenario, setScenario] = useState(SCENARIOS[0].id)
  const [solarCapacity, setSolarCapacity] = useState("100")
  const [batteryCapacity, setBatteryCapacity] = useState("200")
  const [flexibilityService, setFlexibilityService] = useState(FLEXIBILITY_SERVICES[1].id)

  // Estados para los datos y la carga
  const [energyData, setEnergyData] = useState<EnergyData[]>([])
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("energy")

  // Función para generar datos de energía simulados
  const generateEnergyData = () => {
    const data: EnergyData[] = []

    // Patrones según el escenario
    let demandPattern: number[] = []
    let solarPattern: number[] = []
    let pricePattern: number[] = []

    switch (scenario) {
      case "residential":
        // Patrón residencial: picos por la mañana y tarde/noche
        demandPattern = [
          0.3, 0.2, 0.2, 0.2, 0.3, 0.5, 0.7, 0.9, 0.7, 0.5, 0.4, 0.4, 0.5, 0.4, 0.4, 0.5, 0.7, 0.9, 1.0, 0.9, 0.8, 0.6,
          0.5, 0.4,
        ]
        break
      case "commercial":
        // Patrón comercial: pico durante horas laborales
        demandPattern = [
          0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.6, 0.8, 0.9, 1.0, 1.0, 0.9, 0.9, 0.9, 0.8, 0.7, 0.5, 0.4, 0.3, 0.3, 0.2,
          0.2, 0.2,
        ]
        break
      case "industrial":
        // Patrón industrial: consumo constante con ligero pico diurno
        demandPattern = [
          0.7, 0.7, 0.7, 0.7, 0.7, 0.8, 0.9, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.8, 0.8, 0.7, 0.7, 0.7,
          0.7, 0.7,
        ]
        break
    }

    // Patrón solar (igual para todos los escenarios)
    solarPattern = [0, 0, 0, 0, 0, 0.1, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0, 0.9, 0.8, 0.7, 0.5, 0.3, 0.1, 0, 0, 0, 0, 0, 0]

    // Patrón de precios (picos por la mañana y tarde)
    pricePattern = [
      80, 70, 65, 60, 70, 90, 120, 150, 170, 160, 150, 140, 150, 160, 170, 180, 200, 220, 200, 180, 160, 140, 120, 100,
    ]

    // Generar datos para 24 horas
    for (let i = 0; i < 24; i++) {
      // Calcular valores según patrones y capacidades
      const solarGen = Math.round(solarPattern[i] * Number(solarCapacity) * (0.9 + Math.random() * 0.2))
      const demand = Math.round(
        demandPattern[i] *
          (scenario === "residential" ? 200 : scenario === "commercial" ? 500 : 1000) *
          (0.9 + Math.random() * 0.2),
      )
      const price = Math.round(pricePattern[i] * (0.9 + Math.random() * 0.2))

      data.push({
        hour: `${i.toString().padStart(2, "0")}:00`,
        solarGeneration: solarGen,
        demand: demand,
        gridPrice: price,
      })
    }

    return data
  }

  // Función para optimizar la operación de la microrred
  const optimizeMicrogrid = (data: EnergyData[]) => {
    const batteryCapacityNum = Number(batteryCapacity)
    const optimizedData = [...data]

    // Estado inicial de la batería (50% SOC)
    let batterySoC = batteryCapacityNum * 0.5
    const maxCharge = batteryCapacityNum * 0.2 // Máx 20% de capacidad por hora

    // Optimizar para cada hora
    for (let i = 0; i < optimizedData.length; i++) {
      const hour = optimizedData[i]
      const surplus = hour.solarGeneration - hour.demand

      // Inicializar valores
      let batteryCharge = 0
      let batteryDischarge = 0
      let gridImport = 0
      let gridExport = 0
      let flexibilityService = 0

      // Caso 1: Excedente de generación solar
      if (surplus > 0) {
        // Cargar batería con excedente
        batteryCharge = Math.min(surplus, maxCharge, batteryCapacityNum - batterySoC)
        batterySoC += batteryCharge

        // Si aún hay excedente, exportar a la red
        gridExport = surplus - batteryCharge
      }
      // Caso 2: Déficit de generación
      else {
        const deficit = Math.abs(surplus)

        // Descargar batería para cubrir déficit
        batteryDischarge = Math.min(deficit, maxCharge, batterySoC)
        batterySoC -= batteryDischarge

        // Si aún hay déficit, importar de la red
        gridImport = deficit - batteryDischarge
      }

      // Servicios de flexibilidad (si están habilitados)
      if (flexibilityService !== "none") {
        // Horas pico (18-22h) - Descargar batería para reducir picos
        if (i >= 18 && i <= 21 && batterySoC > batteryCapacityNum * 0.3) {
          const flexAmount =
            flexibilityService === "advanced" ? Math.min(20, batterySoC * 0.1) : Math.min(10, batterySoC * 0.05)

          flexibilityService = flexAmount
          batterySoC -= flexAmount
          gridImport = Math.max(0, gridImport - flexAmount)
        }
        // Horas valle (1-5h) - Cargar batería para aplanar curva
        else if (i >= 1 && i <= 4 && batterySoC < batteryCapacityNum * 0.8) {
          const flexAmount = flexibilityService === "advanced" ? 15 : 8
          flexibilityService = -flexAmount // Negativo indica carga
          batterySoC += flexAmount
          gridImport += flexAmount
        }
      }

      // Actualizar datos con resultados optimizados
      optimizedData[i] = {
        ...hour,
        batteryCharge,
        batteryDischarge,
        gridImport,
        gridExport,
        flexibilityService,
      }
    }

    // Calcular métricas de resultado
    const totalDemand = optimizedData.reduce((sum, h) => sum + h.demand, 0)
    const totalSolar = optimizedData.reduce((sum, h) => sum + h.solarGeneration, 0)
    const totalGridImport = optimizedData.reduce((sum, h) => sum + (h.gridImport || 0), 0)
    const totalGridExport = optimizedData.reduce((sum, h) => sum + (h.gridExport || 0), 0)
    const totalFlexibility = optimizedData.reduce((sum, h) => sum + Math.abs(h.flexibilityService || 0), 0)

    // Calcular costos e ingresos
    const gridCost = optimizedData.reduce((sum, h) => sum + ((h.gridImport || 0) * h.gridPrice) / 1000, 0)
    const gridRevenue = optimizedData.reduce((sum, h) => sum + ((h.gridExport || 0) * h.gridPrice * 0.8) / 1000, 0)
    const flexibilityRevenue =
      flexibilityService === "none"
        ? 0
        : flexibilityService === "basic"
          ? totalFlexibility * 0.15
          : totalFlexibility * 0.25

    // Calcular métricas sin optimización
    const baseGridImport = optimizedData.reduce((sum, h) => sum + Math.max(0, h.demand - h.solarGeneration), 0)
    const baseGridCost = optimizedData.reduce(
      (sum, h) => sum + (Math.max(0, h.demand - h.solarGeneration) * h.gridPrice) / 1000,
      0,
    )

    // Calcular pico de demanda con y sin optimización
    const peakWithout = Math.max(...optimizedData.map((h) => Math.max(0, h.demand - h.solarGeneration)))
    const peakWith = Math.max(...optimizedData.map((h) => h.gridImport || 0))

    // Resultados de optimización
    const result: OptimizationResult = {
      selfConsumptionRate: Math.round(((totalSolar - totalGridExport) / totalSolar) * 100),
      costSavings: Math.round((baseGridCost - (gridCost - gridRevenue - flexibilityRevenue)) * 100) / 100,
      flexibilityRevenue: Math.round(flexibilityRevenue * 100) / 100,
      co2Reduction: Math.round((baseGridImport - totalGridImport) * 0.25), // kg CO2
      peakReduction: Math.round(((peakWithout - peakWith) / peakWithout) * 100),
      batteryLifetime: flexibilityService === "advanced" ? 8 : flexibilityService === "basic" ? 10 : 12, // años
    }

    return { optimizedData, result }
  }

  // Función para ejecutar la optimización
  const runOptimization = () => {
    setIsLoading(true)

    // Simular tiempo de procesamiento
    setTimeout(() => {
      try {
        // Generar datos base
        const baseData = generateEnergyData()

        // Optimizar microrred
        const { optimizedData, result } = optimizeMicrogrid(baseData)

        // Actualizar estados
        setEnergyData(optimizedData)
        setOptimizationResult(result)
      } catch (error) {
        console.error("Error en la optimización:", error)
      } finally {
        setIsLoading(false)
      }
    }, 1500)
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    runOptimization()
  }

  // Ejecutar optimización inicial
  useEffect(() => {
    runOptimization()
  }, [])

  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-1">
          <div>
            <h2 className="text-2xl font-bold mb-4">Optimizador de Microrredes</h2>
            <p className="text-muted-foreground mb-6">
              Maximiza el autoconsumo y rentabilidad de microrredes inteligentes mediante la orquestación de baterías,
              generación solar y cargas flexibles, ofreciendo servicios de flexibilidad que generan ingresos adicionales
              y reducen hasta un 40% los costes energéticos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="scenario">Escenario</Label>
              <Select value={scenario} onValueChange={setScenario}>
                <SelectTrigger id="scenario">
                  <SelectValue placeholder="Selecciona escenario" />
                </SelectTrigger>
                <SelectContent>
                  {SCENARIOS.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      <div className="flex items-center gap-2">
                        {s.icon}
                        <span>{s.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="solar-capacity" className="flex justify-between">
                <span>Capacidad solar (kWp)</span>
                <span className="text-muted-foreground">{solarCapacity} kWp</span>
              </Label>
              <Slider
                id="solar-capacity"
                min={0}
                max={500}
                step={10}
                value={[Number(solarCapacity)]}
                onValueChange={(value) => setSolarCapacity(value[0].toString())}
                className="py-4"
              />
            </div>

            <div>
              <Label htmlFor="battery-capacity" className="flex justify-between">
                <span>Capacidad batería (kWh)</span>
                <span className="text-muted-foreground">{batteryCapacity} kWh</span>
              </Label>
              <Slider
                id="battery-capacity"
                min={0}
                max={500}
                step={10}
                value={[Number(batteryCapacity)]}
                onValueChange={(value) => setBatteryCapacity(value[0].toString())}
                className="py-4"
              />
            </div>

            <div>
              <Label htmlFor="flexibility">Servicios de flexibilidad</Label>
              <Select value={flexibilityService} onValueChange={setFlexibilityService}>
                <SelectTrigger id="flexibility">
                  <SelectValue placeholder="Selecciona servicios" />
                </SelectTrigger>
                <SelectContent>
                  {FLEXIBILITY_SERVICES.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Optimizando...
                </>
              ) : (
                "Optimizar microrred"
              )}
            </Button>
          </form>

          {/* Resultados de optimización */}
          {optimizationResult && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-3">Resultados de optimización</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Autoconsumo:</span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    >
                      {optimizationResult.selfConsumptionRate}%
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ahorro diario:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {optimizationResult.costSavings.toFixed(2)} €
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ingresos flexibilidad:</span>
                    <span className="font-medium">{optimizationResult.flexibilityRevenue.toFixed(2)} €</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reducción CO₂:</span>
                    <span className="font-medium">{optimizationResult.co2Reduction} kg</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reducción pico:</span>
                    <span className="font-medium">{optimizationResult.peakReduction}%</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm font-medium">Vida útil batería:</span>
                    <div className="flex items-center gap-1 font-medium">
                      <Battery className="h-4 w-4" />
                      <span>{optimizationResult.batteryLifetime} años</span>
                    </div>
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
                <p className="text-muted-foreground">Optimizando operación de la microrred...</p>
              </div>
            </div>
          ) : energyData.length > 0 ? (
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="energy">Flujos de energía</TabsTrigger>
                  <TabsTrigger value="economics">Análisis económico</TabsTrigger>
                </TabsList>

                <TabsContent value="energy" className="m-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Balance energético (24h)</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Visualización de generación, demanda y flujos de energía optimizados
                      </p>

                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={energyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="hour" />
                            <YAxis
                              yAxisId="left"
                              label={{
                                value: "Energía (kWh)",
                                angle: -90,
                                position: "insideLeft",
                                style: { textAnchor: "middle" },
                              }}
                            />
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              label={{
                                value: "Precio (€/MWh)",
                                angle: 90,
                                position: "insideRight",
                                style: { textAnchor: "middle" },
                              }}
                            />
                            <Tooltip />
                            <Legend />
                            <Area
                              yAxisId="left"
                              type="monotone"
                              dataKey="solarGeneration"
                              name="Generación solar"
                              fill="#F59E0B"
                              stroke="#F59E0B"
                              fillOpacity={0.3}
                            />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="demand"
                              name="Demanda"
                              stroke="#6366F1"
                              strokeWidth={2}
                            />
                            <Bar
                              yAxisId="left"
                              dataKey="batteryCharge"
                              name="Carga batería"
                              fill="#10B981"
                              stackId="battery"
                            />
                            <Bar
                              yAxisId="left"
                              dataKey="batteryDischarge"
                              name="Descarga batería"
                              fill="#10B981"
                              fillOpacity={0.5}
                              stackId="battery"
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="gridPrice"
                              name="Precio red"
                              stroke="#EF4444"
                              strokeDasharray="5 5"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Intercambio con la red</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Importación, exportación y servicios de flexibilidad
                      </p>

                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={energyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="hour" />
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
                            <Area
                              type="monotone"
                              dataKey="gridImport"
                              name="Importación"
                              fill="#3B82F6"
                              stroke="#3B82F6"
                              fillOpacity={0.3}
                            />
                            <Area
                              type="monotone"
                              dataKey="gridExport"
                              name="Exportación"
                              fill="#10B981"
                              stroke="#10B981"
                              fillOpacity={0.3}
                            />
                            <Line
                              type="monotone"
                              dataKey="flexibilityService"
                              name="Servicio flexibilidad"
                              stroke="#8B5CF6"
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="economics" className="m-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Análisis económico (24h)</h3>
                      <p className="text-sm text-muted-foreground mb-4">Costes e ingresos por hora</p>

                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart
                            data={energyData.map((h) => ({
                              ...h,
                              gridCost: ((h.gridImport || 0) * h.gridPrice) / 1000,
                              gridRevenue: ((h.gridExport || 0) * h.gridPrice * 0.8) / 1000,
                              flexRevenue:
                                Math.abs(h.flexibilityService || 0) * (flexibilityService === "advanced" ? 0.25 : 0.15),
                              netCost:
                                ((h.gridImport || 0) * h.gridPrice) / 1000 -
                                ((h.gridExport || 0) * h.gridPrice * 0.8) / 1000 -
                                Math.abs(h.flexibilityService || 0) * (flexibilityService === "advanced" ? 0.25 : 0.15),
                            }))}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="hour" />
                            <YAxis
                              label={{
                                value: "Coste/Ingreso (€)",
                                angle: -90,
                                position: "insideLeft",
                                style: { textAnchor: "middle" },
                              }}
                            />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="gridCost" name="Coste importación" fill="#EF4444" />
                            <Bar dataKey="gridRevenue" name="Ingreso exportación" fill="#10B981" />
                            <Bar dataKey="flexRevenue" name="Ingreso flexibilidad" fill="#8B5CF6" />
                            <Line
                              type="monotone"
                              dataKey="netCost"
                              name="Coste neto"
                              stroke="#000000"
                              strokeWidth={2}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="h-5 w-5 text-green-500" />
                            <h4 className="font-medium">Ahorro anual estimado</h4>
                          </div>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {Math.round(optimizationResult?.costSavings * 365)} €/año
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            ROI estimado:{" "}
                            {Math.round((Number(batteryCapacity) * 500) / (optimizationResult?.costSavings * 365 || 1))}{" "}
                            años
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="h-5 w-5 text-purple-500" />
                            <h4 className="font-medium">Ingresos por flexibilidad</h4>
                          </div>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {Math.round(optimizationResult?.flexibilityRevenue * 365)} €/año
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {flexibilityService === "advanced"
                              ? "Servicios avanzados de regulación"
                              : flexibilityService === "basic"
                                ? "Servicios básicos de peak shaving"
                                : "Sin servicios de flexibilidad"}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex items-center justify-center h-80 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">Configura los parámetros y optimiza la microrred</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
