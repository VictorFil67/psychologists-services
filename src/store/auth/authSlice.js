import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    token: "",
  },
  reducers: {
    setUser(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = "";
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
