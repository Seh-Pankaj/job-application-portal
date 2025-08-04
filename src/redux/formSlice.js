import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  email: "",
  phone: "",
  experience: 0,
  skills: [],
  coverLetter: null,
  startDate: null,
  id: null,
  title: "",
  summary: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormValues: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    resetFormValues: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { updateFormValues, resetFormValues } = formSlice.actions;
export default formSlice.reducer;
