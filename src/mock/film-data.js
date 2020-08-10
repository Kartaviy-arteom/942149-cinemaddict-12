import {getRandomInteger} from "../utils.js";

const generateFilmTitle = () => {
  const filmsTitles = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Man with the Golden Arm`,
    `The Great Flamarion`,
    `Santa Claus Conquers the Martians`,
    `Made for Each Other`
  ];

  const randomFilmIndex = getRandomInteger(0, filmsTitles.length - 1);

  return filmsTitles[randomFilmIndex];
}

const generatePoster = () => {
  const postersName[] = [
  `made-for-each-other`,
  `popeye-meets-sinbad`,
  `sagebrush-trail`,
  `santa-claus-conquers-the-martians`,
  `the-dance-of-life`,
  `the-great-flamarion`,
  `the-man-with-the-golden-arm`,
  ];

  const randomPosterIndex = getRandomInteger(0, postersName.length - 1);

  return postersName[randomPosterIndex];
};

const generateDescription = () => {
  const descriptionTemplate = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  const descriptionSentences = descriptionTemplate.split(`. `);
  let finalDescription = [];

  const randomQuantitySentence = getRandomInteger(0, descriptionSentences.length);

  for (const i = 0; i < randomQuantitySentence; i ++) {
    finalDescription.push(descriptionSentences[getRandomInteger(0, descriptionSentences.length - 1)]);
  }

  return finalDescription.join(`. `);
};

const generateRating = () => {
  return (getRandomInteger(0, 100) / 10).toFixed(1);
};

const generateProductionYear = () => {
  const firstMovieYear = 1895;
  const maxYearValue = new Date().getFullYear();

  return new Date(getRandomInteger(firstMovieYear, maxYearValue), getRandomInteger(0, 12), getRandomInteger(1, 31));
};

const generateDuration = () => {
  return `${getRandomInteger(0, 10)}h ${getRandomInteger(1, 59)}m`;
};

const generateDirector = () => {
  const directors = [
    `Steven Spielberg`,
    `Martin Scorsese`,
    `Alfred Hitchcock`,
    `Quentin Tarantino`,
    `Stanley Kubrick`,
    `Francis Ford Coppola`,
    `Akira Kurosawa`,
    `Tim Burton`,
    `Ridley Scott`,
    `Christopher Nolan`,
    `Clint Eastwood`
  ];

  return directors[getRandomInteger(0, directors.length - 1)];
};

const generateCountry = () => {
  const countries = [
    `USA`,
    `Italy`,
    `France`,
    `Germany`,
    `Spain`,
    `United Kingdom`,
    `Russia`
  ];

  return countries[getRandomInteger(0, countries.length - 1)];
};

const generateAgeRate = () => {
  const rates = [
    `G`,
    `PG`,
    `PG-13`,
    `R`,
    `NC-17`
  ];

  return rates[getRandomInteger(0, rates.length - 1)];
};

export const generateFilmData = () => {
  return {
    title: generateFilmTitle(),
    poster: generatePoster(),
    description: generateDescription(),
    comments:,
    ratingValue: generateRating(),
    productionYear: generateProductionYear(),
    duration: generateDuration(),
    genre:,
    director: generateDirector(),
    writers:,
    country: generateCountry(),
    ageRate: generateAgeRate(),
  }
};
