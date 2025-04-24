"use client"

import { useSearchParams } from "next/navigation"
import LoginForm from "./login-form"

export default function LoginFormWrapper() {
  // Aquí podemos usar useSearchParams de forma segura
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const redirect = searchParams.get("redirect")
  const registered = searchParams.get("registered") === "true"

  // Determinar el mensaje de éxito basado en los parámetros
  const successMessage = registered ? "Registro exitoso. Ahora puedes iniciar sesión." : null

  return <LoginForm initialError={error} initialSuccess={successMessage} redirectPath={redirect} />
}
