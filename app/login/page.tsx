import { Suspense } from "react"
import AuthNavbar from "@/components/auth-navbar"
import LoginFormWrapper from "@/components/auth/login-form-wrapper"

export default function LoginPage() {
  return (
    <>
      <AuthNavbar />
      <div className="container mx-auto py-10">
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="text-center">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Cargando...
                  </span>
                </div>
                <p className="mt-2">Cargando formulario de inicio de sesión...</p>
              </div>
            </div>
          }
        >
          <LoginFormWrapper />
        </Suspense>
      </div>
    </>
  )
}
