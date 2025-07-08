import { memo, useMemo, type RefObject } from 'react';
import styles from './list.module.css';

interface ListProps<T> {
  list: T[];
  callback: (item: T, index: number, array: T[]) => React.ReactNode;
  extraStyle?: string;
  ref?: RefObject<HTMLUListElement | null>;
}

const List = <T,>({ list, callback, extraStyle, ref }: ListProps<T>) => {
  const rootStyle = useMemo(
    () => [styles.list, extraStyle].filter(Boolean).join(' '),
    [extraStyle]
  );

  return (
    <ul
      className={rootStyle}
      ref={ref}
    >
      {list.map(callback)}
    </ul>
  );
};

export default memo(List) as typeof List;