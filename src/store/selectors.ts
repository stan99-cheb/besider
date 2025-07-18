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

const businessPostsGroupedByDate = createSelector(
  postsGroupedByDate,
  (groups) => groups
    .map(group => ({
      ...group,
      posts: group.posts.filter(post => post.desk === 'Business')
    }))
    .filter(group => group.posts.length > 0)
);

const foreignPostsGroupedByDate = createSelector(
  postsGroupedByDate,
  (groups) => groups
    .map(group => ({
      ...group,
      posts: group.posts.filter(post => post.desk === 'Foreign')
    }))
    .filter(group => group.posts.length > 0)
);

const sciencePostsGroupedByDate = createSelector(
  postsGroupedByDate,
  (groups) => groups
    .map(group => ({
      ...group,
      posts: group.posts.filter(post => post.desk === 'Science')
    }))
    .filter(group => group.posts.length > 0)
);

export const selectors = {
  posts: {
    postSelectors,
  },
  postsUI: {
    isLoading: (state: RootState) => state.postsUI.isLoading,
    error: (state: RootState) => state.postsUI.error,
    postsGroupedByDate,
    businessPostsGroupedByDate,
    foreignPostsGroupedByDate,
    sciencePostsGroupedByDate,
  },
};