import { useCallback } from 'react';
import List from '../List/list';
import Post from '../Post/post';
import styles from './pagination.module.css';

interface Props {
  list: Post[];
};

const Pagination = ({ list }: Props) => {

  const renderPost = useCallback(
    (post: Post) => (
      <li key={post.id}>
        <Post
          post={post}
        />
      </li>
    ), []
  );

  return (
    <List
      list={list}
      callback={renderPost}
      extraStyle={styles.list}
    />
  );
}

export default Pagination;

// import { useEffect } from "react";

// const Pagination = () => {
//   const { height } = useDimensions(ref);
//   const [pageSize, setPageSize] = useState<number>(1);
//   const {
//     currentItems, page, totalPages,
//     next, prev, isNext, isPrev
//   } = useIterator(posts, pageSize);

//   useEffect(() => {
//     if (postRef.current && height > 0) {
//       const postHeight = postRef.current.getBoundingClientRect().height;
//       setPageSize(
//         Math.max(1, Math.floor(height / (postHeight * (1 + 20 / 100))))
//       );
//     }
//   }, [height]);

//   return (
//     <>
//       <section
//         className={styles.posts}
//         ref={ref}
//       >
//         <Posts posts={currentItems} postRef={postRef} />
//       </section>
//     </>
//   );
// }

// export default Pagination;