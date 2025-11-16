"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "@/hooks/use-language"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )
}
