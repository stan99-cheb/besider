import { createAppAsyncThunk } from "../hooks";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getArchive } from "../../api/api";
import type { RootState } from "../store.types";

const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

const postAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
});

const initialState = postAdapter.getInitialState();

export const fetchPosts = createAppAsyncThunk(
  "posts/getPosts",
  async (date: { year: number; month: number }, thunkAPI) => {
    try {
      const data = await getArchive<Data>(date);
      return data.response.docs.map(
        (item) => ({
          id: UUID.exec(item._id)?.[0] ?? item._id,
          title: item.abstract,
          link: item.web_url,
          image: 'https://www.nytimes.com/' + item.multimedia[3]?.url,
          date: item.pub_date,
          source: item.source,
          desk: item.news_desk,
        })
      ) as Post[];
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPosts: (state) =>
      postAdapter.removeAll(state),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) =>
        postAdapter.addMany(state, action));
  },
});

export const postSelectors = postAdapter.getSelectors<RootState>((state) => state.posts);
export const postsActions = postsSlice.actions;
export default postsSlice.reducer;