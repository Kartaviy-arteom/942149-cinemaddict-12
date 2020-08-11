import {getRandomInteger} from "../utils.js";

export const generateUserStatus = () => {
  statuses = [
    ``,
    `novice`,
    `fan`,
    `movie buff`,
  ];

  return statuses[getRandomInteger(0, statuses.length - 1)];
};
