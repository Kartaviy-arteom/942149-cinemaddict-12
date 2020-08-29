export const generateNavStats = (films) => {
  return {
    watchlist: films.filter((film) => film.isInWatchList).length,
    history: films.filter((film) => film.isInWatched).length,
    favorite: films.filter((film) => film.isInFavorites).length,
  };
};
