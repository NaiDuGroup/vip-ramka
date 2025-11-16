"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/constructor", label: t("nav.constructor") },
    { href: "/catalog", label: t("nav.catalog") },
    { href: "/price-list", label: t("nav.priceList") },
    { href: "/contact", label: t("nav.contact") },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center h-20 py-1">
          {/* Logo - positioned on left */}
          <Link href="/" className="flex items-center cursor-pointer">
            <Image src="/images/vip-logo.png" alt="VIP-RAMKA.MD" width={48} height={48} className="rounded-full object-cover" style={{objectPosition: 'center'}} />
            <span className="font-bold text-2xl text-foreground ml-[2px]">VIP-RAMKA.MD</span>
          </Link>

          {/* Absolutely centered Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-lg cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-lg px-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/admin"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium px-2"
                onClick={() => setIsOpen(false)}
              >
                Админ панель
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
