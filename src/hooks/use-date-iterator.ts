import { useRef, useState, useCallback } from "react";

export interface DateType {
  year: number;
  month: number;
};

function getCurrentDate(date?: Date): DateType {
  const now = date ?? new Date(2025, 4, 8);
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
};

function* getDateIterator(startDate: DateType): Generator<DateType> {
  let { year, month } = startDate;
  while (true) {
    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
    yield { year, month };
  }
};

export function useDateIterator() {
  const [currentDate, setCurrentDate] = useState<DateType>(getCurrentDate());
  const iteratorRef = useRef<Generator<DateType>>(getDateIterator(currentDate));

  const getNextDate = useCallback(() => {
    const result = iteratorRef.current.next();
    if (!result.done && result.value) {
      setCurrentDate(result.value);
      return result.value;
    }
    return null;
  }, []);

  const reset = useCallback(() => {
    const initialDate = getCurrentDate();
    setCurrentDate(initialDate);
    iteratorRef.current = getDateIterator(initialDate);
  }, []);

  return { currentDate, getNextDate, reset };
};