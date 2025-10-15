import { combineSlices, configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import postsUISlice from "./slices/postsUISlice";

export const rootReducer = combineSlices({
  posts: postsReducer,
  postsUI: postsUISlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { warnAfter: 300 },
      immutableCheck: { warnAfter: 300 },
    }),
});

export default store;