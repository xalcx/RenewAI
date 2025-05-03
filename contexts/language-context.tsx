"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Language = "es" | "en" | "pt"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    // Header
    benefits: "Beneficios",
    "how-it-works": "Cómo Funciona",
    "use-cases": "Casos de Uso",
    "interactive-demos": "Demos Interactivas",
    contact: "Contacto",
    dashboard: "Dashboard",
    "request-demo": "Solicita una Demo",

    // Dashboard
    "main-panel": "Panel Principal",
    projects: "Proyectos",
    analytics: "Análisis",
    settings: "Configuración",
    notifications: "Notificaciones",
    "maintenance-alert": "Alerta de mantenimiento",
    "requires-maintenance": "requiere mantenimiento preventivo",
    "minutes-ago": "minutos atrás",
    "view-all-notifications": "Ver todas las notificaciones",
    "my-account": "Mi cuenta",
    profile: "Perfil",
    logout: "Cerrar sesión",
    search: "Buscar",
    "search-placeholder": "Buscar proyectos, ubicaciones, alertas...",

    // Login
    login: "Iniciar sesión",
    email: "Correo electrónico",
    password: "Contraseña",
    "login-as-guest": "Entrar como Invitado",
    "quick-access": "Acceso rápido sin necesidad de registro",
    "continue-with": "O continúa con",
    "back-to-home": "Volver a inicio",

    // Languages
    language: "Idioma",
    spanish: "Español",
    english: "Inglés",
    portuguese: "Portugués",
  },
  en: {
    // Header
    benefits: "Benefits",
    "how-it-works": "How It Works",
    "use-cases": "Use Cases",
    "interactive-demos": "Interactive Demos",
    contact: "Contact",
    dashboard: "Dashboard",
    "request-demo": "Request a Demo",

    // Dashboard
    "main-panel": "Main Panel",
    projects: "Projects",
    analytics: "Analytics",
    settings: "Settings",
    notifications: "Notifications",
    "maintenance-alert": "Maintenance Alert",
    "requires-maintenance": "requires preventive maintenance",
    "minutes-ago": "minutes ago",
    "view-all-notifications": "View all notifications",
    "my-account": "My Account",
    profile: "Profile",
    logout: "Logout",
    search: "Search",
    "search-placeholder": "Search projects, locations, alerts...",

    // Login
    login: "Login",
    email: "Email",
    password: "Password",
    "login-as-guest": "Login as Guest",
    "quick-access": "Quick access without registration",
    "continue-with": "Or continue with",
    "back-to-home": "Back to home",

    // Languages
    language: "Language",
    spanish: "Spanish",
    english: "English",
    portuguese: "Portuguese",
  },
  pt: {
    // Header
    benefits: "Benefícios",
    "how-it-works": "Como Funciona",
    "use-cases": "Casos de Uso",
    "interactive-demos": "Demos Interativas",
    contact: "Contato",
    dashboard: "Painel",
    "request-demo": "Solicite uma Demo",

    // Dashboard
    "main-panel": "Painel Principal",
    projects: "Projetos",
    analytics: "Análises",
    settings: "Configurações",
    notifications: "Notificações",
    "maintenance-alert": "Alerta de Manutenção",
    "requires-maintenance": "requer manutenção preventiva",
    "minutes-ago": "minutos atrás",
    "view-all-notifications": "Ver todas as notificações",
    "my-account": "Minha conta",
    profile: "Perfil",
    logout: "Sair",
    search: "Buscar",
    "search-placeholder": "Buscar projetos, locais, alertas...",

    // Login
    login: "Entrar",
    email: "Email",
    password: "Senha",
    "login-as-guest": "Entrar como Convidado",
    "quick-access": "Acesso rápido sem registro",
    "continue-with": "Ou continue com",
    "back-to-home": "Voltar ao início",

    // Languages
    language: "Idioma",
    spanish: "Espanhol",
    english: "Inglês",
    portuguese: "Português",
  },
}

const defaultLanguage: Language = "es"

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  useEffect(() => {
    // Recuperar el idioma guardado en localStorage al cargar la página
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["es", "en", "pt"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Función para obtener traducciones
  const t = (key: string): string => {
    const currentTranslations = translations[language] || translations.es
    return (currentTranslations as Record<string, string>)[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
