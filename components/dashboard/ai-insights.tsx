"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Lightbulb, TrendingUp, AlertTriangle, MapPin, BarChart4, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Tipos para las recomendaciones de IA
interface AIRecommendation {
  id: string
  title: string
  description: string
  impact: string
  confidence: number
  category: "location" | "efficiency" | "maintenance" | "expansion"
  priority: "high" | "medium" | "low"
  timeframe: string
  status: "new" | "reviewing" | "implemented" | "dismissed"
}

// Datos de ejemplo para las recomendaciones
const AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: "rec-1",
    title: "Ubicación óptima para nuevo parque solar",
    description:
      "Análisis geoespacial indica condiciones ideales en la región de Murcia para un nuevo parque solar de 50MW.",
    impact: "Potencial de generación un 18% superior al promedio regional",
    confidence: 92,
    category: "location",
    priority: "high",
    timeframe: "Evaluación inmediata recomendada",
    status: "new",
  },
  {
    id: "rec-2",
    title: "Optimización de ángulo de paneles en Andalucía",
    description:
      "Ajustar el ángulo de inclinación de los paneles solares en 7° mejoraría la captación solar según análisis estacional.",
    impact: "Incremento estimado de 8.3% en producción",
    confidence: 87,
    category: "efficiency",
    priority: "medium",
    timeframe: "Implementación en 2-3 semanas",
    status: "reviewing",
  },
  {
    id: "rec-3",
    title: "Mantenimiento preventivo en turbinas de Galicia",
    description:
      "Patrones de vibración anómalos detectados en 3 turbinas sugieren necesidad de mantenimiento preventivo.",
    impact: "Prevención de fallo potencial y parada no programada",
    confidence: 78,
    category: "maintenance",
    priority: "high",
    timeframe: "Acción recomendada en 7 días",
    status: "new",
  },
  {
    id: "rec-4",
    title: "Expansión de capacidad en Valencia",
    description:
      "Análisis de rendimiento y demanda sugiere viabilidad de expansión de 15MW adicionales en el parque existente.",
    impact: "ROI estimado de 12% en 5 años",
    confidence: 81,
    category: "expansion",
    priority: "medium",
    timeframe: "Evaluación en próximo trimestre",
    status: "new",
  },
  {
    id: "rec-5",
    title: "Reconfiguración de sistema de almacenamiento",
    description:
      "Optimizar los ciclos de carga/descarga según patrones de demanda mejoraría la eficiencia del sistema.",
    impact: "Reducción de 7% en pérdidas de energía",
    confidence: 85,
    category: "efficiency",
    priority: "medium",
    timeframe: "Implementación en 1-2 semanas",
    status: "reviewing",
  },
]

// Tipos para los insights de IA
interface AIInsight {
  id: string
  title: string
  description: string
  trend: "positive" | "negative" | "neutral"
  change: string
  category: "production" | "efficiency" | "maintenance" | "financial"
  timeframe: string
}

// Datos de ejemplo para los insights
const AI_INSIGHTS: AIInsight[] = [
  {
    id: "insight-1",
    title: "Incremento en eficiencia de paneles solares",
    description:
      "La eficiencia de los paneles solares ha aumentado un 5.2% en el último trimestre gracias a las optimizaciones implementadas.",
    trend: "positive",
    change: "+5.2%",
    category: "efficiency",
    timeframe: "Último trimestre",
  },
  {
    id: "insight-2",
    title: "Reducción en costos de mantenimiento",
    description:
      "El mantenimiento predictivo ha reducido los costos operativos en un 12.7% comparado con el mismo período del año anterior.",
    trend: "positive",
    change: "-12.7%",
    category: "maintenance",
    timeframe: "Año a la fecha",
  },
  {
    id: "insight-3",
    title: "Fluctuación en producción eólica",
    description:
      "La producción eólica ha mostrado mayor variabilidad que lo proyectado, con desviaciones de hasta 15% respecto a las predicciones.",
    trend: "negative",
    change: "±15%",
    category: "production",
    timeframe: "Últimos 30 días",
  },
  {
    id: "insight-4",
    title: "Mejora en ROI de proyectos solares",
    description:
      "Los proyectos solares están superando las proyecciones financieras iniciales con un ROI promedio 3.5% superior.",
    trend: "positive",
    change: "+3.5%",
    category: "financial",
    timeframe: "Año fiscal actual",
  },
]

