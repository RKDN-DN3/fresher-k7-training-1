import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      title: 'Javascript',
      des: 'To day learning Javascript',
      endTime: '22/2/2022'
    }
  ]
};

export const reduxSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateData: (state, action) => {
      const object = action.payload
      state.data.push(object)
    }
  }
});

export const { updateData } = reduxSlice.actions;


export const selectDataRedux = state => {
  return state.todo.data;
}

export default reduxSlice.reducer;