import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Order } from "@/types"

interface OrdersState {
  orders: Order[]
  filters: {
    status: string[]
    areas: string[]
    date: string
  }
  loading: boolean
  error: string | null
}

const initialState: OrdersState = {
  orders: [],
  filters: {
    status: [],
    areas: [],
    date: new Date().toISOString().split("T")[0],
  },
  loading: false,
  error: null,
}

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (filters?: OrdersState["filters"]) => {
  const queryParams = new URLSearchParams()

  if (filters) {
    if (filters.status.length) {
      queryParams.append("status", filters.status.join(","))
    }
    if (filters.areas.length) {
      queryParams.append("areas", filters.areas.join(","))
    }
    if (filters.date) {
      queryParams.append("date", filters.date)
    }
  }

  const url = `/api/orders${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }

  return response.json()
})

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }: { id: string; status: Order["status"] }) => {
    const response = await fetch(`/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      throw new Error("Failed to update order status")
    }

    return response.json()
  },
)

export const assignOrder = createAsyncThunk(
  "orders/assign",
  async ({ orderId, partnerId }: { orderId: string; partnerId: string }) => {
    const response = await fetch(`/api/orders/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, partnerId }),
    })

    if (!response.ok) {
      throw new Error("Failed to assign order")
    }

    return response.json()
  },
)

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<OrdersState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<{ orders: Order[]; filters: OrdersState["filters"] }>) => {
          state.loading = false
          state.orders = action.payload.orders
          state.filters = action.payload.filters
        },
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch orders"
      })
      .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
        const index = state.orders.findIndex((o) => o._id === action.payload._id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
      })
      .addCase(assignOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        const index = state.orders.findIndex((o) => o._id === action.payload._id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
      })
  },
})

export const { setFilters } = ordersSlice.actions
export default ordersSlice.reducer
