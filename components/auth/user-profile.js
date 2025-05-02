"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserProfile() {
  const { user, logout } = useAuth()

  if (!user) return null

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar>
          <AvatarImage src={user.photoURL || "/placeholder.svg"} alt={user.displayName} />
          <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{user.displayName}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>
      <div className="border-t pt-4 mt-4">
        <Button onClick={handleLogout} variant="outline" className="w-full">
          Cerrar sesión
        </Button>
      </div>
    </div>
  )
}
