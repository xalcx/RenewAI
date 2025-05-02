"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, AlertTriangle, Info, Wind, Sun, Zap, Layers, MapPin, BarChart4, Cloud, CloudRain } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Tipos para los parques renovables
interface RenewablePark {
  id: string
  name: string
  type: "solar" | "wind" | "hybrid"
  capacity: number
  location: [number, number]
  status: "online" | "maintenance" | "offline" | "warning"
  efficiency: number
  lastUpdate: string
  alerts: number
  weatherCondition: "sunny" | "cloudy" | "rainy" | "stormy"
  production: number
  forecast: number
  co2Saved: number
}

// Datos de ejemplo para los parques renovables
const RENEWABLE_PARKS: RenewablePark[] = [
  {
    id: "park-1",
    name: "Parque Solar Andalucía",
    type: "solar",
    capacity: 45,
    location: [37.5, -5.2],
    status: "online",
    efficiency: 92,
    lastUpdate: "Hace 10 minutos",
    alerts: 0,
    weatherCondition: "sunny",
    production: 42.3,
    forecast: 44.1,
    co2Saved: 28.5,
  },
  {
    id: "park-2",
    name: "Parque Eólico Galicia",
    type: "wind",
    capacity: 32,
    location: [42.8, -8.1],
    status: "maintenance",
    efficiency: 68,
    lastUpdate: "Hace 1 hora",
    alerts: 2,
    weatherCondition: "cloudy",
    production: 21.8,
    forecast: 24.5,
    co2Saved: 14.7,
  },
  {
    id: "park-3",
    name: "Microgrid Cataluña",
    type: "hybrid",
    capacity: 18,
    location: [41.4, 2.2],
    status: "online",
    efficiency: 88,
    lastUpdate: "Hace 25 minutos",
    alerts: 0,
    weatherCondition: "sunny",
    production: 15.8,
    forecast: 16.2,
    co2Saved: 10.6,
  },
  {
    id: "park-4",
    name: "Parque Solar Valencia",
    type: "solar",
    capacity: 60,
    location: [39.5, -0.4],
    status: "warning",
    efficiency: 76,
    lastUpdate: "Hace 5 minutos",
    alerts: 1,
    weatherCondition: "cloudy",
    production: 45.6,
    forecast: 52.8,
    co2Saved: 30.7,
  },
  {
    id: "park-5",
    name: "Parque Eólico Asturias",
    type: "wind",
    capacity: 28,
    location: [43.3, -6.0],
    status: "offline",
    efficiency: 0,
    lastUpdate: "Hace 2 días",
    alerts: 3,
    weatherCondition: "stormy",
    production: 0,
    forecast: 22.4,
    co2Saved: 0,
  },
  {
    id: "park-6",
    name: "Parque Híbrido Extremadura",
    type: "hybrid",
    capacity: 35,
    location: [39.0, -6.5],
    status: "online",
    efficiency: 94,
    lastUpdate: "Hace 15 minutos",
    alerts: 0,
    weatherCondition: "sunny",
    production: 32.9,
    forecast: 33.2,
    co2Saved: 22.1,
  },
]

