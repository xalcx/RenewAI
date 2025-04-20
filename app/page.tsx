import Header from "../components/header"
import HeroSection from "../components/hero-section"
import BenefitsSection from "../components/benefits-section"
import CompetitiveAdvantages from "../components/competitive-advantages"
import HowItWorks from "../components/how-it-works"
import UseCases from "../components/use-cases"
import ContactSection from "../components/contact-section"
import Footer from "../components/footer"
import type { Metadata } from "next"

// Actualizar los metadatos de la página

export const metadata: Metadata = {
  title: "RenewAI - GreenOps Intelligence™ para Infraestructura Renovable",
  description:
    "Transformamos activos renovables en sistemas autónomos, predictivos y optimizados mediante inteligencia artificial avanzada y análisis geoespacial de precisión.",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BenefitsSection />
        <CompetitiveAdvantages />
        <HowItWorks />
        <UseCases />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
