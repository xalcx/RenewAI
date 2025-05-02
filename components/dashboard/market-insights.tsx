import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function MarketInsights() {
  const marketData = [
    { label: "Precio spot", value: "87.45 €/MWh", change: "+2.3%", trend: "up" },
    { label: "Precio futuro", value: "92.10 €/MWh", change: "+4.8%", trend: "up" },
    { label: "Demanda", value: "32.4 GW", change: "-1.2%", trend: "down" },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Mercado Energético</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {marketData.map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                <p className="text-lg font-bold">{item.value}</p>
              </div>
              <div
                className={`flex items-center ${
                  item.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {item.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">{item.change}</span>
              </div>
            </div>
          ))}
          <div className="pt-2 text-xs text-center text-gray-500 dark:text-gray-400">
            Última actualización: Hoy, 10:45 AM
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
