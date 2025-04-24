import RegisterForm from "@/components/auth/register-form"
import AuthNavbar from "@/components/auth-navbar"

export default function RegisterPage() {
  return (
    <>
      <AuthNavbar />
      <div className="container mx-auto py-10">
        <RegisterForm />
      </div>
    </>
  )
}
