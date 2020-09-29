import moment from "moment";

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


