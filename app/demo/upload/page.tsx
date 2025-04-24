"use client"

import { useState } from "react"
import ProtectedRoute from "@/components/auth/protected-route"
import AuthNavbar from "@/components/auth-navbar"
import { ImageUpload } from "@/components/demo/image-upload"
import { FeedbackForm } from "@/components/demo/feedback-form"
import { Button } from "@/components/ui/button"
import { ErrorMessage } from "@/components/ui/error-message"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (file: File, previewUrl: string) => {
    setFile(file)
    setPreviewUrl(previewUrl)
    setProcessedImageUrl(null)
    setError(null)
  }

  const handleProcessImage = async () => {
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      // Crear FormData para enviar la imagen
      const formData = new FormData()
      formData.append("image", file)

      // Enviar la imagen al endpoint de Hugging Face
      const response = await fetch("https://intelliarts-wind-turbine-anomaly-detection.hf.space/api/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      // Obtener la respuesta como blob
      const imageBlob = await response.blob()

      // Crear URL para la imagen procesada
      const processedUrl = URL.createObjectURL(imageBlob)
      setProcessedImageUrl(processedUrl)
    } catch (err: any) {
      console.error("Error al procesar la imagen:", err)
      setError(err.message || "Error al procesar la imagen")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <ProtectedRoute>
      <AuthNavbar />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-2">Detección de Anomalías en Turbinas</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sube una imagen de una turbina eólica para detectar posibles anomalías o daños
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">1. Sube una imagen</h2>
              <ImageUpload onImageUpload={handleImageUpload} isUploading={isUploading} />
            </div>

            {previewUrl && !processedImageUrl && (
              <div className="flex justify-center">
                <Button onClick={handleProcessImage} disabled={isUploading} size="lg">
                  Analizar imagen
                </Button>
              </div>
            )}

            {error && <ErrorMessage message={error} />}
          </div>

          {processedImageUrl && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">2. Resultados del análisis</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Imagen procesada con anomalías detectadas:
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={processedImageUrl || "/placeholder.svg"}
                        alt="Imagen procesada"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">3. Tu feedback</h2>
                <FeedbackForm originalImageUrl={previewUrl || ""} processedImageUrl={processedImageUrl} />
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
