"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// Imágenes de ejemplo y sus resultados correspondientes
const EXAMPLE_IMAGES = [
  {
    id: 1,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/test_image_1-0vJqxeM5FTYcMvymEwr2L8g5N2aASq.png",
    label: "Ejemplo 1",
    resultUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/test_image_1_result-d7H0hvqpAbZN2ImmEyYEjaJrfmKi9M.png",
  },
  {
    id: 2,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/test_image_2-0vDsTU4gRrrlXoaf4oxwVLljfMbbq9.png",
    label: "Ejemplo 2",
    resultUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/test_image_2_result-ToLpZvEnXuHpfXiaUsIFVfgZHmFY31.png",
  },
  {
    id: 3,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/test_image_3-oVR8XNkV1rNxOHM72HHaJue3g30PfX.png",
    label: "Ejemplo 3",
    resultUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/test_image_3_result-vQoaiT2DHBdSAeKszJClfeBHJDwosG.png",
  },
  {
    id: 4,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/test_image_4-c4uFSYLe1bBSwBi4NNjg3R0rtDOkfa.png",
    label: "Ejemplo 4",
    resultUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/test_image_4_result-c7sHAt4Zbq0mgAYP8OeWsxVuADJIFb.png",
  },
]

export default function TurbineDamageDetection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // Función simple para seleccionar una imagen
  const selectImage = (index: number) => {
    setSelectedIndex(index)
    setShowResult(false)
  }

  // Función simple para analizar
  const analyzeImage = () => {
    if (selectedIndex === null) return

    setIsAnalyzing(true)

    // Simular tiempo de procesamiento
    setTimeout(() => {
      setShowResult(true)
      setIsAnalyzing(false)
    }, 1500)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Detección de Daños en Turbinas Eólicas</h2>
      <p className="mb-6">
        Nuestro sistema de visión computacional identifica automáticamente daños en turbinas eólicas, reduciendo costos
        de inspección manual y anticipando fallos críticos. Selecciona una imagen de ejemplo para ver el resultado del
        análisis.
      </p>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Panel izquierdo - Selección de ejemplos */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Selecciona una imagen de ejemplo</h3>
              <div className="grid grid-cols-2 gap-4">
                {EXAMPLE_IMAGES.map((image, index) => (
                  <div
                    key={index}
                    className={`relative rounded-lg overflow-hidden border-2 cursor-pointer h-32 ${
                      selectedIndex === index ? "border-primary" : "border-gray-200"
                    }`}
                    onClick={() => selectImage(index)}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Ejemplo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                      <span className="text-white text-sm">Ejemplo {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel derecho - Visualización */}
        <div className="md:col-span-2">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Imagen original */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Imagen original</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden border bg-gray-100">
                  {selectedIndex !== null ? (
                    <img
                      src={EXAMPLE_IMAGES[selectedIndex].url || "/placeholder.svg"}
                      alt="Imagen original"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">Selecciona una imagen</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Resultado */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Resultado del análisis</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden border bg-gray-100">
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="ml-2">Analizando...</p>
                    </div>
                  ) : showResult && selectedIndex !== null ? (
                    <img
                      src={EXAMPLE_IMAGES[selectedIndex].resultUrl || "/placeholder.svg"}
                      alt="Resultado del análisis"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">
                        {selectedIndex !== null
                          ? "Haz clic en Analizar para ver el resultado"
                          : "Selecciona una imagen primero"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Botón de análisis */}
          <div className="mt-8 flex justify-center">
            <Button onClick={analyzeImage} disabled={isAnalyzing || selectedIndex === null} className="px-8" size="lg">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analizando...
                </>
              ) : (
                "Analizar imagen"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
