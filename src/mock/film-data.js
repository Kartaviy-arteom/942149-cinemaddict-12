import {getRandomInteger} from "../utils/common.js";
import {randomArrayFromParrentArray} from "../utils/common.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
};

const generatePoster = () => {
  const postersName = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ];

  const randomPosterIndex = getRandomInteger(0, postersName.length - 1);

  return postersName[randomPosterIndex];
};

const generateDescription = () => {
  const descriptionTemplate = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const descriptionSentences = descriptionTemplate.split(`. `);
  let finalDescription = [];

  for (let i = 0; i < 5; i++) {
    if ((!!getRandomInteger(0, 1)) || (finalDescription.length === 0)) {
      finalDescription.push(descriptionSentences[getRandomInteger(0, descriptionSentences.length - 1)]);
    }
  }

  return `${finalDescription.join(`. `)}.`;
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

const generateGenre = () => {
  const genres = [
    `fiction`,
    `documentary`,
    `docufiction`,
    `docudrama`,
    `drama`,
    `vampire films`,
    `horror film`,
  ];

  return randomArrayFromParrentArray(genres);
};

const generateWriters = () => {
  const writers = [
    `Billy Wilder`,
    `Ethan Coen and Joel Coen`,
    `Robert Towne`,
    `Quentin Tarantino`,
    `Francis Ford Coppola`,
    `William Goldman`,
    `Charlie Kaufman`,
    `Woody Allen`,
  ];

  return writers[getRandomInteger(0, writers.length - 1)];
};

const generateComments = () => {
  const emojis = [`smile`, `sleeping`, `puke`, `angry`];
  const commentTexts = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
  ];
  const authors = [
    `Tim Macoveev`,
    `John Doe`,
    `Abigail Carmi`,
    `Nathaniel Shoshannah`,
    `Amnon Bithiah`
  ];
  const commentsQuantity = getRandomInteger(0, 5);
  let comments = [];

  for (let i = 0; i < commentsQuantity; i++) {
    const comment = {
      emoji: emojis[getRandomInteger(0, emojis.length - 1)],
      text: commentTexts[getRandomInteger(0, commentTexts.length - 1)],
      author: authors[getRandomInteger(0, authors.length - 1)],
      data: new Date(getRandomInteger(0, new Date().getTime())),
    };
    comments.push(comment);
  }
  return comments;
};

const generateActors = () => {
  const actors = [
    `Clint Eastwood`,
    `Laurence Olivier`,
    `Sean Connery`,
    `John Wayne`,
    `Humphrey Bogart`,
    `Cary Grant`,
    `Spencer Tracy`
  ];

  return randomArrayFromParrentArray(actors);
};

export const generateFilmData = () => {
  return {
    id: generateId(),
    title: generateFilmTitle(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: generateComments(),
    ratingValue: generateRating(),
    productionData: generateProductionYear(),
    duration: generateDuration(),
    genre: generateGenre(),
    director: generateDirector(),
    writers: generateWriters(),
    country: generateCountry(),
    ageRate: generateAgeRate(),
    isInWatchList: !!(getRandomInteger(0, 1)),
    isInWatched: !!(getRandomInteger(0, 1)),
    isInFavorites: !!(getRandomInteger(0, 1)),
    actors: generateActors(),
  };
};
