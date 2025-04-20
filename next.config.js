/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "intelliarts-wind-turbine-anomaly-detection.hf.space", "placehold.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Optimizar imágenes para diferentes dispositivos
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
  },
  // Desactivar la generación estática para evitar errores de prerenderización
  output: "standalone",
  // Ignorar errores de TypeScript y ESLint durante la construcción
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Comprimir respuestas para mejorar el rendimiento
  compress: true,
  // Optimizar para producción
  productionBrowserSourceMaps: false,
  // Optimizar para el primer cargado
  optimizeFonts: true,
  // Configuración de seguridad
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
