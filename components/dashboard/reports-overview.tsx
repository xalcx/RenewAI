"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, FileText, BarChart2, Calendar, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReportsOverview() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Informes y Análisis</h2>
          <p className="text-muted-foreground">
            Visualiza y descarga informes detallados sobre el rendimiento de tus proyectos renovables.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Periodo de tiempo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mes</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="year">Último año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="maintenance">Mantenimiento</TabsTrigger>
          <TabsTrigger value="financial">Financiero</TabsTrigger>
          <TabsTrigger value="environmental">Ambiental</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportCard
              title="Rendimiento de Parque Eólico"
              description="Análisis detallado de producción energética"
              icon={<BarChart2 className="h-5 w-5" />}
              date="Actualizado: 15 abril, 2025"
            />
            <ReportCard
              title="Eficiencia de Paneles Solares"
              description="Métricas de captación y conversión energética"
              icon={<BarChart2 className="h-5 w-5" />}
              date="Actualizado: 12 abril, 2025"
            />
            <ReportCard
              title="Comparativa de Rendimiento"
              description="Análisis comparativo entre instalaciones"
              icon={<FileText className="h-5 w-5" />}
              date="Actualizado: 10 abril, 2025"
            />
            <ReportCard
              title="Predicciones de Producción"
              description="Proyecciones basadas en IA para próximos 3 meses"
              icon={<Calendar className="h-5 w-5" />}
              date="Actualizado: 8 abril, 2025"
            />
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportCard
              title="Historial de Mantenimiento"
              description="Registro completo de intervenciones técnicas"
              icon={<FileText className="h-5 w-5" />}
              date="Actualizado: 14 abril, 2025"
            />
            <ReportCard
              title="Predicción de Fallos"
              description="Análisis predictivo de posibles averías"
              icon={<BarChart2 className="h-5 w-5" />}
              date="Actualizado: 13 abril, 2025"
            />
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportCard
              title="ROI por Instalación"
              description="Análisis de retorno de inversión detallado"
              icon={<BarChart2 className="h-5 w-5" />}
              date="Actualizado: 10 abril, 2025"
            />
            <ReportCard
              title="Proyecciones Financieras"
              description="Estimaciones de ingresos a 5 años"
              icon={<Calendar className="h-5 w-5" />}
              date="Actualizado: 5 abril, 2025"
            />
          </div>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportCard
              title="Impacto Ambiental"
              description="Reducción de emisiones de CO2 y otros beneficios"
              icon={<FileText className="h-5 w-5" />}
              date="Actualizado: 8 abril, 2025"
            />
            <ReportCard
              title="Sostenibilidad"
              description="Métricas de sostenibilidad y cumplimiento ESG"
              icon={<BarChart2 className="h-5 w-5" />}
              date="Actualizado: 7 abril, 2025"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReportCard({
  title,
  description,
  icon,
  date,
}: {
  title: string
  description: string
  icon: React.ReactNode
  date: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted-foreground">{date}</span>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="h-3.5 w-3.5 mr-1" />
            Descargar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
