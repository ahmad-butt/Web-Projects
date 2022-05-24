import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/Counter/counterReducer";
import { userReducer } from "../reducers/User/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
