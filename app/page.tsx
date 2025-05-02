import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BenefitsSection from "@/components/benefits-section"
import CompetitiveAdvantages from "@/components/competitive-advantages"
import HowItWorks from "@/components/how-it-works"
import UseCases from "@/components/use-cases"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeController } from "@/components/theme-controller"

export default function Home() {
  return (
    <>
      <ThemeController />
      <main className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <HeroSection />
          <BenefitsSection />
          <CompetitiveAdvantages />
          <HowItWorks />
          <UseCases />
          <ContactSection />
        </div>
        <Footer />
        <Toaster />
      </main>
    </>
  )
}
