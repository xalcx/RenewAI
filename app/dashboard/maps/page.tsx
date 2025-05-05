"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, Layers, Wind, Sun, Zap, Search } from "lucide-react"

export default function MapsPage() {
  const { t } = useLanguage()
  const [mapView, setMapView] = useState("hybrid")
  const [selectedSite, setSelectedSite] = useState(null)
  const [layers, setLayers] = useState({
    windFarms: true,
    solarPlants: true,
    transmissionLines: true,
    potentialSites: false,
    environmentalZones: false,
  })

  const handleLayerToggle = (layer) => {
    setLayers({
      ...layers,
      [layer]: !layers[layer],
    })
  }

  const sites = [
    { id: 1, name: "Parque Eólico Norte", type: "wind", capacity: "120 MW", turbines: 40, efficiency: "42%" },
    { id: 2, name: "Planta Solar Sur", type: "solar", capacity: "80 MW", panels: 120000, efficiency: "38%" },
    { id: 3, name: "Parque Eólico Central", type: "wind", capacity: "90 MW", turbines: 30, efficiency: "39%" },
    {
      id: 4,
      name: "Proyecto Híbrido Este",
      type: "hybrid",
      capacity: "150 MW",
      turbines: 20,
      panels: 50000,
      efficiency: "45%",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Volver al dashboard</span>
              </a>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("maps")}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <Card className="h-[600px] overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-green-600" />
                    <h3 className="font-medium">Vista del mapa</h3>
                  </div>
                  <Select value={mapView} onValueChange={setMapView}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t("select-map-view")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="satellite">{t("satellite")}</SelectItem>
                      <SelectItem value="terrain">{t("terrain")}</SelectItem>
                      <SelectItem value="hybrid">{t("hybrid")}</SelectItem>
                      <SelectItem value="standard">{t("standard")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mapa simulado */}
                <div
                  className="h-full bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      "url(/placeholder.svg?height=600&width=800&query=satellite+map+with+renewable+energy+installations)",
                  }}
                >
                  {/* Simulación de marcadores en el mapa */}
                  <div
                    className="absolute left-[25%] top-[30%] cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                    onClick={() => setSelectedSite(sites[0])}
                  >
                    <div className="bg-blue-500 p-2 rounded-full animate-pulse shadow-lg">
                      <Wind className="h-5 w-5 text-white" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-2 rounded shadow-lg z-10 text-sm whitespace-nowrap">
                      Parque Eólico Norte
                    </div>
                  </div>

                  <div
                    className="absolute left-[60%] top-[60%] cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                    onClick={() => setSelectedSite(sites[1])}
                  >
                    <div className="bg-amber-500 p-2 rounded-full animate-pulse shadow-lg">
                      <Sun className="h-5 w-5 text-white" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-2 rounded shadow-lg z-10 text-sm whitespace-nowrap">
                      Planta Solar Sur
                    </div>
                  </div>

                  <div
                    className="absolute left-[40%] top-[45%] cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                    onClick={() => setSelectedSite(sites[2])}
                  >
                    <div className="bg-blue-500 p-2 rounded-full animate-pulse shadow-lg">
                      <Wind className="h-5 w-5 text-white" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-2 rounded shadow-lg z-10 text-sm whitespace-nowrap">
                      Parque Eólico Central
                    </div>
                  </div>

                  <div
                    className="absolute left-[75%] top-[25%] cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                    onClick={() => setSelectedSite(sites[3])}
                  >
                    <div className="bg-green-500 p-2 rounded-full animate-pulse shadow-lg">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-2 rounded shadow-lg z-10 text-sm whitespace-nowrap">
                      Proyecto Híbrido Este
                    </div>
                  </div>

                  {/* Información del sitio seleccionado */}
                  {selectedSite && (
                    <div className="absolute right-4 bottom-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-72">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold">{selectedSite.name}</h4>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setSelectedSite(null)}>
                          &times;
                        </Button>
                      </div>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <Badge
                            className={`
                              ${
                                selectedSite.type === "wind"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : selectedSite.type === "solar"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                    : "bg-green-100 text-green-800 hover:bg-green-100"
                              }
                            `}
                          >
                            {selectedSite.type === "wind"
                              ? "Eólico"
                              : selectedSite.type === "solar"
                                ? "Solar"
                                : "Híbrido"}
                          </Badge>
                        </div>
                        <p className="text-sm">
                          <span className="font-medium">{t("capacity")}:</span> {selectedSite.capacity}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">{t("efficiency")}:</span> {selectedSite.efficiency}
                        </p>
                        {selectedSite.type === "wind" || selectedSite.type === "hybrid" ? (
                          <p className="text-sm">
                            <span className="font-medium">{t("turbines")}:</span> {selectedSite.turbines}
                          </p>
                        ) : null}
                        {selectedSite.type === "solar" || selectedSite.type === "hybrid" ? (
                          <p className="text-sm">
                            <span className="font-medium">{t("panels")}:</span> {selectedSite.panels?.toLocaleString()}
                          </p>
                        ) : null}
                        <div className="mt-3">
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                            {t("view-details")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center">
                      <Layers className="h-5 w-5 mr-2" />
                      {t("layers")}
                    </div>
                  </CardTitle>
                  <CardDescription>{t("select-map-layers")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="layer-wind" className="flex items-center cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                      {t("wind-farms")}
                    </Label>
                    <Switch
                      id="layer-wind"
                      checked={layers.windFarms}
                      onCheckedChange={() => handleLayerToggle("windFarms")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="layer-solar" className="flex items-center cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                      {t("solar-plants")}
                    </Label>
                    <Switch
                      id="layer-solar"
                      checked={layers.solarPlants}
                      onCheckedChange={() => handleLayerToggle("solarPlants")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="layer-transmission" className="flex items-center cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                      {t("transmission-lines")}
                    </Label>
                    <Switch
                      id="layer-transmission"
                      checked={layers.transmissionLines}
                      onCheckedChange={() => handleLayerToggle("transmissionLines")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="layer-potential" className="flex items-center cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      {t("potential-sites")}
                    </Label>
                    <Switch
                      id="layer-potential"
                      checked={layers.potentialSites}
                      onCheckedChange={() => handleLayerToggle("potentialSites")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="layer-environment" className="flex items-center cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                      {t("environmental-zones")}
                    </Label>
                    <Switch
                      id="layer-environment"
                      checked={layers.environmentalZones}
                      onCheckedChange={() => handleLayerToggle("environmentalZones")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center">
                      <Search className="h-5 w-5 mr-2" />
                      {t("search")}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Input placeholder={t("search-location")} />
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t("recently-viewed")}:</div>
                    <div className="space-y-2">
                      {sites.map((site) => (
                        <div
                          key={site.id}
                          className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setSelectedSite(site)}
                        >
                          <div
                            className={`p-1.5 rounded-full mr-2 ${
                              site.type === "wind"
                                ? "bg-blue-100 text-blue-700"
                                : site.type === "solar"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {site.type === "wind" ? (
                              <Wind className="h-4 w-4" />
                            ) : site.type === "solar" ? (
                              <Sun className="h-4 w-4" />
                            ) : (
                              <Zap className="h-4 w-4" />
                            )}
                          </div>
                          <span>{site.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
