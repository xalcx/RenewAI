"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Sun, Wind, Zap } from "lucide-react"

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Producción Solar</p>
              <h3 className="text-2xl font-bold mt-2">128.5 MWh</h3>
              <div className="flex items-center mt-1">
                <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12% vs. mes anterior
                </span>
              </div>
            </div>
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400">
              <Sun className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "78%" }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0 MWh</span>
              <span>Meta: 165 MWh</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Producción Eólica</p>
              <h3 className="text-2xl font-bold mt-2">94.2 MWh</h3>
              <div className="flex items-center mt-1">
                <span className="text-xs font-medium text-red-600 dark:text-red-400 flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  -8% vs. mes anterior
                </span>
              </div>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Wind className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: "62%" }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0 MWh</span>
              <span>Meta: 150 MWh</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Eficiencia</p>
              <h3 className="text-2xl font-bold mt-2">87.3%</h3>
              <div className="flex items-center mt-1">
                <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +5.2% vs. mes anterior
                </span>
              </div>
            </div>
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Zap className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-purple-500 rounded-full" style={{ width: "87%" }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0%</span>
              <span>Meta: 90%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
