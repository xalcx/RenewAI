"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface Asset {
  id?: string
  user_id: string
  asset_type: string
  site_name: string
  capacity: number
  location: string
  installation_year: number
}

export function AssetForm({ onAssetCreated }: { onAssetCreated: (asset: Asset) => void }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [asset, setAsset] = useState<Asset>({
    user_id: user?.id || "",
    asset_type: "solar",
    site_name: "",
    capacity: 0,
    location: "",
    installation_year: new Date().getFullYear(),
  })
  const [existingAsset, setExistingAsset] = useState<Asset | null>(null)

  useEffect(() => {
    if (user) {
      setLoading(true)
      const fetchAsset = async () => {
        const { data, error } = await supabase
          .from("user_assets")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (data && !error) {
          setExistingAsset(data)
          setAsset(data)
          onAssetCreated(data)
        }
        setLoading(false)
      }

      fetchAsset()
    }
  }, [user, onAssetCreated])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAsset((prev) => ({
      ...prev,
      [name]: name === "capacity" || name === "installation_year" ? Number(value) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setAsset((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)

    try {
      let result

      if (existingAsset) {
        // Update existing asset
        result = await supabase
          .from("user_assets")
          .update({
            asset_type: asset.asset_type,
            site_name: asset.site_name,
            capacity: asset.capacity,
            location: asset.location,
            installation_year: asset.installation_year,
          })
          .eq("id", existingAsset.id)
          .select()
      } else {
        // Create new asset
        result = await supabase
          .from("user_assets")
          .insert({
            user_id: user.id,
            asset_type: asset.asset_type,
            site_name: asset.site_name,
            capacity: asset.capacity,
            location: asset.location,
            installation_year: asset.installation_year,
          })
          .select()
      }

      if (result.error) {
        throw result.error
      }

      if (result.data && result.data[0]) {
        setExistingAsset(result.data[0])
        onAssetCreated(result.data[0])
        toast({
          title: existingAsset ? "Activo actualizado" : "Activo creado",
          description: `${asset.site_name} ha sido ${existingAsset ? "actualizado" : "guardado"} correctamente.`,
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `No se pudo guardar el activo: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mi Activo Renovable</CardTitle>
        <CardDescription>Configura los detalles de tu instalación de energía renovable</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="asset_type">Tipo de instalación</Label>
            <Select value={asset.asset_type} onValueChange={(value) => handleSelectChange("asset_type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solar">Solar</SelectItem>
                <SelectItem value="eolico">Eólico</SelectItem>
                <SelectItem value="hibrido">Híbrido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="site_name">Nombre del sitio</Label>
            <Input
              id="site_name"
              name="site_name"
              value={asset.site_name}
              onChange={handleChange}
              placeholder="Ej: Parque Solar Las Lomas"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidad instalada (kW)</Label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              min="0"
              step="0.01"
              value={asset.capacity}
              onChange={handleChange}
              placeholder="Ej: 100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              name="location"
              value={asset.location}
              onChange={handleChange}
              placeholder="Ciudad o coordenadas"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="installation_year">Año de instalación</Label>
            <Input
              id="installation_year"
              name="installation_year"
              type="number"
              min="1990"
              max={new Date().getFullYear()}
              value={asset.installation_year}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? <LoadingSpinner size="sm" /> : existingAsset ? "Actualizar activo" : "Guardar activo"}
          </Button>
        </form>
      </CardContent>
      {existingAsset && (
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Activo creado el {new Date(existingAsset.created_at || "").toLocaleDateString()}
          </p>
        </CardFooter>
      )}
    </Card>
  )
}
