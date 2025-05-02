import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Upload, FileText, BarChart3, AlertCircle, Settings, PlusCircle } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      icon: Upload,
      label: "Analizar Turbina",
      description: "Subir imagen para análisis",
      href: "/demo/upload",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: FileText,
      label: "Generar Informe",
      description: "Crear informe personalizado",
      href: "#",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      icon: BarChart3,
      label: "Ver Estadísticas",
      description: "Análisis de rendimiento",
      href: "#",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: AlertCircle,
      label: "Alertas",
      description: "Gestionar notificaciones",
      href: "#",
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      icon: Settings,
      label: "Configuración",
      description: "Ajustes de la plataforma",
      href: "#",
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-100 dark:bg-gray-800",
    },
    {
      icon: PlusCircle,
      label: "Nuevo Proyecto",
      description: "Crear proyecto",
      href: "#",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
        <CardDescription>Accesos directos a funciones principales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              asChild
            >
              <Link href={action.href}>
                <div
                  className={`h-10 w-10 rounded-full ${action.bgColor} ${action.color} flex items-center justify-center mb-2`}
                >
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-sm">{action.label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">{action.description}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
