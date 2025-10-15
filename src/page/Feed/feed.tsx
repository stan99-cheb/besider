import { selectors } from "../../store/selectors";
import { useAppSelector } from "../../store/hooks";
import Pagination from "../../components/Pagination/pagination";
import styles from "./feed.module.css";
import useIterator from "../../hooks/use-iterator";

const Feed = () => {
  const posts = useAppSelector(selectors.posts.postAll);

  const {
    currentItems, page,
    totalPages, next, prev, isNext, isPrev
  } = useIterator(posts, 10);

  return (
    <main
      className={styles.main}
    >
      <Pagination list={currentItems} />
      <section
        className={styles.pagination}
      >
        <button
          type="button"
          className={styles.button}
          onClick={prev}
          disabled={!isPrev}
        >
          Назад
        </button>
        <span>
          Текущая страница: {page + 1} из {totalPages}
        </span>
        <button
          type="button"
          className={styles.button}
          onClick={next}
          disabled={!isNext}
        >
          Вперед
        </button>
      </section>
    </main>
  );
}

export default Feed;