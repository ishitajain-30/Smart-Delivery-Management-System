import { NextResponse } from "next/server"
import type { Assignment } from "@/types"

// Mock data for assignments
const activeAssignments: Assignment[] = [
  {
    orderId: "o2",
    partnerId: "p1",
    timestamp: new Date("2023-05-15T11:30:00"),
    status: "success",
  },
  {
    orderId: "o3",
    partnerId: "p2",
    timestamp: new Date("2023-05-15T10:15:00"),
    status: "success",
  },
  {
    orderId: "o5",
    partnerId: "p3",
    timestamp: new Date("2023-05-15T14:45:00"),
    status: "failed",
    reason: "Partner unavailable",
  },
  {
    orderId: "o6",
    partnerId: "p1",
    timestamp: new Date("2023-05-15T15:30:00"),
    status: "success",
  },
  {
    orderId: "o7",
    partnerId: "p4",
    timestamp: new Date("2023-05-15T16:15:00"),
    status: "failed",
    reason: "Area not covered",
  },
]

export async function GET() {
  // Mock partner availability data
  const partners = {
    available: 5,
    busy: 8,
    offline: 3,
  }

  return NextResponse.json({
    activeAssignments,
    partners,
  })
}

export async function POST(request: Request) {
  const { orderId, partnerId } = await request.json()

  // Create a new assignment
  const newAssignment: Assignment = {
    orderId,
    partnerId,
    timestamp: new Date(),
    status: "success",
  }

  // Add to active assignments
  activeAssignments.push(newAssignment)

  return NextResponse.json(newAssignment, { status: 201 })
}
