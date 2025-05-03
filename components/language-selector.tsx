"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("language")}>
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage("es")}
          className={cn("flex items-center gap-2 cursor-pointer", language === "es" && "bg-accent")}
        >
          <span className="mr-1">🇪🇸</span> {t("spanish")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={cn("flex items-center gap-2 cursor-pointer", language === "en" && "bg-accent")}
        >
          <span className="mr-1">🇬🇧</span> {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("pt")}
          className={cn("flex items-center gap-2 cursor-pointer", language === "pt" && "bg-accent")}
        >
          <span className="mr-1">🇵🇹</span> {t("portuguese")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
