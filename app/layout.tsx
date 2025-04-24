import type React from "react"
import "./globals.css"
import Script from "next/script"
import { ThemeProvider } from "../components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"

// Importar los metadatos base
import { baseMetadata } from "./metadata"

// Importar el componente ScrollToTop
import ScrollToTop from "@/components/scroll-to-top"

// Añadir la exportación de metadatos
export const metadata = baseMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://getform.io" />

        <Script id="image-preload" strategy="afterInteractive">
          {`
          // Precargar imágenes críticas
          const imagesToPreload = [
            'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2070',
            'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1744',
            'https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1744',
            'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1744',
            'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1744'
          ];
          
          imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
          });
        `}
        </Script>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            {children}
            <ScrollToTop />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
