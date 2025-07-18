import { fetchPosts, postsActions } from "../../store/slices/postsSlice";
import { getCurrentDate, getDateIterator } from "../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback, useEffect, useRef } from "react";
import InfiniteList from "../InfiniteList/infinite-list";
import Loader from "../Loader/loader";
import type { RootState } from "../../store/store.types";

interface Props {
  groupSelector: (state: RootState) => { title: string; posts: Post[] }[];
  isLoadingSelector: (state: RootState) => boolean;
  extraClass?: string;
}

const CategoryFeed = ({ groupSelector, isLoadingSelector, extraClass }: Props) => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(groupSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const dateIteratorRef = useRef(getDateIterator(getCurrentDate()));

  const handleLoadNext = useCallback(() => {
    const date = dateIteratorRef.current.next().value as { year: number; month: number };
    void dispatch(fetchPosts(date));
  }, [dispatch]);

  useEffect(() => {
    void dispatch(fetchPosts(getCurrentDate()));

    return () => {
      dispatch(postsActions.clearPosts());
    }
  }, [dispatch]);

  return (
    <main
      className={extraClass}
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