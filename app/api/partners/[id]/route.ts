import { NextResponse } from "next/server"
import type { DeliveryPartner } from "@/types"

// This would normally be imported from a shared data source
const partners: DeliveryPartner[] = [
  {
    _id: "p1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    status: "active",
    currentLoad: 2,
    areas: ["Downtown", "Midtown"],
    shift: {
      start: "09:00",
      end: "17:00",
    },
    metrics: {
      rating: 4.8,
      completedOrders: 156,
      cancelledOrders: 3,
    },
  },
  {
    _id: "p2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    status: "active",
    currentLoad: 1,
    areas: ["Uptown", "Westside"],
    shift: {
      start: "10:00",
      end: "18:00",
    },
    metrics: {
      rating: 4.9,
      completedOrders: 203,
      cancelledOrders: 1,
    },
  },
  {
    _id: "p3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1122334455",
    status: "inactive",
    currentLoad: 0,
    areas: ["Eastside", "Southside"],
    shift: {
      start: "08:00",
      end: "16:00",
    },
    metrics: {
      rating: 4.5,
      completedOrders: 87,
      cancelledOrders: 5,
    },
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const partner = partners.find((p) => p._id === params.id)

  if (!partner) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 })
  }

  return NextResponse.json(partner)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedPartner: DeliveryPartner = await request.json()
  const index = partners.findIndex((p) => p._id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 })
  }

  // Ensure the ID doesn't change
  updatedPartner._id = params.id
  partners[index] = updatedPartner

  return NextResponse.json(updatedPartner)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = partners.findIndex((p) => p._id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 })
  }

  partners.splice(index, 1)

  return NextResponse.json({ success: true })
}
