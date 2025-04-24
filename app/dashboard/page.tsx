import ProtectedRoute from "@/components/auth/protected-route"
import AuthNavbar from "@/components/auth-navbar"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AuthNavbar />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-700 dark:text-gray-300">
            Esta es una página protegida. Solo los usuarios autenticados pueden verla.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  )
}
