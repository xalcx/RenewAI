"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { LogOut } from "lucide-react"

// Componente para el botón de cierre de sesión
function LogoutButtonComponent() {
  const router = useRouter()
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2" suppressHydrationWarning>
      <LogOut className="h-4 w-4" />
      <span>Cerrar sesión</span>
    </Button>
  )
}

// Exportar como LogoutButton para importaciones con nombre
export const LogoutButton = LogoutButtonComponent

// Exportar como default para importaciones por defecto
export default LogoutButtonComponent
