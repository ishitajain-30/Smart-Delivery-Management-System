"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { DeliveryPartner } from "@/types"

interface EditPartnerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  partner: DeliveryPartner | null
  onUpdate: (partner: DeliveryPartner) => void
}

export function EditPartnerDialog({ open, onOpenChange, partner, onUpdate }: EditPartnerDialogProps) {
  const [formData, setFormData] = useState<DeliveryPartner | null>(null)
  const [selectedAreas, setSelectedAreas] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (partner) {
      setFormData({ ...partner })

      // Initialize selected areas
      const areasMap: { [key: string]: boolean } = {}
      const allAreas = ["Downtown", "Uptown", "Midtown", "Westside", "Eastside", "Northside", "Southside"]

      allAreas.forEach((area) => {
        areasMap[area] = partner.areas.includes(area)
      })

      setSelectedAreas(areasMap)
    }
  }, [partner])

  if (!formData) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev!,
      [name]: value,
    }))
  }

  const handleShiftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev!,
      shift: {
        ...prev!.shift,
        [name]: value,
      },
    }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({
      ...prev!,
      status: value as "active" | "inactive",
    }))
  }

  const handleAreaChange = (area: string, checked: boolean) => {
    setSelectedAreas((prev) => ({
      ...prev,
      [area]: checked,
    }))

    const updatedAreas = Object.entries({
      ...selectedAreas,
      [area]: checked,
    })
      .filter(([_, value]) => value)
      .map(([key]) => key)

    setFormData((prev) => ({
      ...prev!,
      areas: updatedAreas,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData) {
      onUpdate(formData)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Partner</DialogTitle>
          <DialogDescription>Update the delivery partner's information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shift-start">Shift Start</Label>
              <Input
                id="shift-start"
                name="start"
                type="time"
                value={formData.shift.start}
                onChange={handleShiftChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shift-end">Shift End</Label>
              <Input
                id="shift-end"
                name="end"
                type="time"
                value={formData.shift.end}
                onChange={handleShiftChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Service Areas</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.keys(selectedAreas).map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={`area-${area}`}
                    checked={selectedAreas[area]}
                    onCheckedChange={(checked) => handleAreaChange(area, checked as boolean)}
                  />
                  <Label htmlFor={`area-${area}`} className="text-sm font-normal">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Performance Metrics</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.metrics.rating}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev!,
                      metrics: {
                        ...prev!.metrics,
                        rating: Number.parseFloat(e.target.value),
                      },
                    }))
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="completed-orders">Completed Orders</Label>
                <Input
                  id="completed-orders"
                  type="number"
                  min="0"
                  value={formData.metrics.completedOrders}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev!,
                      metrics: {
                        ...prev!.metrics,
                        completedOrders: Number.parseInt(e.target.value),
                      },
                    }))
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cancelled-orders">Cancelled Orders</Label>
                <Input
                  id="cancelled-orders"
                  type="number"
                  min="0"
                  value={formData.metrics.cancelledOrders}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev!,
                      metrics: {
                        ...prev!.metrics,
                        cancelledOrders: Number.parseInt(e.target.value),
                      },
                    }))
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Partner</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
