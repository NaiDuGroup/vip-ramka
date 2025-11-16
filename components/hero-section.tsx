"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { ArrowRight, Star, Shield, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left content */}
          <div className="space-y-8">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              <Star className="h-4 w-4 fill-current" />
              {t("home.tagline")}
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t("home.hero.title")}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
              {t("home.hero.subtitle")}
            </p>

            {/* Feature points */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-gray-300">{t("home.features.premium")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">{t("home.features.durability")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">{t("home.features.fast")}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/constructor">
                <Button size="lg" className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-200 group shadow-lg">
                  {t("home.createFrame")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white hover:text-white hover:bg-white/20 hover:border-white hover:scale-105 transition-all duration-200 shadow-lg backdrop-blur-sm">
                  {t("home.contactUs")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right content - License plate frame */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-lg blur-xl scale-110" />
              
              {/* License plate frame */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border border-gray-700 shadow-2xl">
                <Image
                  src="/images/vip_ramka.png"
                  alt="Premium License Plate Frame"
                  width={400}
                  height={200}
                  className="w-full h-auto"
                  priority
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {t("home.premium")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
