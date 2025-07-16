import { useCallback, useMemo, useState } from "react";

const useIterator = <T>(items: T[] = [], pageSize = 1) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length / pageSize);

  const next = useCallback(
    () => {
      setPage(prev => (prev < totalPages - 1 ? prev + 1 : prev));
    }, [totalPages]
  );

  const prev = useCallback(
    () => {
      setPage(prev => (prev > 0 ? prev - 1 : prev));
    }, []
  );

  const currentItems = useMemo(
    () => items.slice(page * pageSize, (page + 1) * pageSize),
    [items, page, pageSize]
  );

  const incrementItems = useMemo(
    () => items.slice(0, (page + 1) * pageSize),
    [items, page, pageSize]
  );

  return {
    currentItems,                     // массив текущих элементов
    incrementItems,                   // массив элементов до текущей страницы
    page,                             // текущая страница
    setPage,                          // функция для установки текущей страницы
    totalPages,                       // общее количество страниц
    next,                             // функция для перехода к следующей странице
    prev,                             // функция для перехода к предыдущей странице
    isNext: page < totalPages - 1,    // есть ли следующая страница
    isPrev: page > 0,                 // есть ли предыдущая страница
  };
};

export default useIterator;