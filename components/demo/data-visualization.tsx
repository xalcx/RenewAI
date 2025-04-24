"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface DataPoint {
  fecha: string
  generacion_kWh: number
  temperatura: number
  velocidad_viento: number
}

interface DataMetrics {
  mediaGeneracion: number
  desviacionGeneracion: number
  menorProduccion: {
    fecha: string
    valor: number
  }
  mayorProduccion: {
    fecha: string
    valor: number
  }
  totalGeneracion: number
}

export function DataVisualization({ data }: { data: DataPoint[] }) {
  const [activeTab, setActiveTab] = useState("generacion")
  const [metrics, setMetrics] = useState<DataMetrics | null>(null)

  useEffect(() => {
    if (data && data.length > 0) {
      calculateMetrics()
    }
  }, [data])

  const calculateMetrics = () => {
    // Calcular media de generación
    const totalGeneracion = data.reduce((sum, point) => sum + point.generacion_kWh, 0)
    const mediaGeneracion = totalGeneracion / data.length

    // Calcular desviación estándar
    const varianza =
      data.reduce((sum, point) => {
        const diff = point.generacion_kWh - mediaGeneracion
        return sum + diff * diff
      }, 0) / data.length
    const desviacionGeneracion = Math.sqrt(varianza)

    // Encontrar día de menor producción
    let menorProduccion = { fecha: data[0].fecha, valor: data[0].generacion_kWh }
    let mayorProduccion = { fecha: data[0].fecha, valor: data[0].generacion_kWh }

    data.forEach((point) => {
      if (point.generacion_kWh < menorProduccion.valor) {
        menorProduccion = { fecha: point.fecha, valor: point.generacion_kWh }
      }
      if (point.generacion_kWh > mayorProduccion.valor) {
        mayorProduccion = { fecha: point.fecha, valor: point.generacion_kWh }
      }
    })

    setMetrics({
      mediaGeneracion,
      desviacionGeneracion,
      menorProduccion,
      mayorProduccion,
      totalGeneracion,
    })
  }

  const formatDate = (dateStr: string) => {
    try {
      // Intentar varios formatos de fecha
      const date = new Date(dateStr)
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString()
      }
      return dateStr
    } catch {
      return dateStr
    }
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
          text:
            activeTab === "generacion"
              ? "Generación (kWh)"
              : activeTab === "temperatura"
                ? "Temperatura (°C)"
                : "Velocidad del viento (m/s)",
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

  const generacionData = {
    labels: data.map((point) => formatDate(point.fecha)),
    datasets: [
      {
        label: "Generación (kWh)",
        data: data.map((point) => point.generacion_kWh),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.1,
      },
    ],
  }

  const temperaturaData = {
    labels: data.map((point) => formatDate(point.fecha)),
    datasets: [
      {
        label: "Temperatura (°C)",
        data: data.map((point) => point.temperatura),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
      },
    ],
  }

  const vientoData = {
    labels: data.map((point) => formatDate(point.fecha)),
    datasets: [
      {
        label: "Velocidad del viento (m/s)",
        data: data.map((point) => point.velocidad_viento),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        tension: 0.1,
      },
    ],
  }

  const correlacionData = {
    labels: data.map((point) => formatDate(point.fecha)),
    datasets: [
      {
        label: "Generación (kWh)",
        data: data.map((point) => point.generacion_kWh),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.1,
        yAxisID: "y",
      },
      {
        label: "Temperatura (°C)",
        data: data.map((point) => point.temperatura),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
        yAxisID: "y1",
      },
      {
        label: "Velocidad del viento (m/s)",
        data: data.map((point) => point.velocidad_viento),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        tension: 0.1,
        yAxisID: "y2",
      },
    ],
  }

  const correlacionOptions: ChartOptions<"line"> = {
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
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Generación (kWh)",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Temperatura (°C)",
        },
      },
      y2: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Velocidad (m/s)",
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Visualización de Datos</CardTitle>
        <CardDescription>Análisis de los datos de generación y variables ambientales</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Media diaria</p>
              <p className="text-xl font-bold">{metrics.mediaGeneracion.toFixed(2)} kWh</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Desviación</p>
              <p className="text-xl font-bold">{metrics.desviacionGeneracion.toFixed(2)} kWh</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Menor producción</p>
              <p className="text-xl font-bold">{metrics.menorProduccion.valor.toFixed(2)} kWh</p>
              <p className="text-xs text-muted-foreground">{formatDate(metrics.menorProduccion.fecha)}</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Mayor producción</p>
              <p className="text-xl font-bold">{metrics.mayorProduccion.valor.toFixed(2)} kWh</p>
              <p className="text-xs text-muted-foreground">{formatDate(metrics.mayorProduccion.fecha)}</p>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="generacion">Generación</TabsTrigger>
            <TabsTrigger value="temperatura">Temperatura</TabsTrigger>
            <TabsTrigger value="viento">Viento</TabsTrigger>
            <TabsTrigger value="correlacion">Correlación</TabsTrigger>
          </TabsList>
          <TabsContent value="generacion">
            <div className="h-[300px]">
              <Line options={chartOptions} data={generacionData} />
            </div>
          </TabsContent>
          <TabsContent value="temperatura">
            <div className="h-[300px]">
              <Line options={chartOptions} data={temperaturaData} />
            </div>
          </TabsContent>
          <TabsContent value="viento">
            <div className="h-[300px]">
              <Line options={chartOptions} data={vientoData} />
            </div>
          </TabsContent>
          <TabsContent value="correlacion">
            <div className="h-[300px]">
              <Line options={correlacionOptions} data={correlacionData} />
            </div>
          </TabsContent>
        </Tabs>

        {metrics && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2">Análisis preliminar</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Badge variant="outline" className="mr-2 mt-0.5">
                  Producción
                </Badge>
                <span>
                  Producción total de {metrics.totalGeneracion.toFixed(2)} kWh con una media diaria de{" "}
                  {metrics.mediaGeneracion.toFixed(2)} kWh.
                </span>
              </li>
              <li className="flex items-start">
                <Badge variant="outline" className="mr-2 mt-0.5">
                  Variabilidad
                </Badge>
                <span>
                  La desviación estándar de {metrics.desviacionGeneracion.toFixed(2)} kWh indica{" "}
                  {metrics.desviacionGeneracion > metrics.mediaGeneracion * 0.3 ? "alta" : "moderada"} variabilidad en
                  la producción.
                </span>
              </li>
              <li className="flex items-start">
                <Badge variant="outline" className="mr-2 mt-0.5">
                  Eficiencia
                </Badge>
                <span>
                  El factor de capacidad estimado es del{" "}
                  {(((metrics.mediaGeneracion * 24) / (data[0]?.capacidad || 100)) * 100).toFixed(1)}%.
                </span>
              </li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
