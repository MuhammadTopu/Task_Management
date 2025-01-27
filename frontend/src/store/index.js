import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.js";

const store = configureStore({
  reducer: {
    auth: authReducer, // Add authReducer inside the reducer object with a key for the slice name
  },
});

export default store;
