"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("ru")} className={`cursor-pointer ${locale === "ru" ? "bg-accent" : ""}`}>
          Русский
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("ro")} className={`cursor-pointer ${locale === "ro" ? "bg-accent" : ""}`}>
          Română
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
