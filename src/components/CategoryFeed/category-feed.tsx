import { fetchPosts, postsActions } from "../../store/slices/postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback, useEffect, useMemo } from "react";
import InfiniteList from "../InfiniteList/infinite-list";
import Loader from "../Loader/loader";
import styles from "./category-feed.module.css";
import type { RootState } from "../../store/store.types";
import { useDateIterator } from "../../hooks/use-date-iterator";

interface Props {
  groupSelector: (state: RootState) => { title: string; posts: Post[] }[];
  isLoadingSelector: (state: RootState) => boolean;
  extraStyle?: string;
}

const CategoryFeed = ({ groupSelector, isLoadingSelector, extraStyle }: Props) => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(groupSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const { currentDate, getNextDate } = useDateIterator();

  const rootStyle = useMemo(
    () => [styles.main, extraStyle].filter(Boolean).join(' '),
    [extraStyle]
  );

  const handleLoadNext = useCallback(() => {
    const nextDate = getNextDate();
    if (nextDate) {
      void dispatch(fetchPosts(nextDate));
    }
  }, [dispatch]);

  useEffect(() => {
    void dispatch(fetchPosts(currentDate));

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