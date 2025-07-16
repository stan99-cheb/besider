import { memo, useCallback, useEffect, useMemo } from "react";
import List from "../List/list";
import Post from "../Post/post";
import styles from "./posts.module.css";
import useIntersection from "../../hooks/use-intersection";
import useIterator from "../../hooks/use-iterator";

interface Props {
  posts: Post[];
  hiNext: () => void;
  rootRef: React.RefObject<HTMLUListElement | null>;
}

const Posts = ({ posts, hiNext, rootRef }: Props) => {
  const { incrementItems, next, isNext } = useIterator(posts, 10);

  const options = useMemo(() => ({
    root: rootRef.current,
    rootMargin: "0px",
    threshold: [1],
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [rootRef.current]);

  const [setNode, entry] = useIntersection(options);

  useEffect(() => {
    if (!entry?.isIntersecting) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isNext ? next() : hiNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  const renderPost = useCallback(
    (post: Post, idx: number) => (
      <li
        key={post.id}
        ref={idx === incrementItems.length - 1 ? setNode : null}
      >
        <Post post={post} />
      </li>
    ), [incrementItems.length, setNode]
  );

  return (
    <List
      list={incrementItems}
      callback={renderPost}
      extraStyle={styles.posts}
    />
  );
}

export default memo(Posts);