import moment from "moment";

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
  return `${data.getFullYear()}/${data.getMonth()}/${data.getDate()} ${data.getHours()}:${data.getMinutes()}`;
};

export const humanizeDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-GB`, {month: `long`, day: `numeric`, year: `numeric`});
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortTaskDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskB.productionData.getTime() - taskA.productionData.getTime();
};

export const formatDate = (date, format) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(format);
};

export const formatTime = (minutesNumber) => {
  if (!Number.isInteger(minutesNumber)) {
    return ``;
  }

  return moment.utc(moment.duration(minutesNumber, `minutes`).asMilliseconds()).format(`H[h] mm[m]`);
};


