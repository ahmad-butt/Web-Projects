import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    password: "",
    description: "",
  },
  reducers: {
    logout: (state, action) => {
      state.username = null;
      state.email = null;
      state.password = null;
    },
    login: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    updateDescription: (state, action) => {
      state.description = action.payload.description;
    },
  },
});
export const { logout, login, updateDescription } = userSlice.actions;
export const userReducer = userSlice.reducer;
