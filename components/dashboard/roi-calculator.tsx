"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ROICalculator() {
  const [capacity, setCapacity] = useState(50)
  const [years, setYears] = useState(10)
  const [type, setType] = useState("solar")

  // Cálculos simulados para el MVP
  const initialInvestment = type === "solar" ? capacity * 800000 : capacity * 1000000
  const annualProduction = type === "solar" ? capacity * 1800 : capacity * 2200
  const annualRevenue = annualProduction * 60
  const annualMaintenance = initialInvestment * 0.02
  const annualProfit = annualRevenue - annualMaintenance
  const totalProfit = annualProfit * years
  const roi = (totalProfit / initialInvestment) * 100
  const paybackPeriod = initialInvestment / annualProfit

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de ROI</CardTitle>
        <CardDescription>Estima el retorno de inversión de tu proyecto</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Tipo de instalación</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={type === "solar" ? "default" : "outline"}
                className="justify-start"
                onClick={() => setType("solar")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
                Solar
              </Button>
              <Button
                variant={type === "wind" ? "default" : "outline"}
                className="justify-start"
                onClick={() => setType("wind")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                  <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
                  <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
                </svg>
                Eólica
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Capacidad instalada (MW)</label>
              <span className="text-sm font-medium">{capacity} MW</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={capacity}
              onChange={(e) => setCapacity(Number.parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>10 MW</span>
              <span>100 MW</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Periodo de análisis (años)</label>
              <span className="text-sm font-medium">{years} años</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={years}
              onChange={(e) => setYears(Number.parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>5 años</span>
              <span>25 años</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
            <h4 className="font-medium mb-3">Resultados</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Inversión inicial:</span>
                <span className="text-sm font-medium">{(initialInvestment / 1000000).toFixed(1)} M€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Producción anual:</span>
                <span className="text-sm font-medium">{annualProduction.toLocaleString()} MWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Beneficio anual:</span>
                <span className="text-sm font-medium">{(annualProfit / 1000).toFixed(0)} k€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Periodo de recuperación:</span>
                <span className="text-sm font-medium">{paybackPeriod.toFixed(1)} años</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>ROI ({years} años):</span>
                <span className="text-green-600 dark:text-green-400">{roi.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Generar informe detallado</Button>
      </CardFooter>
    </Card>
  )
}
