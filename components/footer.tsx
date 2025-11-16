"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Music2, Mail, Phone, MapPin, Clock, Shield, Star } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function Footer() {
  const { t } = useLanguage()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/images/vip-logo.png" alt="VIP-RAMKA.MD" width={40} height={40} className="rounded-full" />
              <span className="font-bold text-xl text-foreground">VIP-RAMKA.MD</span>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p className="font-semibold text-foreground">S.R.L. DUNCAS WORKS</p>
              <p className="text-sm leading-relaxed">
                Официальный производитель премиальных рамок для автомобильных номеров в Молдове. 
                Качество, эксклюзивность и мастерство для истинных ценителей.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Официально зарегистрированная компания</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Быстрые ссылки</h3>
            <div className="space-y-3">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Главная
              </Link>
              <Link href="/constructor" className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Конструктор рамок
              </Link>
              <Link href="/catalog" className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Каталог продукции
              </Link>
              <Link href="/price-list" className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Прайс-лист
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Контакты
              </Link>
              <Link href="/admin" className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Админ панель</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Контактная информация</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Кишинев, Молдова</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+373 78 48 34 70</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">duncasworks@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <p>Пн-Пт: 9:00 - 18:00</p>
                  <p>Сб: 10:00 - 16:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Reviews */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Социальные сети</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Следите за нашими работами и новинками в социальных сетях
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                <Link 
                  href="https://www.instagram.com/vip_ramka.md/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link 
                  href="https://www.tiktok.com/@vip_ramka.md?_t=ZM-8yxHvwbcM4M&_r=1" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <Music2 className="h-5 w-5" />
                </Link>
              </div>

              {/* Instagram Handle */}
              <div className="space-y-2">
                <Link 
                  href="https://www.instagram.com/vip_ramka.md/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <Instagram className="h-4 w-4" />
                  <span>@vip_ramka.md</span>
                </Link>
                <Link 
                  href="https://www.tiktok.com/@vip_ramka.md?_t=ZM-8yxHvwbcM4M&_r=1" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <Music2 className="h-4 w-4" />
                  <span>@vip_ramka.md</span>
                </Link>
              </div>

              {/* Quality Badge */}
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-foreground">Премиум качество</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Более 1000+ довольных клиентов
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <p>&copy; {currentYear} <span className="font-semibold">S.R.L. DUNCAS WORKS</span> - VIP-RAMKA.MD. Все права защищены.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors cursor-pointer">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors cursor-pointer">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
