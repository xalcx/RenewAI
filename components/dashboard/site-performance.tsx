import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SitePerformance() {
  const sites = [
    { name: "Parque Solar Andalucía", performance: 98, trend: "+2.3%" },
    { name: "Parque Eólico Galicia", performance: 76, trend: "-4.1%" },
    { name: "Microgrid Cataluña", performance: 94, trend: "+1.7%" },
    { name: "Parque Solar Valencia", performance: 45, trend: "+5.2%" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento de Sitios</CardTitle>
        <CardDescription>Comparativa de rendimiento actual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sites.map((site, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{site.name}</span>
                <span
                  className={`text-xs font-medium ${
                    site.trend.startsWith("+") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {site.trend}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    site.performance > 90 ? "bg-green-500" : site.performance > 70 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${site.performance}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
