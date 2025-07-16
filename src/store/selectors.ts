import { createSelector } from "@reduxjs/toolkit";
import { postSelectors } from "./slices/postsSlice";
import type { RootState } from "./store.types";

const postsGroupedByDate = createSelector(
  postSelectors.selectAll,
  (posts) => Object.values(posts.reduce<Record<string, { title: string; posts: typeof posts }>>(
    (acc, post) => {
      const dateKey = new Date(post.date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      acc[dateKey] ??= { title: dateKey, posts: [] };
      if (acc[dateKey].posts.length >= 2) return acc;
      acc[dateKey].posts.push({
        ...post, date: new Date(post.date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).replace(/:/g, '.')
      });
      return acc;
    }, {}
  ))
);

export const selectors = {
  posts: {
    postSelectors,
  },
  postsUI: {
    isLoading: (state: RootState) => state.postsUI.isLoading,
    error: (state: RootState) => state.postsUI.error,
    postsGroupedByDate,
  },
};