import type React from "react"
import { FloatingFeedbackButton } from "@/components/dashboard/floating-feedback-button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      {children}
      <FloatingFeedbackButton />
    </div>
  )
}
