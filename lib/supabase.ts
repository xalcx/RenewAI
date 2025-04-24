import { createClient } from "@supabase/supabase-js"

// Verificamos que las variables de entorno estén definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Creamos una función para obtener el cliente de Supabase con manejo de errores
const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Variables de entorno de Supabase no configuradas correctamente")
    // Retornamos un cliente mock que no hará peticiones reales
    return {
      auth: {
        signUp: async () => ({ error: { message: "Servicio no disponible temporalmente" }, data: null }),
        signInWithPassword: async () => ({ error: { message: "Servicio no disponible temporalmente" }, data: null }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    } as any
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error("Error al inicializar Supabase:", error)
    // Retornamos un cliente mock en caso de error
    return {
      auth: {
        signUp: async () => ({ error: { message: "Servicio no disponible temporalmente" }, data: null }),
        signInWithPassword: async () => ({ error: { message: "Servicio no disponible temporalmente" }, data: null }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    } as any
  }
}

// Exportamos el cliente de Supabase
export const supabase = getSupabaseClient()
