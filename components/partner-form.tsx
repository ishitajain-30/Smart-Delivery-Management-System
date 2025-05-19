"use client";

import type React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/redux/store";
import { addPartner } from "@/lib/redux/slices/partnersSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { DeliveryPartner } from "@/types";

interface PartnerFormProps {
  onClose: () => void;
}

export function PartnerForm({ onClose }: PartnerFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Omit<DeliveryPartner, "_id">>({
    name: "",
    email: "",
    phone: "",
    status: "active",
    currentLoad: 0,
    areas: [],
    shift: {
      start: "09:00",
      end: "17:00",
    },
    metrics: {
      rating: 0,
      completedOrders: 0,
      cancelledOrders: 0,
    },
  });

  const [selectedAreas, setSelectedAreas] = useState<{
    [key: string]: boolean;
  }>({
    Downtown: false,
    Uptown: false,
    Midtown: false,
    Westside: false,
    Eastside: false,
    Northside: false,
    Southside: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShiftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      shift: {
        ...prev.shift,
        [name]: value,
      },
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      status: value as "active" | "inactive",
    }));
  };

  const handleAreaChange = (area: string, checked: boolean) => {
    setSelectedAreas((prev) => ({
      ...prev,
      [area]: checked,
    }));

    const updatedAreas = Object.entries(selectedAreas)
      .filter(([key, value]) => (key === area ? checked : value))
      .map(([key]) => key);

    setFormData((prev) => ({
      ...prev,
      areas: updatedAreas,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addPartner(formData));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
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
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
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
                onCheckedChange={(checked) =>
                  handleAreaChange(area, checked as boolean)
                }
              />
              <Label htmlFor={`area-${area}`} className="text-sm font-normal">
                {area}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Partner</Button>
      </div>
    </form>
  );
}
