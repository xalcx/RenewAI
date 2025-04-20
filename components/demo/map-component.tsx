"use client"

import { useEffect, useState, useRef } from "react"
import { Loader2, MapPin, Wind, Sun, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Definir tipos para los parques
interface Park {
  id: string
  name: string
  type: "wind" | "solar" | "hybrid"
  capacity: number
  location: [number, number]
  generation: number
  efficiency: number
  co2Saved: number
  status: "online" | "maintenance"
}

interface MapComponentProps {
  parks: Park[]
  onParkSelect: (parkId: string) => void
  selectedPark: string | null
}

// Componente de visualización geoespacial simplificada
function GeoSpatialVisualization({ parks, onParkSelect, selectedPark }: MapComponentProps) {
  // Coordenadas aproximadas de España para el mapa simplificado
  const spainBounds = {
    minLat: 36,
    maxLat: 44,
    minLng: -9,
    maxLng: 3,
  }

  // Función para convertir coordenadas geográficas a posiciones en el div
  const geoToPosition = (lat: number, lng: number) => {
    const x = ((lng - spainBounds.minLng) / (spainBounds.maxLng - spainBounds.minLng)) * 100
    const y = 100 - ((lat - spainBounds.minLat) / (spainBounds.maxLat - spainBounds.minLat)) * 100
    return { x, y }
  }

  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col">
      <h3 className="text-lg font-medium mb-2">Visualización Geoespacial</h3>
      <p className="text-sm text-muted-foreground mb-4">Mapa simplificado de parques renovables en España</p>

      {/* Mapa simplificado */}
      <div className="relative flex-grow border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 overflow-hidden mb-4">
        {/* Contorno simplificado de España */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <path
            d="M20,70 Q30,75 40,65 Q50,55 65,60 Q80,65 85,50 Q90,35 80,30 Q70,25 60,30 Q50,35 40,30 Q30,25 20,35 Q10,45 20,70 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        {/* Grid para mostrar análisis geoespacial */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-gray-400 dark:border-gray-500"></div>
          ))}
        </div>

        {/* Parques renovables */}
        {parks.map((park) => {
          const pos = geoToPosition(park.location[0], park.location[1])
          return (
            <button
              key={park.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                selectedPark === park.id ? "scale-125 z-10" : "hover:scale-110"
              }`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => onParkSelect(park.id)}
              aria-label={`Seleccionar ${park.name}`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  park.type === "wind"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : park.type === "solar"
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300"
                      : "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
                } ${selectedPark === park.id ? "ring-2 ring-primary" : ""}`}
              >
                {park.type === "wind" ? (
                  <Wind className="h-5 w-5" />
                ) : park.type === "solar" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Zap className="h-5 w-5" />
                )}
              </div>
              {selectedPark === park.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-xs whitespace-nowrap">
                  <p className="font-medium">{park.name}</p>
                  <p>{park.capacity} MW</p>
                </div>
              )}
            </button>
          )
        })}

        {/* Leyenda */}
        <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 p-2 rounded shadow-sm text-xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Eólico</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Solar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Híbrido</span>
          </div>
        </div>
      </div>

      {/* Lista de parques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
        {parks.map((park) => (
          <button
            key={park.id}
            onClick={() => onParkSelect(park.id)}
            className={`p-2 rounded-lg text-left transition-colors text-sm ${
              selectedPark === park.id ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
            }`}
          >
            <div className="font-medium flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {park.name}
            </div>
            <div className="flex justify-between items-center mt-1">
              <span>{park.capacity} MW</span>
              <Badge variant={park.status === "online" ? "default" : "secondary"} className="text-xs">
                {park.status === "online" ? "En línea" : "Mantenimiento"}
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Componente de mapa con Leaflet
function LeafletMap({ parks, onParkSelect, selectedPark }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInitialized, setMapInitialized] = useState(false)

  useEffect(() => {
    // Asegurarse de que estamos en el cliente y que el ref está disponible
    if (typeof window === "undefined" || !mapRef.current) return

    // Importar Leaflet dinámicamente
    const initializeMap = async () => {
      try {
        // Importar Leaflet y sus estilos
        const L = await import("leaflet")
        await import("leaflet/dist/leaflet.css")

        // Verificar si ya hay un mapa inicializado
        if (mapRef.current._leaflet_id) {
          return
        }

        // Crear el mapa
        const map = L.map(mapRef.current).setView([40.416775, -3.70379], 6)

        // Añadir capa de mosaicos
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Añadir marcadores para cada parque
        parks.forEach((park) => {
          const icon = L.divIcon({
            className: "custom-div-icon",
            html: `<div class="marker-pin ${
              park.type === "wind" ? "bg-blue-500" : park.type === "solar" ? "bg-yellow-500" : "bg-green-500"
            }"></div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42],
          })

          const marker = L.marker(park.location, { icon }).addTo(map)

          // Añadir popup con información
          marker.bindPopup(`
            <div class="park-popup">
              <h3 class="font-bold">${park.name}</h3>
              <p>Capacidad: ${park.capacity} MW</p>
              <p>Generación: ${park.generation} MWh</p>
              <p>Estado: ${park.status === "online" ? "En línea" : "Mantenimiento"}</p>
            </div>
          `)

          // Añadir evento de clic
          marker.on("click", () => {
            onParkSelect(park.id)
          })

          // Si es el parque seleccionado, abrir el popup
          if (park.id === selectedPark) {
            marker.openPopup()
          }
        })

        // Añadir estilos personalizados para los marcadores
        const style = document.createElement("style")
        style.textContent = `
          .marker-pin {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            position: relative;
          }
          .park-popup h3 {
            margin: 0 0 5px 0;
            font-size: 16px;
          }
          .park-popup p {
            margin: 2px 0;
            font-size: 14px;
          }
        `
        document.head.appendChild(style)

        setMapInitialized(true)

        // Limpiar al desmontar
        return () => {
          map.remove()
          document.head.removeChild(style)
        }
      } catch (error) {
        console.error("Error al inicializar el mapa de Leaflet:", error)
        setMapInitialized(false)
      }
    }

    initializeMap()
  }, [parks, selectedPark, onParkSelect])

  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      {/* Contenedor del mapa */}
      <div ref={mapRef} className="w-full h-full"></div>

      {/* Estilos inline para Leaflet */}
      <style jsx global>{`
        .leaflet-container {
          height: 100%;
          width: 100%;
          background-color: #f3f4f6;
        }
        .dark .leaflet-container {
          background-color: #1f2937;
        }
      `}</style>
    </div>
  )
}

