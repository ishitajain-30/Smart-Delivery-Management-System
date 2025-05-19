import type { Order, DeliveryPartner, Assignment } from "@/types"

/**
 * Smart assignment algorithm to match orders with delivery partners
 *
 * This algorithm takes into account:
 * 1. Partner availability (status and current load)
 * 2. Area coverage
 * 3. Partner shift times
 * 4. Partner performance metrics
 *
 * @param orders Pending orders to be assigned
 * @param partners Available delivery partners
 * @returns Array of assignments (order-partner pairs)
 */
export function assignOrders(orders: Order[], partners: DeliveryPartner[]): Assignment[] {
  const assignments: Assignment[] = []
  const pendingOrders = orders.filter((order) => order.status === "pending")

  // Sort partners by rating (highest first) and load (lowest first)
  const availablePartners = partners
    .filter((partner) => partner.status === "active" && partner.currentLoad < 3)
    .sort((a, b) => {
      // First sort by load (ascending)
      if (a.currentLoad !== b.currentLoad) {
        return a.currentLoad - b.currentLoad
      }
      // Then by rating (descending)
      return b.metrics.rating - a.metrics.rating
    })

  // For each pending order, find the best partner
  for (const order of pendingOrders) {
    // Find partners that cover the order's area
    const eligiblePartners = availablePartners.filter((partner) => partner.areas.includes(order.area))

    if (eligiblePartners.length === 0) {
      // No eligible partner found
      assignments.push({
        orderId: order._id,
        partnerId: "",
        timestamp: new Date(),
        status: "failed",
        reason: "No eligible partner available",
      })
      continue
    }

    // Check if the order's scheduled time is within the partner's shift
    const orderTime = parseTime(order.scheduledFor)

    const availableForTime = eligiblePartners.filter((partner) => {
      const shiftStart = parseTime(partner.shift.start)
      const shiftEnd = parseTime(partner.shift.end)

      return orderTime >= shiftStart && orderTime <= shiftEnd
    })

    if (availableForTime.length === 0) {
      // No partner available at the scheduled time
      assignments.push({
        orderId: order._id,
        partnerId: "",
        timestamp: new Date(),
        status: "failed",
        reason: "No partner available at scheduled time",
      })
      continue
    }

    // Assign to the first available partner (already sorted by load and rating)
    const assignedPartner = availableForTime[0]

    assignments.push({
      orderId: order._id,
      partnerId: assignedPartner._id!,
      timestamp: new Date(),
      status: "success",
    })

    // Update the partner's load
    assignedPartner.currentLoad += 1
  }

  return assignments
}

/**
 * Helper function to parse time string (HH:mm) to minutes since midnight
 */
function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number)
  return hours * 60 + minutes
}
