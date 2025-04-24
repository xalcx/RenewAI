"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Star, StarIcon } from "lucide-react"

export function FeedbackFormInteractive() {
  const { user } = useAuth()
  const [score, setScore] = useState<number>(0)
  const [comment, setComment] = useState("")
  const [hoveredStar, setHoveredStar] = useState<number>(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleStarClick = (rating: number) => {
    setScore(rating)
  }

  const handleStarHover = (rating: number) => {
    setHoveredStar(rating)
  }

  const handleStarLeave = () => {
    setHoveredStar(0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para enviar feedback",
        variant: "destructive",
      })
      return
    }

    if (score === 0) {
      toast({
        title: "Error",
        description: "Por favor, selecciona una puntuación",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      const { error } = await supabase.from("interactivo_feedback").insert({
        user_id: user.id,
        score,
        comment: comment.trim() || null,
      })

      if (error) throw error

      toast({
        title: "¡Gracias por tu feedback!",
        description: "Tu opinión nos ayuda a mejorar RenewAI.",
      })

      setSubmitted(true)
    } catch (error: any) {
      toast({
        title: "Error",
        description: `No se pudo enviar el feedback: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tu opinión es importante</CardTitle>
        <CardDescription>¿Esto se parece a lo que necesitarías usar?</CardDescription>
      </CardHeader>
      <CardContent>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-2">
              <div className="flex space-x-1" onMouseLeave={handleStarLeave}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleStarClick(rating)}
                    onMouseEnter={() => handleStarHover(rating)}
                    className="focus:outline-none"
                  >
                    {rating <= (hoveredStar || score) ? (
                      <StarIcon className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <Star className="h-8 w-8 text-muted-foreground" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center text-sm">
              {score === 1 && "Necesita muchas mejoras"}
              {score === 2 && "Podría ser mejor"}
              {score === 3 && "Está bien"}
              {score === 4 && "Muy bueno"}
              {score === 5 && "¡Excelente!"}
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder="Comparte tus comentarios o sugerencias (opcional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full" disabled={submitting || score === 0}>
              {submitting ? <LoadingSpinner size="sm" /> : "Enviar feedback"}
            </Button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              {[...Array(score)].map((_, i) => (
                <StarIcon key={i} className="h-8 w-8 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h3 className="text-xl font-bold mb-2">¡Gracias por tu feedback!</h3>
            <p className="text-muted-foreground">
              Tu opinión nos ayuda a mejorar RenewAI y ofrecer mejores soluciones para la industria de energías
              renovables.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
