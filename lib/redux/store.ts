import { configureStore } from "@reduxjs/toolkit"
import partnersReducer from "./slices/partnersSlice"
import ordersReducer from "./slices/ordersSlice"
import assignmentsReducer from "./slices/assignmentsSlice"

export const store = configureStore({
  reducer: {
    partners: partnersReducer,
    orders: ordersReducer,
    assignments: assignmentsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
