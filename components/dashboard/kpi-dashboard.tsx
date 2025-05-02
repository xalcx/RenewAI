"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Wind,
  Sun,
  BarChart3,
  Calendar,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  color: string
  percentage?: number
  target?: string
  onClick?: () => void
}

function KPICard({ title, value, change, trend, icon, color, percentage, target, onClick }: KPICardProps) {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    setExpanded(!expanded)
    if (onClick) onClick()
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md cursor-pointer",
        expanded ? "col-span-2 row-span-2" : "",
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full" onClick={handleClick}>
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
            </div>
            <div className="flex items-baseline mt-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
            </div>
            {change && (
              <div className="flex items-center mt-1">
                {trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : trend === "down" ? (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                ) : null}
                <span
                  className={`text-xs font-medium ${
                    trend === "up"
                      ? "text-green-500"
                      : trend === "down"
                        ? "text-red-500"
                        : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {change}
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>{icon}</div>
        </div>

        {percentage !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Progreso</span>
              {target && <span>Meta: {target}</span>}
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        )}

        {expanded && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-medium mb-2">Detalles adicionales</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Último día</p>
                <p className="text-sm font-medium">+12.5%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Última semana</p>
                <p className="text-sm font-medium">+8.3%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Último mes</p>
                <p className="text-sm font-medium">+15.7%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Último año</p>
                <p className="text-sm font-medium">+42.1%</p>
              </div>
            </div>

            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                Ver análisis detallado
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function KPIDashboard() {
  const [timeframe, setTimeframe] = useState("day")

  const kpis = [
    {
      title: "Producción Total",
      value: timeframe === "day" ? "1,284 kWh" : timeframe === "week" ? "8,942 kWh" : "38,675 kWh",
      change: "+12.5%",
      trend: "up" as const,
      icon: <Zap className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-100 dark:bg-purple-900/30",
      percentage: 78,
      target: "1,650 kWh",
    },
    {
      title: "Energía Eólica",
      value: timeframe === "day" ? "485 kWh" : timeframe === "week" ? "3,210 kWh" : "13,842 kWh",
      change: "-3.2%",
      trend: "down" as const,
      icon: <Wind className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
      percentage: 62,
      target: "780 kWh",
    },
    {
      title: "Energía Solar",
      value: timeframe === "day" ? "799 kWh" : timeframe === "week" ? "5,732 kWh" : "24,833 kWh",
      change: "+18.7%",
      trend: "up" as const,
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-100 dark:bg-yellow-900/30",
      percentage: 85,
      target: "940 kWh",
    },
    {
      title: "Eficiencia",
      value: "87.3%",
      change: "+5.2%",
      trend: "up" as const,
      icon: <BarChart3 className="h-5 w-5 text-green-500" />,
      color: "bg-green-100 dark:bg-green-900/30",
      percentage: 87,
      target: "90%",
    },
    {
      title: "Próximo Mantenimiento",
      value: "2 días",
      change: "",
      trend: "neutral" as const,
      icon: <Calendar className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-100 dark:bg-indigo-900/30",
      percentage: 25,
      target: "8 días",
    },
    {
      title: "Alertas Activas",
      value: "3",
      change: "-2",
      trend: "up" as const,
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      color: "bg-red-100 dark:bg-red-900/30",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Panel de Control</h2>
        <Tabs defaultValue="day" value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="day">Día</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mes</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            icon={kpi.icon}
            color={kpi.color}
            percentage={kpi.percentage}
            target={kpi.target}
          />
        ))}
      </div>
    </div>
  )
}
