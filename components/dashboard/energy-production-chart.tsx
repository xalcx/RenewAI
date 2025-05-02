"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos simulados
const dailyData = [
  { name: "00:00", solar: 0, wind: 120, hydro: 80 },
  { name: "03:00", solar: 0, wind: 132, hydro: 78 },
  { name: "06:00", solar: 45, wind: 99, hydro: 82 },
  { name: "09:00", solar: 210, wind: 85, hydro: 85 },
  { name: "12:00", solar: 290, wind: 105, hydro: 88 },
  { name: "15:00", solar: 250, wind: 145, hydro: 90 },
  { name: "18:00", solar: 130, wind: 185, hydro: 87 },
  { name: "21:00", solar: 0, wind: 170, hydro: 84 },
]

const weeklyData = [
  { name: "Lun", solar: 820, wind: 950, hydro: 580 },
  { name: "Mar", solar: 750, wind: 1050, hydro: 590 },
  { name: "Mié", solar: 910, wind: 880, hydro: 600 },
  { name: "Jue", solar: 870, wind: 780, hydro: 585 },
  { name: "Vie", solar: 920, wind: 850, hydro: 590 },
  { name: "Sáb", solar: 960, wind: 920, hydro: 595 },
  { name: "Dom", solar: 980, wind: 980, hydro: 600 },
]

const monthlyData = [
  { name: "Sem 1", solar: 5800, wind: 6500, hydro: 4100 },
  { name: "Sem 2", solar: 6200, wind: 5900, hydro: 4200 },
  { name: "Sem 3", solar: 5900, wind: 6300, hydro: 4150 },
  { name: "Sem 4", solar: 6500, wind: 6100, hydro: 4250 },
]

export function EnergyProductionChart() {
  const [timeframe, setTimeframe] = useState("day")
  const [chartType, setChartType] = useState("bar")

  const data = timeframe === "day" ? dailyData : timeframe === "week" ? weeklyData : monthlyData

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Producción de Energía</h3>
        <div className="flex items-center gap-4">
          <Tabs defaultValue="day" value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="day">Día</TabsTrigger>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mes</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Tipo de gráfico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Barras</SelectItem>
              <SelectItem value="line">Líneas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="solar" name="Solar" fill="#fbbf24" />
              <Bar dataKey="wind" name="Eólica" fill="#60a5fa" />
              <Bar dataKey="hydro" name="Hidráulica" fill="#34d399" />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="solar" name="Solar" stroke="#fbbf24" strokeWidth={2} />
              <Line type="monotone" dataKey="wind" name="Eólica" stroke="#60a5fa" strokeWidth={2} />
              <Line type="monotone" dataKey="hydro" name="Hidráulica" stroke="#34d399" strokeWidth={2} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
