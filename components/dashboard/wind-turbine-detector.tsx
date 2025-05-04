"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
import { Upload, Wind, AlertTriangle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"

export function WindTurbineDetector() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()

  const loadImageBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)

      // Reset results when new file is selected
      setResult(null)
    }
  }

  const handleDetect = async () => {
    if (!file) {
      toast({
        title: t("error"),
        description: t("pleaseUploadImage"),
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const image = await loadImageBase64(file)

      const res = await axios({
        method: "POST",
        url: "https://serverless.roboflow.com/wind-turbine-balade-damage/1",
        params: { api_key: "KddecoolEkJqonkbG9ga" },
        data: image,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })

      setResult(res.data)

      toast({
        title: t("detectionComplete"),
        description: t("damageDetectionProcessed"),
        variant: "default",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: t("error"),
        description: t("errorProcessingImage"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const hasDamage = result?.predictions && result.predictions.length > 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-green-500" />
          {t("windTurbineDamageDetector")}
        </CardTitle>
        <CardDescription>{t("uploadTurbineImageDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label
                htmlFor="turbine-image"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("selectImage")}
              </label>
              <input
                id="turbine-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {preview && (
              <div className="relative mt-2 rounded-lg overflow-hidden border border-border">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-[300px] w-auto object-contain"
                />
              </div>
            )}

            <Button onClick={handleDetect} disabled={loading || !file} className="mt-4">
              {loading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                  {t("detecting")}
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {t("detectDamage")}
                </>
              )}
            </Button>
          </div>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{t("detectionResults")}</h3>
                {hasDamage ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </div>

              {hasDamage ? (
                <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        {t("damageDetected")}
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                        <p>{t("detectedDamageCount", { count: result.predictions.length })}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                        {t("noDamageDetected")}
                      </h3>
                      <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                        <p>{t("turbineAppearsHealthy")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800/50">
                <details>
                  <summary className="cursor-pointer text-sm font-medium">{t("technicalDetails")}</summary>
                  <pre className="mt-2 max-h-[200px] overflow-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>{t("aiPoweredAnalysis")}</p>
        <p>{t("mvpVersion")}</p>
      </CardFooter>
    </Card>
  )
}
