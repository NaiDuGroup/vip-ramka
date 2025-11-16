import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PriceListPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
                  <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Прайс-лист</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Персонализированные рамки для автомобильных номеров
            </p>
          </div>

          {/* Pricing Tables */}
          <div className="grid gap-8 lg:grid-cols-3 mb-12">
            {/* Стандарт */}
            <div className="bg-background rounded-lg p-6 border shadow-lg">
              <h4 className="text-2xl font-semibold mb-6 text-center">Стандарт</h4>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">1 рамка</div>
                    <div className="text-2xl font-bold text-primary">250 лей</div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Пара</div>
                    <div className="text-2xl font-bold text-primary">450 лей</div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h5 className="font-semibold mb-4 text-center text-lg">Оптовые цены</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 2 пар</span>
                      <span className="font-bold text-primary">400 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 5 пар</span>
                      <span className="font-bold text-primary">350 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 10 пар</span>
                      <span className="font-bold text-primary">290 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 15 пар</span>
                      <span className="font-bold text-primary">235 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 20 пар</span>
                      <span className="font-bold text-primary">210 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 25 пар</span>
                      <span className="font-bold text-primary">205 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 30 пар</span>
                      <span className="font-bold text-primary">195 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 40 пар</span>
                      <span className="font-bold text-primary">180 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 50 пар</span>
                      <span className="font-bold text-primary">150 лей/пара</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Квадратные */}
            <div className="bg-background rounded-lg p-6 border shadow-lg">
              <h4 className="text-2xl font-semibold mb-6 text-center">Квадратные</h4>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">1 рамка</div>
                    <div className="text-2xl font-bold text-primary">300 лей</div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Пара</div>
                    <div className="text-2xl font-bold text-primary">550 лей</div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h5 className="font-semibold mb-4 text-center text-lg">Оптовые цены</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 2 пар</span>
                      <span className="font-bold text-primary">500 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 5 пар</span>
                      <span className="font-bold text-primary">450 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 10 пар</span>
                      <span className="font-bold text-primary">390 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 15 пар</span>
                      <span className="font-bold text-primary">335 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 20 пар</span>
                      <span className="font-bold text-primary">310 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 25 пар</span>
                      <span className="font-bold text-primary">305 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 30 пар</span>
                      <span className="font-bold text-primary">295 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 40 пар</span>
                      <span className="font-bold text-primary">280 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 50 пар</span>
                      <span className="font-bold text-primary">250 лей/пара</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Светящиеся */}
            <div className="bg-background rounded-lg p-6 border shadow-lg">
              <h4 className="text-2xl font-semibold mb-6 text-center">Светящиеся</h4>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">1 рамка</div>
                    <div className="text-2xl font-bold text-primary">850 лей</div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Пара</div>
                    <div className="text-2xl font-bold text-primary">1500 лей</div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h5 className="font-semibold mb-4 text-center text-lg">Оптовые цены</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 2 пар</span>
                      <span className="font-bold text-primary">1400 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 5 пар</span>
                      <span className="font-bold text-primary">1300 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 10 пар</span>
                      <span className="font-bold text-primary">1200 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 15 пар</span>
                      <span className="font-bold text-primary">1100 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 20 пар</span>
                      <span className="font-bold text-primary">1000 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 25 пар</span>
                      <span className="font-bold text-primary">950 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 30 пар</span>
                      <span className="font-bold text-primary">900 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 40 пар</span>
                      <span className="font-bold text-primary">850 лей/пара</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/20">
                      <span className="font-medium">от 50 пар</span>
                      <span className="font-bold text-primary">800 лей/пара</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-muted/50 rounded-lg p-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-4 text-green-600">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">✓</span>
                </div>
                <span className="text-lg">Все цены включают персональный дизайн.</span>
              </div>
              <div className="flex items-center gap-4 text-blue-600">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🚚</span>
                </div>
                <span className="text-lg">Доставка включена в стоимость при оптовых заказах.</span>
              </div>
              <div className="flex items-center gap-4 text-purple-600">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">✉</span>
                </div>
                <span className="text-lg">Индивидуальные условия для крупных заказов – уточняйте у менеджера!</span>
              </div>
            </div>
            
            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-lg text-muted-foreground">
                📱 Instagram: <span className="font-semibold">@vip_ramka.md</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
