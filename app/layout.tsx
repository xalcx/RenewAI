import type React from "react"
import type { Metadata } from "next"
import { Roboto, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import ScrollToTop from "@/components/scroll-to-top"
import { baseMetadata } from "./metadata"
import { Providers } from "./providers"

// Configurar Roboto como fuente principal
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
})

// Configurar Roboto Mono para código
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
})

export const metadata: Metadata = baseMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${roboto.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <Providers>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              {children}
              <ScrollToTop />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
