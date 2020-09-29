import {formatTime} from "../utils/card.js";
import BaseComponent from "./base-component.js";

const getShortText = (text) => {
  let shortDescription = text;
  if (text.length > 140) {
    shortDescription = `${shortDescription.substring(0, 139)}...`;
  }
  return shortDescription;
};

export const createFilmCard = ({title, poster, description, commentsId, ratingValue, productionData, runtime, genre, isInWatchList, isInWatched, isInFavorites}) => {
  const shortDescription = getShortText(description);
  return (`<article class="film-card">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${ratingValue}</p>
            <p class="film-card__info">
              <span class="film-card__year">${productionData.getFullYear()}</span>
              <span class="film-card__duration">${formatTime(runtime)}</span>
              <span class="film-card__genre">${genre[0]}</span>
            </p>
            <img src="./${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${shortDescription}</p>
            <a class="film-card__comments">${commentsId.length} comments</a>
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
    this._filmTitle = this.getElement().querySelector(`.film-card__title`);
    this._filmTitle.addEventListener(`click`, this._onFilmTitleClick);
  }

  setOnFilmPosterClick(callback) {
    this._callback.filmPosterClick = callback;
    this._filmPoster = this.getElement().querySelector(`.film-card__poster`);
    this._filmPoster.addEventListener(`click`, this._onFilmPosterClick);
  }

  setOnFilmCommentsBlockClick(callback) {
    this._callback.filmCommentsBlockClick = callback;
    this._commentsBlock = this.getElement().querySelector(`.film-card__comments`);
    this._commentsBlock.addEventListener(`click`, this._onFilmCommentsBlockClick);
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
    this._watchlistBtn = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    this._watchlistBtn.addEventListener(`click`, this._callback.watchListClick);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this._watchedBtn = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    this._watchedBtn.addEventListener(`click`, this._callback.watchedClick);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this._favoriteBtn = this.getElement().querySelector(`.film-card__controls-item--favorite`);
    this._favoriteBtn.addEventListener(`click`, this._callback.favoritesClick);
  }

  _removeHandlers() {
    this._filmTitle.removeEventListener(`click`, this._onFilmTitleClick);
    this._filmPoster.removeEventListener(`click`, this._onFilmPosterClick);
    this._commentsBlock.removeEventListener(`click`, this._onFilmCommentsBlockClick);
    this._watchlistBtn.removeEventListener(`click`, this._callback.watchListClick);
    this._watchedBtn.removeEventListener(`click`, this._callback.watchedClick);
    this._favoriteBtn.removeEventListener(`click`, this._callback.favoritesClick);
  }

  remove() {
    super.remove();
    this._removeHandlers();
  }
}
