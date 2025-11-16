"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, ShoppingCart, Zap } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: string
  pairPrice?: string
  image: string
  secondaryImage?: string
  category: string
  rating: number
  isNew?: boolean
  isPremium?: boolean
  hasLED?: boolean
}

export function ProductCard({ name, description, price, pairPrice, image, secondaryImage, category, rating, isNew, isPremium, hasLED }: ProductCardProps) {
  const [showSecondary, setShowSecondary] = useState(false)

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/20 flex items-center justify-center p-4">
        <Image
          src={(showSecondary && secondaryImage) ? secondaryImage : (image || "/placeholder.svg")}
          alt={name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isNew && <Badge className="bg-primary text-primary-foreground">Новинка</Badge>}
          {isPremium && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Премиум
            </Badge>
          )}
          {hasLED && (
            <Badge className="bg-yellow-500 text-white">
              <Zap className="h-3 w-3 mr-1" />
              LED
            </Badge>
          )}
        </div>

        {/* Image Switcher for LED frames */}
        {secondaryImage && (
          <div className="absolute bottom-16 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-1 bg-black/80 backdrop-blur-sm rounded-lg p-1">
              <Button 
                size="sm"
                variant={!showSecondary ? "default" : "ghost"}
                className={`h-6 px-2 text-xs ${!showSecondary ? 'bg-white text-black hover:bg-white/90' : 'text-white hover:bg-white/20'}`}
                onClick={() => setShowSecondary(false)}
              >
                Выкл свет
              </Button>
              <Button 
                size="sm"
                variant={showSecondary ? "default" : "ghost"}
                className={`h-6 px-2 text-xs ${showSecondary ? 'bg-white text-black hover:bg-white/90' : 'text-white hover:bg-white/20'}`}
                onClick={() => setShowSecondary(true)}
              >
                Вкл свет
              </Button>
            </div>
          </div>
        )}

        {/* Category */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Badge variant="outline" className="bg-black/80 backdrop-blur-sm text-white border-white/30">
            {category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{rating}</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{description}</p>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <div className="text-xl font-bold text-primary">{price}</div>
              {pairPrice && (
                <div className="text-sm text-muted-foreground">
                  Пара: <span className="font-semibold text-foreground">{pairPrice}</span>
                </div>
              )}
            </div>
            <Button size="sm" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Заказать
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
