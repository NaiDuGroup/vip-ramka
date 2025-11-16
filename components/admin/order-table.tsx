"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Phone, Mail, Filter, Download } from "lucide-react"

interface Order {
  id: string
  orderId: string
  customerName: string
  phoneNumber: string
  email?: string
  productName: string
  price: string
  status: "new" | "confirmed" | "in-progress" | "completed" | "cancelled"
  timestamp: string
  notes?: string
  customConfiguration?: {
    frameColor: string
    frameStyle: string
    logoSize: number
    customText: string
  }
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderId: "VIP-1703123456",
    customerName: "Александр Попов",
    phoneNumber: "+373 69 123 456",
    email: "alex@example.com",
    productName: "VIP Custom Logo",
    price: "750 лей",
    status: "new",
    timestamp: "2024-01-15T10:30:00Z",
    notes: "Нужен логотип компании на рамке",
    customConfiguration: {
      frameColor: "#000000",
      frameStyle: "premium",
      logoSize: 80,
      customText: "BUSINESS ELITE",
    },
  },
  {
    id: "2",
    orderId: "VIP-1703123457",
    customerName: "Мария Ионеску",
    phoneNumber: "+373 68 987 654",
    productName: "VIP Elegant Silver",
    price: "680 лей",
    status: "confirmed",
    timestamp: "2024-01-14T15:45:00Z",
  },
  {
    id: "3",
    orderId: "VIP-1703123458",
    customerName: "Дмитрий Волков",
    phoneNumber: "+373 67 555 777",
    email: "dmitry@cars.md",
    productName: "VIP Carbon Fiber",
    price: "950 лей",
    status: "in-progress",
    timestamp: "2024-01-13T09:15:00Z",
    notes: "Срочный заказ, нужно до пятницы",
  },
  {
    id: "4",
    orderId: "VIP-1703123459",
    customerName: "Елена Петрова",
    phoneNumber: "+373 69 444 888",
    productName: "VIP Business Gold",
    price: "890 лей",
    status: "completed",
    timestamp: "2024-01-12T14:20:00Z",
  },
  {
    id: "5",
    orderId: "VIP-1703123460",
    customerName: "Андрей Сидоров",
    phoneNumber: "+373 68 333 999",
    productName: "VIP Sport Red",
    price: "520 лей",
    status: "cancelled",
    timestamp: "2024-01-11T11:00:00Z",
    notes: "Клиент передумал",
  },
]

const statusColors = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  confirmed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  completed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

const statusLabels = {
  new: "Новый",
  confirmed: "Подтвержден",
  "in-progress": "В работе",
  completed: "Завершен",
  cancelled: "Отменен",
}

export function OrderTable() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phoneNumber.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("ru-RU", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Фильтры и поиск</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск по имени, номеру заказа или телефону..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
                <SelectItem value="confirmed">Подтвержденные</SelectItem>
                <SelectItem value="in-progress">В работе</SelectItem>
                <SelectItem value="completed">Завершенные</SelectItem>
                <SelectItem value="cancelled">Отмененные</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/50">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Заказы ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Номер заказа</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Контакты</TableHead>
                  <TableHead>Товар</TableHead>
                  <TableHead>Цена</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">{order.orderId}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        {order.notes && <div className="text-xs text-muted-foreground mt-1">{order.notes}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {order.phoneNumber}
                        </div>
                        {order.email && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {order.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.productName}</div>
                        {order.customConfiguration && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Персонализированная ({order.customConfiguration.frameStyle})
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{order.price}</TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value: Order["status"]) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <Badge className={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Новый</SelectItem>
                          <SelectItem value="confirmed">Подтвержден</SelectItem>
                          <SelectItem value="in-progress">В работе</SelectItem>
                          <SelectItem value="completed">Завершен</SelectItem>
                          <SelectItem value="cancelled">Отменен</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(order.timestamp)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)} className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Заказы не найдены</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Card className="fixed inset-4 z-50 max-w-2xl mx-auto bg-background border shadow-2xl">
          <CardHeader>
            <CardTitle>Детали заказа {selectedOrder.orderId}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)} className="absolute top-4 right-4">
              ✕
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Информация о клиенте</h4>
                <p>Имя: {selectedOrder.customerName}</p>
                <p>Телефон: {selectedOrder.phoneNumber}</p>
                {selectedOrder.email && <p>Email: {selectedOrder.email}</p>}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Информация о заказе</h4>
                <p>Товар: {selectedOrder.productName}</p>
                <p>Цена: {selectedOrder.price}</p>
                <p>Статус: {statusLabels[selectedOrder.status]}</p>
                <p>Дата: {formatDate(selectedOrder.timestamp)}</p>
              </div>
            </div>

            {selectedOrder.customConfiguration && (
              <div>
                <h4 className="font-semibold mb-2">Персонализация</h4>
                <div className="bg-muted p-3 rounded">
                  <p>Стиль: {selectedOrder.customConfiguration.frameStyle}</p>
                  <p>Цвет: {selectedOrder.customConfiguration.frameColor}</p>
                  <p>Размер логотипа: {selectedOrder.customConfiguration.logoSize}px</p>
                  {selectedOrder.customConfiguration.customText && (
                    <p>Текст: "{selectedOrder.customConfiguration.customText}"</p>
                  )}
                </div>
              </div>
            )}

            {selectedOrder.notes && (
              <div>
                <h4 className="font-semibold mb-2">Примечания</h4>
                <p className="text-muted-foreground">{selectedOrder.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {selectedOrder && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedOrder(null)} />}
    </div>
  )
}
