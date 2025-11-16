import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Providers } from "@/components/providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "VIP-RAMKA.MD - Премиальные рамки для автомобильных номеров",
  description:
    "Персонализированные рамки для номерных знаков высочайшего качества. Создайте уникальную рамку для вашего автомобиля.",
  keywords: "рамки для номеров, персонализированные рамки, VIP рамки, автомобильные аксессуары, Молдова",
  generator: "VIP-RAMKA.MD",
  icons: {
    icon: "/images/vip-logo.png",
    shortcut: "/images/vip-logo.png",
    apple: "/images/vip-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/vip-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/images/vip-logo.png" type="image/png" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <script async src="//www.instagram.com/embed.js"></script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
