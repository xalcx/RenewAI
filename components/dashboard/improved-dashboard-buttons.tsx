"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  BarChart2,
  Settings,
  FileText,
  Bell,
  Calendar,
  Map,
  PlusCircle,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Zap,
  Activity,
  Wind,
  Sun,
  Droplets,
  Battery,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface QuickActionButtonProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive"
  badge?: string | number
  isActive?: boolean
}

export function QuickActionButton({
  icon,
  label,
  onClick,
  variant = "outline",
  badge,
  isActive = false,
}: QuickActionButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size="sm"
            onClick={onClick}
            className={`relative h-9 gap-1 px-2.5 ${
              isActive ? "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400" : ""
            }`}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
            {badge && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 px-1.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              >
                {badge}
              </Badge>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function ActionButtonsGroup() {
  return (
    <div className="flex flex-wrap gap-2">
      <QuickActionButton icon={<PlusCircle className="h-4 w-4" />} label="Nuevo" />
      <QuickActionButton icon={<Download className="h-4 w-4" />} label="Exportar" />
      <QuickActionButton icon={<Upload className="h-4 w-4" />} label="Importar" />
      <QuickActionButton icon={<RefreshCw className="h-4 w-4" />} label="Actualizar" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-1 px-2.5">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtrar</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Fecha</DropdownMenuItem>
          <DropdownMenuItem>Ubicación</DropdownMenuItem>
          <DropdownMenuItem>Tipo</DropdownMenuItem>
          <DropdownMenuItem>Estado</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Configurar vista</DropdownMenuItem>
          <DropdownMenuItem>Guardar vista</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Ayuda</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function NavigationButtonsGroup() {
  const [activeButton, setActiveButton] = useState("dashboard")

  return (
    <div className="flex flex-wrap gap-2">
      <QuickActionButton
        icon={<LayoutDashboard className="h-4 w-4" />}
        label="Dashboard"
        isActive={activeButton === "dashboard"}
        onClick={() => setActiveButton("dashboard")}
      />
      <QuickActionButton
        icon={<BarChart2 className="h-4 w-4" />}
        label="Análisis"
        isActive={activeButton === "analytics"}
        onClick={() => setActiveButton("analytics")}
      />
      <QuickActionButton
        icon={<Bell className="h-4 w-4" />}
        label="Alertas"
        badge="5"
        isActive={activeButton === "alerts"}
        onClick={() => setActiveButton("alerts")}
      />
      <QuickActionButton
        icon={<Map className="h-4 w-4" />}
        label="Mapas"
        isActive={activeButton === "maps"}
        onClick={() => setActiveButton("maps")}
      />
      <QuickActionButton
        icon={<Calendar className="h-4 w-4" />}
        label="Calendario"
        isActive={activeButton === "calendar"}
        onClick={() => setActiveButton("calendar")}
      />
      <QuickActionButton
        icon={<FileText className="h-4 w-4" />}
        label="Informes"
        isActive={activeButton === "reports"}
        onClick={() => setActiveButton("reports")}
      />
      <QuickActionButton
        icon={<Settings className="h-4 w-4" />}
        label="Configuración"
        isActive={activeButton === "settings"}
        onClick={() => setActiveButton("settings")}
      />
    </div>
  )
}

export function EnergySourcesButtonsGroup() {
  return (
    <div className="flex flex-wrap gap-2">
      <QuickActionButton icon={<Wind className="h-4 w-4" />} label="Eólica" variant="default" badge="12" />
      <QuickActionButton icon={<Sun className="h-4 w-4" />} label="Solar" variant="default" badge="8" />
      <QuickActionButton icon={<Droplets className="h-4 w-4" />} label="Hidráulica" variant="default" badge="3" />
      <QuickActionButton icon={<Battery className="h-4 w-4" />} label="Almacenamiento" variant="default" badge="4" />
    </div>
  )
}

export function SearchAndFilterBar() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border mb-6">
      <div className="relative w-full sm:w-auto sm:min-w-[300px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar..."
          className="h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background"
        />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button variant="outline" size="sm" className="h-9 gap-1 px-2.5">
          <Filter className="h-4 w-4" />
          <span>Filtros</span>
          <Badge className="ml-1 h-5 px-1.5 text-xs">3</Badge>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1 px-2.5">
              <Activity className="h-4 w-4" />
              <span>Estado</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Todos</DropdownMenuItem>
            <DropdownMenuItem>Activos</DropdownMenuItem>
            <DropdownMenuItem>En mantenimiento</DropdownMenuItem>
            <DropdownMenuItem>Inactivos</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" className="h-9">
          <Zap className="mr-1 h-4 w-4" />
          Aplicar
        </Button>
      </div>
    </div>
  )
}

export function ImprovedDashboardButtons() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">Acciones rápidas</h3>
          <ActionButtonsGroup />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">Navegación principal</h3>
          <NavigationButtonsGroup />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">Fuentes de energía</h3>
          <EnergySourcesButtonsGroup />
        </CardContent>
      </Card>

      <h3 className="text-lg font-medium mb-4">Barra de búsqueda y filtros</h3>
      <SearchAndFilterBar />
    </div>
  )
}
