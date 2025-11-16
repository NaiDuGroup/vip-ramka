"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Palette, Zap, Award } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Shield,
      title: "Премиальные материалы",
      description: "Высококачественные материалы, устойчивые к погодным условиям и износу",
    },
    {
      icon: Palette,
      title: "Индивидуальный дизайн",
      description: "Создайте уникальную рамку с вашим логотипом, текстом или графикой",
    },
    {
      icon: Zap,
      title: "Быстрое производство",
      description: "Современные технологии позволяют изготовить заказ в кратчайшие сроки",
    },
    {
      icon: Award,
      title: "Гарантия качества",
      description: "Мы гарантируем высочайшее качество каждого изделия",
    },
  ]

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4">Почему выбирают VIP-RAMKA.MD</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Мы предлагаем не просто рамки для номеров, а эксклюзивные аксессуары, которые подчеркивают ваш статус и
            индивидуальность
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
