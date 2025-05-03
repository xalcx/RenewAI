"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

type AuthContextType = {
  user: User | null
  loading: boolean
  isAdmin: boolean
  isGuest: boolean
  firebaseUser: any | null
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
  signInWithGoogle: () => Promise<{
    success: boolean
    error?: any
    user?: any
  }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const router = useRouter()

  // Verificar sesión al cargar
  useEffect(() => {
    const checkSession = async () => {
      try {
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
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error al obtener la sesión:", error)
        }

        setUser(session?.user || null)
        setLoading(false)
      } catch (error) {
        console.error("Error inesperado al verificar la sesión:", error)
        setLoading(false)
      }
    }

    checkSession()

    // Escuchar cambios en la autenticación de Supabase
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null)
      })

      // Escuchar cambios en la autenticación de Firebase
      const unsubscribeFirebase = onAuthStateChanged(auth, (currentUser) => {
        setFirebaseUser(currentUser)
      })

      // Escuchar cambios en localStorage para sesiones de invitado y admin
      const handleStorageChange = () => {
        const adminSession = localStorage.getItem("adminSession")
        const guestSession = localStorage.getItem("guestSession")

        setIsAdmin(adminSession === "true")
        setIsGuest(guestSession === "true")
      }

      window.addEventListener("storage", handleStorageChange)

      return () => {
        subscription.unsubscribe()
        unsubscribeFirebase()
        window.removeEventListener("storage", handleStorageChange)
      }
    } catch (error) {
      console.error("Error al configurar el listener de autenticación:", error)
      return () => {}
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      // Verificar si Supabase está disponible
      if (!supabase.auth) {
        return {
          error: {
            message: "El servicio de autenticación no está disponible temporalmente. Por favor, intente más tarde.",
          },
          success: false,
        }
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return { error, success: false }
      }

      return { error: null, success: true }
    } catch (error) {
      console.error("Error durante el registro:", error)
      return {
        error: { message: "Error de conexión. Por favor, verifique su conexión a internet e intente nuevamente." },
        success: false,
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      // Verificar credenciales de administrador
      if (email === "admin" && password === "admin") {
        localStorage.setItem("adminSession", "true")
        setIsAdmin(true)
        return { error: null, success: true }
      }

      // Verificar credenciales de invitado
      if (email === "invitado" && password === "invitado") {
        localStorage.setItem("guestSession", "true")
        setIsGuest(true)
        return { error: null, success: true }
      }

      // Verificar si Supabase está disponible
      if (!supabase.auth) {
        return {
          error: {
            message: "El servicio de autenticación no está disponible temporalmente. Por favor, intente más tarde.",
          },
          success: false,
        }
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error, success: false }
      }

      return { error: null, success: true }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error)
      return {
        error: { message: "Error de conexión. Por favor, verifique su conexión a internet e intente nuevamente." },
        success: false,
      }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      return { success: true, user: result.user }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error)
      return { success: false, error }
    }
  }

  const signOut = async () => {
    try {
      // Limpiar sesiones de administrador e invitado
      localStorage.removeItem("adminSession")
      localStorage.removeItem("guestSession")
      setIsAdmin(false)
      setIsGuest(false)

      // Cerrar sesión en Firebase si hay un usuario
      if (firebaseUser) {
        await auth.signOut()
      }

      // Cerrar sesión en Supabase si está disponible
      if (supabase.auth) {
        await supabase.auth.signOut()
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    } finally {
      // Siempre redirigir a la página principal
      router.push("/")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        isGuest,
        firebaseUser,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
      }}
    >
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
