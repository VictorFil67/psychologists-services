import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/authSlice";
import { psychologistsReducer } from "./psychologists/psychologistsSlice";

const persistConfig = {
  key: "favorites",
  version: 1,
  storage,
  // whitelist: ["favorites"],
};

const persistedReducer = persistReducer(persistConfig, psychologistsReducer);

export const store = configureStore({
  reducer: { auth: authReducer, psychologists: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
