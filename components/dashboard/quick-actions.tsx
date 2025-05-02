"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, FileText, AlertTriangle, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function QuickActions() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleAction = async (action: string, route?: string) => {
    setIsLoading(action)

    try {
      // Simulamos una acción asíncrona
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (route) {
        router.push(route)
      } else {
        // Acciones específicas según el botón
        switch (action) {
          case "nuevo-proyecto":
            toast({
              title: "Nuevo proyecto",
              description: "Formulario de nuevo proyecto abierto",
            })
            break
          case "generar-informe":
            toast({
              title: "Informe generado",
              description: "El informe se ha generado correctamente",
            })
            break
          case "crear-alerta":
            toast({
              title: "Nueva alerta",
              description: "Configuración de alerta iniciada",
            })
            break
          case "exportar-datos":
            toast({
              title: "Exportación iniciada",
              description: "Los datos se están exportando",
            })
            break
          case "compartir-dashboard":
            toast({
              title: "Compartir dashboard",
              description: "Opciones de compartir abiertas",
            })
            break
          default:
            toast({
              title: "Acción ejecutada",
              description: `Has ejecutado la acción: ${action}`,
            })
        }
      }
    } catch (error) {
      console.error(`Error al ejecutar la acción ${action}:`, error)
      toast({
        title: "Error",
        description: "No se pudo completar la acción",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      <Button
        className="w-full justify-start"
        onClick={() => handleAction("nuevo-proyecto")}
        disabled={isLoading === "nuevo-proyecto"}
      >
        {isLoading === "nuevo-proyecto" ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Plus className="mr-2 h-4 w-4" />
        )}
        Nuevo Proyecto
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => handleAction("generar-informe", "/dashboard/reports")}
        disabled={isLoading === "generar-informe"}
      >
        {isLoading === "generar-informe" ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <FileText className="mr-2 h-4 w-4" />
        )}
        Generar Informe
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => handleAction("crear-alerta", "/dashboard/alerts")}
        disabled={isLoading === "crear-alerta"}
      >
        {isLoading === "crear-alerta" ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <AlertTriangle className="mr-2 h-4 w-4" />
        )}
        Crear Alerta
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => handleAction("exportar-datos")}
        disabled={isLoading === "exportar-datos"}
      >
        {isLoading === "exportar-datos" ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        Exportar Datos
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => handleAction("compartir-dashboard")}
        disabled={isLoading === "compartir-dashboard"}
      >
        {isLoading === "compartir-dashboard" ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Share2 className="mr-2 h-4 w-4" />
        )}
        Compartir Dashboard
      </Button>
    </div>
  )
}
