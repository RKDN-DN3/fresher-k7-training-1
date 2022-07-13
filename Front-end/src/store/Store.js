import { configureStore } from '@reduxjs/toolkit'
import reduxSlice from "./todoSlice";
export const store = configureStore({
  reducer: {
    todo: reduxSlice,
  },
})