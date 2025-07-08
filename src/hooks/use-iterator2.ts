import { useCallback, useEffect, useRef, useState } from "react";

const useIterator2 = <T>(items: Record<string, T[]>) => {
  const [currentGroup, setCurrentGroup] = useState<{ value: Record<string, T[]>; done: boolean }>({ value: {}, done: false });
  const iteratorRef = useRef<Iterator<Record<string, T[]>> | null>(null);

  useEffect(() => {
    if (Object.keys(items).length === 0) return;

    iteratorRef.current = (function* () {
      for (const [key, value] of Object.entries(items)) {
        yield { [key]: value };
      }
    })();

    const first = iteratorRef.current.next();

    setCurrentGroup(prev => ({
      value: { ...prev.value, ...first.value as Record<string, T[]> },
      done: !!first.done,
    }));
  }, [items]);

  const next = useCallback(() => {
    if (!iteratorRef.current) return;

    const result = iteratorRef.current.next();

    setCurrentGroup(prev => ({
      value: { ...prev.value, ...result.value as Record<string, T[]> },
      done: !!result.done,
    }));
  }, []);

  return {
    currentGroup, next
  };
};

export default useIterator2;