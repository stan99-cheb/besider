import { checkImage } from '../../api/api';
import { memo, useMemo } from 'react';
import { selectors } from '../../store/selectors';
import { useAppSelector } from '../../store/hooks';
import noImage from '../../assets/no-image.jpg';
import styles from './post.module.css';
import useImage from '../../hooks/use-image';

interface Props {
  id: Post['id'];
};

const Post = ({ id }: Props) => {
  const { image, source, link, title, date } = useAppSelector(selectors.posts.postSelectedById(id));
  const imageUrl = useMemo(() => image, [image]);
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
            src={isImage ? image : noImage}
            alt={isImage ? "Изображение новости" : "Нет изображения"}
          />
        </picture>
      </figure>
      <span
        className={styles.source}
      >
        {source}
      </span>
      <a
        className={`${styles.link} ${styles.title}`}
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        title='Открыть новость'
      >
        {title}
      </a>
      <time
        className={styles.date}
        dateTime={date}
      >
        {date}
      </time>
    </article>
  );
};

export default memo(Post);