export const getCurrentDate = () => {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() - 3,
  };
};

export const getDateIterator = (date: { year: number; month: number }) =>
  (function* () {
    let year = date.year;
    let month = date.month;

    while (year !== 2020) {
      month -= 1;
      if (month <= 0) {
        month = 12;
        year -= 1;
      }
      yield { year, month };
    }
  })();

export const formatDateKey = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

export const formatDisplayDate = (dateStr: string) =>
  new Date(dateStr).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).replace(/:/g, '.');