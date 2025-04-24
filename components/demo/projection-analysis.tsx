"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import type { ChartOptions } from "chart.js"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

interface DataPoint {
  fecha: string
  generacion_kWh: number
  temperatura: number
  velocidad_viento: number
}

interface Asset {
  asset_type: string
  capacity: number
}

interface ProjectionPoint {
  fecha: string
  generacion_kWh: number
  temperatura: number
  velocidad_viento: number
  esProyeccion: boolean
}

interface Alert {
  type: "warning" | "success" | "info"
  message: string
  day: string
}

export function ProjectionAnalysis({
  data,
  asset,
}: {
  data: DataPoint[]
  asset: Asset | null
}) {
  const [projectionData, setProjectionData] = useState<ProjectionPoint[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    if (data.length > 0 && asset) {
      generateProjection()
    }
  }, [data, asset])

  const generateProjection = () => {
    // Convertir fechas a objetos Date para manipulación
    const datesWithData = data.map((point) => {
      let date
      try {
        date = new Date(point.fecha)
        if (isNaN(date.getTime())) {
          // Si la fecha no es válida, intentar otros formatos comunes
          const parts = point.fecha.split(/[/\-.]/)
          if (parts.length === 3) {
            // Intentar DD/MM/YYYY o YYYY-MM-DD
            if (parts[0].length === 4) {
              date = new Date(Number.parseInt(parts[0]), Number.parseInt(parts[1]) - 1, Number.parseInt(parts[2]))
            } else {
              date = new Date(Number.parseInt(parts[2]), Number.parseInt(parts[1]) - 1, Number.parseInt(parts[0]))
            }
          }
        }
      } catch (e) {
        console.error("Error parsing date:", e)
        date = new Date() // Fallback a fecha actual
      }

      return {
        ...point,
        dateObj: date,
        esProyeccion: false,
      }
    })

    // Ordenar por fecha
    datesWithData.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())

    // Obtener la última fecha de los datos
    const lastDate = datesWithData[datesWithData.length - 1].dateObj

    // Generar proyección para los próximos 7 días
    const projectionPoints: ProjectionPoint[] = []
    const newAlerts: Alert[] = []

    // Primero, añadir los datos históricos
    datesWithData.forEach((point) => {
      projectionPoints.push({
        fecha: point.dateObj.toLocaleDateString(),
        generacion_kWh: point.generacion_kWh,
        temperatura: point.temperatura,
        velocidad_viento: point.velocidad_viento,
        esProyeccion: false,
      })
    })

    // Calcular medias para usar en la proyección
    const avgGeneration = data.reduce((sum, point) => sum + point.generacion_kWh, 0) / data.length
    const avgTemperature = data.reduce((sum, point) => sum + point.temperatura, 0) / data.length
    const avgWindSpeed = data.reduce((sum, point) => sum + point.velocidad_viento, 0) / data.length

    // Generar datos de proyección
    for (let i = 1; i <= 7; i++) {
      const projectionDate = new Date(lastDate)
      projectionDate.setDate(lastDate.getDate() + i)

      // Simular variaciones basadas en el tipo de activo
      let tempVariation = Math.random() * 0.4 - 0.2 // -20% a +20%
      let windVariation = Math.random() * 0.5 - 0.25 // -25% a +25%
      let genVariation = 0

      // Ajustar según el día de la semana (fines de semana suelen tener patrones diferentes)
      const dayOfWeek = projectionDate.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

      if (isWeekend) {
        tempVariation += 0.05 // Ligeramente más cálido en fines de semana (estadísticamente)
        windVariation -= 0.05 // Ligeramente menos viento en fines de semana (estadísticamente)
      }

      // Ajustar según el tipo de activo
      if (asset.asset_type === "solar") {
        // Para solar, la temperatura afecta negativamente (paneles menos eficientes con calor)
        // y el viento positivamente (enfría los paneles)
        genVariation = -tempVariation * 0.3 + windVariation * 0.1
      } else if (asset.asset_type === "eolico") {
        // Para eólico, el viento es el factor principal
        genVariation = windVariation * 0.8
      } else {
        // Para híbrido, una combinación
        genVariation = windVariation * 0.4 - tempVariation * 0.15
      }

      // Añadir algo de aleatoriedad adicional
      genVariation += Math.random() * 0.2 - 0.1

      // Calcular valores proyectados
      const projectedTemp = avgTemperature * (1 + tempVariation)
      const projectedWind = avgWindSpeed * (1 + windVariation)
      const projectedGen = avgGeneration * (1 + genVariation)

      // Añadir punto de proyección
      projectionPoints.push({
        fecha: projectionDate.toLocaleDateString(),
        generacion_kWh: projectedGen,
        temperatura: projectedTemp,
        velocidad_viento: projectedWind,
        esProyeccion: true,
      })

      // Generar alertas basadas en la proyección
      const dayName = new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(projectionDate)

      if (projectedGen < avgGeneration * 0.8) {
        newAlerts.push({
          type: "warning",
          message: `Riesgo de baja producción el ${dayName} por ${
            asset.asset_type === "eolico"
              ? "viento débil"
              : asset.asset_type === "solar"
                ? "alta temperatura"
                : "condiciones desfavorables"
          }.`,
          day: dayName,
        })
      } else if (projectedGen > avgGeneration * 1.2) {
        newAlerts.push({
          type: "success",
          message: `Alta eficiencia esperada el ${dayName} por ${
            asset.asset_type === "eolico"
              ? "viento favorable"
              : asset.asset_type === "solar"
                ? "temperatura óptima"
                : "condiciones favorables"
          }.`,
          day: dayName,
        })
      }

      // Añadir algunas alertas informativas
      if (i === 3) {
        newAlerts.push({
          type: "info",
          message: `Recomendamos programar mantenimiento preventivo para la próxima semana.`,
          day: "Próxima semana",
        })
      }
    }

    // Si es fin de semana, añadir alerta específica
    const today = new Date()
    const isWeekend = today.getDay() === 0 || today.getDay() === 6
    if (isWeekend) {
      newAlerts.push({
        type: "info",
        message: "Recuerde que el soporte técnico tiene horario reducido durante el fin de semana.",
        day: "Hoy",
      })
    }

    setProjectionData(projectionPoints)
    setAlerts(newAlerts)
  }

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Fecha",
        },
      },
      y: {
        title: {
          display: true,
          text: "Generación (kWh)",
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  }

  const chartData = {
    labels: projectionData.map((point) => point.fecha),
    datasets: [
      {
        label: "Generación histórica",
        data: projectionData.map((point) => (point.esProyeccion ? null : point.generacion_kWh)),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.1,
        pointStyle: "circle",
      },
      {
        label: "Proyección",
        data: projectionData.map((point) => point.generacion_kWh),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderDash: [5, 5],
        tension: 0.1,
        pointStyle: (point) =>
          point ? (projectionData[projectionData.indexOf(point as any)]?.esProyeccion ? "star" : "circle") : "circle",
      },
    ],
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Proyección y Alertas</CardTitle>
        <CardDescription>Análisis predictivo para los próximos 7 días</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {projectionData.length > 0 ? (
          <>
            <div className="h-[300px]">
              <Line options={chartOptions} data={chartData} />
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Alertas y Recomendaciones</h4>
              <div className="space-y-2">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-start space-x-2 ${
                      alert.type === "warning"
                        ? "bg-amber-50 border border-amber-200"
                        : alert.type === "success"
                          ? "bg-green-50 border border-green-200"
                          : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                    <div>
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.day}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Resumen de proyección</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  Generación media proyectada:{" "}
                  {projectionData.filter((p) => p.esProyeccion).reduce((sum, p) => sum + p.generacion_kWh, 0) /
                    (7).toFixed(2)}{" "}
                  kWh/día
                </li>
                <li>
                  {(() => {
                    const historicAvg =
                      projectionData.filter((p) => !p.esProyeccion).reduce((sum, p) => sum + p.generacion_kWh, 0) /
                      projectionData.filter((p) => !p.esProyeccion).length

                    const projectionAvg =
                      projectionData.filter((p) => p.esProyeccion).reduce((sum, p) => sum + p.generacion_kWh, 0) / 7

                    const percentChange = ((projectionAvg - historicAvg) / historicAvg) * 100

                    return `Tendencia: ${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(1)}% respecto al período anterior`
                  })()}
                </li>
                <li>
                  Mejor día proyectado: {(() => {
                    const projectionOnly = projectionData.filter((p) => p.esProyeccion)
                    if (projectionOnly.length === 0) return "N/A"

                    const bestDay = projectionOnly.reduce(
                      (best, current) => (current.generacion_kWh > best.generacion_kWh ? current : best),
                      projectionOnly[0],
                    )

                    return `${bestDay.fecha} (${bestDay.generacion_kWh.toFixed(2)} kWh)`
                  })()}
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Carga datos históricos para generar proyecciones</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
