import type { Metadata } from "next"

// Metadatos base para toda la aplicación
export const baseMetadata: Metadata = {
  title: {
    default: "RenewAI - GreenOps Intelligence™ para Infraestructura Renovable",
    template: "%s | RenewAI",
  },
  description:
    "Transformamos activos renovables en sistemas autónomos, predictivos y optimizados mediante inteligencia artificial avanzada y análisis geoespacial de precisión.",
  keywords: [
    "GreenOps Intelligence",
    "energía renovable",
    "inteligencia artificial",
    "análisis geoespacial",
    "energía solar",
    "energía eólica",
    "optimización energética",
    "mantenimiento predictivo",
    "sistemas autónomos",
  ],
  authors: [{ name: "RenewAI" }],
  creator: "RenewAI",
  publisher: "RenewAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://renewai.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RenewAI - GreenOps Intelligence™ para Infraestructura Renovable",
    description:
      "Transformamos activos renovables en sistemas autónomos, predictivos y optimizados mediante inteligencia artificial avanzada y análisis geoespacial de precisión.",
    url: "https://renewai.vercel.app",
    siteName: "RenewAI",
    images: [
      {
        url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2070",
        width: 2070,
        height: 1380,
        alt: "RenewAI - GreenOps Intelligence™ para Infraestructura Renovable",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RenewAI - GreenOps Intelligence™ para Infraestructura Renovable",
    description:
      "Transformamos activos renovables en sistemas autónomos, predictivos y optimizados mediante IA avanzada.",
    images: ["https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2070"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}
