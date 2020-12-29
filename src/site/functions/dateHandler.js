function monthDays(month = 1, year = 2020) {
  const __31 = [1, 3, 5, 7, 8, 10, 12];
  const __30 = [4, 6, 8, 10, 11];

  if (__30.includes(month)) return 30;
  else if (__31.includes(month)) return 31;
  else if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return 29;
    return 28;
  }
}

export default monthDays;
