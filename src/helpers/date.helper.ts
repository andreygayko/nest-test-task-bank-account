export const todayString = (): string => {
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );
  return today.toDateString();
};

export const yesterday = (): Date => {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 1,
  );
};
