import {getRandomInteger} from "../utils/common.js";

const statuses = [
  ``,
  `novice`,
  `fan`,
  `movie buff`,
];

export const generateUserStatus = () => {
  return statuses[getRandomInteger(0, statuses.length - 1)];
};
