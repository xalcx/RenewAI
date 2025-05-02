"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Battery, Calendar, Cloud, Droplets, Thermometer, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function OverviewCards() {
  const [timeframe, setTimeframe] = useState("day")

  const metrics = [
    {
      title: "Producción Total",
      value: timeframe === "day" ? "1,284" : timeframe === "week" ? "8,942" : "38,675",
      unit: "kWh",
      change: "+12.5%",
      trend: "up",
      icon: <Battery className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Velocidad del Viento",
      value: timeframe === "day" ? "18.3" : timeframe === "week" ? "16.7" : "15.2",
      unit: "km/h",
      change: "-3.2%",
      trend: "down",
      icon: <Wind className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Temperatura",
      value: timeframe === "day" ? "24.5" : timeframe === "week" ? "23.8" : "22.1",
      unit: "°C",
      change: "+1.8%",
      trend: "up",
      icon: <Thermometer className="h-5 w-5 text-orange-500" />,
    },
    {
      title: "Humedad",
      value: timeframe === "day" ? "62" : timeframe === "week" ? "58" : "55",
      unit: "%",
      change: "+4.5%",
      trend: "up",
      icon: <Droplets className="h-5 w-5 text-blue-400" />,
    },
    {
      title: "Cobertura de Nubes",
      value: timeframe === "day" ? "35" : timeframe === "week" ? "42" : "38",
      unit: "%",
      change: "-7.2%",
      trend: "down",
      icon: <Cloud className="h-5 w-5 text-gray-500" />,
    },
    {
      title: "Próximo Mantenimiento",
      value: timeframe === "day" ? "2" : timeframe === "week" ? "5" : "12",
      unit: "días",
      change: "",
      trend: "neutral",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Métricas Clave</h3>
        <Tabs defaultValue="day" value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="day">Día</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mes</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</h3>
                    <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">{metric.unit}</span>
                  </div>
                  {metric.change && (
                    <div className="flex items-center mt-1">
                      {metric.trend === "up" ? (
                        <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : metric.trend === "down" ? (
                        <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                      ) : null}
                      <span
                        className={`text-xs font-medium ${
                          metric.trend === "up"
                            ? "text-green-500"
                            : metric.trend === "down"
                              ? "text-red-500"
                              : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">{metric.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
