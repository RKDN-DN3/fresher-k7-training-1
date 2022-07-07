import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./todoSlice";
export const store = configureStore({
  reducer: {
    todo: userReducer
  },
})