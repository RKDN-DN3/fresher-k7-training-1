import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: 0,
      title: 'Javascript',
      des: 'To day learning Javascript',
      endTime: '22/2/2022'
    },
    {
      id: 1,
      title: 'Redux',
      des: 'To day learning Javascript',
      endTime: '22/2/2022'
    },
    {
      id: 2,
      title: 'React',
      des: 'To day learning Javascript',
      endTime: '22/2/2022'
    },
    {
      id: 3,
      title: 'Typescript',
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
    },
    deleteItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id)
    }
  }
});

export const { updateData } = reduxSlice.actions;
export const { deleteItem } = reduxSlice.actions;

export const selectDataRedux = state => {
  return state.todo.data;
}

export default reduxSlice.reducer;