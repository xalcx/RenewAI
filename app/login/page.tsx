import LoginForm from "@/components/auth/login-form"
import AuthNavbar from "@/components/auth-navbar"

export default function LoginPage() {
  return (
    <>
      <AuthNavbar />
      <div className="container mx-auto py-10">
        <LoginForm />
      </div>
    </>
  )
}
