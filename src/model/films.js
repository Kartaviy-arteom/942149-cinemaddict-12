import Observer from "../utils/observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();
    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          commentsId: film.comments,
          title: film.film_info.title,
          alternativeTitle: film.film_info.alternative_title,
          poster: film.film_info.poster,
          ratingValue: film.film_info.total_rating,
          ageRate: film.film_info.age_rating,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          productionData: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
          country: film.film_info.release.release_country,
          runtime: film.film_info.runtime,
          genre: film.film_info.genre,
          description: film.film_info.description,
          isInWatchList: film.user_details.watchlist,
          isInWatched: film.user_details.already_watched,
          watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date,
          isInFavorites: film.user_details.favorite,
        }
    );

    delete adaptedFilm.comments;
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "comments": film.commentsId,
          "film_info": {
            "title": film.title,
            "alternative_title": film.alternativeTitle,
            "total_rating": film.ratingValue,
            "poster": film.poster,
            "age_rating": film.ageRate,
            "director": film.director,
            "writers": film.writers,
            "actors": film.actors,
            "release": {
              "date": film.productionData instanceof Date ? film.productionData.toISOString() : null,
              "release_country": film.country
            },
            "runtime": film.runtime,
            "genre": film.genre,
            "description": film.description,
          },
          "user_details": {
            "watchlist": film.isInWatchList,
            "already_watched": film.isInWatched,
            "watching_date": film.watchingDate instanceof Date ? film.watchingDate.toISOString() : null,
            "favorite": film.isInFavorites,
          }
        }


    );

    delete adaptedFilm.commentsId;
    delete adaptedFilm.isInFavorites;
    delete adaptedFilm.isInWatchList;
    delete adaptedFilm.isInWatched;
    delete adaptedFilm.director;
    delete adaptedFilm.alternativeTitle;
    delete adaptedFilm.title;
    delete adaptedFilm.ageRate;
    delete adaptedFilm.country;
    delete adaptedFilm.description;
    delete adaptedFilm.runtime;
    delete adaptedFilm.actors;
    delete adaptedFilm.genre;
    delete adaptedFilm.poster;
    delete adaptedFilm.productionData;
    delete adaptedFilm.ratingValue;
    delete adaptedFilm.watchingDate;
    delete adaptedFilm.writers;


    return adaptedFilm;
  }

  static adaptCommentToClient(newComments, film) {
    newComments.forEach(function (el) {
      el.date = new Date(el.date);
      return el;
    });
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          comments: newComments,
        }
    );
    return adaptedFilm;
  }
}
