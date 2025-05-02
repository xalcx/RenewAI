"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Home, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, firebaseUser, signOut } = useAuth()
  const router = useRouter()

  // Obtener información del usuario (Firebase o Supabase)
  const displayName = firebaseUser?.displayName || user?.email || "Usuario"
  const userEmail = firebaseUser?.email || user?.email || ""
  const photoURL = firebaseUser?.photoURL || null

  // Iniciales para el avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Botón para volver a home */}
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/" aria-label="Volver a la página principal">
            <Home className="h-5 w-5" />
          </Link>
        </Button>

        {isSearchOpen ? (
          <div className="flex items-center gap-2">
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px]"
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="icon" onClick={() => setIsSearchOpen(true)} className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
        )}
        <div className={`hidden md:flex items-center gap-2 ${isSearchOpen ? "hidden" : "block"}`}>
          <Input
            type="search"
            placeholder="Buscar proyectos, alertas, informes..."
            className="w-[200px] lg:w-[300px]"
          />
          <Button variant="outline" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="font-medium">Alerta de mantenimiento</div>
                <div className="text-sm text-muted-foreground">La turbina #42 requiere mantenimiento preventivo.</div>
                <div className="text-xs text-muted-foreground">Hace 10 minutos</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="font-medium">Nuevo proyecto disponible</div>
                <div className="text-sm text-muted-foreground">
                  Se ha añadido un nuevo proyecto en tu área de interés.
                </div>
                <div className="text-xs text-muted-foreground">Hace 2 horas</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="font-medium">Actualización de sistema</div>
                <div className="text-sm text-muted-foreground">
                  Nueva versión de RenewAI disponible con mejoras de rendimiento.
                </div>
                <div className="text-xs text-muted-foreground">Hace 1 día</div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium">Ver todas las notificaciones</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                {photoURL ? (
                  <AvatarImage src={photoURL || "/placeholder.svg"} alt={displayName} />
                ) : (
                  <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <div className="font-medium">{displayName}</div>
              <div className="text-xs text-muted-foreground">{userEmail}</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
