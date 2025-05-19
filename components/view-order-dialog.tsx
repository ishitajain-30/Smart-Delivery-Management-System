"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Package, User } from "lucide-react"
import type { Order } from "@/types"

interface ViewOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
  onUpdateStatus: (orderId: string, status: Order["status"]) => void
}

export function ViewOrderDialog({ open, onOpenChange, order, onUpdateStatus }: ViewOrderDialogProps) {
  if (!order) return null

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "assigned":
        return "bg-blue-100 text-blue-800"
      case "picked":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getNextStatus = (currentStatus: Order["status"]): Order["status"] | null => {
    switch (currentStatus) {
      case "pending":
        return "assigned"
      case "assigned":
        return "picked"
      case "picked":
        return "delivered"
      default:
        return null
    }
  }

  const nextStatus = getNextStatus(order.status)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order #{order.orderNumber}</DialogTitle>
          <DialogDescription>Order details and status management</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">Status</h3>
              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Created at</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Customer Information</h3>
            <div className="flex items-start gap-3 p-3 border rounded-md">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">{order.customer.name}</div>
                <div className="text-sm text-muted-foreground">{order.customer.phone}</div>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{order.customer.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Order Items</h3>
              <div className="text-sm">
                Scheduled for: <span className="font-medium">{order.scheduledFor}</span>
              </div>
            </div>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <div className="bg-muted p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-xl font-bold">${order.totalAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {order.assignedTo && (
            <div className="space-y-4">
              <h3 className="font-medium">Assigned Partner</h3>
              <div className="p-3 border rounded-md">
                <div className="font-medium">Partner ID: {order.assignedTo}</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {nextStatus && (
            <Button onClick={() => onUpdateStatus(order._id, nextStatus)}>
              Mark as {nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
