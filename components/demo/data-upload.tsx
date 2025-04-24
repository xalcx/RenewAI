"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { UploadIcon, FileIcon, XIcon } from "lucide-react"

interface DataPoint {
  fecha: string
  generacion_kWh: number
  temperatura: number
  velocidad_viento: number
}

export function DataUpload({ onDataLoaded }: { onDataLoaded: (data: DataPoint[]) => void }) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.name.endsWith(".csv")) {
        setFile(droppedFile)
      } else {
        toast({
          title: "Formato no válido",
          description: "Por favor, sube un archivo CSV.",
          variant: "destructive",
        })
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const parseCSV = (text: string): DataPoint[] => {
    const lines = text.split("\n")
    const headers = lines[0].split(",")

    // Validate headers
    const requiredHeaders = ["fecha", "generacion_kWh", "temperatura", "velocidad_viento"]
    const hasAllHeaders = requiredHeaders.every((header) =>
      headers.map((h) => h.trim().toLowerCase()).includes(header.toLowerCase()),
    )

    if (!hasAllHeaders) {
      throw new Error("El archivo CSV debe contener las columnas: fecha, generacion_kWh, temperatura, velocidad_viento")
    }

    // Find index of each required column
    const fechaIndex = headers.findIndex((h) => h.trim().toLowerCase() === "fecha")
    const generacionIndex = headers.findIndex((h) => h.trim().toLowerCase() === "generacion_kwh")
    const temperaturaIndex = headers.findIndex((h) => h.trim().toLowerCase() === "temperatura")
    const vientoIndex = headers.findIndex((h) => h.trim().toLowerCase() === "velocidad_viento")

    const data: DataPoint[] = []

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue

      const values = lines[i].split(",")

      try {
        const dataPoint: DataPoint = {
          fecha: values[fechaIndex].trim(),
          generacion_kWh: Number.parseFloat(values[generacionIndex]),
          temperatura: Number.parseFloat(values[temperaturaIndex]),
          velocidad_viento: Number.parseFloat(values[vientoIndex]),
        }

        // Validate data point
        if (!isNaN(dataPoint.generacion_kWh) && !isNaN(dataPoint.temperatura) && !isNaN(dataPoint.velocidad_viento)) {
          data.push(dataPoint)
        }
      } catch (error) {
        console.error(`Error parsing line ${i}:`, error)
      }
    }

    return data
  }

  const handleProcessFile = async () => {
    if (!file) return

    setLoading(true)

    try {
      const text = await file.text()
      const data = parseCSV(text)

      if (data.length === 0) {
        throw new Error("No se pudieron extraer datos válidos del archivo CSV")
      }

      onDataLoaded(data)

      toast({
        title: "Datos cargados correctamente",
        description: `Se han procesado ${data.length} registros de datos.`,
      })
    } catch (error: any) {
      toast({
        title: "Error al procesar el archivo",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Carga de Datos</CardTitle>
        <CardDescription>Sube un archivo CSV con tus datos de generación para análisis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" className="hidden" />

          {!file ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <UploadIcon className="h-8 w-8 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Arrastra y suelta tu archivo CSV aquí o haz clic para seleccionarlo
                </p>
                <p className="text-xs text-muted-foreground">
                  El archivo debe contener columnas: fecha, generacion_kWh, temperatura, velocidad_viento
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileIcon className="h-6 w-6 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFile()
                }}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Button onClick={handleProcessFile} disabled={!file || loading} className="w-full">
          {loading ? <LoadingSpinner size="sm" /> : "Procesar datos"}
        </Button>
      </CardContent>
    </Card>
  )
}
