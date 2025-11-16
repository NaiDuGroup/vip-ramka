"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, Eye } from "lucide-react"

interface Notification {
  id: string
  type: "new-order" | "urgent" | "payment" | "review"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  orderId?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "new-order",
    title: "Новый заказ",
    message: "Александр Попов разместил заказ на VIP Custom Logo",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
    orderId: "VIP-1703123456",
  },
  {
    id: "2",
    type: "urgent",
    title: "Срочный заказ",
    message: "Дмитрий Волков просит выполнить заказ до пятницы",
    timestamp: "2024-01-15T09:15:00Z",
    isRead: false,
    orderId: "VIP-1703123458",
  },
  {
    id: "3",
    type: "payment",
    title: "Оплата получена",
    message: "Мария Ионеску оплатила заказ VIP Elegant Silver",
    timestamp: "2024-01-14T15:45:00Z",
    isRead: true,
    orderId: "VIP-1703123457",
  },
  {
    id: "4",
    type: "review",
    title: "Новый отзыв",
    message: "Елена Петрова оставила 5-звездочный отзыв",
    timestamp: "2024-01-14T12:20:00Z",
    isRead: true,
  },
]

const notificationIcons = {
  "new-order": Bell,
  urgent: Bell,
  payment: Bell,
  review: Bell,
}

const notificationColors = {
  "new-order": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  payment: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  review: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} мин назад`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} ч назад`
    } else {
      return `${Math.floor(diffInMinutes / 1440)} дн назад`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Уведомления
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))}
          >
            Отметить все как прочитанные
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Нет новых уведомлений</p>
          ) : (
            notifications.map((notification) => {
              const Icon = notificationIcons[notification.type]
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    notification.isRead ? "bg-muted/30" : "bg-card border-primary/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-full ${notificationColors[notification.type]}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{formatTime(notification.timestamp)}</span>
                          {notification.orderId && (
                            <Badge variant="outline" className="text-xs">
                              {notification.orderId}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {!notification.isRead && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => removeNotification(notification.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
