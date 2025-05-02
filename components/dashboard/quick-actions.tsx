"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, BarChart3, Download, FileText, Plus, RefreshCw, Settings, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function QuickActions() {
  const { toast } = useToast()
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const setLoading = (key: string, isLoading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [key]: isLoading }))
  }

  const handleAction = async (key: string, message: string) => {
    setLoading(key, true)

    try {
      // Simulamos una acción asíncrona
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Acción completada",
        description: message,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo completar la acción. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setLoading(key, false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones rápidas</CardTitle>
        <CardDescription>Accede rápidamente a las funciones más utilizadas</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center gap-1"
          onClick={() => handleAction("newProject", "Nuevo proyecto creado")}
          disabled={loadingStates["newProject"]}
        >
          {loadingStates["newProject"] ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
          <span className="text-xs">Nuevo proyecto</span>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center gap-1"
          onClick={() => handleAction("generateReport", "Informe generado correctamente")}
          disabled={loadingStates["generateReport"]}
        >
          {loadingStates["generateReport"] ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <FileText className="h-5 w-5" />
          )}
          <span className="text-xs">Generar informe</span>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center gap-1"
          onClick={() => handleAction("updateData", "Datos actualizados correctamente")}
          disabled={loadingStates["updateData"]}
        >
          {loadingStates["updateData"] ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <RefreshCw className="h-5 w-5" />
          )}
          <span className="text-xs">Actualizar datos</span>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center gap-1"
          onClick={() => handleAction("exportData", "Datos exportados correctamente")}
          disabled={loadingStates["exportData"]}
        >
          {loadingStates["exportData"] ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <Download className="h-5 w-5" />
          )}
          <span className="text-xs">Exportar datos</span>
        </Button>

        <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-1" asChild>
          <Link href="/dashboard/analytics">
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Ver análisis</span>
          </Link>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center gap-1"
          onClick={() => handleAction("importData", "Datos importados correctamente")}
          disabled={loadingStates["importData"]}
        >
          {loadingStates["importData"] ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
          <span className="text-xs">Importar datos</span>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center gap-1"
          onClick={() => handleAction("checkAlerts", "Alertas verificadas")}
          disabled={loadingStates["checkAlerts"]}
        >
          {loadingStates["checkAlerts"] ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span className="text-xs">Ver alertas</span>
        </Button>

        <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-1" asChild>
          <Link href="/dashboard/settings">
            <Settings className="h-5 w-5" />
            <span className="text-xs">Configuración</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
