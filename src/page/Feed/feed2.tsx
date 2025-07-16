import { fetchPosts, postsActions } from "../../store/slices/postsSlice";
import { getCurrentDate } from "../../utils/utils";
import { selectors } from "../../store/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import InfiniteList from "../../components/InfiniteList/infinite-list";
import Loader from "../../components/Loader/loader";
import styles from './feed.module.css';

const Feed2 = () => {
  const dispatch = useAppDispatch();
  const postsGroupedByDate = useAppSelector(selectors.postsUI.postsGroupedByDate);
  const isLoading = useAppSelector(selectors.postsUI.isLoading);

  useEffect(() => {
    void dispatch(fetchPosts(getCurrentDate()));

    return () => {
      void dispatch(postsActions.clearPosts());
    };
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <InfiniteList
        groups={postsGroupedByDate}
      />
      {isLoading && <Loader />}
    </main>
  );
}

export default Feed2;