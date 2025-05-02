"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Wind,
  BarChart2,
  Settings,
  AlertTriangle,
  Map,
  Calendar,
  Users,
  FileText,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  href: string
  isActive?: boolean
  isCollapsed?: boolean
  hasSubItems?: boolean
  isExpanded?: boolean
  onClick?: () => void
  badge?: number | string
}

function SidebarItem({
  icon,
  title,
  href,
  isActive = false,
  isCollapsed = false,
  hasSubItems = false,
  isExpanded = false,
  onClick,
  badge,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-50"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
        isCollapsed && "justify-center px-2",
      )}
      onClick={onClick}
    >
      <span className={cn("", isCollapsed ? "mr-0" : "mr-3")}>{icon}</span>
      {!isCollapsed && (
        <>
          <span className="flex-grow">{title}</span>
          {hasSubItems && (
            <span className="ml-auto">{isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
          )}
          {badge && (
            <span className="ml-auto bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}

export function SidebarNavigation() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div
      className={cn(
        "h-screen flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center">
            <img src="/favicon.ico" alt="RenewAI Logo" className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">RenewAI</span>
          </Link>
        )}
        {isCollapsed && (
          <Link href="/dashboard" className="mx-auto">
            <img src="/favicon.ico" alt="RenewAI Logo" className="h-8 w-8" />
          </Link>
        )}
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronRight size={20} />
          </button>
        )}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute -right-3 top-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronRight size={16} className="rotate-180" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          title="Panel Principal"
          href="/dashboard"
          isActive={pathname === "/dashboard"}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<Wind size={20} />}
          title="Proyectos"
          href="#"
          hasSubItems={!isCollapsed}
          isExpanded={expandedSection === "projects"}
          onClick={() => !isCollapsed && toggleSection("projects")}
          isCollapsed={isCollapsed}
          badge="3"
        />

        {expandedSection === "projects" && !isCollapsed && (
          <div className="ml-9 space-y-1 mt-1">
            <Link
              href="/dashboard/projects/active"
              className={cn(
                "block py-1.5 px-3 rounded-md text-sm font-medium transition-colors",
                pathname === "/dashboard/projects/active"
                  ? "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-50"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
              )}
            >
              Activos
            </Link>
            <Link
              href="/dashboard/projects/planned"
              className={cn(
                "block py-1.5 px-3 rounded-md text-sm font-medium transition-colors",
                pathname === "/dashboard/projects/planned"
                  ? "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-50"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
              )}
            >
              Planificados
            </Link>
            <Link
              href="/dashboard/projects/completed"
              className={cn(
                "block py-1.5 px-3 rounded-md text-sm font-medium transition-colors",
                pathname === "/dashboard/projects/completed"
                  ? "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-50"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
              )}
            >
              Completados
            </Link>
          </div>
        )}

        <SidebarItem
          icon={<BarChart2 size={20} />}
          title="Análisis"
          href="/dashboard/analytics"
          isActive={pathname === "/dashboard/analytics"}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<Map size={20} />}
          title="Mapas"
          href="/dashboard/maps"
          isActive={pathname === "/dashboard/maps"}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<AlertTriangle size={20} />}
          title="Alertas"
          href="/dashboard/alerts"
          isActive={pathname === "/dashboard/alerts"}
          isCollapsed={isCollapsed}
          badge="5"
        />

        <SidebarItem
          icon={<Calendar size={20} />}
          title="Calendario"
          href="/dashboard/calendar"
          isActive={pathname === "/dashboard/calendar"}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<Users size={20} />}
          title="Equipo"
          href="/dashboard/team"
          isActive={pathname === "/dashboard/team"}
          isCollapsed={isCollapsed}
        />

        <SidebarItem
          icon={<FileText size={20} />}
          title="Informes"
          href="/dashboard/reports"
          isActive={pathname === "/dashboard/reports"}
          isCollapsed={isCollapsed}
        />
      </nav>

      <div className="p-2 border-t border-gray-200 dark:border-gray-800">
        <SidebarItem
          icon={<Settings size={20} />}
          title="Configuración"
          href="/dashboard/settings"
          isActive={pathname === "/dashboard/settings"}
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  )
}
