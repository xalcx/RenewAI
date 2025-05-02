import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EnergyEfficiencyScore() {
  const score = 87

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Eficiencia Energética</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative h-32 w-32">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {/* Fondo del círculo */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
                className="dark:stroke-gray-700"
              />
              {/* Progreso del círculo */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10b981"
                strokeWidth="10"
                strokeDasharray={`${score * 2.51} 251`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className="dark:stroke-green-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{score}</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Puntuación global</p>
          <div className="mt-4 w-full grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
              <p className="font-medium text-green-700 dark:text-green-400">Excelente</p>
              <p className="text-gray-500 dark:text-gray-400">Producción</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
              <p className="font-medium text-yellow-700 dark:text-yellow-400">Bueno</p>
              <p className="text-gray-500 dark:text-gray-400">Consumo</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
              <p className="font-medium text-blue-700 dark:text-blue-400">Óptimo</p>
              <p className="text-gray-500 dark:text-gray-400">Balance</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
