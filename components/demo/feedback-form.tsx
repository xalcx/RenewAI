"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "@/components/demo/star-rating"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface FeedbackFormProps {
  originalImageUrl: string
  processedImageUrl: string
}

export function FeedbackForm({ originalImageUrl, processedImageUrl }: FeedbackFormProps) {
  const { user } = useAuth()
  const [score, setScore] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (score === 0) {
      setError("Por favor, selecciona una calificación")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const { error } = await supabase.from("feedback").insert({
        user_id: user?.id,
        score,
        comment,
        original_image_url: originalImageUrl,
        processed_image_url: processedImageUrl,
        timestamp: new Date().toISOString(),
      })

      if (error) throw error

      setIsSubmitted(true)
    } catch (err: any) {
      setError(err.message || "Error al enviar el feedback")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
        <h3 className="text-lg font-medium text-green-800 dark:text-green-300">¡Gracias por tu feedback!</h3>
        <p className="text-green-700 dark:text-green-400 mt-1">
          Tu opinión nos ayuda a mejorar nuestro sistema de detección de anomalías.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">¿Qué tan preciso fue el análisis de anomalías?</label>
        <StarRating value={score} onChange={setScore} disabled={isSubmitting} />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium mb-1">
          Comentarios adicionales (opcional)
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comparte tus observaciones sobre el análisis..."
          disabled={isSubmitting}
          className="w-full"
          rows={4}
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Enviando...
          </>
        ) : (
          "Enviar feedback"
        )}
      </Button>
    </form>
  )
}
