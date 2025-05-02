"use client"

import type React from "react"

import { useState } from "react"
import { Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedbackType, setFeedbackType] = useState("suggestion")
  const [feedbackText, setFeedbackText] = useState("")
  const [title, setTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, firebaseUser } = useAuth()

  // Obtener información del usuario para el feedback
  const userEmail = firebaseUser?.email || user?.email || "anónimo"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!feedbackText.trim()) {
      toast({
        title: "Error",
        description: "Por favor, escribe tu feedback antes de enviar.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Aquí podríamos enviar el feedback a Firebase o a una API
      // Por ahora, simulamos el envío
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Datos que se enviarían
      const feedbackData = {
        title: title.trim() || "Sin título",
        type: feedbackType,
        description: feedbackText,
        userEmail,
        timestamp: new Date().toISOString(),
      }

      console.log("Feedback enviado:", feedbackData)

      toast({
        title: "¡Gracias por tu feedback!",
        description: "Tu comentario ha sido enviado con éxito y será revisado por nuestro equipo.",
      })

      // Limpiar el formulario
      setFeedbackText("")
      setTitle("")
      setIsOpen(false)
    } catch (error) {
      console.error("Error al enviar feedback:", error)
      toast({
        title: "Error al enviar",
        description: "Ha ocurrido un error al enviar tu feedback. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Botón flotante para abrir el widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="h-14 w-14 rounded-full shadow-lg bg-green-600 hover:bg-green-700 text-white"
              aria-label="Abrir formulario de feedback"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Enviar Feedback</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-title">Título</Label>
                <Input
                  id="feedback-title"
                  placeholder="Resumen de tu feedback"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de feedback</Label>
                <RadioGroup value={feedbackType} onValueChange={setFeedbackType} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="suggestion" id="suggestion" />
                    <Label htmlFor="suggestion" className="cursor-pointer">
                      Sugerencia
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bug" id="bug" />
                    <Label htmlFor="bug" className="cursor-pointer">
                      Error
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feature" id="feature" />
                    <Label htmlFor="feature" className="cursor-pointer">
                      Nueva función
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-text">Detalle</Label>
                <Textarea
                  id="feedback-text"
                  placeholder="Describe tu sugerencia, error o solicitud de función..."
                  className="min-h-[120px]"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" /> Enviar
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
