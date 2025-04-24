import AuthNavbar from "@/components/auth-navbar"
import HeroSection from "@/components/hero-section"
import BenefitsSection from "@/components/benefits-section"
import CompetitiveAdvantages from "@/components/competitive-advantages"
import HowItWorks from "@/components/how-it-works"
import UseCases from "@/components/use-cases"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <AuthNavbar />
      <HeroSection />
      <BenefitsSection />
      <CompetitiveAdvantages />
      <HowItWorks />
      <UseCases />
      <ContactSection />
      <Footer />
    </main>
  )
}
