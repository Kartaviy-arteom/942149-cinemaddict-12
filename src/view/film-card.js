import {formatTime} from "../utils/card.js";
import BaseComponent from "./base-component.js";

const getShortText = (text) => {
  let shortDescription = text;
  if (text.length > 140) {
    shortDescription = `${shortDescription.substring(0, 139)}...`;
  }
  return shortDescription;
};

export const createFilmCard = ({title, poster, description, comments, ratingValue, productionData, runtime, genre, isInWatchList, isInWatched, isInFavorites}) => {
  const shortDescription = getShortText(description);
  return (`<article class="film-card">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${ratingValue}</p>
            <p class="film-card__info">
              <span class="film-card__year">${productionData.getFullYear()}</span>
              <span class="film-card__duration">${formatTime(runtime)}</span>
              <span class="film-card__genre">${genre[0]}</span>
            </p>
            <img src="./images/posters/${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${shortDescription}</p>
            <a class="film-card__comments">${comments.length} comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchList ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isInWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite ${isInFavorites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
            </form>
          </article>`
  );
};

export default class FilmCard extends BaseComponent {
  constructor(filmData) {
    super();
    this._filmData = filmData;

    this._onFilmTitleClick = this._onFilmTitleClick.bind(this);
    this._onFilmPosterClick = this._onFilmTitleClick.bind(this);
    this._onFilmCommentsBlockClick = this._onFilmTitleClick.bind(this);
  }

  _getTemplate() {
    return createFilmCard(this._filmData);
  }

  setOnFilmTitleClick(callback) {
    this._callback.filmTitleClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._onFilmTitleClick);
  }

  setOnFilmPosterClick(callback) {
    this._callback.filmPosterClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._onFilmPosterClick);
  }

  setOnFilmCommentsBlockClick(callback) {
    this._callback.filmCommentsBlockClick = callback;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._onFilmCommentsBlockClick);
  }

  _onFilmTitleClick(evt) {
    evt.preventDefault();
    this._callback.filmTitleClick();
  }

  _onFilmPosterClick(evt) {
    evt.preventDefault();
    this._callback.filmPosterClick();
  }

  _onFilmCommentsBlockClick(evt) {
    evt.preventDefault();
    this._callback.filmCommentsBlockClick();
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._callback.watchListClick);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._callback.watchedClick);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._callback.favoritesClick);
  }
}

