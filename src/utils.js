export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const randomArrayFromParrentArray = (array) => {
  return array.filter(() => {
    return !!(getRandomInteger(0, 1));
  });
};

export const transformData = (data) => {
  return `${data.getFullYear()}/${data.getMonth()}/${data.getDate()} ${data.getHours()}:${data.getMinutes}`;
};

export const humanizeDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-GB`, {month: `long`, day: `numeric`, year: `numeric`});
};
