import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function OptimalLocations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ubicaciones Óptimas</CardTitle>
        <CardDescription>Sitios recomendados por IA para nuevos proyectos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 overflow-hidden">
          <div className="w-full h-full bg-[url('/placeholder.svg?height=300&width=500')] bg-cover bg-center"></div>
        </div>
        <div className="space-y-3">
          {[
            { location: "Almería", score: 94, type: "Solar" },
            { location: "Cádiz", score: 89, type: "Eólico" },
            { location: "Huelva", score: 82, type: "Híbrido" },
          ].map((site, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{site.location}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tipo: {site.type}</p>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: `${site.score}%` }}></div>
                </div>
                <span className="text-sm font-medium">{site.score}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Explorar ubicaciones
        </Button>
      </CardFooter>
    </Card>
  )
}
