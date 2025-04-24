"use client"

import type React from "react"

import { useState, useRef } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface ImageUploadProps {
  onImageUpload: (file: File, previewUrl: string) => void
  isUploading: boolean
}

export function ImageUpload({ onImageUpload, isUploading }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar que sea una imagen jpg o png
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      alert("Por favor, sube una imagen en formato JPG o PNG")
      return
    }

    // Crear URL para previsualización
    const fileUrl = URL.createObjectURL(file)
    setPreviewUrl(fileUrl)
    onImageUpload(file, fileUrl)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    // Validar que sea una imagen jpg o png
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      alert("Por favor, sube una imagen en formato JPG o PNG")
      return
    }

    // Crear URL para previsualización
    const fileUrl = URL.createObjectURL(file)
    setPreviewUrl(fileUrl)
    onImageUpload(file, fileUrl)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          previewUrl ? "border-green-500" : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        {previewUrl ? (
          <div className="relative">
            <img src={previewUrl || "/placeholder.svg"} alt="Vista previa" className="max-h-64 mx-auto rounded-lg" />
            <p className="mt-2 text-sm text-gray-500">Haz clic para cambiar la imagen</p>
          </div>
        ) : (
          <div className="py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              Arrastra y suelta una imagen de turbina eólica aquí, o haz clic para seleccionar
            </p>
            <p className="mt-1 text-xs text-gray-500">JPG o PNG</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
      {isUploading && (
        <div className="mt-4 flex justify-center">
          <LoadingSpinner />
          <span className="ml-2">Procesando imagen...</span>
        </div>
      )}
    </div>
  )
}
