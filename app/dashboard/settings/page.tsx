"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/dashboard/sidebar-navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [selectedTheme, setSelectedTheme] = useState("system")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    alerts: true,
    reports: false,
    maintenance: true,
  })

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNavigation />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Volver al dashboard</span>
              </a>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("settings")}</h1>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-6 border-b border-gray-200 dark:border-gray-800 w-full justify-start">
              <TabsTrigger
                value="general"
                className="data-[state=active]:border-b-2 data-[state=active]:border-green-500"
              >
                {t("general")}
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="data-[state=active]:border-b-2 data-[state=active]:border-green-500"
              >
                {t("account")}
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:border-b-2 data-[state=active]:border-green-500"
              >
                {t("notifications")}
              </TabsTrigger>
              <TabsTrigger value="api" className="data-[state=active]:border-b-2 data-[state=active]:border-green-500">
                API
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>{t("general-settings")}</CardTitle>
                  <CardDescription>{t("manage-general-settings")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="language">{t("language")}</Label>
                    <Select defaultValue="es">
                      <SelectTrigger id="language" className="mt-1">
                        <SelectValue placeholder={t("select-language")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="theme">{t("theme")}</Label>
                    <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                      <SelectTrigger id="theme" className="mt-1">
                        <SelectValue placeholder={t("select-theme")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">{t("light")}</SelectItem>
                        <SelectItem value="dark">{t("dark")}</SelectItem>
                        <SelectItem value="system">{t("system")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">{t("timezone")}</Label>
                    <Select defaultValue="europe/madrid">
                      <SelectTrigger id="timezone" className="mt-1">
                        <SelectValue placeholder={t("select-timezone")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe/madrid">Europe/Madrid (GMT+1)</SelectItem>
                        <SelectItem value="europe/london">Europe/London (GMT+0)</SelectItem>
                        <SelectItem value="america/new_york">America/New York (GMT-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700">{t("save-changes")}</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>{t("account-settings")}</CardTitle>
                  <CardDescription>{t("manage-account-settings")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input id="name" className="mt-1" defaultValue={user?.displayName || "Usuario RenewAI"} />
                  </div>

                  <div>
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-1"
                      defaultValue={user?.email || "usuario@ejemplo.com"}
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">{t("company")}</Label>
                    <Input id="company" className="mt-1" defaultValue="RenewAI Energy" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700">{t("save-changes")}</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>{t("notification-settings")}</CardTitle>
                  <CardDescription>{t("manage-notification-settings")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">{t("email-notifications")}</Label>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">{t("push-notifications")}</Label>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="alert-notifications">{t("alert-notifications")}</Label>
                    <Switch
                      id="alert-notifications"
                      checked={notifications.alerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, alerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="report-notifications">{t("report-notifications")}</Label>
                    <Switch
                      id="report-notifications"
                      checked={notifications.reports}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, reports: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance-notifications">{t("maintenance-notifications")}</Label>
                    <Switch
                      id="maintenance-notifications"
                      checked={notifications.maintenance}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, maintenance: checked })}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700">{t("save-changes")}</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API {t("settings")}</CardTitle>
                  <CardDescription>{t("manage-api-keys")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex mt-1">
                      <Input id="api-key" value="••••••••••••••••••••••••••••••" className="rounded-r-none" readOnly />
                      <Button variant="outline" className="rounded-l-none border-l-0">
                        {t("show")}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="webhook">Webhook URL</Label>
                    <Input id="webhook" className="mt-1" placeholder="https://your-service.com/webhook" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">{t("regenerate-key")}</Button>
                  <Button className="bg-green-600 hover:bg-green-700">{t("save-changes")}</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
