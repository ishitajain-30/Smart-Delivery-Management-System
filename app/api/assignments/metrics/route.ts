import { NextResponse } from "next/server"
import type { AssignmentMetrics } from "@/types"

// Mock metrics data
const metrics: AssignmentMetrics = {
  totalAssigned: 156,
  successRate: 92,
  averageTime: 3.5,
  failureReasons: [
    {
      reason: "Partner unavailable",
      count: 8,
    },
    {
      reason: "Area not covered",
      count: 3,
    },
    {
      reason: "Load capacity exceeded",
      count: 2,
    },
  ],
}

export async function GET() {
  return NextResponse.json(metrics)
}
