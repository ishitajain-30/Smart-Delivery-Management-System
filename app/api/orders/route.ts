import { NextResponse } from "next/server"
import type { Order } from "@/types"

// Mock data for orders
const orders: Order[] = [
  {
    _id: "o1",
    orderNumber: "ORD-1001",
    customer: {
      name: "Alice Brown",
      phone: "+1234567890",
      address: "123 Main St, Anytown",
    },
    area: "Downtown",
    items: [
      {
        name: "Burger",
        quantity: 2,
        price: 12.99,
      },
      {
        name: "Fries",
        quantity: 1,
        price: 4.99,
      },
    ],
    status: "pending",
    scheduledFor: "14:30",
    totalAmount: 30.97,
    createdAt: new Date("2023-05-15T10:30:00"),
    updatedAt: new Date("2023-05-15T10:30:00"),
  },
  {
    _id: "o2",
    orderNumber: "ORD-1002",
    customer: {
      name: "Bob Wilson",
      phone: "+1987654321",
      address: "456 Oak St, Anytown",
    },
    area: "Uptown",
    items: [
      {
        name: "Pizza",
        quantity: 1,
        price: 18.99,
      },
      {
        name: "Soda",
        quantity: 2,
        price: 2.49,
      },
    ],
    status: "assigned",
    assignedTo: "p1",
    scheduledFor: "15:00",
    totalAmount: 23.97,
    createdAt: new Date("2023-05-15T11:15:00"),
    updatedAt: new Date("2023-05-15T11:30:00"),
  },
  {
    _id: "o3",
    orderNumber: "ORD-1003",
    customer: {
      name: "Charlie Davis",
      phone: "+1122334455",
      address: "789 Pine St, Anytown",
    },
    area: "Midtown",
    items: [
      {
        name: "Salad",
        quantity: 1,
        price: 9.99,
      },
      {
        name: "Sandwich",
        quantity: 1,
        price: 11.49,
      },
    ],
    status: "picked",
    assignedTo: "p2",
    scheduledFor: "13:45",
    totalAmount: 21.48,
    createdAt: new Date("2023-05-15T09:45:00"),
    updatedAt: new Date("2023-05-15T10:15:00"),
  },
  {
    _id: "o4",
    orderNumber: "ORD-1004",
    customer: {
      name: "Diana Evans",
      phone: "+1567891234",
      address: "321 Elm St, Anytown",
    },
    area: "Westside",
    items: [
      {
        name: "Pasta",
        quantity: 2,
        price: 14.99,
      },
      {
        name: "Garlic Bread",
        quantity: 1,
        price: 3.99,
      },
    ],
    status: "delivered",
    assignedTo: "p1",
    scheduledFor: "12:30",
    totalAmount: 33.97,
    createdAt: new Date("2023-05-15T08:30:00"),
    updatedAt: new Date("2023-05-15T12:45:00"),
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Parse filters
  const statusFilter = searchParams.get("status")?.split(",") || []
  const areasFilter = searchParams.get("areas")?.split(",") || []
  const dateFilter = searchParams.get("date") || ""

  // Apply filters
  let filteredOrders = [...orders]

  if (statusFilter.length > 0) {
    filteredOrders = filteredOrders.filter((order) => statusFilter.includes(order.status))
  }

  if (areasFilter.length > 0) {
    filteredOrders = filteredOrders.filter((order) => areasFilter.includes(order.area))
  }

  if (dateFilter) {
    const filterDate = new Date(dateFilter)
    filteredOrders = filteredOrders.filter((order) => {
      const orderDate = new Date(order.createdAt)
      return orderDate.toDateString() === filterDate.toDateString()
    })
  }

  return NextResponse.json({
    orders: filteredOrders,
    filters: {
      status: statusFilter,
      areas: areasFilter,
      date: dateFilter,
    },
  })
}
