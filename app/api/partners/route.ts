import { NextResponse } from "next/server"
import type { DeliveryPartner } from "@/types"

// Mock data for partners
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

export async function GET() {
  // Calculate metrics
  const totalActive = partners.filter((p) => p.status === "active").length
  const avgRating = partners.reduce((acc, p) => acc + p.metrics.rating, 0) / partners.length

  // Get top areas (count occurrences of each area)
  const areaCount: Record<string, number> = {}
  partners.forEach((p) => {
    p.areas.forEach((area) => {
      areaCount[area] = (areaCount[area] || 0) + 1
    })
  })

  // Sort areas by count and take top 3
  const topAreas = Object.entries(areaCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([area]) => area)

  return NextResponse.json({
    partners,
    metrics: {
      totalActive,
      avgRating,
      topAreas,
    },
  })
}

export async function POST(request: Request) {
  const partner: Omit<DeliveryPartner, "_id"> = await request.json()

  // Generate a new ID
  const newPartner: DeliveryPartner = {
    ...partner,
    _id: `p${partners.length + 1}`,
  }

  partners.push(newPartner)

  return NextResponse.json(newPartner, { status: 201 })
}
