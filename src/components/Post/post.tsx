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
  const post = useAppSelector(selectors.posts.postSelectedById(id));

  if (!post) {
    return null;
  }

  const { image, source, link, title, date } = post;
  const { isImage } = useImage(image, checkImage);

  const imageSrc = useMemo(() => isImage ? image : noImage, [image, isImage]);
  const imageAlt = useMemo(() => isImage ? "Изображение новости" : "Нет изображения", [isImage]);

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
            src={imageSrc}
            alt={imageAlt}
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