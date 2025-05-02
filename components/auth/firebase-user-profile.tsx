"use client"

import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FirebaseUserProfile() {
  const { firebaseUser, signOut } = useAuth()

  if (!firebaseUser) {
    return null
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Perfil de Usuario</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={firebaseUser.photoURL || ""} alt={firebaseUser.displayName || "Usuario"} />
          <AvatarFallback>{(firebaseUser.displayName || "Usuario").charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <h3 className="text-xl font-bold">{firebaseUser.displayName || "Usuario"}</h3>
          <p className="text-gray-500">{firebaseUser.email}</p>
        </div>

        <Button onClick={signOut} variant="outline" className="mt-4">
          Cerrar sesión
        </Button>
      </CardContent>
    </Card>
  )
}
