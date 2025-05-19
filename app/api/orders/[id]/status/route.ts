import { NextResponse } from "next/server"
import type { Order } from "@/types"

// Mock data for orders (would normally be imported from a shared data source)
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
  // ... other orders
]

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { status } = await request.json()
  const index = orders.findIndex((o) => o._id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  // Update the order status
  orders[index].status = status
  orders[index].updatedAt = new Date()

  return NextResponse.json(orders[index])
}
