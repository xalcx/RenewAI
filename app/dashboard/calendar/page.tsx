"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, Calendar, Plus, ChevronLeft, ChevronRight, Clock } from "lucide-react"

export default function CalendarPage() {
  const { t } = useLanguage()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewMode, setViewMode] = useState("month")
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "maintenance",
  })

  // Generar días para el calendario
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = []
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Días anteriores (del mes pasado)
    const prevMonthDays = new Date(year, month, 0).getDate()
    for (let i = 0; i < firstDay; i++) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - firstDay + i + 1),
        isCurrentMonth: false,
      })
    }

    // Días actuales
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }

    // Completar hasta 42 días (6 semanas)
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      })
    }

    return days
  }

  const days = getDaysInMonth(currentMonth)

  // Mock eventos
  const events = [
    {
      id: 1,
      title: "Mantenimiento Preventivo - Parque Eólico Norte",
      date: new Date(2023, 4, 15),
      type: "maintenance",
    },
    { id: 2, title: "Inspección de Paneles - Planta Solar Este", date: new Date(2023, 4, 10), type: "inspection" },
    { id: 3, title: "Reunión de Equipo - Revisión de KPIs", date: new Date(2023, 4, 18), type: "meeting" },
    { id: 4, title: "Instalación de Sensores - Parque Eólico Sur", date: new Date(2023, 4, 22), type: "installation" },
    { id: 5, title: "Auditoría Energética - Proyecto Híbrido", date: new Date(2023, 4, 25), type: "audit" },
  ]

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleCreateEvent = () => {
    console.log("Nuevo evento:", newEvent)
    // Aquí iría la lógica para crear el evento
  }

  const getEventForDay = (day) => {
    return events.filter(
      (event) =>
        event.date.getDate() === day.date.getDate() &&
        event.date.getMonth() === day.date.getMonth() &&
        event.date.getFullYear() === day.date.getFullYear(),
    )
  }

  const getEventTypeColor = (type) => {
    switch (type) {
      case "maintenance":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "inspection":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "meeting":
        return "bg-amber-100 text-amber-800 border-amber-300"
      case "installation":
        return "bg-green-100 text-green-800 border-green-300"
      case "audit":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" asChild className="mr-2">
                <a href="/dashboard">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Volver al dashboard</span>
                </a>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("calendar")}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={t("view")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">{t("month")}</SelectItem>
                  <SelectItem value="week">{t("week")}</SelectItem>
                  <SelectItem value="day">{t("day")}</SelectItem>
                </SelectContent>
              </Select>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("new-event")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t("create-new-event")}</DialogTitle>
                    <DialogDescription>{t("add-details-for-new-event")}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="event-title">{t("title")}</Label>
                      <Input
                        id="event-title"
                        className="mt-1"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-date">{t("date")}</Label>
                      <Input
                        id="event-date"
                        type="date"
                        className="mt-1"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-time">{t("start-time")}</Label>
                        <Input
                          id="start-time"
                          type="time"
                          className="mt-1"
                          value={newEvent.startTime}
                          onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="end-time">{t("end-time")}</Label>
                        <Input
                          id="end-time"
                          type="time"
                          className="mt-1"
                          value={newEvent.endTime}
                          onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="event-type">{t("type")}</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                      >
                        <SelectTrigger id="event-type" className="mt-1">
                          <SelectValue placeholder={t("select-event-type")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maintenance">{t("maintenance")}</SelectItem>
                          <SelectItem value="inspection">{t("inspection")}</SelectItem>
                          <SelectItem value="meeting">{t("meeting")}</SelectItem>
                          <SelectItem value="installation">{t("installation")}</SelectItem>
                          <SelectItem value="audit">{t("audit")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleCreateEvent} className="bg-green-600 hover:bg-green-700">
                      {t("create-event")}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center border-b p-4">
              <Button variant="ghost" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <CardTitle className="flex-1 text-center">
                {currentMonth.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {viewMode === "month" && (
                <div className="grid grid-cols-7 text-sm">
                  {/* Días de la semana */}
                  {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, index) => (
                    <div key={index} className="py-3 text-center font-semibold border-b">
                      {day}
                    </div>
                  ))}

                  {/* Días del calendario */}
                  {days.map((day, index) => {
                    const dayEvents = getEventForDay(day)
                    return (
                      <div
                        key={index}
                        className={`min-h-[100px] p-1 border-b border-r ${
                          day.isCurrentMonth
                            ? "bg-white dark:bg-gray-800"
                            : "bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600"
                        } ${
                          day.date.getDate() === new Date().getDate() &&
                          day.date.getMonth() === new Date().getMonth() &&
                          day.date.getFullYear() === new Date().getFullYear()
                            ? "ring-2 ring-inset ring-green-500"
                            : ""
                        }`}
                      >
                        <div className="font-medium mb-1 p-1">{day.date.getDate()}</div>
                        <div className="space-y-1">
                          {dayEvents.map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className={`px-2 py-1 text-xs rounded border cursor-pointer truncate ${getEventTypeColor(event.type)}`}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {viewMode === "week" && (
                <div className="text-center p-12 text-gray-500 dark:text-gray-400">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">{t("weekly-view-coming-soon")}</p>
                  <p>{t("this-feature-under-development")}</p>
                </div>
              )}

              {viewMode === "day" && (
                <div className="text-center p-12 text-gray-500 dark:text-gray-400">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">{t("daily-view-coming-soon")}</p>
                  <p>{t("this-feature-under-development")}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>{t("upcoming-events")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center p-3 bg-white dark:bg-gray-800 border rounded-lg">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${getEventTypeColor(event.type)}`}
                      >
                        {event.type === "maintenance" && <span>🔧</span>}
                        {event.type === "inspection" && <span>🔍</span>}
                        {event.type === "meeting" && <span>👥</span>}
                        {event.type === "installation" && <span>⚙️</span>}
                        {event.type === "audit" && <span>📊</span>}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {event.date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                        </p>
                      </div>
                      <div>
                        <Button size="sm" variant="outline">
                          {t("details")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("filters")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="event-filters">{t("event-types")}</Label>
                    <div className="space-y-2 mt-2">
                      {[
                        { id: "maintenance", label: t("maintenance"), color: "bg-blue-100 border-blue-300" },
                        { id: "inspection", label: t("inspection"), color: "bg-purple-100 border-purple-300" },
                        { id: "meeting", label: t("meeting"), color: "bg-amber-100 border-amber-300" },
                        { id: "installation", label: t("installation"), color: "bg-green-100 border-green-300" },
                        { id: "audit", label: t("audit"), color: "bg-red-100 border-red-300" },
                      ].map((type) => (
                        <div key={type.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`filter-${type.id}`}
                            defaultChecked
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <label htmlFor={`filter-${type.id}`} className="ml-2 flex items-center">
                            <span className={`inline-block w-3 h-3 mr-2 rounded-full ${type.color}`}></span>
                            {type.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>{t("locations")}</Label>
                    <div className="space-y-2 mt-2">
                      {["Parque Eólico Norte", "Parque Eólico Sur", "Planta Solar Este", "Proyecto Híbrido"].map(
                        (location, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`location-${index}`}
                              defaultChecked
                              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor={`location-${index}`} className="ml-2">
                              {location}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
