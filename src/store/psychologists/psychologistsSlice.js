import { createSlice } from "@reduxjs/toolkit";

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState: {
    psychologists: [],
    sorted: [],
    page: 0,
    favorites: [],
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
    setCurrentState(state, { payload }) {
      state.psychologists = payload.psychologists;
      state.sorted = payload.sorted;
      state.page = payload.page;
    },
    toggleHeart: (state, { payload }) => {
      const favorite = state.favorites.find((item) => item === payload);
      favorite
        ? state.favorites.splice(
            state.favorites.findIndex((item) => item === payload),
            1
          )
        : state.favorites.push(payload);
    },
    // setInitialState(state) {
    //   state.psychologists = [];
    //   state.sorted = [];
    //   state.page = 0;
    // },
  },
});

export const {
  setPsychologists,
  handleLoadMore,
  setSorted,
  // setInitialState,
  setCurrentState,
  toggleHeart,
} = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
