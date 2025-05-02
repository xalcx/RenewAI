"use client"

import { useEffect } from "react"

export function ThemeController() {
  useEffect(() => {
    // Aplicar tema oscuro por defecto
    document.documentElement.classList.add("dark")

    // Eliminar cualquier estilo problemático
    const problematicStyles = document.querySelectorAll(".native-dark-class-modified")
    problematicStyles.forEach((style) => style.remove())
  }, [])

  return null
}
