export const isWakeTime = (date: Date) => {
  const h = date.getHours();
  const m = date.getMinutes();
  return (h > 5 && h < 12) || (h === 5 && m >= 0) || (h === 12 && m === 0);
};

export const isSleepTime = (date: Date) => {
  const h = date.getHours();
  const m = date.getMinutes();
  const after21 = h > 21 || (h === 21 && m >= 0);
  const before2 = h < 2 || (h === 2 && m === 0);
  return after21 || before2;
};
