"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"
import { EnhancedFeedbackForm } from "./enhanced-feedback-form"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface FloatingFeedbackButtonProps {
  section?: string
  additionalData?: any
}

export function FloatingFeedbackButton({ section, additionalData }: FloatingFeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 rounded-full shadow-lg p-3 h-14 w-14 z-50 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          aria-label="Enviar feedback"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="absolute right-4 top-4">
          <Button variant="ghost" className="h-6 w-6 p-0 rounded-full" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <EnhancedFeedbackForm
          section={section}
          additionalData={additionalData}
          compact={true}
          onSuccess={() => {
            setTimeout(() => setIsOpen(false), 2000)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
