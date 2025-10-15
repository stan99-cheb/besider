import { createSelector } from "@reduxjs/toolkit";
import { formatDateKey, formatDisplayDate } from "../utils/utils";
import { postSelectors } from "./slices/postsSlice";
import type { RootState } from "./store.types";

const postsGroupedByDate = createSelector(
  postSelectors.selectAll,
  (posts) => {
    const acc: Record<string, { title: string; posts: typeof posts }> = {};
    for (const post of posts) {
      const dateKey = formatDateKey(post.date);
      acc[dateKey] ??= { title: dateKey, posts: [] };
      acc[dateKey].posts.push({ ...post, date: formatDisplayDate(post.date) });
    }
    return Object.values(acc);
  }
);

const makePostsGroupedByDesk = (desk: string) =>
  createSelector(
    postsGroupedByDate,
    (groups) =>
      groups
        .map(group => ({
          ...group,
          posts: group.posts.filter(post => post.desk === desk)
        }))
        .filter(group => group.posts.length > 0)
  );

export const selectors = {
  posts: {
    postAll: (state: RootState) => postSelectors.selectAll(state),
    postSelectedById: (id: Post['id']) => (state: RootState) => postSelectors.selectById(state, id),
  },
  postsUI: {
    isLoading: (state: RootState) => state.postsUI.isLoading,
    error: (state: RootState) => state.postsUI.error,
    postsGroupedByDate,
    businessPostsGroupedByDate: makePostsGroupedByDesk("Business"),
    foreignPostsGroupedByDate: makePostsGroupedByDesk("Foreign"),
    sciencePostsGroupedByDate: makePostsGroupedByDesk("Science"),
  },
};