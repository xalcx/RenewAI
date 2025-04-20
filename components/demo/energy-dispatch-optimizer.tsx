"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, TrendingUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

// Parques renovables
const RENEWABLE_PARKS = [
  { id: "wind1", name: "Parque Eólico Navarra", type: "wind", capacity: 50 },
  { id: "wind2", name: "Parque Eólico Galicia", type: "wind", capacity: 75 },
  { id: "solar1", name: "Planta Solar Andalucía", type: "solar", capacity: 40 },
  { id: "solar2", name: "Planta Solar Extremadura", type: "solar", capacity: 60 },
  { id: "hybrid1", name: "Parque Híbrido Castilla", type: "hybrid", capacity: 85 },
]

// Mercados eléctricos
const ELECTRICITY_MARKETS = [
  { id: "spot", name: "Mercado Spot (OMIE)" },
  { id: "intraday", name: "Mercado Intradiario" },
  { id: "bilateral", name: "Contratos Bilaterales" },
]

// Interfaz para los datos de precios
interface PriceData {
  hour: string
  price: number
  demand: number
  optimal?: boolean
}

// Interfaz para los resultados de optimización
interface OptimizationResult {
  optimalHours: number[]
  totalRevenue: number
  averagePrice: number
  optimalRevenue: number
  standardRevenue: number
  savingsPercentage: number
}

