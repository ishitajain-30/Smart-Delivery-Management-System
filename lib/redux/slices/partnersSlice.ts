import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { DeliveryPartner } from "@/types"

interface PartnersState {
  partners: DeliveryPartner[]
  metrics: {
    totalActive: number
    avgRating: number
    topAreas: string[]
  }
  loading: boolean
  error: string | null
}

const initialState: PartnersState = {
  partners: [],
  metrics: {
    totalActive: 0,
    avgRating: 0,
    topAreas: [],
  },
  loading: false,
  error: null,
}

export const fetchPartners = createAsyncThunk("partners/fetchPartners", async () => {
  const response = await fetch("/api/partners")
  if (!response.ok) {
    throw new Error("Failed to fetch partners")
  }
  return response.json()
})

export const addPartner = createAsyncThunk("partners/addPartner", async (partner: Omit<DeliveryPartner, "_id">) => {
  const response = await fetch("/api/partners", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partner),
  })
  if (!response.ok) {
    throw new Error("Failed to add partner")
  }
  return response.json()
})

export const updatePartner = createAsyncThunk("partners/updatePartner", async (partner: DeliveryPartner) => {
  const response = await fetch(`/api/partners/${partner._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partner),
  })
  if (!response.ok) {
    throw new Error("Failed to update partner")
  }
  return response.json()
})

export const deletePartner = createAsyncThunk("partners/deletePartner", async (id: string) => {
  const response = await fetch(`/api/partners/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete partner")
  }
  return id
})

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchPartners.fulfilled,
        (state, action: PayloadAction<{ partners: DeliveryPartner[]; metrics: PartnersState["metrics"] }>) => {
          state.loading = false
          state.partners = action.payload.partners
          state.metrics = action.payload.metrics
        },
      )
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch partners"
      })
      .addCase(addPartner.fulfilled, (state, action: PayloadAction<DeliveryPartner>) => {
        state.partners.push(action.payload)
      })
      .addCase(updatePartner.fulfilled, (state, action: PayloadAction<DeliveryPartner>) => {
        const index = state.partners.findIndex((p) => p._id === action.payload._id)
        if (index !== -1) {
          state.partners[index] = action.payload
        }
      })
      .addCase(deletePartner.fulfilled, (state, action: PayloadAction<string>) => {
        state.partners = state.partners.filter((p) => p._id !== action.payload)
      })
  },
})

export default partnersSlice.reducer
