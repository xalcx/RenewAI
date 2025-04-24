import ProtectedRoute from "@/components/auth/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-lg">¡Bienvenido al dashboard de RenewAI!</p>
          <p className="mt-4">
            Aquí podrás gestionar tus proyectos de energías renovables y acceder a todas las funcionalidades de la
            plataforma.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  )
}