// Componente para las recomendaciones e insights de IA
export function AIInsights() {
  const [activeTab, setActiveTab] = useState<"recommendations" | "insights" | "predictions">("recommendations")
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "location" | "efficiency" | "maintenance" | "expansion">("all")

  // Filtrar recomendaciones según el filtro seleccionado
  const filteredRecommendations = AI_RECOMMENDATIONS.filter((rec) => {
    if (filter === "all") return true
    return rec.category === filter
  })

  // Obtener detalles de la recomendación seleccionada
  const selectedRecommendationDetails = selectedRecommendation
    ? AI_RECOMMENDATIONS.find((rec) => rec.id === selectedRecommendation) || null
    : null

  // Función para obtener el color según la categoría
  const getCategoryColor = (category: AIRecommendation["category"]) => {
    switch (category) {
      case "location":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "efficiency":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "expansion":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  // Función para obtener el icono según la categoría
  const getCategoryIcon = (category: AIRecommendation["category"]) => {
    switch (category) {
      case "location":
        return <MapPin className="h-5 w-5" />
      case "efficiency":
        return <Zap className="h-5 w-5" />
      case "maintenance":
        return <BarChart4 className="h-5 w-5" />
      case "expansion":
        return <TrendingUp className="h-5 w-5" />
      default:
        return <Lightbulb className="h-5 w-5" />
    }
  }

  // Función para obtener el texto de la categoría
  const getCategoryText = (category: AIRecommendation["category"]) => {
    switch (category) {
      case "location":
        return "Ubicación"
      case "efficiency":
        return "Eficiencia"
      case "maintenance":
        return "Mantenimiento"
      case "expansion":
        return "Expansión"
      default:
        return ""
    }
  }

  // Función para obtener el color según la prioridad
  const getPriorityColor = (priority: AIRecommendation["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  // Función para obtener el texto de la prioridad
  const getPriorityText = (priority: AIRecommendation["priority"]) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Media"
      case "low":
        return "Baja"
      default:
        return ""
    }
  }

  // Función para obtener el color según el estado
  const getStatusColor = (status: AIRecommendation["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "reviewing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "implemented":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "dismissed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  // Función para obtener el texto del estado
  const getStatusText = (status: AIRecommendation["status"]) => {
    switch (status) {
      case "new":
        return "Nueva"
      case "reviewing":
        return "En revisión"
      case "implemented":
        return "Implementada"
      case "dismissed":
        return "Descartada"
      default:
        return ""
    }
  }

  // Función para obtener el color según la tendencia
  const getTrendColor = (trend: AIInsight["trend"]) => {
    switch (trend) {
      case "positive":
        return "text-green-600 dark:text-green-400"
      case "negative":
        return "text-red-600 dark:text-red-400"
      case "neutral":
        return "text-blue-600 dark:text-blue-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  // Función para obtener el icono según la tendencia
  const getTrendIcon = (trend: AIInsight["trend"]) => {
    switch (trend) {
      case "positive":
        return <TrendingUp className="h-4 w-4" />
      case "negative":
        return <AlertTriangle className="h-4 w-4" />
      case "neutral":
        return <BarChart4 className="h-4 w-4" />
      default:
        return <BarChart4 className="h-4 w-4" />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <div>
              <CardTitle>Insights de IA</CardTitle>
              <CardDescription>Recomendaciones e insights basados en inteligencia artificial</CardDescription>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="h-8">
              <TabsTrigger value="recommendations" className="text-xs px-2 h-7">
                Recomendaciones
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-xs px-2 h-7">
                Insights
              </TabsTrigger>
              <TabsTrigger value="predictions" className="text-xs px-2 h-7">
                Predicciones
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {activeTab === "recommendations" && (
          <>
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex space-x-2 overflow-x-auto">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setFilter("all")}
              >
                Todas
              </Button>
              <Button
                variant={filter === "location" ? "default" : "outline"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setFilter("location")}
              >
                Ubicación
              </Button>
              <Button
                variant={filter === "efficiency" ? "default" : "outline"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setFilter("efficiency")}
              >
                Eficiencia
              </Button>
              <Button
                variant={filter === "maintenance" ? "default" : "outline"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setFilter("maintenance")}
              >
                Mantenimiento
              </Button>
              <Button
                variant={filter === "expansion" ? "default" : "outline"}
                size="sm"
                className="text-xs h-7"
                onClick={() => setFilter("expansion")}
              >
                Expansión
              </Button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRecommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer"
                    onClick={() => setSelectedRecommendation(rec.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${getCategoryColor(
                            rec.category,
                          )}`}
                        >
                          {getCategoryIcon(rec.category)}
                        </div>
                        <div>
                          <p className="font-medium">{rec.title}</p>
                          <div className="flex items-center mt-1">
                            <Badge className={`mr-2 ${getCategoryColor(rec.category)}`}>
                              {getCategoryText(rec.category)}
                            </Badge>
                            <Badge className={getPriorityColor(rec.priority)}>{getPriorityText(rec.priority)}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(rec.status)}>{getStatusText(rec.status)}</Badge>
                        <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>Confianza: {rec.confidence}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedRecommendation && selectedRecommendationDetails && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{selectedRecommendationDetails.title}</h3>
                    <div className="flex items-center mt-1">
                      <Badge className={`mr-2 ${getCategoryColor(selectedRecommendationDetails.category)}`}>
                        {getCategoryText(selectedRecommendationDetails.category)}
                      </Badge>
                      <Badge className={getPriorityColor(selectedRecommendationDetails.priority)}>
                        {getPriorityText(selectedRecommendationDetails.priority)}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setSelectedRecommendation(null)}>
                    Cerrar
                  </Button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {selectedRecommendationDetails.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="bg-white dark:bg-gray-750 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Impacto potencial</p>
                    <p className="font-medium text-sm mt-1">{selectedRecommendationDetails.impact}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-750 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Plazo recomendado</p>
                    <p className="font-medium text-sm mt-1">{selectedRecommendationDetails.timeframe}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Nivel de confianza</p>
                    <p className="text-xs font-medium">{selectedRecommendationDetails.confidence}%</p>
                  </div>
                  <Progress value={selectedRecommendationDetails.confidence} className="h-2" />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Descartar
                  </Button>
                  <Button variant="outline" size="sm">
                    Revisar
                  </Button>
                  <Button size="sm">Implementar</Button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "insights" && (
          <div className="max-h-[500px] overflow-y-auto">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {AI_INSIGHTS.map((insight) => (
                <div key={insight.id} className="p-4 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{insight.title}</h3>
                    <div className={`flex items-center ${getTrendColor(insight.trend)}`}>
                      {getTrendIcon(insight.trend)}
                      <span className="ml-1 text-sm font-medium">{insight.change}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{insight.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <Badge variant="outline" className="text-xs">
                      {insight.category === "production"
                        ? "Producción"
                        : insight.category === "efficiency"
                          ? "Eficiencia"
                          : insight.category === "maintenance"
                            ? "Mantenimiento"
                            : "Financiero"}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{insight.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "predictions" && (
          <div className="p-8 text-center">
            <Lightbulb className="h-12 w-12 mx-auto text-yellow-500 opacity-50" />
            <h3 className="mt-4 font-medium text-lg">Predicciones en desarrollo</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Nuestro sistema de predicciones avanzadas está siendo entrenado con sus datos. Pronto tendrá acceso a
              predicciones detalladas sobre producción, mantenimiento y optimización.
            </p>
            <Button className="mt-4" variant="outline" size="sm">
              Activar notificaciones
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