// Componente principal que maneja la carga de Leaflet o muestra la alternativa
export default function MapComponent({ parks, onParkSelect, selectedPark }: MapComponentProps) {
  const [isLeafletAvailable, setIsLeafletAvailable] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Solo intentar cargar Leaflet en el cliente
    if (typeof window === "undefined") {
      setIsLeafletAvailable(false)
      setIsLoading(false)
      return
    }

    // Función para verificar si Leaflet está disponible
    const checkLeaflet = async () => {
      try {
        // Intentar importar Leaflet
        await import("leaflet")
        setIsLeafletAvailable(true)
      } catch (error) {
        console.warn("No se pudo cargar Leaflet:", error)
        setIsLeafletAvailable(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkLeaflet()
  }, [])

  // Mostrar un indicador de carga mientras verificamos Leaflet
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-muted/20 rounded-lg">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Cargando mapa interactivo...</p>
        </div>
      </div>
    )
  }

  // Si Leaflet está disponible, mostrar el mapa de Leaflet
  if (isLeafletAvailable) {
    return (
      <div className="w-full h-full">
        <LeafletMap parks={parks} onParkSelect={onParkSelect} selectedPark={selectedPark} />
      </div>
    )
  }

  // Si Leaflet no está disponible, mostrar la visualización geoespacial alternativa
  return <GeoSpatialVisualization parks={parks} onParkSelect={onParkSelect} selectedPark={selectedPark} />
}

// Extender Window para incluir nuestra función global
declare global {
  interface Window {
    selectPark: (parkId: string) => void
  }
}
