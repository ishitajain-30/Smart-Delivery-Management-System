import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Assignment, AssignmentMetrics } from "@/types"

interface AssignmentsState {
  activeAssignments: Assignment[]
  metrics: AssignmentMetrics
  partners: {
    available: number
    busy: number
    offline: number
  }
  loading: boolean
  error: string | null
}

const initialState: AssignmentsState = {
  activeAssignments: [],
  metrics: {
    totalAssigned: 0,
    successRate: 0,
    averageTime: 0,
    failureReasons: [],
  },
  partners: {
    available: 0,
    busy: 0,
    offline: 0,
  },
  loading: false,
  error: null,
}

export const fetchAssignments = createAsyncThunk("assignments/fetchAssignments", async () => {
  const response = await fetch("/api/assignments")
  if (!response.ok) {
    throw new Error("Failed to fetch assignments")
  }
  return response.json()
})

export const fetchAssignmentMetrics = createAsyncThunk("assignments/fetchMetrics", async () => {
  const response = await fetch("/api/assignments/metrics")
  if (!response.ok) {
    throw new Error("Failed to fetch assignment metrics")
  }
  return response.json()
})

export const runAssignmentAlgorithm = createAsyncThunk("assignments/run", async () => {
  const response = await fetch("/api/assignments/run", {
    method: "POST",
  })
  if (!response.ok) {
    throw new Error("Failed to run assignment algorithm")
  }
  return response.json()
})

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchAssignments.fulfilled,
        (
          state,
          action: PayloadAction<{
            activeAssignments: Assignment[]
            partners: AssignmentsState["partners"]
          }>,
        ) => {
          state.loading = false
          state.activeAssignments = action.payload.activeAssignments
          state.partners = action.payload.partners
        },
      )
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch assignments"
      })
      .addCase(fetchAssignmentMetrics.fulfilled, (state, action: PayloadAction<AssignmentMetrics>) => {
        state.metrics = action.payload
      })
      .addCase(
        runAssignmentAlgorithm.fulfilled,
        (
          state,
          action: PayloadAction<{
            activeAssignments: Assignment[]
            metrics: AssignmentMetrics
          }>,
        ) => {
          state.activeAssignments = action.payload.activeAssignments
          state.metrics = action.payload.metrics
        },
      )
  },
})

export default assignmentsSlice.reducer
