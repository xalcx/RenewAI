"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Datos simulados para los gráficos
const energyData = [
  { date: "Ene", solar: 65, eolica: 78, hidro: 30 },
  { date: "Feb", solar: 72, eolica: 82, hidro: 32 },
  { date: "Mar", solar: 85, eolica: 76, hidro: 35 },
  { date: "Abr", solar: 92, eolica: 70, hidro: 38 },
  { date: "May", solar: 98, eolica: 68, hidro: 40 },
  { date: "Jun", solar: 105, eolica: 65, hidro: 45 },
  { date: "Jul", solar: 110, eolica: 67, hidro: 42 },
  { date: "Ago", solar: 108, eolica: 72, hidro: 39 },
  { date: "Sep", solar: 95, eolica: 80, hidro: 37 },
  { date: "Oct", solar: 85, eolica: 85, hidro: 35 },
  { date: "Nov", solar: 75, eolica: 90, hidro: 32 },
  { date: "Dic", solar: 68, eolica: 88, hidro: 30 },
]

const efficiencyData = [
  { date: "Ene", actual: 82, predicho: 80 },
  { date: "Feb", actual: 83, predicho: 84 },
  { date: "Mar", actual: 86, predicho: 85 },
  { date: "Abr", actual: 87, predicho: 87 },
  { date: "May", actual: 89, predicho: 88 },
  { date: "Jun", actual: 90, predicho: 90 },
  { date: "Jul", actual: 91, predicho: 92 },
  { date: "Ago", actual: 92, predicho: 91 },
  { date: "Sep", actual: 90, predicho: 90 },
  { date: "Oct", actual: 88, predicho: 89 },
  { date: "Nov", actual: 85, predicho: 86 },
  { date: "Dic", actual: 83, predicho: 84 },
]

export function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Análisis Avanzado</h2>
        <p className="text-muted-foreground">
          Visualiza y analiza el rendimiento de tus instalaciones renovables con IA.
        </p>
      </div>

      <Tabs defaultValue="production" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="production">Producción</TabsTrigger>
          <TabsTrigger value="efficiency">Eficiencia</TabsTrigger>
          <TabsTrigger value="predictions">Predicciones</TabsTrigger>
        </TabsList>

        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Producción Energética por Fuente</CardTitle>
              <CardDescription>Comparativa de producción entre diferentes fuentes renovables (MWh)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  solar: {
                    label: "Energía Solar",
                    color: "hsl(var(--chart-1))",
                  },
                  eolica: {
                    label: "Energía Eólica",
                    color: "hsl(var(--chart-2))",
                  },
                  hidro: {
                    label: "Energía Hidráulica",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={energyData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="solar"
                      stroke="var(--color-solar)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="eolica"
                      stroke="var(--color-eolica)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="hidro"
                      stroke="var(--color-hidro)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard title="Producción Total" value="1,245 MWh" change="+12.5%" trend="up" />
            <MetricCard title="Eficiencia Media" value="87.3%" change="+2.1%" trend="up" />
            <MetricCard title="Disponibilidad" value="99.2%" change="-0.3%" trend="down" />
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Eficiencia Real vs. Predicha</CardTitle>
              <CardDescription>
                Comparativa entre la eficiencia real y la predicha por nuestros modelos de IA (%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  actual: {
                    label: "Eficiencia Real",
                    color: "hsl(var(--chart-1))",
                  },
                  predicho: {
                    label: "Eficiencia Predicha",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={efficiencyData}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[75, 95]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="var(--color-actual)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicho"
                      stroke="var(--color-predicho)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard title="Precisión del Modelo" value="98.7%" change="+1.2%" trend="up" />
            <MetricCard title="Desviación Media" value="1.3%" change="-0.5%" trend="up" />
            <MetricCard title="Confianza" value="Alta" change="" trend="neutral" />
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predicciones de Producción a 6 Meses</CardTitle>
              <CardDescription>Proyecciones basadas en modelos de IA y datos históricos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Gráfico de predicciones avanzadas</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Factores de Influencia</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Condiciones Meteorológicas</span>
                    <span className="font-medium">Alto impacto</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Degradación de Equipos</span>
                    <span className="font-medium">Medio impacto</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Mantenimiento Programado</span>
                    <span className="font-medium">Bajo impacto</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Estacionalidad</span>
                    <span className="font-medium">Alto impacto</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones de IA</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Optimización de Ángulos Solares</span>
                    <span className="text-green-500 font-medium">+3.2% eficiencia</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Mantenimiento Preventivo</span>
                    <span className="text-green-500 font-medium">-15% fallos</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Redistribución de Cargas</span>
                    <span className="text-green-500 font-medium">+2.8% producción</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`text-xs mt-1 ${
              trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
