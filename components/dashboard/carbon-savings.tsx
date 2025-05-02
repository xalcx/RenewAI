import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf } from "lucide-react"

export function CarbonSavings() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Ahorro de CO₂</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-3">
            <Leaf className="h-8 w-8" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">1,245</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Toneladas de CO₂ evitadas</p>
          </div>
          <div className="mt-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">75% del objetivo anual (1,660 toneladas)</p>
          <div className="mt-3 text-xs text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Equivalente a plantar <span className="font-medium text-green-600 dark:text-green-400">20,750</span>{" "}
              árboles
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
