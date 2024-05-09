import { createSlice } from "@reduxjs/toolkit";

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState: {
    psychologists: [],
  },
  reducers: {
    setPsychologists(state, { payload }) {
      state.psychologists = payload;
    },
  },
});

export const { setPsychologists } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
