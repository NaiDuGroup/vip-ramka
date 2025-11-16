'use client'

import { Navigation } from "@/components/navigation"
import { FrameConstructor } from "@/components/frame-constructor"
import { Footer } from "@/components/footer"

export default function ConstructorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24">
        <FrameConstructor />
      </main>
      <Footer />
    </div>
  )
}