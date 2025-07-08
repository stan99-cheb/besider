export const getCurrentDate = () => {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() - 1,
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