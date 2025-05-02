import GoogleLoginButton from "@/components/auth/google-login-button"
import UserProfile from "@/components/auth/user-profile"
import { ClientAuthCheck } from "@/components/auth/client-auth-check"
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

        {/* Sección de autenticación */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Accede a tu Dashboard</h2>
            <div className="max-w-md mx-auto">
              <ClientAuthCheck
                fallback={
                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-center mb-4">
                      Inicia sesión para acceder a todas las funcionalidades de RenewAI
                    </p>
                    <GoogleLoginButton />
                  </div>
                }
              >
                <UserProfile />
              </ClientAuthCheck>
            </div>
          </div>
        </section>

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
