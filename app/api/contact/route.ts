import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validar los datos del formulario
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
    }

    // En un entorno de producción, aquí se enviaría el correo
    // utilizando un servicio como SendGrid, Mailgun, etc.
    console.log("Formulario recibido:")
    console.log("Nombre:", name)
    console.log("Email:", email)
    console.log("Mensaje:", message)
    console.log("Se enviaría a: renewai.ar@gmail.com")

    // Simular un retraso para la demostración
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ success: true, message: "Formulario enviado correctamente" }, { status: 200 })
  } catch (error) {
    console.error("Error al procesar el formulario:", error)
    return NextResponse.json({ error: "Error al procesar el formulario" }, { status: 500 })
  }
}
