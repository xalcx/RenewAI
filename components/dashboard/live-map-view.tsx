"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Info, Wind, Sun, Zap, Layers, Cloud, CloudRain, Droplet, ZoomIn, ZoomOut } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

  const [mapType, setMapType] = useState("satellite")
  const [zoom, setZoom] = useState(2)

  // Simulación de ubicaciones de instalaciones renovables
  const locations = [
    { id: 1, name: "Parque Eólico Norte", lat: 25, lng: 15, type: "wind", status: "active", production: "12.5 MW" },
    { id: 2, name: "Planta Solar Central", lat: 40, lng: 30, type: "solar", status: "active", production: "8.2 MW" },
    { id: 3, name: "Hidroeléctrica Sur", lat: 60, lng: 45, type: "hydro", status: "maintenance", production: "5.7 MW" },
    { id: 4, name: "Parque Eólico Este", lat: 35, lng: 60, type: "wind", status: "active", production: "10.1 MW" },
    { id: 5, name: "Planta Solar Oeste", lat: 50, lng: 10, type: "solar", status: "issue", production: "6.3 MW" },
  ]

  const handleZoomIn = () => {
    if (zoom < 5) setZoom(zoom + 1)
  }

  const handleZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 1)
  }

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
  const zoomInMap = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 10))
  }

  // Función para alejar el mapa
  const zoomOutMap = () => {
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
        <div className="relative w-full h-[500px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {/* Mapa simulado */}
          <div
            className={`w-full h-full ${
              mapType === "satellite"
                ? "bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2031')] bg-cover bg-center"
                : "bg-blue-50 dark:bg-gray-700"
            }`}
          >
            {/* Marcadores de ubicación */}
            <TooltipProvider>
              {locations.map((location) => (
                <Tooltip key={location.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                      style={{
                        left: `${location.lng}%`,
                        top: `${location.lat}%`,
                        transform: `scale(${0.8 + zoom * 0.1})`,
                      }}
                    >
                      <div
                        className={`
                    p-1 rounded-full 
                    ${
                      location.status === "active"
                        ? "bg-green-500"
                        : location.status === "maintenance"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    } 
                    animate-pulse
                  `}
                      >
                        {location.type === "wind" ? (
                          <Wind className="h-5 w-5 text-white" />
                        ) : location.type === "solar" ? (
                          <Sun className="h-5 w-5 text-white" />
                        ) : (
                          <Droplet className="h-5 w-5 text-white" />
                        )}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <div className="p-1">
                      <p className="font-medium">{location.name}</p>
                      <p className="text-sm">Producción: {location.production}</p>
                      <p className="text-xs capitalize">
                        Estado:{" "}
                        {location.status === "active"
                          ? "Activo"
                          : location.status === "maintenance"
                            ? "En mantenimiento"
                            : "Problema detectado"}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>

          {/* Controles del mapa */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setMapType(mapType === "satellite" ? "standard" : "satellite")}
            >
              <Layers className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Leyenda */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-900 p-2 rounded-md shadow-md">
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Activo</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Mantenimiento</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Problema</span>
              </div>
            </div>
          </div>

          {/* Información */}
          <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 p-2 rounded-md shadow-md">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
              <Info className="h-3 w-3" />
              <span>Más información</span>
            </Button>
          </div>
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
