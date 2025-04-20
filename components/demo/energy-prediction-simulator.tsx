"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Wind, Sun, CloudRain, Thermometer } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Tipos para los datos meteorológicos
interface WeatherData {
  time: string
  temperature: number
  windSpeed: number
  solarRadiation: number
  precipitation: number
}

// Tipos para los datos de generación
interface GenerationData {
  time: string
  generation: number
  baseline: number
}

// Ubicaciones predefinidas
const LOCATIONS = [
  { id: "madrid", name: "Madrid, España", lat: 40.416775, lon: -3.70379 },
  { id: "barcelona", name: "Barcelona, España", lat: 41.390205, lon: 2.154007 },
  { id: "sevilla", name: "Sevilla, España", lat: 37.389092, lon: -5.984459 },
  { id: "valencia", name: "Valencia, España", lat: 39.469907, lon: -0.376288 },
  { id: "bilbao", name: "Bilbao, España", lat: 43.263013, lon: -2.934985 },
]

// Tipos de instalación
const INSTALLATION_TYPES = [
  { id: "wind", name: "Parque Eólico", icon: <Wind className="h-4 w-4" /> },
  { id: "solar", name: "Parque Solar", icon: <Sun className="h-4 w-4" /> },
]

export default function EnergyPredictionSimulator() {
  // Estados para los parámetros de entrada
  const [location, setLocation] = useState(LOCATIONS[0].id)
  const [installationType, setInstallationType] = useState(INSTALLATION_TYPES[0].id)
  const [capacity, setCapacity] = useState("50")

  // Estados para los datos y la carga
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [generationData, setGenerationData] = useState<GenerationData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showImpact, setShowImpact] = useState(false)

  // Función para generar datos meteorológicos simulados
  const generateWeatherData = () => {
    const data: WeatherData[] = []
    const now = new Date()

    for (let i = 0; i < 24; i++) {
      const time = new Date(now)
      time.setHours(now.getHours() + i)

      // Valores base según la ubicación
      let tempBase = 0
      let windBase = 0
      let solarBase = 0
      let precipBase = 0

      switch (location) {
        case "madrid":
          tempBase = 20
          windBase = 15
          solarBase = 700
          precipBase = 0.2
          break
        case "barcelona":
          tempBase = 22
          windBase = 12
          solarBase = 750
          precipBase = 0.1
          break
        case "sevilla":
          tempBase = 25
          windBase = 10
          solarBase = 800
          precipBase = 0.05
          break
        case "valencia":
          tempBase = 23
          windBase = 14
          solarBase = 780
          precipBase = 0.15
          break
        case "bilbao":
          tempBase = 18
          windBase = 20
          solarBase = 650
          precipBase = 0.3
          break
      }

      // Variación diurna
      const hourFactor = Math.sin(((time.getHours() - 6) * Math.PI) / 12)
      const tempVariation = 5 * hourFactor
      const windVariation = 5 * (Math.random() - 0.5)
      const solarVariation = 300 * (hourFactor > 0 ? hourFactor : 0)
      const precipVariation = 0.5 * Math.random()

      data.push({
        time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        temperature: Math.round((tempBase + tempVariation) * 10) / 10,
        windSpeed: Math.max(0, Math.round((windBase + windVariation) * 10) / 10),
        solarRadiation: Math.max(0, Math.round(solarBase + solarVariation)),
        precipitation: Math.max(0, Math.round((precipBase + precipVariation) * 100) / 100),
      })
    }

    return data
  }

  // Función para calcular la generación de energía
  const calculateGeneration = (weatherData: WeatherData[], capacityMW: number, type: string) => {
    return weatherData.map((data) => {
      let efficiency = 0

      if (type === "wind") {
        // Modelo simplificado para eólica basado en velocidad del viento
        // Eficiencia máxima entre 12-25 km/h, reducción por debajo y por encima
        const windSpeed = data.windSpeed
        if (windSpeed < 3) {
          efficiency = 0 // Por debajo de velocidad de arranque
        } else if (windSpeed < 12) {
          efficiency = ((windSpeed - 3) / 9) * 0.8
        } else if (windSpeed < 25) {
          efficiency = 0.8 // Eficiencia máxima
        } else if (windSpeed < 35) {
          efficiency = 0.8 - ((windSpeed - 25) / 10) * 0.8
        } else {
          efficiency = 0 // Parada por viento excesivo
        }

        // Reducción por temperatura extrema
        if (data.temperature > 35 || data.temperature < -5) {
          efficiency *= 0.9
        }

        // Reducción por precipitación
        if (data.precipitation > 0.5) {
          efficiency *= 0.95
        }
      } else {
        // Modelo simplificado para solar basado en radiación solar
        const radiation = data.solarRadiation
        efficiency = Math.min(radiation / 1000, 1) * 0.85

        // Reducción por temperatura alta (paneles menos eficientes)
        if (data.temperature > 25) {
          efficiency *= 1 - (data.temperature - 25) * 0.005
        }

        // Reducción por precipitación (nubes)
        if (data.precipitation > 0.1) {
          efficiency *= 1 - data.precipitation * 0.5
        }
      }

      // Generación en MWh
      const generation = capacityMW * efficiency

      return {
        time: data.time,
        generation: Math.round(generation * 100) / 100,
        baseline: Math.round(generation * 100) / 100, // Para comparación
      }
    })
  }

  // Función para simular el impacto de cambios meteorológicos
  const simulateImpact = (generationData: GenerationData[]) => {
    return generationData.map((data, index) => {
      // Aplicamos un cambio aleatorio a la generación
      const impactFactor =
        installationType === "wind"
          ? 1 + (Math.random() * 0.4 - 0.2) // ±20% para eólica
          : 1 + (Math.random() * 0.3 - 0.15) // ±15% para solar

      return {
        ...data,
        generation: Math.round(data.baseline * impactFactor * 100) / 100,
      }
    })
  }

  // Función para generar la predicción
  const generatePrediction = () => {
    setIsLoading(true)
    setShowImpact(false)

    // Simulamos una llamada a API con un pequeño retraso
    setTimeout(() => {
      const weather = generateWeatherData()
      setWeatherData(weather)

      const generation = calculateGeneration(weather, Number.parseFloat(capacity), installationType)
      setGenerationData(generation)

      setIsLoading(false)
    }, 1500)
  }

  // Función para mostrar el impacto de cambios meteorológicos
  const handleShowImpact = () => {
    setIsLoading(true)

    // Simulamos una llamada a API con un pequeño retraso
    setTimeout(() => {
      const impactedData = simulateImpact(generationData)
      setGenerationData(impactedData)
      setShowImpact(true)
      setIsLoading(false)
    }, 1000)
  }

  // Generar predicción inicial al cargar
  useEffect(() => {
    generatePrediction()
  }, [])

  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-1">
          <div>
            <h2 className="text-2xl font-bold mb-4">Simulador de Predicción Energética</h2>
            <p className="text-muted-foreground mb-6">
              Predice la generación de energía renovable basada en datos meteorológicos y características de la
              instalación, reduciendo la incertidumbre y las penalizaciones de mercado hasta un 20% mediante modelos
              avanzados de series temporales.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Ubicación</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Selecciona ubicación" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="installation-type">Tipo de instalación</Label>
              <Select value={installationType} onValueChange={setInstallationType}>
                <SelectTrigger id="installation-type">
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
                <SelectContent>
                  {INSTALLATION_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="capacity">Capacidad instalada (MW)</Label>
              <Input
                id="capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                min="1"
                max="1000"
              />
            </div>

            <div className="pt-4 space-y-3">
              <Button onClick={generatePrediction} className="w-full bg-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generando predicción...
                  </>
                ) : (
                  "Generar predicción"
                )}
              </Button>

              <Button
                onClick={handleShowImpact}
                variant="outline"
                className="w-full"
                disabled={isLoading || generationData.length === 0}
              >
                Ver impacto de cambios meteorológicos
              </Button>
            </div>
          </div>

          {/* Resumen de condiciones meteorológicas */}
          {weatherData.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium mb-3">Condiciones meteorológicas actuales</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">{weatherData[0].temperature}°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{weatherData[0].windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{weatherData[0].solarRadiation} W/m²</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-sky-500" />
                    <span className="text-sm">{weatherData[0].precipitation} mm</span>
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
                <p className="text-muted-foreground">Generando predicción energética...</p>
              </div>
            </div>
          ) : generationData.length > 0 ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Predicción de generación (24h)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {showImpact
                    ? "Mostrando el impacto de cambios meteorológicos en la generación"
                    : "Generación estimada basada en las condiciones meteorológicas previstas"}
                </p>

                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={generationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="time" />
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
                      {showImpact && (
                        <Line
                          type="monotone"
                          dataKey="baseline"
                          stroke="#9CA3AF"
                          name="Predicción base"
                          strokeDasharray="5 5"
                        />
                      )}
                      <Line
                        type="monotone"
                        dataKey="generation"
                        stroke={installationType === "wind" ? "#3B82F6" : "#F59E0B"}
                        name="Generación estimada"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Estadísticas de generación */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-sm font-medium mb-1">Generación total</h4>
                    <p className="text-2xl font-bold">
                      {Math.round(generationData.reduce((sum, data) => sum + data.generation, 0))} MWh
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-sm font-medium mb-1">Generación máxima</h4>
                    <p className="text-2xl font-bold">
                      {Math.round(Math.max(...generationData.map((data) => data.generation)) * 10) / 10} MWh
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-sm font-medium mb-1">Factor de capacidad</h4>
                    <p className="text-2xl font-bold">
                      {Math.round(
                        (generationData.reduce((sum, data) => sum + data.generation, 0) /
                          (Number.parseFloat(capacity) * 24)) *
                          100,
                      )}
                      %
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-80 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">Configura los parámetros y genera una predicción</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
