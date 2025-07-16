import { fetchPosts } from "../../store/slices/postsSlice";
import { getCurrentDate, getDateIterator } from "../../utils/utils";
import { useAppDispatch } from "../../store/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import List from "../List/list";
import Posts from "../Posts/posts";
import styles from './infinite-list.module.css';
import useIterator from "../../hooks/use-iterator";

interface Props {
  groups: { title: string; posts: Post[] }[];
};

const InfiniteList = ({ groups }: Props) => {
  const dispatch = useAppDispatch();
  const [accumulatedGroups, setAccumulatedGroups] = useState<{ title: string; posts: Post[] }[]>([]);
  const { incrementItems, next, isNext } = useIterator(accumulatedGroups);
  const dateIteratorRef = useRef(getDateIterator(getCurrentDate()));
  const rootRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setAccumulatedGroups(prev => {
      const existingTitles = new Set(prev.map(group => group.title));
      const newGroups = groups.filter(group => !existingTitles.has(group.title));
      return [...prev, ...newGroups];
    });
  }, [groups]);

  useEffect(() => {
    if (isNext || !incrementItems.length) return;
    const date = dateIteratorRef.current.next().value as { year: number; month: number };
    void dispatch(fetchPosts(date));
  }, [dispatch, incrementItems, isNext]);

  const renderGroup = useCallback(
    ({ title, posts }: { title: string; posts: Post[] }) => (
      <li
        key={title}
      >
        <h2
          className={styles.title}
        >
          Новости за {title}
        </h2>
        <Posts
          posts={posts}
          hiNext={next}
          rootRef={rootRef}
        />
      </li>
    ), [next]
  );

  return (
    <List
      list={incrementItems}
      callback={renderGroup}
      extraStyle={styles.groups}
      ref={rootRef}
    />
  );
}

export default InfiniteList;