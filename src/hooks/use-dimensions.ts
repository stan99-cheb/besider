import { useEffect, useState } from "react";

const useDimensions = (ref: React.RefObject<HTMLElement | null>) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => {
      setDimensions({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    if (ref.current) ro.observe(ref.current);

    return () => { ro.disconnect(); };
  }, [ref]);

  return dimensions;
}

export default useDimensions;