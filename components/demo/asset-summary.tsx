import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Asset {
  id?: string
  user_id: string
  asset_type: string
  site_name: string
  capacity: number
  location: string
  installation_year: number
}

export function AssetSummary({ asset }: { asset: Asset | null }) {
  if (!asset) {
    return null
  }

  const getAssetTypeLabel = (type: string) => {
    switch (type) {
      case "solar":
        return "Solar"
      case "eolico":
        return "Eólico"
      case "hibrido":
        return "Híbrido"
      default:
        return type
    }
  }

  const getAssetTypeColor = (type: string) => {
    switch (type) {
      case "solar":
        return "bg-yellow-500"
      case "eolico":
        return "bg-blue-500"
      case "hibrido":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getAssetAge = (year: number) => {
    const currentYear = new Date().getFullYear()
    return currentYear - year
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{asset.site_name}</CardTitle>
          <Badge className={`${getAssetTypeColor(asset.asset_type)} text-white`}>
            {getAssetTypeLabel(asset.asset_type)}
          </Badge>
        </div>
        <CardDescription>Resumen de tu activo renovable</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Capacidad</p>
            <p className="text-2xl font-bold">{asset.capacity} kW</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Ubicación</p>
            <p className="text-lg font-medium">{asset.location}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Instalación</p>
            <p className="text-lg font-medium">
              {asset.installation_year} ({getAssetAge(asset.installation_year)} años)
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Producción estimada</p>
            <p className="text-lg font-medium">
              {asset.asset_type === "solar"
                ? `~${Math.round(asset.capacity * 4.5 * 365)} kWh/año`
                : asset.asset_type === "eolico"
                  ? `~${Math.round(asset.capacity * 3.2 * 365)} kWh/año`
                  : `~${Math.round(asset.capacity * 4.0 * 365)} kWh/año`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
