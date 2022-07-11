import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: 0,
      title: 'Javascript',
      des: 'To day learning Javascript',
      endTime: '22/2/2022',
      status: 0
    },
    {
      id: 2,
      title: 'React',
      des: 'create project with React',
      endTime: '22/2/2022',
      status: 0
    },
    {
      id: 3,
      title: 'Typescript',
      des: 'Report on what was learned last week',
      endTime: '22/2/2022',
      status: 0
    }
  ]
};

export const reduxSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getAllItemRedux: async (state, action) => {
      state.data = action.payload
    },
    updateData: (state, action) => {
      if (action.payload.type && action.payload.type === "edit") {
        const data = current(state.data).filter((item) => item.id === action.payload.data.id)
        const index = current(state.data).indexOf(data[0])
        state.data[index] = action.payload.data
      } else {
        const object = action.payload
        object.id = Math.random()
        object.status = 0
        state.data.push(object)
      }

    },
    deleteItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id)
    },
    checkItem: (state, action) => {
      state.data.forEach((item) => {
        if (item.id === action.payload.id) {
          if (item.status === 1) {
            item.status = 0
          } else {
            item.status = 1
          }
        }
      })
    },
    removeTask: (state, action) => {
      state.data.forEach((item, i) => {
        if (item.id === action.payload.id) {
          item.status = 2
        }
      })
    }
  }
});

export const { getAllItemRedux } = reduxSlice.actions;
export const { updateData } = reduxSlice.actions;
export const { deleteItem } = reduxSlice.actions;
export const { checkItem } = reduxSlice.actions;
export const { removeTask } = reduxSlice.actions;

export const selectDataRedux = state => {
  return state.todo.data;
}

export default reduxSlice.reducer;