import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "Guest"
};

export const reduxSlice = createSlice({
  name: "todo", 
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    }
  }
});

export const { updateUsername } = reduxSlice.actions;


export const selectDataRedux = state => {
  return state.todo.username;
}

export default reduxSlice.reducer;