"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Grid, List } from "lucide-react"

const products = [
  // Стандарт
  {
    id: "standard-a8",
    name: "Стандарт A8",
    description: "Классическая рамка стандартного размера. Изготовлена из высококачественного пластика с UV-защитой.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_A8.png",
    category: "Стандарт",
    rating: 4.8,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-casa",
    name: "Стандарт Casa",
    description: "Элегантная стандартная рамка с изысканным дизайном. Прочная и долговечная конструкция.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_casa.png",
    category: "Стандарт",
    rating: 4.7,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-ferr",
    name: "Стандарт Ferrari",
    description: "Стандартная рамка в спортивном стиле. Идеально подходит для динамичных автомобилей.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_ferr.png",
    category: "Стандарт",
    rating: 4.9,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-milf",
    name: "Стандарт Milano",
    description: "Изысканная стандартная рамка с итальянским дизайном. Превосходное качество изготовления.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_milf.png",
    category: "Стандарт",
    rating: 4.8,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-rolls",
    name: "Стандарт Rolls",
    description: "Премиальная стандартная рамка в классическом стиле. Символ роскоши и элегантности.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_rolls.png",
    category: "Стандарт",
    rating: 5.0,
    isNew: false,
    isPremium: true,
  },
  {
    id: "standard-w212",
    name: "Стандарт W212",
    description: "Элегантная рамка в стиле Mercedes W212. Классический немецкий дизайн.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_w212.png",
    category: "Стандарт",
    rating: 4.8,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-vrs",
    name: "Стандарт VRS",
    description: "Спортивная рамка VRS для любителей динамичной езды.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_vrs.png",
    category: "Стандарт",
    rating: 4.7,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-vor",
    name: "Стандарт Vor",
    description: "Стильная рамка с современным дизайном и высоким качеством.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_vor.png",
    category: "Стандарт",
    rating: 4.6,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-vem",
    name: "Стандарт Vem",
    description: "Универсальная рамка с элегантным внешним видом.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_vem.png",
    category: "Стандарт",
    rating: 4.5,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-stratul",
    name: "Стандарт Stratul",
    description: "Рамка с уникальным дизайном для ценителей оригинальности.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_stratul.png",
    category: "Стандарт",
    rating: 4.7,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-scoda",
    name: "Стандарт Skoda",
    description: "Рамка в стиле чешского автопрома с надежным качеством.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_scoda.png",
    category: "Стандарт",
    rating: 4.6,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-s600",
    name: "Стандарт S600",
    description: "Премиальная рамка в стиле Mercedes S-класса.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_s600.png",
    category: "Стандарт",
    rating: 4.9,
    isNew: false,
    isPremium: true,
  },
  {
    id: "standard-ring",
    name: "Стандарт Ring",
    description: "Рамка с круглыми элементами для стильного автомобиля.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_ring.png",
    category: "Стандарт",
    rating: 4.5,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-rashod",
    name: "Стандарт Rashod",
    description: "Экономичная рамка с отличным соотношением цена-качество.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_rashod.png",
    category: "Стандарт",
    rating: 4.4,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-mercb",
    name: "Стандарт Mercedes B",
    description: "Рамка в стиле Mercedes B-класса с европейским качеством.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_mercb.png",
    category: "Стандарт",
    rating: 4.8,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-mbamg",
    name: "Стандарт MB AMG",
    description: "Спортивная рамка в стиле Mercedes AMG для мощных автомобилей.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_mbamg.png",
    category: "Стандарт",
    rating: 4.9,
    isNew: false,
    isPremium: true,
  },
  {
    id: "standard-master",
    name: "Стандарт Master",
    description: "Мастерски выполненная рамка с идеальной отделкой.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_master.png",
    category: "Стандарт",
    rating: 4.7,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-lev",
    name: "Стандарт Lev",
    description: "Сильная и надежная рамка для уверенных водителей.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_lev.png",
    category: "Стандарт",
    rating: 4.6,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-kunp",
    name: "Стандарт Kunp",
    description: "Современная рамка с минималистичным дизайном.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_kunp.png",
    category: "Стандарт",
    rating: 4.5,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-korol",
    name: "Стандарт Korol",
    description: "Королевская рамка для истинных ценителей роскоши.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_korol.png",
    category: "Стандарт",
    rating: 4.9,
    isNew: false,
    isPremium: true,
  },
  {
    id: "standard-komp",
    name: "Стандарт Komp",
    description: "Компактная рамка с эффективным дизайном.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_komp.png",
    category: "Стандарт",
    rating: 4.4,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-kananeu",
    name: "Стандарт Kananeu",
    description: "Уникальная рамка с оригинальным названием и дизайном.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_kananeu.png",
    category: "Стандарт",
    rating: 4.6,
    isNew: true,
    isPremium: false,
  },
  {
    id: "standard-intuit",
    name: "Стандарт Intuit",
    description: "Интуитивно понятная рамка с продуманным дизайном.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_intuit.png",
    category: "Стандарт",
    rating: 4.7,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-evacuator",
    name: "Стандарт Evacuator",
    description: "Прочная рамка для служебного и коммерческого транспорта.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_evacuator.png",
    category: "Стандарт",
    rating: 4.5,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-eclass",
    name: "Стандарт E-Class",
    description: "Элегантная рамка в стиле Mercedes E-класса.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_eclass.png",
    category: "Стандарт",
    rating: 4.8,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-dog",
    name: "Стандарт Dog",
    description: "Дружелюбная рамка для любителей домашних животных.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_dog.png",
    category: "Стандарт",
    rating: 4.6,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-artceramic",
    name: "Стандарт Art Ceramic",
    description: "Художественная рамка с керамическими элементами.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_artceramic.png",
    category: "Стандарт",
    rating: 4.8,
    isNew: true,
    isPremium: true,
  },
  {
    id: "standard-ads",
    name: "Стандарт Ads",
    description: "Рекламная рамка для коммерческих целей и бизнеса.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_ads.png",
    category: "Стандарт",
    rating: 4.4,
    isNew: false,
    isPremium: false,
  },
  {
    id: "standard-2tip",
    name: "Стандарт 2Tip",
    description: "Двухцветная рамка с современным стилем.",
    price: "250 лей",
    pairPrice: "450 лей",
    image: "/images/standart-frames/frame_2tip.png",
    category: "Стандарт",
    rating: 4.6,
    isNew: true,
    isPremium: false,
  },
  
  // Квадратные
  {
    id: "square-liub",
    name: "Квадратная Luxury",
    description: "Стильная квадратная рамка с уникальным дизайном. Подчеркивает индивидуальность автомобиля.",
    price: "300 лей",
    pairPrice: "550 лей",
    image: "/images/small-frames/frame_sm_liub.png",
    category: "Квадратные",
    rating: 4.8,
    isNew: true,
    isPremium: false,
  },
  {
    id: "square-nem",
    name: "Квадратная Nemesis",
    description: "Агрессивная квадратная рамка для спортивных автомобилей. Современный и динамичный дизайн.",
    price: "300 лей",
    pairPrice: "550 лей",
    image: "/images/small-frames/frame_sm_nem.png",
    category: "Квадратные",
    rating: 4.9,
    isNew: true,
    isPremium: false,
  },
  {
    id: "square-rent",
    name: "Квадратная Rent",
    description: "Универсальная квадратная рамка для коммерческого использования. Надежная и практичная.",
    price: "300 лей",
    pairPrice: "550 лей",
    image: "/images/small-frames/frame_sm_rent.png",
    category: "Квадратные",
    rating: 4.7,
    isNew: false,
    isPremium: false,
  },
  
  // Светящиеся
  {
    id: "led-amg-black",
    name: "LED AMG Черная",
    description: "Премиальная светящаяся рамка с LED подсветкой. Эксклюзивный дизайн AMG в черном цвете.",
    price: "850 лей",
    pairPrice: "1500 лей",
    image: "/images/led-frames/led-amg-black.webp",
    secondaryImage: "/images/led-frames/led-amg-white.webp",
    category: "Светящиеся",
    rating: 5.0,
    isNew: true,
    isPremium: true,
    hasLED: true,
  },
  {
    id: "led-audisr-black",
    name: "LED Audi Sport Черная",
    description: "Эксклюзивная светящаяся рамка Audi Sport с RGB подсветкой. Высокие технологии и стиль.",
    price: "850 лей",
    pairPrice: "1500 лей",
    image: "/images/led-frames/led-audisr-black.webp",
    secondaryImage: "/images/led-frames/led-audisr-white.webp",
    category: "Светящиеся",
    rating: 5.0,
    isNew: true,
    isPremium: true,
    hasLED: true,
  },
]

const categories = ["Все", "Стандарт", "Квадратные", "Светящиеся"]

export function ProductShowcase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Все")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Все" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-foreground">Каталог продукции</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Откройте для себя нашу коллекцию премиальных рамок для номерных знаков. Каждое изделие создано с вниманием к
          деталям и высочайшим качеством.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Поиск по каталогу..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-muted-foreground">
        Найдено {filteredProducts.length} {filteredProducts.length === 1 ? "товар" : "товаров"}
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>



      {/* Load More */}
      {filteredProducts.length > 0 && (
        <div className="text-center pt-8">
          <Button variant="outline" size="lg" className="bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/50">
            Загрузить еще товары
          </Button>
        </div>
      )}

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">Товары не найдены</h3>
          <p className="text-muted-foreground mb-6">
            Попробуйте изменить параметры поиска или выберите другую категорию
          </p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("Все")
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
      )}
    </div>
  )
}
