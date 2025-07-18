import { fetchPosts, postsActions } from '../../store/slices/postsSlice';
import { getCurrentDate } from '../../utils/utils';
import { selectors } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import InfiniteList from '../../components/InfiniteList/infinite-list';
import Loader from '../../components/Loader/loader';
import styles from './science.module.css';

const Science = () => {
  const dispatch = useAppDispatch();
  const sciencePostsGroupedByDate = useAppSelector(selectors.postsUI.sciencePostsGroupedByDate);
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
        groups={sciencePostsGroupedByDate}
      />
      {isLoading && <Loader />}
    </main>
  );
}

export default Science;