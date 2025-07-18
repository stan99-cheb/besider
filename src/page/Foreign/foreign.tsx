import { fetchPosts, postsActions } from '../../store/slices/postsSlice';
import { getCurrentDate } from '../../utils/utils';
import { selectors } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import InfiniteList from '../../components/InfiniteList/infinite-list';
import Loader from '../../components/Loader/loader';
import styles from './foreign.module.css';

const Foreign = () => {
  const dispatch = useAppDispatch();
  const foreignPostsGroupedByDate = useAppSelector(selectors.postsUI.foreignPostsGroupedByDate);
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
        groups={foreignPostsGroupedByDate}
      />
      {isLoading && <Loader />}
    </main>
  );
}

export default Foreign;