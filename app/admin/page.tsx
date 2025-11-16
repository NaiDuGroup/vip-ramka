import { DashboardStats } from "@/components/admin/dashboard-stats"
import { OrderTable } from "@/components/admin/order-table"
import { Notifications } from "@/components/admin/notifications"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Панель администратора</h1>
          <p className="text-lg text-muted-foreground">Управление заказами VIP-RAMKA.MD</p>
        </div>

        <div className="space-y-8">
          {/* Statistics */}
          <DashboardStats />

          {/* Notifications and Orders */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1">
              <Notifications />
            </div>
            <div className="xl:col-span-2">
              <OrderTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
