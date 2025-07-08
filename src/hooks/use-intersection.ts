import { useEffect, useRef, useState } from "react";

const useIntersection = (
  {
    root = null, rootMargin = "0px", threshold = 0
  }: IntersectionObserverInit
) => {
  const [entry, updateEntry] = useState<IntersectionObserverEntry | null>(null);
  const [node, setNode] = useState<HTMLLIElement | null>(null);

  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        updateEntry(entry);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    const { current: observerInstance } = observer;

    if (node) observerInstance.observe(node);

    return () => {
      observerInstance.disconnect();
    };
  }, [node, root, rootMargin, threshold]);

  return [setNode, entry] as const;
}

export default useIntersection;