"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/hooks/use-language"
import { Phone, ShoppingCart, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface OrderFormProps {
  selectedProduct?: {
    id: string
    name: string
    price: string
  }
  customConfiguration?: {
    frameColor: string
    frameStyle: string
    logoSize: number
    customText: string
  }
}

interface FrameConfiguration {
  layers: Array<{
    type: 'text' | 'image'
    name: string
    text?: string
    fontSize?: number
    fontFamily?: string
    textColor?: string
    fontWeight?: string
    fontStyle?: string
    textAlign?: string
    width?: number
    height?: number
    x: number
    y: number
    opacity: number
  }>
  totalLayers: number
  hasText: boolean
  hasImages: boolean
  canvasPreview: string | null
}

const products = [
  { id: "1", name: "VIP Classic Black", price: "450 лей" },
  { id: "2", name: "VIP Sport Red", price: "520 лей" },
  { id: "3", name: "VIP Elegant Silver", price: "680 лей" },
  { id: "4", name: "VIP Custom Logo", price: "750 лей" },
  { id: "5", name: "VIP Business Gold", price: "890 лей" },
  { id: "6", name: "VIP Carbon Fiber", price: "950 лей" },
  { id: "custom", name: "Персонализированная рамка", price: "от 600 лей" },
]

export function OrderForm({ selectedProduct, customConfiguration }: OrderFormProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    productId: selectedProduct?.id || "custom",
    customerName: "",
    phoneNumber: "",
    email: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [frameConfiguration, setFrameConfiguration] = useState<FrameConfiguration | null>(null)

  useEffect(() => {
    // Load frame configuration from sessionStorage
    const savedConfig = sessionStorage.getItem('frameConfiguration')
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig)
        setFrameConfiguration(config)
        // Set product to custom when coming from constructor
        setFormData(prev => ({ ...prev, productId: "custom" }))
      } catch (error) {
        console.error('Error parsing frame configuration:', error)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!formData.productId || !formData.phoneNumber) {
      setError("Пожалуйста, выберите товар и укажите номер телефона")
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        ...formData,
        customConfiguration,
        frameConfiguration,
      }

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка при отправке заказа')
      }

      console.log("Order submitted successfully:", result)
      setIsSubmitted(true)
    } catch (err) {
      console.error("Order form error:", err)
      setError(err instanceof Error ? err.message : "Произошла ошибка при отправке заказа. Попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">Заказ принят!</h3>
          <p className="text-muted-foreground mb-6">
            Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для уточнения деталей.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" className="bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/50">
            Сделать новый заказ
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <ShoppingCart className="h-6 w-6" />
          {t("order.title")}
        </CardTitle>
        <p className="text-muted-foreground">Заполните простую форму, и мы свяжемся с вами для оформления заказа</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Product Selection */}
          <div className="space-y-2">
            <Label htmlFor="product">{t("order.product")} *</Label>
            <Select
              value={formData.productId}
              onValueChange={(value) => setFormData({ ...formData, productId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите товар" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - {product.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Frame Configuration Display */}
          {frameConfiguration && (
            <div className="p-4 bg-muted rounded-lg space-y-4">
              <h4 className="font-semibold mb-2">Ваша конфигурация:</h4>
              
              {/* Preview Image */}
              {frameConfiguration.canvasPreview && (
                <div className="text-center">
                  <img 
                    src={frameConfiguration.canvasPreview} 
                    alt="Предварительный просмотр рамки" 
                    className="max-w-full h-auto max-h-32 mx-auto border rounded-lg shadow-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Предварительный просмотр дизайна</p>
                </div>
              )}

              {/* Configuration Summary */}
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex justify-between">
                  <span>Всего элементов:</span>
                  <span className="font-medium">{frameConfiguration.totalLayers}</span>
                </div>
                
                {frameConfiguration.hasText && (
                  <div className="flex justify-between">
                    <span>Текстовые элементы:</span>
                    <span className="font-medium">{frameConfiguration.layers.filter(l => l.type === 'text').length}</span>
                  </div>
                )}
                
                {frameConfiguration.hasImages && (
                  <div className="flex justify-between">
                    <span>Изображения:</span>
                    <span className="font-medium">{frameConfiguration.layers.filter(l => l.type === 'image').length}</span>
                  </div>
                )}
              </div>

              {/* Layer Details */}
              {frameConfiguration.layers.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Детали элементов:</h5>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {frameConfiguration.layers.map((layer, index) => (
                      <div key={index} className="text-xs bg-background/50 p-2 rounded text-muted-foreground">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{layer.name}</span>
                          <span className="text-xs px-1 py-0.5 bg-muted rounded">
                            {layer.type === 'text' ? 'Текст' : 'Изображение'}
                          </span>
                        </div>
                        {layer.type === 'text' && layer.text && (
                          <div className="mt-1">
                            <span>"{layer.text}"</span>
                            {layer.fontSize && <span className="ml-2">({layer.fontSize}px)</span>}
                          </div>
                        )}
                        {layer.type === 'image' && layer.width && layer.height && (
                          <div className="mt-1">
                            <span>{layer.width}×{layer.height}px</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Legacy Custom Configuration Display */}
          {!frameConfiguration && customConfiguration && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Ваша конфигурация:</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Стиль: {customConfiguration.frameStyle}</p>
                <p>Цвет: {customConfiguration.frameColor}</p>
                <p>Размер логотипа: {customConfiguration.logoSize}px</p>
                {customConfiguration.customText && <p>Текст: "{customConfiguration.customText}"</p>}
              </div>
            </div>
          )}

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                placeholder="Ваше имя"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t("order.phone")} *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+373 XX XXX XXX"
                  className="pl-10"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (необязательно)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Дополнительные пожелания</Label>
            <Textarea
              id="notes"
              placeholder="Укажите любые дополнительные требования или пожелания..."
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Отправка заказа..." : t("order.submit")}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Обязательные поля. Мы свяжемся с вами в течение 24 часов для подтверждения заказа.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
