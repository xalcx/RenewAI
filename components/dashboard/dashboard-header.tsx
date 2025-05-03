"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Home, Menu, Search, Settings, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogoutButton } from "@/components/auth/logout-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"

export function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { user } = useAuth()
  const { t } = useLanguage()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar búsqueda
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y Menú Móvil */}
          <div className="flex items-center">
            <button
              className="mr-2 rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              <span className="hidden text-xl font-bold text-gray-900 dark:text-white sm:inline-block">RenewAI</span>
            </Link>
          </div>

          {/* Barra de búsqueda */}
          <div className="hidden md:block flex-1 px-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder={t("search-placeholder")}
                className="w-full bg-gray-100 dark:bg-gray-800 pl-8 pr-4 focus-visible:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Acciones de usuario */}
          <div className="flex items-center gap-2">
            {/* Selector de idioma */}
            <LanguageSelector />

            {/* Selector de tema */}
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>{t("notifications")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-auto">
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="cursor-pointer p-4">
                      <div>
                        <p className="font-medium">{t("maintenance-alert")}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          La turbina #{i} {t("requires-maintenance")}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Hace {i * 10} {t("minutes-ago")}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer justify-center">
                  {t("view-all-notifications")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/settings")}>
              <Settings className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("my-account")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>{t("profile")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t("settings")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutButton>
                  <DropdownMenuItem className="cursor-pointer">{t("logout")}</DropdownMenuItem>
                </LogoutButton>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="border-t border-gray-200 dark:border-gray-800 py-2 px-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder={t("search")}
                className="w-full bg-gray-100 dark:bg-gray-800 pl-8 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <nav className="flex flex-col space-y-1">
              <Link
                href="/dashboard"
                className="px-2 py-1.5 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t("main-panel")}
              </Link>
              <Link
                href="/dashboard/projects"
                className="px-2 py-1.5 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t("projects")}
              </Link>
              <Link
                href="/dashboard/analytics"
                className="px-2 py-1.5 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t("analytics")}
              </Link>
              <Link
                href="/dashboard/settings"
                className="px-2 py-1.5 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t("settings")}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