// Componente para el mapa interactivo
export function LiveMapView() {
  const [selectedPark, setSelectedPark] = useState<string | null>(null)
  const [mapView, setMapView] = useState<"satellite" | "terrain" | "standard" | "irradiance" | "wind">("standard")
  const [isLoading, setIsLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)
  const [parkDetails, setParkDetails] = useState<RenewablePark | null>(null)
  const [activeLayers, setActiveLayers] = useState({
    weather: true,
    grid: false,
    population: false,
    protected: false,
  })
  const [zoomLevel, setZoomLevel] = useState(5)
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.0, -3.7]) // Centro de España
  const mapRef = useRef<HTMLDivElement>(null)

  // Simular carga del mapa
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Actualizar detalles del parque cuando se selecciona uno
  useEffect(() => {
    if (selectedPark) {
      const park = RENEWABLE_PARKS.find((p) => p.id === selectedPark) || null
      setParkDetails(park)
    } else {
      setParkDetails(null)
    }
  }, [selectedPark])

  // Simular actualización de datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Actualizar datos de producción y eficiencia aleatoriamente
      RENEWABLE_PARKS.forEach((park) => {
        if (park.status === "online" || park.status === "warning") {
          park.production = +(park.production * (1 + (Math.random() * 0.02 - 0.01))).toFixed(1)
          park.efficiency = Math.min(100, Math.max(60, park.efficiency + (Math.random() * 2 - 1)))
          park.lastUpdate = "Hace 1 minuto"
        }
      })
    }, 60000) // Actualizar cada minuto

    return () => clearInterval(interval)
  }, [])

  // Función para obtener el color según el estado
  const getStatusColor = (status: RenewablePark["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      case "warning":
        return "bg-orange-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Función para obtener el icono según el tipo
  const getTypeIcon = (type: RenewablePark["type"]) => {
    switch (type) {
      case "solar":
        return <Sun className="h-5 w-5" />
      case "wind":
        return <Wind className="h-5 w-5" />
      case "hybrid":
        return <Zap className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  // Función para obtener el icono según la condición meteorológica
  const getWeatherIcon = (condition: RenewablePark["weatherCondition"]) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      case "stormy":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Cloud className="h-5 w-5" />
    }
  }

  // Función para obtener el color según el tipo
  const getTypeColor = (type: RenewablePark["type"]) => {
    switch (type) {
      case "solar":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "wind":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "hybrid":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  // Función para obtener el texto del estado
  const getStatusText = (status: RenewablePark["status"]) => {
    switch (status) {
      case "online":
        return "En línea"
      case "maintenance":
        return "Mantenimiento"
      case "warning":
        return "Alerta"
      case "offline":
        return "Fuera de línea"
      default:
        return "Desconocido"
    }
  }

  // Función para acercar el mapa
  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 10))
  }

  // Función para alejar el mapa
  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 1))
  }

  // Función para manejar el cambio de capas
  const handleLayerChange = (layer: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }))
  }

  // Función para manejar el arrastre del mapa (pan)
  const handleMapPan = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1 || !mapRef.current) return // Solo si el botón izquierdo está presionado

    const map = mapRef.current
    const rect = map.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calcular el desplazamiento
    const deltaX = (e.clientX - rect.left - centerX) / 100
    const deltaY = (e.clientY - rect.top - centerY) / 100

    // Actualizar el centro del mapa
    setMapCenter(([lat, lng]) => [lat - deltaY * (11 - zoomLevel) * 0.1, lng + deltaX * (11 - zoomLevel) * 0.1])
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Monitoreo Geoespacial</CardTitle>
            <CardDescription>Vista en tiempo real de instalaciones renovables</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Tabs value={mapView} onValueChange={(v) => setMapView(v as any)}>
              <TabsList className="h-8">
                <TabsTrigger value="standard" className="text-xs px-2 h-7">
                  Estándar
                </TabsTrigger>
                <TabsTrigger value="satellite" className="text-xs px-2 h-7">
                  Satélite
                </TabsTrigger>
                <TabsTrigger value="terrain" className="text-xs px-2 h-7">
                  Terreno
                </TabsTrigger>
                <TabsTrigger value="irradiance" className="text-xs px-2 h-7">
                  Irradiancia
                </TabsTrigger>
                <TabsTrigger value="wind" className="text-xs px-2 h-7">
                  Viento
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-[500px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Cargando mapa interactivo...</p>
              </div>
            </div>
          ) : mapError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-md p-4">
                <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm font-medium mb-1">Error al cargar el mapa</p>
                <p className="text-xs text-muted-foreground">{mapError}</p>
                <Button size="sm" className="mt-4" onClick={() => setIsLoading(true)}>
                  Reintentar
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Controles del mapa */}
              <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-white dark:bg-gray-800" onClick={zoomIn}>
                  <span className="text-lg font-bold">+</span>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 bg-white dark:bg-gray-800" onClick={zoomOut}>
                  <span className="text-lg font-bold">-</span>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-white dark:bg-gray-800">
                      <Layers className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Capas del mapa</DialogTitle>
                      <DialogDescription>Selecciona las capas que deseas visualizar</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Cloud className="h-4 w-4 text-blue-500" />
                          <Label htmlFor="weather-layer">Condiciones meteorológicas</Label>
                        </div>
                        <Switch
                          id="weather-layer"
                          checked={activeLayers.weather}
                          onCheckedChange={() => handleLayerChange("weather")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <BarChart4 className="h-4 w-4 text-purple-500" />
                          <Label htmlFor="grid-layer">Red eléctrica</Label>
                        </div>
                        <Switch
                          id="grid-layer"
                          checked={activeLayers.grid}
                          onCheckedChange={() => handleLayerChange("grid")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-orange-500" />
                          <Label htmlFor="population-layer">Densidad de población</Label>
                        </div>
                        <Switch
                          id="population-layer"
                          checked={activeLayers.population}
                          onCheckedChange={() => handleLayerChange("population")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-green-500" />
                          <Label htmlFor="protected-layer">Áreas protegidas</Label>
                        </div>
                        <Switch
                          id="protected-layer"
                          checked={activeLayers.protected}
                          onCheckedChange={() => handleLayerChange("protected")}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Mapa interactivo */}
              <div
                ref={mapRef}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                onMouseMove={handleMapPan}
                style={{
                  transform: `scale(${zoomLevel / 5})`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {/* Fondo del mapa según la vista seleccionada */}
                <div
                  className={`absolute inset-0 ${
                    mapView === "satellite"
                      ? "bg-[url('/spain-satellite-view.png')] bg-cover"
                      : mapView === "terrain"
                        ? "bg-[url('/terrain-map-spain.png')] bg-cover"
                        : mapView === "irradiance"
                          ? "bg-[url('/irradiance-map-spain.png')] bg-cover"
                          : mapView === "wind"
                            ? "bg-[url('/wind-map-spain.png')] bg-cover"
                            : "bg-[url('/map-of-spain.png')] bg-cover"
                  }`}
                  style={{
                    backgroundPosition: `${mapCenter[1] * 10}% ${mapCenter[0] * 10}%`,
                  }}
                ></div>

                {/* Capa de red eléctrica */}
                {activeLayers.grid && (
                  <div className="absolute inset-0 bg-[url('/grid-overlay.png')] bg-cover opacity-50"></div>
                )}

                {/* Capa de densidad de población */}
                {activeLayers.population && (
                  <div className="absolute inset-0 bg-[url('/population-overlay.png')] bg-cover opacity-40"></div>
                )}

                {/* Capa de áreas protegidas */}
                {activeLayers.protected && (
                  <div className="absolute inset-0 bg-[url('/protected-areas-overlay.png')] bg-cover opacity-40"></div>
                )}

                {/* Marcadores de parques */}
                {RENEWABLE_PARKS.map((park) => {
                  // Convertir coordenadas geográficas a posiciones en el div
                  // Esto es una simplificación para la demostración
                  const x = ((park.location[1] + 9) / 12) * 100 // Longitud
                  const y = (1 - (park.location[0] - 36) / 8) * 100 // Latitud

                  return (
                    <Dialog key={park.id}>
                      <DialogTrigger asChild>
                        <button
                          className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                            selectedPark === park.id ? "z-20" : "z-10"
                          }`}
                          style={{ left: `${x}%`, top: `${y}%` }}
                          onClick={() => setSelectedPark(park.id)}
                        >
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${getTypeColor(
                              park.type,
                            )} border-2 ${
                              selectedPark === park.id ? "border-primary" : "border-white dark:border-gray-800"
                            } shadow-md transition-all duration-200 hover:scale-110`}
                          >
                            {getTypeIcon(park.type)}
                          </div>
                          {/* Indicador de estado */}
                          <div
                            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(
                              park.status,
                            )} border border-white dark:border-gray-800`}
                          ></div>
                          {/* Indicador de alertas */}
                          {park.alerts > 0 && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 border border-white dark:border-gray-800 text-white text-[10px] flex items-center justify-center">
                              {park.alerts}
                            </div>
                          )}
                          {/* Indicador de clima si la capa está activa */}
                          {activeLayers.weather && (
                            <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border border-white dark:border-gray-800 flex items-center justify-center">
                              {getWeatherIcon(park.weatherCondition)}
                            </div>
                          )}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{park.name}</DialogTitle>
                          <DialogDescription>Detalles del parque renovable</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className={`p-2 rounded-md ${getTypeColor(park.type)}`}>
                                {getTypeIcon(park.type)}
                              </div>
                              <div>
                                <p className="text-sm font-medium">Tipo</p>
                                <p className="text-sm text-muted-foreground">
                                  {park.type === "solar" ? "Solar" : park.type === "wind" ? "Eólico" : "Híbrido"}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Capacidad</p>
                              <p className="text-sm text-muted-foreground">{park.capacity} MW</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Estado</p>
                              <Badge
                                className={
                                  park.status === "online"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : park.status === "maintenance"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                      : park.status === "warning"
                                        ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                }
                              >
                                {getStatusText(park.status)}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Última actualización</p>
                              <p className="text-sm text-muted-foreground">{park.lastUpdate}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium mb-1">Producción actual</p>
                              <div className="flex items-end space-x-1">
                                <span className="text-2xl font-bold">{park.production}</span>
                                <span className="text-sm text-muted-foreground mb-0.5">MW</span>
                              </div>
                              <div className="flex items-center mt-1 text-xs">
                                <span
                                  className={
                                    park.production >= park.forecast
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-amber-600 dark:text-amber-400"
                                  }
                                >
                                  {((park.production / park.capacity) * 100).toFixed(1)}% de capacidad
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">Pronóstico</p>
                              <div className="flex items-end space-x-1">
                                <span className="text-2xl font-bold">{park.forecast}</span>
                                <span className="text-sm text-muted-foreground mb-0.5">MW</span>
                              </div>
                              <div className="flex items-center mt-1 text-xs">
                                <span className="text-muted-foreground">
                                  {((park.forecast / park.capacity) * 100).toFixed(1)}% de capacidad
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-1">Eficiencia</p>
                            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                              <div
                                className={`h-2 rounded-full ${
                                  park.efficiency > 90
                                    ? "bg-green-500"
                                    : park.efficiency > 70
                                      ? "bg-yellow-500"
                                      : park.efficiency > 0
                                        ? "bg-red-500"
                                        : "bg-gray-500"
                                }`}
                                style={{ width: `${park.efficiency}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>0%</span>
                              <span>{park.efficiency}%</span>
                              <span>100%</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-md border border-green-200 dark:border-green-800">
                            <div className="flex items-center space-x-2">
                              <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                              <div>
                                <p className="text-sm font-medium text-green-800 dark:text-green-400">CO₂ evitado</p>
                                <p className="text-xs text-green-700 dark:text-green-300">Impacto ambiental positivo</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-800 dark:text-green-400">
                                {park.co2Saved} ton
                              </p>
                              <p className="text-xs text-green-700 dark:text-green-300">Hoy</p>
                            </div>
                          </div>

                          {park.alerts > 0 && (
                            <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-md border border-red-200 dark:border-red-800">
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                <p className="text-sm font-medium text-red-800 dark:text-red-400">
                                  {park.alerts} {park.alerts === 1 ? "alerta activa" : "alertas activas"}
                                </p>
                              </div>
                              <ul className="mt-2 space-y-1 text-xs text-red-700 dark:text-red-300">
                                {park.status === "maintenance" && <li>• Mantenimiento programado en curso</li>}
                                {park.status === "warning" && <li>• Rendimiento por debajo del umbral esperado</li>}
                                {park.status === "offline" && (
                                  <>
                                    <li>• Instalación fuera de línea</li>
                                    <li>• Se requiere intervención inmediata</li>
                                  </>
                                )}
                                {park.efficiency < 80 && park.efficiency > 0 && (
                                  <li>• Eficiencia subóptima detectada</li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between">
                          <Button variant="outline">Ver historial</Button>
                          <Button>Gestionar parque</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )
                })}
              </div>

              {/* Panel de información del parque seleccionado */}
              {selectedPark && parkDetails && (
                <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(
                          parkDetails.type,
                        )}`}
                      >
                        {getTypeIcon(parkDetails.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{parkDetails.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            className={
                              parkDetails.status === "online"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : parkDetails.status === "maintenance"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : parkDetails.status === "warning"
                                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }
                          >
                            {getStatusText(parkDetails.status)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{parkDetails.capacity} MW</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedPark(null)}>
                        Cerrar
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">Detalles</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>{parkDetails.name}</DialogTitle>
                            <DialogDescription>Detalles del parque renovable</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className={`p-2 rounded-md ${getTypeColor(parkDetails.type)}`}>
                                  {getTypeIcon(parkDetails.type)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Tipo</p>
                                  <p className="text-sm text-muted-foreground">
                                    {parkDetails.type === "solar"
                                      ? "Solar"
                                      : parkDetails.type === "wind"
                                        ? "Eólico"
                                        : "Híbrido"}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Capacidad</p>
                                <p className="text-sm text-muted-foreground">{parkDetails.capacity} MW</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Estado</p>
                                <Badge
                                  className={
                                    parkDetails.status === "online"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                      : parkDetails.status === "maintenance"
                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        : parkDetails.status === "warning"
                                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                  }
                                >
                                  {getStatusText(parkDetails.status)}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Última actualización</p>
                                <p className="text-sm text-muted-foreground">{parkDetails.lastUpdate}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-1">Eficiencia</p>
                              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                <div
                                  className={`h-2 rounded-full ${
                                    parkDetails.efficiency > 90
                                      ? "bg-green-500"
                                      : parkDetails.efficiency > 70
                                        ? "bg-yellow-500"
                                        : parkDetails.efficiency > 0
                                          ? "bg-red-500"
                                          : "bg-gray-500"
                                  }`}
                                  style={{ width: `${parkDetails.efficiency}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>0%</span>
                                <span>{parkDetails.efficiency}%</span>
                                <span>100%</span>
                              </div>
                            </div>

                            {parkDetails.alerts > 0 && (
                              <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-md border border-red-200 dark:border-red-800">
                                <div className="flex items-center space-x-2">
                                  <AlertTriangle className="h-4 w-4 text-red-500" />
                                  <p className="text-sm font-medium text-red-800 dark:text-red-400">
                                    {parkDetails.alerts}{" "}
                                    {parkDetails.alerts === 1 ? "alerta activa" : "alertas activas"}
                                  </p>
                                </div>
                                <ul className="mt-2 space-y-1 text-xs text-red-700 dark:text-red-300">
                                  {parkDetails.status === "maintenance" && <li>• Mantenimiento programado en curso</li>}
                                  {parkDetails.status === "warning" && (
                                    <li>• Rendimiento por debajo del umbral esperado</li>
                                  )}
                                  {parkDetails.status === "offline" && (
                                    <>
                                      <li>• Instalación fuera de línea</li>
                                      <li>• Se requiere intervención inmediata</li>
                                    </>
                                  )}
                                  {parkDetails.efficiency < 80 && parkDetails.efficiency > 0 && (
                                    <li>• Eficiencia subóptima detectada</li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between">
                            <Button variant="outline">Ver historial</Button>
                            <Button>Gestionar parque</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">En línea</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs">Mantenimiento</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs">Alerta</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Fuera de línea</span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Ver todos los parques
        </Button>
      </CardFooter>
    </Card>
  )
}
