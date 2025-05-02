import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Wind } from "lucide-react"

export function WeatherForecast() {
  const forecast = [
    { day: "Hoy", temp: "24°", icon: Sun, condition: "Soleado", wind: "12 km/h" },
    { day: "Mañana", temp: "22°", icon: Cloud, condition: "Parcialmente nublado", wind: "15 km/h" },
    { day: "Miércoles", temp: "19°", icon: CloudRain, condition: "Lluvia ligera", wind: "20 km/h" },
    { day: "Jueves", temp: "21°", icon: Wind, condition: "Ventoso", wind: "25 km/h" },
    { day: "Viernes", temp: "23°", icon: Sun, condition: "Soleado", wind: "10 km/h" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Previsión Meteorológica</CardTitle>
        <CardDescription>Condiciones para tus instalaciones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {forecast.map((day, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                  <day.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{day.day}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{day.condition}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{day.temp}</p>
                <div className="flex items-center justify-end text-xs text-gray-500 dark:text-gray-400">
                  <Wind className="h-3 w-3 mr-1" />
                  <span>{day.wind}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
