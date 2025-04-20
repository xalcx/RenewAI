// Función simplificada para reemplazar la funcionalidad de cn sin depender de tailwind-merge
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ")
}
