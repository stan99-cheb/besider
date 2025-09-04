import { fetchPosts, postsActions } from "../../store/slices/postsSlice";
import { getCurrentDate, getDateIterator } from "../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback, useEffect, useMemo, useRef } from "react";
import InfiniteList from "../InfiniteList/infinite-list";
import Loader from "../Loader/loader";
import styles from "./category-feed.module.css";
import type { RootState } from "../../store/store.types";

interface Props {
  groupSelector: (state: RootState) => { title: string; posts: Post[] }[];
  isLoadingSelector: (state: RootState) => boolean;
  extraStyle?: string;
}

const CategoryFeed = ({ groupSelector, isLoadingSelector, extraStyle }: Props) => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(groupSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const dateIteratorRef = useRef(getDateIterator(getCurrentDate()));

  const rootStyle = useMemo(
    () => [styles.main, extraStyle].filter(Boolean).join(' '),
    [extraStyle]
  );

  const handleLoadNext = useCallback(() => {
    const nextDate = dateIteratorRef.current.next().value as { year: number; month: number } | undefined;
    if (nextDate) void dispatch(fetchPosts(nextDate));
  }, [dispatch]);

  useEffect(() => {
    void dispatch(fetchPosts(getCurrentDate()));

    return () => {
      dispatch(postsActions.clearPosts());
    }
  }, [dispatch]);

  return (
    <main
      className={rootStyle}
    >
      <InfiniteList
        groups={groups}
        onLoadNext={handleLoadNext}
      />
      {isLoading && <Loader />}
    </main>
  );
}

export default CategoryFeed;