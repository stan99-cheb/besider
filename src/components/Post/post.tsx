import { checkImage } from '../../api/api';
import { memo, useMemo } from 'react';
import noImage from '../../assets/no-image.jpg';
import styles from './post.module.css';
import useImage from '../../hooks/use-image';

interface Props {
  post: Post;
};

const Post = ({ post }: Props) => {
  const imageUrl = useMemo(() => post.image, [post.image]);
  const { isImage } = useImage(imageUrl, checkImage);

  return (
    <article
      className={styles.container}
    >
      <figure
        className={styles.figure}
      >
        <picture>
          <img
            className={styles.image}
            src={isImage ? post.image : noImage}
            alt={isImage ? "Изображение новости" : "Нет изображения"}
          />
        </picture>
      </figure>
      <span
        className={styles.source}
      >
        {post.source}
      </span>
      <a
        className={`${styles.link} ${styles.title}`}
        href={post.link}
        target='_blank'
        rel='noopener noreferrer'
        title='Открыть новость'
      >
        {post.title}
      </a>
      <time
        className={styles.date}
        dateTime={post.date}
      >
        {post.date}
      </time>
    </article>
  );
};

export default memo(Post);