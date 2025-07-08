import { useMemo } from "react";
import styles from "./loader.module.css";

interface Props {
  extraStyle?: string;
};

const DOTS_COUNT = 12;

const Loader = ({ extraStyle }: Props) => {
  const rootStyle = useMemo(
    () => [styles.container, extraStyle].filter(Boolean).join(' '),
    [extraStyle]
  );

  return (
    <div
      className={rootStyle}
      aria-label="Loading"
      role="status"
      aria-live="polite"
      tabIndex={-1}
    >
      {Array.from({ length: DOTS_COUNT }).map(
        (_, index) => (
          <span
            key={index}
            className={styles.dot}
            style={{
              "--angle": `${String((index * 360) / DOTS_COUNT)}deg`,
              "--delay": `${String(-1.2 + (index * 0.1))}s`
            } as React.CSSProperties}
            aria-hidden="true"
          />
        )
      )}
    </div>
  );
}

export default Loader;