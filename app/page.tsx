import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BenefitsSection from "@/components/benefits-section"
import CompetitiveAdvantages from "@/components/competitive-advantages"
import HowItWorks from "@/components/how-it-works"
import UseCases from "@/components/use-cases"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main>
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
