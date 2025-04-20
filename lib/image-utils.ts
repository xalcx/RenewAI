// Función para verificar si una URL es válida
export function isValidImageUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

// Función para obtener una URL de imagen de placeholder con dimensiones específicas
export function getPlaceholderImage(width: number, height: number, text = "RenewAI"): string {
  const encodedText = encodeURIComponent(text)
  return `https://placehold.co/${width}x${height}/e2e8f0/64748b?text=${encodedText}`
}

// Función para obtener una URL de imagen de energía renovable aleatoria
export function getRandomRenewableEnergyImage(): string {
  const images = [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276", // Solar panels
    "https://images.unsplash.com/photo-1548337138-e87d889cc369", // Wind turbines
    "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9", // Satellite
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e", // Battery storage
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e", // Solar farm
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7", // Wind farm
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9", // Hydroelectric
  ]

  return images[Math.floor(Math.random() * images.length)]
}

// Función para obtener una URL de imagen específica por categoría
export function getCategoryImage(category: string): string {
  const categoryImages: Record<string, string> = {
    solar: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    wind: "https://images.unsplash.com/photo-1548337138-e87d889cc369",
    satellite: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9",
    storage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e",
    hydro: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9",
  }

  return categoryImages[category.toLowerCase()] || getRandomRenewableEnergyImage()
}
