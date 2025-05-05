"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Star, StarIcon, Send, ThumbsUp } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EnhancedFeedbackFormProps {
  section?: string
  additionalData?: any
  compact?: boolean
  onSuccess?: () => void
}

export function EnhancedFeedbackForm({
  section = "dashboard",
  additionalData,
  compact = false,
  onSuccess,
}: EnhancedFeedbackFormProps) {
  const { user } = useAuth()
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState("")
  const [feedbackType, setFeedbackType] = useState<string>("general")
  const [hoveredStar, setHoveredStar] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const feedbackTypes = [
    { value: "general", label: "General" },
    { value: "ui", label: "Interfaz de usuario" },
    { value: "feature", label: "Funcionalidad" },
    { value: "bug", label: "Error o problema" },
    { value: "suggestion", label: "Sugerencia" },
  ]

  const handleStarClick = (value: number) => {
    setRating(value)
  }

  const handleStarHover = (value: number) => {
    setHoveredStar(value)
  }

  const handleStarLeave = () => {
    setHoveredStar(0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Error",
        description: "Por favor, selecciona una calificación",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "feedback",
          email: user?.email || "",
          feedbackData: {
            userName: user?.displayName || user?.email || "Usuario",
            userId: user?.uid || "",
            rating,
            comment,
            feedbackType,
            section,
            additionalData,
            timestamp: new Date().toISOString(),
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el feedback")
      }

      toast({
        title: "¡Gracias por tu feedback!",
        description: "Tu opinión nos ayuda a mejorar RenewAI.",
        variant: "default",
      })

      setIsSubmitted(true)
      if (onSuccess) onSuccess()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo enviar el feedback",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className={compact ? "w-full max-w-md mx-auto" : "w-full"}>
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-4">
            <ThumbsUp className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">¡Gracias por tu feedback!</h3>
          <p className="text-muted-foreground">
            Tu opinión es muy valiosa para nosotros y nos ayuda a mejorar RenewAI.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={compact ? "w-full max-w-md mx-auto" : "w-full"}>
      <form onSubmit={handleSubmit}>
        <CardHeader className={compact ? "pb-2" : ""}>
          <CardTitle className={compact ? "text-lg" : ""}>Tu opinión es importante</CardTitle>
          <CardDescription>Ayúdanos a mejorar RenewAI con tus comentarios</CardDescription>
        </CardHeader>
        <CardContent className={`space-y-4 ${compact ? "py-2" : ""}`}>
          <div className="flex justify-center">
            <div className="flex space-x-1" onMouseLeave={handleStarLeave} aria-label="Calificación">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleStarClick(value)}
                  onMouseEnter={() => handleStarHover(value)}
                  className="focus:outline-none transition-transform hover:scale-110"
                  aria-label={`${value} estrellas`}
                >
                  {value <= (hoveredStar || rating) ? (
                    <StarIcon className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                  ) : (
                    <Star className="h-8 w-8 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-sm">
            {rating === 1 && <Badge variant="destructive">Necesita mejoras</Badge>}
            {rating === 2 && <Badge variant="outline">Podría ser mejor</Badge>}
            {rating === 3 && <Badge>Aceptable</Badge>}
            {rating === 4 && <Badge variant="secondary">Muy bueno</Badge>}
            {rating === 5 && (
              <Badge variant="success" className="bg-green-500 hover:bg-green-600">
                ¡Excelente!
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <Select value={feedbackType} onValueChange={setFeedbackType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de feedback" />
              </SelectTrigger>
              <SelectContent>
                {feedbackTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Comparte tus comentarios o sugerencias (opcional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={compact ? 3 : 4}
              className="resize-none"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting || rating === 0}>
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Enviar feedback
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
