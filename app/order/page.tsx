import { Navigation } from "@/components/navigation"
import { OrderForm } from "@/components/order-form"

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
                  <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Оформление заказа</h1>
            <p className="text-lg text-muted-foreground">
              Заполните форму ниже, и мы свяжемся с вами для подтверждения заказа
            </p>
          </div>
          <OrderForm />
        </div>
      </main>
    </div>
  )
}
