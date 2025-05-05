"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Upload, Wind, AlertTriangle, BarChart3, Layers, Zap, X, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import jsPDF from "jspdf"

interface DetectionResult {
  fileName: string
  image: string
  predictions: Prediction[]
  id: string
  modelId: string
}

interface Prediction {
  x: number
  y: number
  width: number
  height: number
  confidence: number
  class: string
}

interface Model {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  apiEndpoint: string
  apiKey?: string
  processor: (data: any) => Prediction[]
}

export function WindTurbineDetector() {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<{ file: File; preview: string }[]>([])
  const [results, setResults] = useState<DetectionResult[]>([])
  const [loading, setLoading] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)
  const [activeTab, setActiveTab] = useState<string>("upload")
  const [selectedModel, setSelectedModel] = useState<string>("modelA")
  const { toast } = useToast()
  const { t } = useLanguage()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRefs = useRef<Map<string, HTMLCanvasElement>>(new Map())

  // Definición de modelos disponibles
  const models: Model[] = [
    {
      id: "modelA",
      name: t("damageDetectionModelA"),
      description: t("modelADescription"),
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      apiEndpoint: "https://serverless.roboflow.com/wind-turbine-balade-damage/1",
      apiKey: "KddecoolEkJqonkbG9ga",
      processor: (data) => data.predictions || [],
    },
    {
      id: "modelB",
      name: t("damageDetectionModelB"),
      description: t("modelBDescription"),
      icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
      apiEndpoint: "https://api.example.com/model-b/predict",
      processor: (data) => {
        // Procesamiento para el modelo B (simulado)
        if (!data || !Array.isArray(data)) return []
        return data.map((item: any) => ({
          x: item.bbox?.x || 0,
          y: item.bbox?.y || 0,
          width: item.bbox?.width || 0,
          height: item.bbox?.height || 0,
          confidence: item.confidence || 0,
          class: item.class || "damage",
        }))
      },
    },
    {
      id: "modelC",
      name: t("damageDetectionModelC"),
      description: t("modelCDescription"),
      icon: <Zap className="h-5 w-5 text-green-500" />,
      apiEndpoint: "https://api.example.com/model-c/predict",
      processor: (data) => {
        // Procesamiento para el modelo C (simulado)
        if (!data || !data.results) return []
        return data.results.map((item: any) => ({
          x: item.location?.x || 0,
          y: item.location?.y || 0,
          width: item.size?.width || 0,
          height: item.size?.height || 0,
          confidence: item.score || 0,
          class: item.type || "anomaly",
        }))
      },
    },
  ]

  // Limpiar las URLs de objeto al desmontar
  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview.preview)
      })
    }
  }, [previews])

  // Dibujar overlays cuando cambian los resultados
  useEffect(() => {
    results.forEach((result) => {
      const canvas = canvasRefs.current.get(result.id)
      if (canvas) {
        drawOverlayOnCanvas(canvas, result.image, result.predictions)
      }
    })
  }, [results])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const selectedFiles = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"))

    if (selectedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles])

      // Crear previsualizaciones
      const newPreviews = selectedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))

      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews])

      // Resetear resultados cuando se seleccionan nuevos archivos
      if (results.length > 0) {
        setResults([])
        setActiveTab("upload")
      }
    }
  }

  const removeFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove))
    setPreviews((prevPreviews) => {
      const previewToRemove = prevPreviews.find((p) => p.file === fileToRemove)
      if (previewToRemove) {
        URL.revokeObjectURL(previewToRemove.preview)
      }
      return prevPreviews.filter((p) => p.file !== fileToRemove)
    })
    setResults((prevResults) => prevResults.filter((r) => r.fileName !== fileToRemove.name))
  }

  const loadImageBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleDetectMultiple = async () => {
    if (files.length === 0) {
      toast({
        title: t("error"),
        description: t("pleaseUploadAtLeastOneImage"),
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setCurrentProgress(0)
    const allResults: DetectionResult[] = []
    const selectedModelObj = models.find((m) => m.id === selectedModel)

    if (!selectedModelObj) {
      toast({
        title: t("error"),
        description: t("modelNotFound"),
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const image = await loadImageBase64(file)

        // Procesamiento según el modelo seleccionado
        let predictions: Prediction[] = []

        if (selectedModel === "modelA") {
          // Modelo A - API real
          const res = await axios({
            method: "POST",
            url: selectedModelObj.apiEndpoint,
            params: { api_key: selectedModelObj.apiKey },
            data: image,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          predictions = selectedModelObj.processor(res.data)
        } else {
          // Modelos B y C - Simulación para demostración
          // En un entorno real, aquí se llamaría a las APIs correspondientes
          await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular tiempo de procesamiento

          // Generar predicciones simuladas para demostración
          const simulatedData = simulateModelResponse(selectedModel, file.name)
          predictions = selectedModelObj.processor(simulatedData)
        }

        allResults.push({
          fileName: file.name,
          image,
          predictions,
          id: `result-${Date.now()}-${i}`,
          modelId: selectedModel,
        })

        // Actualizar progreso
        setCurrentProgress(Math.round(((i + 1) / files.length) * 100))
      }

      setResults(allResults)
      setActiveTab("results")

      toast({
        title: t("detectionComplete"),
        description: t("processedImagesCount", { count: files.length }),
        variant: "default",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: t("error"),
        description: t("errorProcessingImages"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setCurrentProgress(0)
    }
  }

  // Función para simular respuestas de modelos para demostración
  const simulateModelResponse = (modelId: string, fileName: string) => {
    const isAnomaly = fileName.toLowerCase().includes("damage") || Math.random() > 0.5

    if (modelId === "modelB") {
      if (!isAnomaly) return []

      // Simular 1-3 detecciones para el modelo B
      const numDetections = Math.floor(Math.random() * 3) + 1
      return Array(numDetections)
        .fill(0)
        .map((_, i) => ({
          bbox: {
            x: 100 + i * 50,
            y: 100 + i * 30,
            width: 80 + i * 10,
            height: 80 + i * 10,
          },
          confidence: 0.7 + Math.random() * 0.25,
          class: Math.random() > 0.5 ? "blade_damage" : "structural_damage",
        }))
    } else if (modelId === "modelC") {
      if (!isAnomaly) return { results: [] }

      // Simular 1-4 detecciones para el modelo C
      const numDetections = Math.floor(Math.random() * 4) + 1
      return {
        results: Array(numDetections)
          .fill(0)
          .map((_, i) => ({
            location: {
              x: 120 + i * 60,
              y: 120 + i * 40,
            },
            size: {
              width: 70 + i * 15,
              height: 70 + i * 15,
            },
            score: 0.65 + Math.random() * 0.3,
            type: ["surface_damage", "edge_damage", "structural_issue"][Math.floor(Math.random() * 3)],
          })),
      }
    }

    return []
  }

  const drawOverlayOnCanvas = (canvas: HTMLCanvasElement, imageUrl: string, predictions: Prediction[]) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      // Ajustar el tamaño del canvas al tamaño de la imagen
      const maxWidth = 800
      const maxHeight = 600
      let width = img.width
      let height = img.height

      // Escalar proporcionalmente si la imagen es demasiado grande
      if (width > maxWidth) {
        const ratio = maxWidth / width
        width = maxWidth
        height = height * ratio
      }

      if (height > maxHeight) {
        const ratio = maxHeight / height
        height = height * ratio
        width = width * ratio
      }

      canvas.width = width
      canvas.height = height

      // Dibujar la imagen
      ctx.drawImage(img, 0, 0, width, height)

      // Dibujar los overlays
      ctx.strokeStyle = "#ef4444" // Rojo
      ctx.lineWidth = 3

      // Factor de escala para las coordenadas de predicción
      const scaleX = width / img.width
      const scaleY = height / img.height

      predictions.forEach((pred) => {
        const x = pred.x * scaleX
        const y = pred.y * scaleY
        const w = pred.width * scaleX
        const h = pred.height * scaleY

        // Dibujar rectángulo
        ctx.strokeRect(x - w / 2, y - h / 2, w, h)

        // Dibujar etiqueta
        ctx.fillStyle = "rgba(239, 68, 68, 0.8)" // Rojo semi-transparente
        const confidence = Math.round(pred.confidence * 100)
        const text = `${pred.class} ${confidence}%`
        const textWidth = ctx.measureText(text).width + 10

        ctx.fillRect(x - w / 2, y - h / 2 - 25, textWidth, 20)
        ctx.fillStyle = "#ffffff" // Texto blanco
        ctx.font = "14px Arial"
        ctx.fillText(text, x - w / 2 + 5, y - h / 2 - 10)
      })
    }
    img.src = imageUrl
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

      if (droppedFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles])

        // Crear previsualizaciones
        const newPreviews = droppedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }))

        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews])

        // Resetear resultados cuando se seleccionan nuevos archivos
        if (results.length > 0) {
          setResults([])
          setActiveTab("upload")
        }
      }
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const getTotalDamageCount = () => {
    return results.reduce((total, result) => total + result.predictions.length, 0)
  }

  const generatePDF = async () => {
    if (results.length === 0) return

    setLoading(true)
    toast({
      title: t("generatingReport"),
      description: t("pleaseWait"),
    })

    try {
      // Crear un nuevo documento PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Añadir título y fecha
      const title = t("windTurbineDamageReport")
      const date = new Date().toLocaleDateString()
      pdf.setFontSize(20)
      pdf.text(title, 105, 15, { align: "center" })
      pdf.setFontSize(10)
      pdf.text(date, 105, 22, { align: "center" })

      // Añadir resumen
      pdf.setFontSize(14)
      pdf.text(t("analysisSummary"), 20, 35)
      pdf.setFontSize(10)
      pdf.text(`${t("processedImages")}: ${results.length}`, 20, 45)
      pdf.text(`${t("imagesWithDamage")}: ${getDamagedImagesCount()}`, 20, 52)
      pdf.text(`${t("totalDamageAreas")}: ${getTotalDamageCount()}`, 20, 59)
      pdf.text(`${t("detectionModel")}: ${getModelName(selectedModel)}`, 20, 66)

      let yPosition = 80

      // Para cada resultado
      for (let i = 0; i < results.length; i++) {
        const result = results[i]

        // Si no hay espacio suficiente en la página actual, añadir una nueva página
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 20
        }

        // Añadir título de la imagen
        pdf.setFontSize(12)
        pdf.text(`${i + 1}. ${result.fileName}`, 20, yPosition)
        yPosition += 7

        // Añadir estado de daño
        pdf.setFontSize(10)
        if (result.predictions.length > 0) {
          pdf.setTextColor(220, 53, 69) // Color rojo para daño
          pdf.text(`${result.predictions.length} ${t("damageDetected")}`, 20, yPosition)
        } else {
          pdf.setTextColor(40, 167, 69) // Color verde para sin daño
          pdf.text(t("noDamage"), 20, yPosition)
        }
        pdf.setTextColor(0, 0, 0) // Restaurar color negro
        yPosition += 10

        // Obtener el canvas de la imagen
        const canvas = canvasRefs.current.get(result.id)
        if (canvas) {
          // Convertir el canvas a imagen
          const imgData = canvas.toDataURL("image/png")

          // Calcular dimensiones para mantener la proporción
          const imgWidth = 170
          const imgHeight = (canvas.height * imgWidth) / canvas.width

          // Añadir imagen al PDF
          pdf.addImage(imgData, "PNG", 20, yPosition, imgWidth, imgHeight)
          yPosition += imgHeight + 10

          // Si hay predicciones, añadir detalles
          if (result.predictions.length > 0) {
            pdf.setFontSize(11)
            pdf.text(t("damageDetails"), 20, yPosition)
            yPosition += 7

            pdf.setFontSize(9)
            for (let j = 0; j < result.predictions.length; j++) {
              const pred = result.predictions[j]
              pdf.text(
                `• ${t("damageType")}: ${pred.class}, ${t("confidence")}: ${Math.round(pred.confidence * 100)}%`,
                25,
                yPosition,
              )
              yPosition += 5
            }
            yPosition += 5
          }

          // Añadir espacio entre imágenes
          yPosition += 10

          // Si no hay espacio suficiente para la siguiente imagen, añadir una nueva página
          if (i < results.length - 1 && yPosition > 250) {
            pdf.addPage()
            yPosition = 20
          }
        }
      }

      // Añadir pie de página
      const pageCount = pdf.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.text(`RenewAI - ${t("page")} ${i} ${t("of")} ${pageCount}`, 105, 290, { align: "center" })
      }

      // Guardar el PDF
      pdf.save(`renewai-turbine-damage-report-${Date.now()}.pdf`)

      toast({
        title: t("reportGenerated"),
        description: t("reportDownloadedSuccessfully"),
        variant: "success",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: t("error"),
        description: t("errorGeneratingReport"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getDamagedImagesCount = () => {
    return results.filter((result) => result.predictions.length > 0).length
  }

  const getModelName = (modelId: string) => {
    const model = models.find((m) => m.id === modelId)
    return model ? model.name : modelId
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-green-500" />
          {t("windTurbineDamageDetector")}
        </CardTitle>
        <CardDescription>{t("multiModelDetectionDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">{t("uploadImages")}</TabsTrigger>
            <TabsTrigger value="results" disabled={results.length === 0}>
              {t("results")}
              {results.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {results.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-4">
            <div className="grid gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t("selectDetectionModel")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <RadioGroup value={selectedModel} onValueChange={setSelectedModel}>
                    {models.map((model) => (
                      <div key={model.id} className="relative">
                        <RadioGroupItem value={model.id} id={model.id} className="peer sr-only" />
                        <Label
                          htmlFor={model.id}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <div className="mb-2">{model.icon}</div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-xs text-muted-foreground text-center mt-1">{model.description}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div
                className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/50 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input
                  ref={fileInputRef}
                  id="turbine-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="rounded-full bg-primary/10 p-4">
                  <Layers className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{t("dragAndDropImages")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("orClickToUpload")}</p>
                </div>
              </div>

              {previews.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{t("selectedImages")}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFiles([])
                        setPreviews([])
                        setResults([])
                      }}
                    >
                      {t("clearAll")}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {previews.map((item, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-md overflow-hidden border bg-background">
                          <img
                            src={item.preview || "/placeholder.svg"}
                            alt={item.file.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFile(item.file)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <p className="text-xs truncate mt-1">{item.file.name}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={handleDetectMultiple}
                      disabled={loading || files.length === 0}
                      className="w-full max-w-xs"
                    >
                      {loading ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                          {t("detecting")}
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          {t("detectDamageInImages")}
                        </>
                      )}
                    </Button>
                  </div>

                  {loading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>{t("processingImages")}</span>
                        <span>{currentProgress}%</span>
                      </div>
                      <Progress value={currentProgress} className="h-2" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-4">
            {results.length > 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">{t("processedImages")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{results.length}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">{t("imagesWithDamage")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{getDamagedImagesCount()}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-base">{t("totalDamageAreas")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{getTotalDamageCount()}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-8">
                  {results.map((result) => (
                    <div key={result.id} className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium truncate max-w-[70%]">{result.fileName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {t("processedWith")}: {getModelName(result.modelId)}
                          </p>
                        </div>
                        <Badge variant={result.predictions.length > 0 ? "destructive" : "success"}>
                          {result.predictions.length > 0
                            ? `${result.predictions.length} ${t("damageDetected")}`
                            : t("noDamage")}
                        </Badge>
                      </div>

                      <div className="rounded-lg overflow-hidden border bg-background p-1">
                        <canvas
                          ref={(el) => {
                            if (el) {
                              canvasRefs.current.set(result.id, el)
                              drawOverlayOnCanvas(el, result.image, result.predictions)
                            }
                          }}
                          className="max-w-full h-auto"
                        />
                      </div>

                      {result.predictions.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-4">
                          <h4 className="text-sm font-medium mb-2">{t("damageDetails")}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {result.predictions.map((pred, idx) => (
                              <div key={idx} className="bg-background rounded p-2 text-xs">
                                <div className="flex justify-between">
                                  <span>{t("damageType")}:</span>
                                  <span className="font-medium">{pred.class}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{t("confidence")}:</span>
                                  <span className="font-medium">{Math.round(pred.confidence * 100)}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{t("location")}:</span>
                                  <span className="font-medium">
                                    x:{Math.round(pred.x)}, y:{Math.round(pred.y)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-6">
                  <Button
                    onClick={generatePDF}
                    variant="default"
                    className="mr-2"
                    disabled={loading || results.length === 0}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    {t("downloadReport")}
                  </Button>
                  <Button
                    onClick={() => {
                      setActiveTab("upload")
                      setFiles([])
                      setPreviews([])
                      setResults([])
                    }}
                    variant="outline"
                    className="mr-2"
                  >
                    {t("startOver")}
                  </Button>
                  <Button onClick={() => setActiveTab("upload")}>{t("addMoreImages")}</Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>{t("aiPoweredAnalysis")}</p>
        <p>{t("mvpVersion")}</p>
      </CardFooter>
    </Card>
  )
}
