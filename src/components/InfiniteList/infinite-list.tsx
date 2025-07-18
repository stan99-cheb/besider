import { useCallback, useEffect, useRef } from "react";
import List from "../List/list";
import Posts from "../Posts/posts";
import styles from './infinite-list.module.css';
import useIterator from "../../hooks/use-iterator";

interface Props {
  groups: { title: string; posts: Post[] }[];
  onLoadNext?: () => void;
};

const InfiniteList = ({ groups, onLoadNext }: Props) => {
  const { incrementItems, next, isNext } = useIterator(groups);
  const rootRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isNext || !incrementItems.length) return;
    onLoadNext?.();
  }, [isNext, incrementItems.length, onLoadNext]);

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