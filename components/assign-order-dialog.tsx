"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"
import type { Order, DeliveryPartner } from "@/types"

interface AssignOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
  partners: DeliveryPartner[]
  onAssign: (orderId: string, partnerId: string) => void
}

export function AssignOrderDialog({ open, onOpenChange, order, partners, onAssign }: AssignOrderDialogProps) {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>("")

  if (!order) return null

  const handleAssign = () => {
    if (selectedPartnerId && order._id) {
      onAssign(order._id, selectedPartnerId)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Order #{order.orderNumber}</DialogTitle>
          <DialogDescription>Select a delivery partner to assign this order</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 p-3 border rounded-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Order Details</h3>
                <p className="text-sm text-muted-foreground">Customer: {order.customer.name}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {order.area}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">Scheduled for: {order.scheduledFor}</p>
                <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {partners.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No available partners for this order</div>
          ) : (
            <RadioGroup value={selectedPartnerId} onValueChange={setSelectedPartnerId}>
              <div className="space-y-2">
                {partners.map((partner) => (
                  <div
                    key={partner._id}
                    className={`flex items-center space-x-2 border rounded-md p-3 ${
                      selectedPartnerId === partner._id ? "border-primary" : ""
                    }`}
                  >
                    <RadioGroupItem value={partner._id || ""} id={partner._id} />
                    <Label htmlFor={partner._id} className="flex-1 flex items-center justify-between cursor-pointer">
                      <div>
                        <div className="font-medium">{partner.name}</div>
                        <div className="text-sm text-muted-foreground">{partner.phone}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {partner.areas.map((area, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{partner.metrics.rating.toFixed(1)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Load: {partner.currentLoad}/3</div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedPartnerId}>
            Assign Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
