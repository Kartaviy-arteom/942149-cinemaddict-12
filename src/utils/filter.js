import {FilterType} from "../consts";

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchList),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isInWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isInFavorites),
};