export default function EnergyDispatchOptimizer() {
  // Estados para los parámetros de entrada
  const [park, setPark] = useState(RENEWABLE_PARKS[0].id)
  const [market, setMarket] = useState(ELECTRICITY_MARKETS[0].id)
  const [energyAmount, setEnergyAmount] = useState("100")

  // Estados para los datos y la carga
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Obtener el parque actual
  const currentPark = RENEWABLE_PARKS.find((p) => p.id === park) || RENEWABLE_PARKS[0]

  // Función para generar datos de precios simulados
  const generatePriceData = () => {
    const data: PriceData[] = []

    // Patrón de precios típico del mercado eléctrico español
    // Precios más bajos durante la noche, picos por la mañana y tarde
    const basePrice = market === "spot" ? 60 : market === "intraday" ? 65 : 55
    const baseDemand = 25000

    for (let i = 0; i < 24; i++) {
      let hourPrice = basePrice
      let hourDemand = baseDemand

      // Variación por hora del día
      if (i >= 8 && i <= 11) {
        // Pico de la mañana
        hourPrice *= 1.4
        hourDemand *= 1.3
      } else if (i >= 19 && i <= 22) {
        // Pico de la tarde
        hourPrice *= 1.6
        hourDemand *= 1.5
      } else if (i >= 0 && i <= 5) {
        // Valle nocturno
        hourPrice *= 0.7
        hourDemand *= 0.6
      }

      // Añadir algo de aleatoriedad
      hourPrice *= 0.9 + Math.random() * 0.2
      hourDemand *= 0.9 + Math.random() * 0.2

      data.push({
        hour: `${i.toString().padStart(2, "0")}:00`,
        price: Math.round(hourPrice * 100) / 100,
        demand: Math.round(hourDemand),
      })
    }

    return data
  }

  // Función para optimizar el despacho de energía
  const optimizeDispatch = (priceData: PriceData[], energyMWh: number) => {
    // Ordenar las horas por precio de mayor a menor
    const sortedHours = [...priceData].sort((a, b) => b.price - a.price)

    // Seleccionar las mejores horas hasta cubrir la energía total
    const optimalHours: number[] = []
    let remainingEnergy = energyMWh
    const totalRevenue = 0
    let optimalRevenue = 0

    // Asumimos una distribución uniforme de la generación para el cálculo estándar
    const hourlyEnergy = energyMWh / 24
    let standardRevenue = 0

    // Calcular ingresos con distribución estándar
    priceData.forEach((hourData) => {
      standardRevenue += hourlyEnergy * hourData.price
    })

    // Calcular ingresos con optimización
    for (const hourData of sortedHours) {
      if (remainingEnergy <= 0) break

      const hourIndex = priceData.findIndex((data) => data.hour === hourData.hour)
      optimalHours.push(hourIndex)

      // Asumimos que podemos vender toda la energía en las mejores horas
      // En un caso real, habría restricciones técnicas
      const energyThisHour = Math.min(remainingEnergy, currentPark.capacity)
      remainingEnergy -= energyThisHour

      optimalRevenue += energyThisHour * hourData.price
    }

    // Marcar las horas óptimas en los datos
    const dataWithOptimal = priceData.map((data, index) => ({
      ...data,
      optimal: optimalHours.includes(index),
    }))

    setPriceData(dataWithOptimal)

    // Calcular resultados
    const averagePrice = priceData.reduce((sum, data) => sum + data.price, 0) / 24
    const savingsPercentage = ((optimalRevenue - standardRevenue) / standardRevenue) * 100

    return {
      optimalHours,
      totalRevenue: optimalRevenue,
      averagePrice,
      optimalRevenue,
      standardRevenue,
      savingsPercentage,
    }
  }

  // Función para cargar datos y realizar optimización
  const loadDataAndOptimize = async () => {
    setIsLoading(true)

    try {
      // Generar datos de precios
      const data = generatePriceData()

      // Realizar optimización
      const result = optimizeDispatch(data, Number.parseFloat(energyAmount))
      setOptimizationResult(result)
    } catch (error) {
      console.error("Error al optimizar despacho:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loadDataAndOptimize()
  }

  // Cargar datos iniciales
  useEffect(() => {
    loadDataAndOptimize()
  }, [])

  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-1">
          <div>
            <h2 className="text-2xl font-bold mb-4">Optimizador de Despacho de Energía</h2>
            <p className="text-muted-foreground mb-6">
              Optimiza la venta de energía renovable en el mercado eléctrico para maximizar los ingresos y reducir
              costes de balance hasta un 35%, adaptándose dinámicamente a las condiciones cambiantes del mercado.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="park">Instalación renovable</Label>
              <Select value={park} onValueChange={setPark}>
                <SelectTrigger id="park">
                  <SelectValue placeholder="Selecciona instalación" />
                </SelectTrigger>
                <SelectContent>
                  {RENEWABLE_PARKS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.capacity} MW)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="market">Mercado eléctrico</Label>
              <Select value={market} onValueChange={setMarket}>
                <SelectTrigger id="market">
                  <SelectValue placeholder="Selecciona mercado" />
                </SelectTrigger>
                <SelectContent>
                  {ELECTRICITY_MARKETS.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="energy-amount">Energía a vender (MWh)</Label>
              <Input
                id="energy-amount"
                type="number"
                value={energyAmount}
                onChange={(e) => setEnergyAmount(e.target.value)}
                min="1"
                max={currentPark.capacity * 24}
              />
              <p className="text-xs text-muted-foreground mt-1">Máximo diario: {currentPark.capacity * 24} MWh</p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Optimizando...
                </>
              ) : (
                "Optimizar despacho"
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
                    <span className="text-sm">Ingresos optimizados:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {Math.round(optimizationResult.optimalRevenue).toLocaleString()} €
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ingresos estándar:</span>
                    <span className="font-medium">
                      {Math.round(optimizationResult.standardRevenue).toLocaleString()} €
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm font-medium">Beneficio adicional:</span>
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold">
                      <TrendingUp className="h-4 w-4" />
                      <span>+{Math.round(optimizationResult.savingsPercentage)}%</span>
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
                <p className="text-muted-foreground">Optimizando despacho de energía...</p>
              </div>
            </div>
          ) : priceData.length > 0 ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Precios del mercado (24h)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Las barras destacadas indican las horas óptimas para vender energía
                </p>

                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="hour" />
                      <YAxis
                        label={{
                          value: "Precio (€/MWh)",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle" },
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="price" name="Precio" fill={(data) => (data.optimal ? "#10B981" : "#3B82F6")} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Demanda eléctrica (24h)</h3>
                <p className="text-sm text-muted-foreground mb-4">Correlación entre demanda y precios del mercado</p>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="hour" />
                      <YAxis
                        label={{
                          value: "Demanda (MW)",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle" },
                        }}
                      />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="demand"
                        name="Demanda"
                        stroke="#F59E0B"
                        fill="#F59E0B"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-80 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">Configura los parámetros y optimiza el despacho</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
