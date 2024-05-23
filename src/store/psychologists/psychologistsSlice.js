import { createSlice } from "@reduxjs/toolkit";

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState: {
    psychologists: [],
    sorted: [],
    page: 0,
    favorites: [],
    favoritesPsychologists: [],
    favoritesShow: [],
    favoritesPage: 0,
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
    setFavorites: (state, { payload }) => {
      state.favoritesPsychologists = payload.filter((favoritesPsychologist) =>
        state.favorites.includes(favoritesPsychologist.avatar_url)
      );
      state.favoritesPage = 0;
    },
    setFavoritesShow(state, { payload }) {
      state.favoritesPage !== 0
        ? (state.favoritesShow = [...state.favoritesShow, ...payload])
        : (state.favoritesShow = payload);
    },
    favoritesHandleLoadMore: (state) => {
      state.favoritesPage += 1;
    },
    setFavoritesCurrentState(state, { payload }) {
      state.favoritesPsychologists = payload.favoritesPsychologists;
      state.favoritesShow = payload.favoritesShow;
      state.favoritesPage = payload.favoritesPage;
    },
  },
});

export const {
  setPsychologists,
  handleLoadMore,
  setSorted,
  setCurrentState,
  toggleHeart,
  setFavorites,
  setFavoritesShow,
  favoritesHandleLoadMore,
  setFavoritesCurrentState,
} = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
