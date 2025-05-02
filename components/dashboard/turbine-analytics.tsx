import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function TurbineAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis de Turbinas</CardTitle>
        <CardDescription>Detección de daños con IA</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4 text-gray-400"
          >
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
            <line x1="16" x2="22" y1="5" y2="5"></line>
            <line x1="19" x2="19" y1="2" y2="8"></line>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sube imágenes de turbinas para análisis de daños con IA
          </p>
          <Button className="mt-4" asChild>
            <Link href="/demo/upload">Analizar Turbina</Link>
          </Button>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Análisis Recientes</h4>
          <div className="space-y-2">
            {[
              { date: "12/04/2023", result: "Sin daños", confidence: 98 },
              { date: "08/04/2023", result: "Daño menor detectado", confidence: 87 },
            ].map((analysis, i) => (
              <div key={i} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div>
                  <p className="text-sm font-medium">{analysis.result}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{analysis.date}</p>
                </div>
                <span className="text-xs">{analysis.confidence}% confianza</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Ver historial completo
        </Button>
      </CardFooter>
    </Card>
  )
}
