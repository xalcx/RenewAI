"use client"

import { useState } from "react"
import ProtectedRoute from "@/components/auth/protected-route"
import { AssetForm } from "@/components/demo/asset-form"
import { AssetSummary } from "@/components/demo/asset-summary"
import { DataUpload } from "@/components/demo/data-upload"
import { DataVisualization } from "@/components/demo/data-visualization"
import { ProjectionAnalysis } from "@/components/demo/projection-analysis"
import { FeedbackFormInteractive } from "@/components/demo/feedback-form-interactive"

interface Asset {
  id?: string
  user_id: string
  asset_type: string
  site_name: string
  capacity: number
  location: string
  installation_year: number
  created_at?: string
}

interface DataPoint {
  fecha: string
  generacion_kWh: number
  temperatura: number
  velocidad_viento: number
}

export default function InteractivoPage() {
  const [asset, setAsset] = useState<Asset | null>(null)
  const [data, setData] = useState<DataPoint[]>([])

  const handleAssetCreated = (newAsset: Asset) => {
    setAsset(newAsset)
  }

  const handleDataLoaded = (loadedData: DataPoint[]) => {
    setData(loadedData)
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Simulador Interactivo RenewAI</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <AssetForm onAssetCreated={handleAssetCreated} />
          </div>
          <div>{asset && <AssetSummary asset={asset} />}</div>
        </div>

        <div className="mb-8">
          <DataUpload onDataLoaded={handleDataLoaded} />
        </div>

        {data.length > 0 && (
          <div className="mb-8">
            <DataVisualization data={data} />
          </div>
        )}

        {data.length > 0 && asset && (
          <div className="mb-8">
            <ProjectionAnalysis data={data} asset={asset} />
          </div>
        )}

        <div className="max-w-md mx-auto">
          <FeedbackFormInteractive />
        </div>
      </div>
    </ProtectedRoute>
  )
}
