import { createSlice } from "@reduxjs/toolkit";

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState: {
    psychologists: [],
    page: 2,
  },
  reducers: {
    handleLoadMore: (state) => {
      state.page += 3;
    },
    setPsychologists(state, { payload }) {
      state.page !== 2
        ? (state.psychologists = [...state.psychologists, ...payload])
        : (state.psychologists = payload);
    },
  },
});

export const { setPsychologists, handleLoadMore } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
