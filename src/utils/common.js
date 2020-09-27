import {UserStatus, StatusLevel} from "../consts.js";

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

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const getUserStatus = (watchedFilmsCount) => {
  let userStatus;
  if (watchedFilmsCount === StatusLevel.NO_STATUS) {
    userStatus = UserStatus.NO_STATUS;
  }
  if (watchedFilmsCount > StatusLevel.NO_STATUS && watchedFilmsCount <= StatusLevel.NOVICE) {
    userStatus = UserStatus.NOVICE;
  }

  if (watchedFilmsCount > StatusLevel.NOVICE && watchedFilmsCount <= StatusLevel.FAN) {
    userStatus = UserStatus.FAN;
  }

  if (watchedFilmsCount >= StatusLevel.MOVIE_BUFF) {
    userStatus = UserStatus.MOVIE_BUFF;
  }

  return userStatus;
}
