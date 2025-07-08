import { useCallback, useEffect, useMemo, useRef } from "react";
import List from "../List/list";
import Post from "../Post/post";
import styles from './infinite-list.module.css';
import useIntersection from "../../hooks/use-intersection";

interface Props {
  group: Record<string, Post[]>;
  next: () => void;
};

const InfiniteList = ({ group, next }: Props) => {
  const rootRef = useRef<HTMLUListElement>(null);

  const options = useMemo(() => ({
    root: rootRef.current,
    rootMargin: "0px",
    threshold: [0],
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [rootRef.current]);

  const [setNode, entry] = useIntersection(options);

  useEffect(() => {
    if (entry?.isIntersecting) next();
  }, [entry, next]);

  const renderPosts = useCallback(
    (post: Post) => (
      <li
        key={post.id}
        className={styles.post}
      >
        <Post
          post={post}
        />
      </li>
    ), []
  );

  const renderGroup = useCallback(
    ([date, posts]: [string, Post[]], index: number) => (
      <li
        key={date}
        ref={index === Object.entries(group).length - 1 ? setNode : null}
      >
        <h2
          className={styles.title}
        >
          Новости за {date}
        </h2>
        <List
          list={posts}
          callback={renderPosts}
          extraStyle={styles.posts}
        />
      </li>
    ), [group, renderPosts, setNode]
  );

  if (Object.keys(group).length === 0) return null;

  return (
    <List
      list={Object.entries(group)}
      callback={renderGroup}
      extraStyle={styles.groups}
      ref={rootRef}
    />
  );
}

export default InfiniteList;