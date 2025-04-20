"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Wind, Activity, TrendingUp, Map, AlertTriangle, Battery, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import EnergyPredictionSimulator from "@/components/demo/energy-prediction-simulator"
import PredictiveMaintenanceAnalyzer from "@/components/demo/predictive-maintenance-analyzer"
import EnergyDispatchOptimizer from "@/components/demo/energy-dispatch-optimizer"
import RenewableParkMonitor from "@/components/demo/renewable-park-monitor"
import TurbineDamageDetection from "@/components/turbine-damage-detection"
import MicrogridOptimizer from "@/components/demo/microgrid-optimizer"
import AssistedControl from "@/components/demo/assisted-control"

export default function DemoTabs() {
  const [activeTab, setActiveTab] = useState("prediction")

  // Actualizar la definición de las pestañas para incluir descripciones de los problemas que resuelven
  const tabs = [
    {
      id: "prediction",
      label: "Predicción",
      shortLabel: "Pred.",
      icon: <Wind className="h-4 w-4" />,
      color: "from-green-500 to-teal-500",
      description:
        "Modelos de series temporales alimentados con predicciones meteorológicas para reducir incertidumbre y penalizaciones de mercado hasta un 20%.",
    },
    {
      id: "maintenance",
      label: "Mantenimiento",
      shortLabel: "Mant.",
      icon: <Activity className="h-4 w-4" />,
      color: "from-blue-500 to-indigo-500",
      description:
        "Detección de anomalías en tiempo real en turbinas, transformadores y bombas, anticipando fallos y reduciendo paradas imprevistas.",
    },
    {
      id: "dispatch",
      label: "Despacho",
      shortLabel: "Desp.",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "from-yellow-500 to-amber-500",
      description:
        "Optimización algorítmica que recorta costes de balance hasta un 35% en parques renovables y maximiza ingresos en mercados dinámicos.",
    },
    {
      id: "monitor",
      label: "Monitoreo",
      shortLabel: "Monit.",
      icon: <Map className="h-4 w-4" />,
      color: "from-purple-500 to-violet-500",
      description:
        "Visualización geoespacial en tiempo real de activos renovables, integrando datos satelitales y sensores IoT para optimizar la gestión operativa.",
    },
    {
      id: "damage",
      label: "Detección",
      shortLabel: "Detec.",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "from-red-500 to-rose-500",
      description:
        "Identificación automática de daños en turbinas eólicas mediante visión computacional, reduciendo costos de inspección y anticipando fallos críticos.",
    },
    {
      id: "microgrid",
      label: "Microrredes",
      shortLabel: "Micro.",
      icon: <Battery className="h-4 w-4" />,
      color: "from-purple-500 to-pink-500",
      description:
        "Optimización de microrredes con múltiples recursos energéticos distribuidos para maximizar autoconsumo, minimizar costos y proporcionar servicios de flexibilidad.",
    },
    {
      id: "control",
      label: "Control",
      shortLabel: "Ctrl.",
      icon: <Settings className="h-4 w-4" />,
      color: "from-blue-500 to-green-500",
      description:
        "Control asistido por IA que permite a los ingenieros optimizar parques renovables en tiempo real, logrando un uplift del 8% en solo 5 minutos.",
    },
  ]

  // Añadir después de la definición de tabs y antes del return
  // Mostrar la descripción de la pestaña activa
  const activeTabDescription = tabs.find((tab) => tab.id === activeTab)?.description || ""

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Fondo sutil con patrón de grid */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%"],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container">
        <AnimatedSection className="mb-12">
          <Tabs defaultValue="prediction" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="relative mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-7 p-1 bg-muted/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/5 overflow-hidden">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 py-3 relative overflow-hidden transition-all duration-300 z-10"
                    data-state={activeTab === tab.id ? "active" : "inactive"}
                  >
                    {/* Fondo animado para la pestaña activa */}
                    {activeTab === tab.id && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${tab.color} z-0`}
                        layoutId="activeTabBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      />
                    )}

                    {/* Contenido de la pestaña */}
                    <span className="relative z-10 flex items-center gap-2">
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.shortLabel}</span>
                    </span>
                  </TabsTrigger>
                ))}

                {/* Indicador de pestaña activa */}
                <motion.div
                  className="absolute bottom-0 h-0.5 bg-white"
                  style={{
                    width: `${100 / (tabs.length * 2)}%`,
                    left: `${(tabs.findIndex((t) => t.id === activeTab) * 100) / tabs.length + 100 / (tabs.length * 4)}%`,
                  }}
                  layoutId="activeTabIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </TabsList>

              {/* Descripción de la pestaña activa */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + "-description"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-muted-foreground mt-2 mb-4 max-w-3xl mx-auto text-center"
                >
                  {activeTabDescription}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border rounded-lg shadow-xl overflow-hidden border-primary/10 backdrop-blur-sm">
                  <TabsContent value="prediction" className="m-0">
                    <EnergyPredictionSimulator />
                  </TabsContent>

                  <TabsContent value="maintenance" className="m-0">
                    <PredictiveMaintenanceAnalyzer />
                  </TabsContent>

                  <TabsContent value="dispatch" className="m-0">
                    <EnergyDispatchOptimizer />
                  </TabsContent>

                  <TabsContent value="monitor" className="m-0">
                    <RenewableParkMonitor />
                  </TabsContent>

                  <TabsContent value="damage" className="m-0">
                    <TurbineDamageDetection />
                  </TabsContent>

                  <TabsContent value="microgrid" className="m-0">
                    <MicrogridOptimizer />
                  </TabsContent>

                  <TabsContent value="control" className="m-0">
                    <AssistedControl />
                  </TabsContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </AnimatedSection>
      </div>
    </section>
  )
}
