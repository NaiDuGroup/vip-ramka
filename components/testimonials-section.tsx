"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Александр Попов",
    role: "Владелец BMW X5",
    content:
      "Заказал персонализированную рамку с логотипом своей компании. Качество превзошло все ожидания! Материалы премиальные, исполнение безупречное.",
    rating: 5,
    avatar: "/professional-man-avatar.png",
  },
  {
    id: 2,
    name: "Мария Ионеску",
    role: "Предприниматель",
    content:
      "VIP-RAMKA.MD - это не просто рамка, это стильный аксессуар, который подчеркивает индивидуальность. Рекомендую всем, кто ценит качество!",
    rating: 5,
    avatar: "/business-woman-avatar.png",
  },
  {
    id: 3,
    name: "Дмитрий Волков",
    role: "Коллекционер автомобилей",
    content:
      "У меня несколько автомобилей, и для каждого заказываю рамки здесь. Всегда высочайшее качество и внимание к деталям. Спасибо за профессионализм!",
    rating: 5,
    avatar: "/mature-man-avatar.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Отзывы наших клиентов</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Узнайте, что говорят о нас довольные клиенты, которые уже оценили качество наших изделий
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Quote Icon */}
                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground text-center leading-relaxed italic">"{testimonial.content}"</p>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
