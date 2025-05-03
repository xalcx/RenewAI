"use client"

import { useEffect } from "react"

export function ThemeController() {
  useEffect(() => {
    // Aplicar tema oscuro por defecto
    document.documentElement.classList.add("dark")
    document.documentElement.classList.remove("light")

    // Eliminar cualquier estilo problemático
    const problematicStyles = document.querySelectorAll(".native-dark-class-modified")
    problematicStyles.forEach((style) => style.remove())

    // Guardar preferencia en localStorage
    localStorage.setItem("theme", "dark")
  }, [])

  return null
}
