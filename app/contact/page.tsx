import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Связаться с нами</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы всегда готовы ответить на ваши вопросы и помочь с выбором идеальной рамки для ваших номеров
            </p>
          </div>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
