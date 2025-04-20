"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Wind, Sun, Zap, Calendar, BarChart2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import dynamic from "next/dynamic"

// Importar el mapa dinámicamente para evitar problemas de SSR
const MapWithNoSSR = dynamic(() => import("@/components/demo/map-component"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-muted/20 rounded-lg">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
})

// Datos de parques renovables
const RENEWABLE_PARKS = [
  {
    id: "wind1",
    name: "Parque Eólico Navarra",
    type: "wind",
    capacity: 50,
    location: [42.816, -1.6442],
    generation: 32.5,
    efficiency: 65,
    co2Saved: 18.2,
    status: "online",
  },
  {
    id: "wind2",
    name: "Parque Eólico Galicia",
    type: "wind",
    capacity: 75,
    location: [42.5751, -8.1339],
    generation: 48.7,
    efficiency: 64.9,
    co2Saved: 27.3,
    status: "online",
  },
  {
    id: "solar1",
    name: "Planta Solar Andalucía",
    type: "solar",
    capacity: 40,
    location: [37.3891, -5.9845],
    generation: 28.4,
    efficiency: 71,
    co2Saved: 15.9,
    status: "online",
  },
  {
    id: "solar2",
    name: "Planta Solar Extremadura",
    type: "solar",
    capacity: 60,
    location: [39.4699, -6.3763],
    generation: 42.6,
    efficiency: 71,
    co2Saved: 23.9,
    status: "maintenance",
  },
  {
    id: "hybrid1",
    name: "Parque Híbrido Castilla",
    type: "hybrid",
    capacity: 85,
    location: [41.6523, -4.7245],
    generation: 59.5,
    efficiency: 70,
    co2Saved: 33.3,
    status: "online",
  },
]

// Interfaz para los datos históricos
interface HistoricalData {
  date: string
  generation: number
  forecast: number
}

