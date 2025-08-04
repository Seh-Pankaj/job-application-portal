import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    addApplication: (state, action) => {
      state.push(action.payload);
    },
    removeApplication: (state, action) => {
      state = state.filter((application) => application.id !== action.payload);
      return state;
    },
    updateApplication: (state, action) => {
      const idx = state.findIndex(
        (application) => application.id === action.payload.id
      );
      if (idx != -1) state[idx] = action.payload;
    },
  },
});

export const { addApplication, removeApplication, updateApplication } =
  applicationSlice.actions;
export default applicationSlice.reducer;
