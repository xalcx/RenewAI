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
    "active-projects": "Activos",
    "planned-projects": "Planificados",
    "completed-projects": "Completados",
    analytics: "Análisis",
    "general-analytics": "Análisis General",
    "turbine-damage-detection": "Detección de Daños",
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
    maps: "Mapas",
    alerts: "Alertas",
    calendar: "Calendario",
    team: "Equipo",
    reports: "Informes",
    new: "Nuevo",

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

    // Wind Turbine Detector
    windTurbineDamageDetector: "Detector de Daños en Turbinas Eólicas",
    uploadTurbineImageDescription: "Sube una imagen de una turbina eólica para detectar posibles daños",
    selectImage: "Seleccionar imagen",
    detecting: "Detectando...",
    detectDamage: "Detectar Daños",
    detectionResults: "Resultados de la Detección",
    damageDetected: "¡Se detectaron daños!",
    detectedDamageCount: "Se detectaron {count} áreas con posibles daños",
    noDamageDetected: "No se detectaron daños",
    turbineAppearsHealthy: "La turbina parece estar en buen estado",
    technicalDetails: "Detalles técnicos",
    poweredByRoboflow: "Desarrollado con Roboflow",
    mvpVersion: "Versión MVP",
    error: "Error",
    pleaseUploadImage: "Por favor, sube una imagen primero",
    detectionComplete: "Detección completada",
    damageDetectionProcessed: "La imagen ha sido procesada correctamente",
    errorProcessingImage: "Error al procesar la imagen",
    loading: "Cargando...",
    turbineDamageDetection: "Detección de Daños en Turbinas",
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
    "active-projects": "Active",
    "planned-projects": "Planned",
    "completed-projects": "Completed",
    analytics: "Analytics",
    "general-analytics": "General Analytics",
    "turbine-damage-detection": "Damage Detection",
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
    maps: "Maps",
    alerts: "Alerts",
    calendar: "Calendar",
    team: "Team",
    reports: "Reports",
    new: "New",

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

    // Wind Turbine Detector
    windTurbineDamageDetector: "Wind Turbine Damage Detector",
    uploadTurbineImageDescription: "Upload an image of a wind turbine to detect possible damage",
    selectImage: "Select image",
    detecting: "Detecting...",
    detectDamage: "Detect Damage",
    detectionResults: "Detection Results",
    damageDetected: "Damage Detected!",
    detectedDamageCount: "{count} areas with possible damage detected",
    noDamageDetected: "No damage detected",
    turbineAppearsHealthy: "The turbine appears to be in good condition",
    technicalDetails: "Technical details",
    poweredByRoboflow: "Powered by Roboflow",
    mvpVersion: "MVP Version",
    error: "Error",
    pleaseUploadImage: "Please upload an image first",
    detectionComplete: "Detection complete",
    damageDetectionProcessed: "The image has been processed successfully",
    errorProcessingImage: "Error processing the image",
    loading: "Loading...",
    turbineDamageDetection: "Turbine Damage Detection",
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
    "active-projects": "Ativos",
    "planned-projects": "Planejados",
    "completed-projects": "Concluídos",
    analytics: "Análises",
    "general-analytics": "Análises Gerais",
    "turbine-damage-detection": "Detecção de Danos",
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
    maps: "Mapas",
    alerts: "Alertas",
    calendar: "Calendário",
    team: "Equipe",
    reports: "Relatórios",
    new: "Novo",

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

    // Wind Turbine Detector
    windTurbineDamageDetector: "Detector de Danos em Turbinas Eólicas",
    uploadTurbineImageDescription: "Carregue uma imagem de uma turbina eólica para detectar possíveis danos",
    selectImage: "Selecionar imagem",
    detecting: "Detectando...",
    detectDamage: "Detectar Danos",
    detectionResults: "Resultados da Detecção",
    damageDetected: "Danos Detectados!",
    detectedDamageCount: "{count} áreas com possíveis danos detectados",
    noDamageDetected: "Nenhum dano detectado",
    turbineAppearsHealthy: "A turbina parece estar em boas condições",
    technicalDetails: "Detalhes técnicos",
    poweredByRoboflow: "Desenvolvido com Roboflow",
    mvpVersion: "Versão MVP",
    error: "Erro",
    pleaseUploadImage: "Por favor, carregue uma imagem primeiro",
    detectionComplete: "Detecção concluída",
    damageDetectionProcessed: "A imagem foi processada com sucesso",
    errorProcessingImage: "Erro ao processar a imagem",
    loading: "Carregando...",
    turbineDamageDetection: "Detecção de Danos em Turbinas",
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
