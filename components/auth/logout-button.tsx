"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  const { signOut } = useAuth()

  return (
    <Button variant="ghost" onClick={signOut} className="flex items-center gap-2">
      <LogOut size={16} />
      <span>Cerrar sesión</span>
    </Button>
  )
}
