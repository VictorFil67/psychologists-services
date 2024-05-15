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
      state.page = 0;
    },
    // setInitialState(state) {
    //   state.psychologists = [];
    //   state.sorted = [];
    //   state.page = 0;
    // },
    setCurrentState(state, { payload }) {
      state.psychologists = payload.psychologists;
      state.sorted = payload.sorted;
      state.page = payload.page;
    },
  },
});

export const {
  setPsychologists,
  handleLoadMore,
  setSorted,
  // setInitialState,
  setCurrentState,
} = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
