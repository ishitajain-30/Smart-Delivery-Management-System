"use client";

import type React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/redux/store";
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
import { Textarea } from "@/components/ui/textarea";
import type { Order } from "@/types";

interface OrderFormProps {
  onClose: () => void;
}

export function OrderForm({ onClose }: OrderFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Partial<Order>>({
    customer: {
      name: "",
      phone: "",
      address: "",
    },
    area: "",
    items: [
      {
        name: "",
        quantity: 1,
        price: 0,
      },
    ],
    scheduledFor: "",
    status: "pending",
    totalAmount: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("customer.")) {
      const customerField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        customer: {
          ...prev.customer!,
          [customerField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAreaChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      area: value,
    }));
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => {
      const updatedItems = [...(prev.items || [])];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]:
          field === "quantity" || field === "price" ? Number(value) : value,
      };

      // Recalculate total amount
      const totalAmount = updatedItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      return {
        ...prev,
        items: updatedItems,
        totalAmount,
      };
    });
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...(prev.items || []),
        {
          name: "",
          quantity: 1,
          price: 0,
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev) => {
      const updatedItems = [...(prev.items || [])].filter(
        (_, i) => i !== index
      );

      // Recalculate total amount
      const totalAmount = updatedItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      return {
        ...prev,
        items: updatedItems,
        totalAmount,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, dispatch an action to create the order
    console.log("Creating order:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customer.name">Customer Name</Label>
            <Input
              id="customer.name"
              name="customer.name"
              value={formData.customer?.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer.phone">Phone Number</Label>
            <Input
              id="customer.phone"
              name="customer.phone"
              value={formData.customer?.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="customer.address">Address</Label>
          <Textarea
            id="customer.address"
            name="customer.address"
            value={formData.customer?.address}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Order Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="area">Delivery Area</Label>
            <Select value={formData.area} onValueChange={handleAreaChange}>
              <SelectTrigger id="area">
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Downtown">Downtown</SelectItem>
                <SelectItem value="Uptown">Uptown</SelectItem>
                <SelectItem value="Midtown">Midtown</SelectItem>
                <SelectItem value="Westside">Westside</SelectItem>
                <SelectItem value="Eastside">Eastside</SelectItem>
                <SelectItem value="Northside">Northside</SelectItem>
                <SelectItem value="Southside">Southside</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="scheduledFor">Scheduled For</Label>
            <Input
              id="scheduledFor"
              name="scheduledFor"
              type="time"
              value={formData.scheduledFor}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Order Items</h3>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            Add Item
          </Button>
        </div>
        {formData.items?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-2 items-end border p-3 rounded-md"
          >
            <div className="col-span-5 space-y-2">
              <Label htmlFor={`item-${index}-name`}>Item Name</Label>
              <Input
                id={`item-${index}-name`}
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
                required
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor={`item-${index}-quantity`}>Qty</Label>
              <Input
                id={`item-${index}-quantity`}
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                required
              />
            </div>
            <div className="col-span-3 space-y-2">
              <Label htmlFor={`item-${index}-price`}>Price</Label>
              <Input
                id={`item-${index}-price`}
                type="number"
                min="0"
                step="0.01"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", e.target.value)
                }
                required
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                disabled={formData.items?.length === 1}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <div className="bg-muted p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Total Amount</div>
            <div className="text-xl font-bold">
              ${formData.totalAmount?.toFixed(2) || "0.00"}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Order</Button>
      </div>
    </form>
  );
}
