import {getRandomInteger} from "../utils.js";

export const generateUserStatus = () => {
  const statuses = [
    ``,
    `novice`,
    `fan`,
    `movie buff`,
  ];

  return statuses[getRandomInteger(0, statuses.length - 1)];
};
