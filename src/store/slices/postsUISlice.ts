import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsSlice";

interface InitialState {
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  isLoading: false,
  error: null,
};

export const postsUISlice = createSlice({
  name: "postsUI",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? "Какая-то херня произошла";
      });
  }
});

// export const {} = postsUISlice.actions;
export default postsUISlice.reducer;