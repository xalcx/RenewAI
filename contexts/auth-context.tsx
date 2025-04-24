"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  loading: boolean
  isAdmin: boolean
  isGuest: boolean
  signUp: (
    email: string,
    password: string,
  ) => Promise<{
    error: any | null
    success: boolean
  }>
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: any | null
    success: boolean
  }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar sesión actual
    const getUser = async () => {
      // Verificar si hay una sesión de administrador o invitado
      const adminSession = localStorage.getItem("adminSession")
      const guestSession = localStorage.getItem("guestSession")

      if (adminSession === "true") {
        setIsAdmin(true)
        setLoading(false)
        return
      }

      if (guestSession === "true") {
        setIsGuest(true)
        setLoading(false)
        return
      }

      // Si no hay sesión de admin o invitado, verificar Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    getUser()

    // Escuchar cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return { error, success: false }
      }

      return { error: null, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error, success: false }
      }

      return { error: null, success: true }
    } catch (error) {
      return { error, success: false }
    }
  }

  const signOut = async () => {
    // Limpiar sesiones de administrador e invitado
    localStorage.removeItem("adminSession")
    localStorage.removeItem("guestSession")
    setIsAdmin(false)
    setIsGuest(false)

    // Cerrar sesión en Supabase
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, isGuest, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
