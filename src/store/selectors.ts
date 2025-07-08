import { createSelector } from "@reduxjs/toolkit";
import { postSelectors } from "./slices/postsSlice";
import type { RootState } from "./store.types";

const postsGroupedByDate = createSelector(
  postSelectors.selectAll,
  (posts) => posts.reduce<Record<string, Post[]>>(
    (acc, post) => {
      const dateKey = new Date(post.date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }); // формат даты для источника новости
      if (typeof acc[dateKey] === 'undefined') acc[dateKey] = [];
      if (acc[dateKey].length >= 2) return acc; // ограничение постов в группе
      acc[dateKey].push({
        ...post, date: new Date(post.date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).replace(/:/g, '.')
      }); // формат даты для карточки новости
      return acc;
    }, {})
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