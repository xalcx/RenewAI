"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Download, Calendar } from "lucide-react"

// Importamos recharts para gráficos interactivos
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts"

// Datos de ejemplo para los gráficos
const dailyData = [
  { name: "Lun", solar: 45, wind: 32, total: 77 },
  { name: "Mar", solar: 52, wind: 28, total: 80 },
  { name: "Mié", solar: 48, wind: 35, total: 83 },
  { name: "Jue", solar: 61, wind: 30, total: 91 },
  { name: "Vie", solar: 55, wind: 29, total: 84 },
  { name: "Sáb", solar: 67, wind: 36, total: 103 },
  { name: "Dom", solar: 60, wind: 33, total: 93 },
]

const weeklyData = [
  { name: "Sem 1", solar: 320, wind: 240, total: 560 },
  { name: "Sem 2", solar: 350, wind: 210, total: 560 },
  { name: "Sem 3", solar: 380, wind: 250, total: 630 },
  { name: "Sem 4", solar: 420, wind: 280, total: 700 },
]

const monthlyData = [
  { name: "Ene", solar: 1200, wind: 900, total: 2100 },
  { name: "Feb", solar: 1100, wind: 950, total: 2050 },
  { name: "Mar", solar: 1300, wind: 1000, total: 2300 },
  { name: "Abr", solar: 1500, wind: 850, total: 2350 },
  { name: "May", solar: 1700, wind: 800, total: 2500 },
  { name: "Jun", solar: 1900, wind: 750, total: 2650 },
  { name: "Jul", solar: 2100, wind: 700, total: 2800 },
  { name: "Ago", solar: 2000, wind: 800, total: 2800 },
  { name: "Sep", solar: 1800, wind: 900, total: 2700 },
  { name: "Oct", solar: 1600, wind: 1000, total: 2600 },
  { name: "Nov", solar: 1400, wind: 1100, total: 2500 },
  { name: "Dic", solar: 1300, wind: 1200, total: 2500 },
]

// Componente para el gráfico de producción de energía
export function EnergyProductionChart() {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">("daily")
  const [chartType, setChartType] = useState<"area" | "bar" | "line">("area")

  // Seleccionar datos según el rango de tiempo
  const data = timeRange === "daily" ? dailyData : timeRange === "weekly" ? weeklyData : monthlyData

  // Calcular totales y tendencias
  const totalSolar = data.reduce((sum, item) => sum + item.solar, 0)
  const totalWind = data.reduce((sum, item) => sum + item.wind, 0)
  const totalEnergy = totalSolar + totalWind

  // Calcular tendencias (simuladas para el ejemplo)
  const solarTrend = timeRange === "daily" ? 12 : timeRange === "weekly" ? 8 : 5
  const windTrend = timeRange === "daily" ? -8 : timeRange === "weekly" ? -5 : -3

  // Función para formatear valores en el tooltip
  const formatTooltipValue = (value: number) => {
    return `${value} ${timeRange === "daily" ? "MWh" : timeRange === "weekly" ? "MWh" : "MWh"}`
  }

  // Renderizar el gráfico según el tipo seleccionado
  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Area
                type="monotone"
                dataKey="solar"
                name="Solar"
                stroke="#FBBF24"
                fillOpacity={1}
                fill="url(#colorSolar)"
              />
              <Area
                type="monotone"
                dataKey="wind"
                name="Eólica"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorWind)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Bar dataKey="solar" name="Solar" fill="#FBBF24" />
              <Bar dataKey="wind" name="Eólica" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Line type="monotone" dataKey="solar" name="Solar" stroke="#FBBF24" strokeWidth={2} />
              <Line type="monotone" dataKey="wind" name="Eólica" stroke="#3B82F6" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Producción de Energía</CardTitle>
            <CardDescription>
              {timeRange === "daily"
                ? "Últimos 7 días"
                : timeRange === "weekly"
                  ? "Últimas 4 semanas"
                  : "Últimos 12 meses"}
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
              <TabsList className="h-8">
                <TabsTrigger value="daily" className="text-xs px-2 h-7">
                  Diario
                </TabsTrigger>
                <TabsTrigger value="weekly" className="text-xs px-2 h-7">
                  Semanal
                </TabsTrigger>
                <TabsTrigger value="monthly" className="text-xs px-2 h-7">
                  Mensual
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs value={chartType} onValueChange={(v) => setChartType(v as any)}>
              <TabsList className="h-8">
                <TabsTrigger value="area" className="text-xs px-2 h-7">
                  Área
                </TabsTrigger>
                <TabsTrigger value="bar" className="text-xs px-2 h-7">
                  Barras
                </TabsTrigger>
                <TabsTrigger value="line" className="text-xs px-2 h-7">
                  Líneas
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Solar</p>
                <h3 className="text-2xl font-bold mt-1">{totalSolar} MWh</h3>
              </div>
              <div
                className={`flex items-center ${
                  solarTrend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {solarTrend > 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span className="text-xs font-medium">{Math.abs(solarTrend)}%</span>
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-yellow-500 rounded-full"
                style={{ width: `${(totalSolar / totalEnergy) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Eólica</p>
                <h3 className="text-2xl font-bold mt-1">{totalWind} MWh</h3>
              </div>
              <div
                className={`flex items-center ${
                  windTrend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {windTrend > 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span className="text-xs font-medium">{Math.abs(windTrend)}%</span>
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${(totalWind / totalEnergy) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</p>
                <h3 className="text-2xl font-bold mt-1">{totalEnergy} MWh</h3>
              </div>
              <div
                className={`flex items-center ${
                  solarTrend + windTrend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {solarTrend + windTrend > 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span className="text-xs font-medium">{Math.abs(Math.round((solarTrend + windTrend) / 2))}%</span>
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: "100%" }}></div>
            </div>
          </div>
        </div>

        {renderChart()}
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            {timeRange === "daily"
              ? "Datos de los últimos 7 días"
              : timeRange === "weekly"
                ? "Datos de las últimas 4 semanas"
                : "Datos de los últimos 12 meses"}
          </span>
        </div>
        <Button variant="outline" size="sm" className="flex items-center">
          <Download className="h-4 w-4 mr-1" />
          Exportar datos
        </Button>
      </CardFooter>
    </Card>
  )
}
