import { createSlice } from "@reduxjs/toolkit";

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState: {
    psychologists: [],
    sorted: [],
    page: 0,
  },
  reducers: {
    handleLoadMore: (state) => {
      state.page += 1;
    },
    setPsychologists(state, { payload }) {
      state.page !== 0
        ? (state.psychologists = [...state.psychologists, ...payload])
        : (state.psychologists = payload);
    },
    setSorted(state, { payload }) {
      state.sorted = payload;
      // state.page = 0;
      // state.psychologists = [];
    },
  },
});

export const { setPsychologists, handleLoadMore, setSorted } =
  psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
