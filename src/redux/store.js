import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./applicationSlice";
import formReducer from "./formSlice";

const store = configureStore({
  reducer: {
    applications: applicationReducer,
    formValues: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
