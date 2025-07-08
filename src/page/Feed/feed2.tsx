import { fetchPosts, postsActions } from "../../store/slices/postsSlice";
import { getCurrentDate, getDateIterator } from "../../utils/utils";
import { selectors } from "../../store/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef } from "react";
import InfiniteList from "../../components/InfiniteList/infinite-list";
import Loader from "../../components/Loader/loader";
import styles from './feed.module.css';
import useIterator2 from "../../hooks/use-iterator2";

const Feed2 = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectors.postsUI.isLoading);
  const postsGroupedByDate = useAppSelector(selectors.postsUI.postsGroupedByDate);
  const { currentGroup, next } = useIterator2(postsGroupedByDate);
  const dateIteratorRef = useRef(getDateIterator(getCurrentDate()));

  useEffect(() => {
    if (!currentGroup.done) return;
    const date = dateIteratorRef.current.next().value as { year: number; month: number };
    void dispatch(fetchPosts(date));
  }, [currentGroup, dispatch]);

  useEffect(() => {
    void dispatch(fetchPosts(getCurrentDate()));

    return () => {
      void dispatch(postsActions.clearPosts());
    };
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <InfiniteList
        group={currentGroup.value}
        next={next}
      />
      {isLoading && <Loader />}
    </main>
  );
}

export default Feed2;

// const Feed2 = () => {
//   const dispatch = useAppDispatch();
//   const postsGroupedByDate = useAppSelector(selectors.postsUI.postsGroupedByDate);
//   const date = useAppSelector(selectors.postsUI.date);
//   const isLoading = useAppSelector(selectors.postsUI.isLoading);
//   const { currentGroup, next } = useIterator2(postsGroupedByDate);
//   const dateIteratorRef = useRef(getDateIterator(date));

//   useEffect(() => {
//     void dispatch(fetchPosts(date));

//     return () => {
//       void dispatch(postsActions.clearPosts());
//     };
//   }, [date, dispatch]);

//   useEffect(() => {
//     if (!currentGroup.done) return;
//     console.log('currentGroup', currentGroup);
//     const nextDate = dateIteratorRef.current.next().value;
//     if (nextDate) void dispatch(fetchPosts(nextDate));
//   }, [currentGroup, dispatch]);

//   return (
//     <main
//       className={styles.main}
//     >
//       <InfiniteList
//         group={currentGroup.value ?? {}}
//         next={next}
//       />
//       {isLoading &&
//         <Loader />
//       }
//     </main>
//   );
// }