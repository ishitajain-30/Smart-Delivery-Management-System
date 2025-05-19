"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Mail, MapPin, Phone, Star, Truck, XCircle } from "lucide-react"
import type { DeliveryPartner } from "@/types"

interface ViewPartnerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  partner: DeliveryPartner | null
}

export function ViewPartnerDialog({ open, onOpenChange, partner }: ViewPartnerDialogProps) {
  if (!partner) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Partner Details</DialogTitle>
          <DialogDescription>View detailed information about this delivery partner</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{partner.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={partner.status === "active" ? "default" : "secondary"}>
                  {partner.status === "active" ? (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  ) : (
                    <XCircle className="mr-1 h-3 w-3" />
                  )}
                  {partner.status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="text-lg font-bold">{partner.metrics.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 border rounded-md">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{partner.email}</span>
              </div>
              <div className="flex items-center gap-2 p-3 border rounded-md">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{partner.phone}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Service Areas</h3>
            <div className="flex flex-wrap gap-2">
              {partner.areas.map((area, index) => (
                <div key={index} className="flex items-center gap-1 p-2 border rounded-md">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Shift Schedule</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-3 border rounded-md">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Start</div>
                  <div className="font-medium">{partner.shift.start}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 border rounded-md">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">End</div>
                  <div className="font-medium">{partner.shift.end}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 border rounded-md">
                <Star className="h-5 w-5 text-yellow-500 mb-1" />
                <div className="text-sm text-muted-foreground">Rating</div>
                <div className="font-bold text-lg">{partner.metrics.rating.toFixed(1)}</div>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-md">
                <CheckCircle2 className="h-5 w-5 text-green-500 mb-1" />
                <div className="text-sm text-muted-foreground">Completed</div>
                <div className="font-bold text-lg">{partner.metrics.completedOrders}</div>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-md">
                <XCircle className="h-5 w-5 text-red-500 mb-1" />
                <div className="text-sm text-muted-foreground">Cancelled</div>
                <div className="font-bold text-lg">{partner.metrics.cancelledOrders}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Current Status</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-3 border rounded-md">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Current Load</div>
                  <div className="font-medium">{partner.currentLoad}/3</div>
                </div>
              </div>
              <div className="flex-1 p-3 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Load Capacity</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${(partner.currentLoad / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
