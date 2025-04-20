import type React from "react"
import Header from "../../components/header"
import Footer from "../../components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Demos Interactivas | RenewAI - Inteligencia Artificial para Energías Renovables",
  description:
    "Experimenta con nuestras demos interactivas de IA para optimización de energías renovables: predicción energética, mantenimiento predictivo, optimización de despacho y monitoreo en vivo.",
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
