import { Navigation } from "@/components/navigation"
import { ProductShowcase } from "@/components/product-showcase"
import { Footer } from "@/components/footer"

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
                  <main className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <ProductShowcase />
        </div>
      </main>
      <Footer />
    </div>
  )
}
