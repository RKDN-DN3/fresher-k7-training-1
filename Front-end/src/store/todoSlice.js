import { createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: {
    isLogin: false
  }
};

export const reduxSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getAllItemRedux: async (state, action) => {
      state.user = action.payload
    }
  }
});

export const { getAllItemRedux } = reduxSlice.actions;

export const selectDataRedux = state => {
  return state.todo.data;
}

export default reduxSlice.reducer;