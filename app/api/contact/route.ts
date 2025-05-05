import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, type = "contact", feedbackData } = body

    // Validar los datos del formulario
    if (type === "contact" && (!name || !email || !message)) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
    }

    if (type === "feedback" && (!feedbackData || !feedbackData.rating)) {
      return NextResponse.json({ error: "La calificación es obligatoria" }, { status: 400 })
    }

    // En un entorno de producción, aquí se enviaría el correo
    // utilizando un servicio como SendGrid, Mailgun, etc.
    console.log(`${type === "feedback" ? "Feedback" : "Formulario"} recibido:`)

    if (type === "contact") {
      console.log("Nombre:", name)
      console.log("Email:", email)
      console.log("Mensaje:", message)
    } else if (type === "feedback") {
      console.log("Usuario:", feedbackData.userName || "Anónimo")
      console.log("Email:", email || "No proporcionado")
      console.log("Calificación:", feedbackData.rating)
      console.log("Comentario:", feedbackData.comment || "Sin comentario")
      console.log("Sección:", feedbackData.section || "General")
      console.log("Datos adicionales:", feedbackData.additionalData || "Ninguno")
    }

    console.log("Se enviaría a: renewai.ar@gmail.com")

    // Simular un retraso para la demostración
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        success: true,
        message: type === "feedback" ? "Feedback enviado correctamente" : "Formulario enviado correctamente",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error(`Error al procesar el ${request.body?.type === "feedback" ? "feedback" : "formulario"}:`, error)
    return NextResponse.json(
      { error: `Error al procesar el ${request.body?.type === "feedback" ? "feedback" : "formulario"}` },
      { status: 500 },
    )
  }
}