export default function RenewableParkMonitor() {
  // Estados
  const [selectedPark, setSelectedPark] = useState<string | null>(null)
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("map")

  // Función para generar datos históricos simulados
  const generateHistoricalData = (parkId: string) => {
    const data: HistoricalData[] = []
    const now = new Date()
    const park = RENEWABLE_PARKS.find((p) => p.id === parkId)

    if (!park) return []

    for (let i = 30; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(now.getDate() - i)

      // Generación base con variación estacional
      const seasonalFactor = Math.sin(((date.getMonth() + 1) * Math.PI) / 6) * 0.2 + 0.8

      // Variación por tipo de instalación
      let typeFactor = 1
      if (park.type === "wind") {
        // Más variabilidad para eólica
        typeFactor = 0.7 + Math.random() * 0.6
      } else if (park.type === "solar") {
        // Menos variabilidad para solar
        typeFactor = 0.8 + Math.random() * 0.4
      } else {
        // Híbrido más estable
        typeFactor = 0.85 + Math.random() * 0.3
      }

      const generationFactor = seasonalFactor * typeFactor
      const generation = Math.round(park.capacity * generationFactor * 10) / 10

      // Forecast con pequeña desviación
      const forecastError = Math.random() * 0.2 - 0.1 // ±10%
      const forecast = Math.round(generation * (1 + forecastError) * 10) / 10

      data.push({
        date: date.toLocaleDateString(),
        generation,
        forecast,
      })
    }

    return data
  }

  // Función para cargar datos históricos
  const loadHistoricalData = (parkId: string) => {
    setIsLoading(true)

    // Simulamos una llamada a API
    setTimeout(() => {
      const data = generateHistoricalData(parkId)
      setHistoricalData(data)
      setIsLoading(false)
    }, 1000)
  }

  // Manejar selección de parque
  const handleParkSelect = (parkId: string) => {
    setSelectedPark(parkId)
    loadHistoricalData(parkId)
    setActiveTab("details")
  }

  // Obtener el parque seleccionado
  const selectedParkData = selectedPark ? RENEWABLE_PARKS.find((p) => p.id === selectedPark) : null

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Monitor en Vivo de Parques Renovables</h2>
          <p className="text-muted-foreground mb-6">
            Visualiza en tiempo real la producción y estado de activos renovables mediante integración de datos
            satelitales y sensores IoT, permitiendo una gestión operativa optimizada y reduciendo tiempos de respuesta
            ante incidencias.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <span>Mapa interactivo</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2" disabled={!selectedPark}>
              <span>Detalles del parque</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="m-0">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="h-[500px] rounded-lg overflow-hidden border">
                  <MapWithNoSSR parks={RENEWABLE_PARKS} onParkSelect={handleParkSelect} selectedPark={selectedPark} />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Parques renovables</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Selecciona un parque en el mapa o en la lista para ver detalles
                </p>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {RENEWABLE_PARKS.map((park) => (
                    <Card
                      key={park.id}
                      className={`cursor-pointer transition-colors ${selectedPark === park.id ? "border-primary" : ""}`}
                      onClick={() => handleParkSelect(park.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {park.type === "wind" ? (
                                <Wind className="h-4 w-4 text-blue-500" />
                              ) : park.type === "solar" ? (
                                <Sun className="h-4 w-4 text-yellow-500" />
                              ) : (
                                <Zap className="h-4 w-4 text-green-500" />
                              )}
                              <h4 className="font-medium">{park.name}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">Capacidad: {park.capacity} MW</p>
                          </div>
                          <Badge variant={park.status === "online" ? "default" : "secondary"}>
                            {park.status === "online" ? "En línea" : "Mantenimiento"}
                          </Badge>
                        </div>

                        <div className="mt-3 pt-3 border-t flex justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Generación actual</p>
                            <p className="font-bold">{park.generation} MWh</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Eficiencia</p>
                            <p className="font-bold">{park.efficiency}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="m-0">
            {selectedParkData ? (
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-6 md:col-span-1">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        {selectedParkData.type === "wind" ? (
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <Wind className="h-6 w-6 text-blue-500" />
                          </div>
                        ) : selectedParkData.type === "solar" ? (
                          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                            <Sun className="h-6 w-6 text-yellow-500" />
                          </div>
                        ) : (
                          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <Zap className="h-6 w-6 text-green-500" />
                          </div>
                        )}

                        <div>
                          <h3 className="text-xl font-bold">{selectedParkData.name}</h3>
                          <Badge variant={selectedParkData.status === "online" ? "default" : "secondary"}>
                            {selectedParkData.status === "online" ? "En línea" : "Mantenimiento"}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Tipo de instalación</p>
                          <p className="font-medium">
                            {selectedParkData.type === "wind"
                              ? "Parque Eólico"
                              : selectedParkData.type === "solar"
                                ? "Planta Solar"
                                : "Parque Híbrido"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Capacidad instalada</p>
                          <p className="font-medium">{selectedParkData.capacity} MW</p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Ubicación</p>
                          <p className="font-medium">
                            {selectedParkData.location[0].toFixed(4)}, {selectedParkData.location[1].toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Estadísticas en vivo</h3>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Generación actual</p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold">{selectedParkData.generation} MWh</p>
                            <p className="text-sm text-green-500">
                              {Math.round((selectedParkData.generation / selectedParkData.capacity) * 100)}% de
                              capacidad
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Eficiencia</p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold">{selectedParkData.efficiency}%</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">CO₂ evitado hoy</p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold">{selectedParkData.co2Saved} ton</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-80">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                        <p className="text-muted-foreground">Cargando datos históricos...</p>
                      </div>
                    </div>
                  ) : historicalData.length > 0 ? (
                    <div className="space-y-6">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">Generación histórica (30 días)</h3>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {historicalData[0].date} - {historicalData[historicalData.length - 1].date}
                              </span>
                            </div>
                          </div>

                          <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis dataKey="date" />
                                <YAxis
                                  label={{
                                    value: "Generación (MWh)",
                                    angle: -90,
                                    position: "insideLeft",
                                    style: { textAnchor: "middle" },
                                  }}
                                />
                                <Tooltip />
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey="generation"
                                  name="Generación real"
                                  stroke="#10B981"
                                  strokeWidth={2}
                                  dot={{ r: 1 }}
                                  activeDot={{ r: 5 }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="forecast"
                                  name="Previsión"
                                  stroke="#3B82F6"
                                  strokeWidth={2}
                                  strokeDasharray="5 5"
                                  dot={{ r: 1 }}
                                  activeDot={{ r: 5 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <BarChart2 className="h-5 w-5 text-primary" />
                              <h4 className="font-medium">Generación media</h4>
                            </div>
                            <p className="text-2xl font-bold">
                              {Math.round(
                                historicalData.reduce((sum, data) => sum + data.generation, 0) / historicalData.length,
                              )}{" "}
                              MWh
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Factor de capacidad:{" "}
                              {Math.round(
                                (historicalData.reduce((sum, data) => sum + data.generation, 0) /
                                  (selectedParkData.capacity * historicalData.length)) *
                                  100,
                              )}
                              %
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="h-5 w-5 text-green-500" />
                              <h4 className="font-medium">CO₂ evitado (mes)</h4>
                            </div>
                            <p className="text-2xl font-bold">
                              {Math.round(historicalData.reduce((sum, data) => sum + data.generation, 0) * 0.56)} ton
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Equivalente a{" "}
                              {Math.round(
                                (historicalData.reduce((sum, data) => sum + data.generation, 0) * 0.56) / 4.6,
                              )}{" "}
                              coches menos
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-80 border rounded-lg bg-muted/10">
                      <p className="text-muted-foreground">No hay datos históricos disponibles</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-80 border rounded-lg bg-muted/10">
                <p className="text-muted-foreground">Selecciona un parque para ver detalles</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
