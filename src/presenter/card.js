import FilmCard from "../view/film-card.js";
import Popup from "../view/popup.js";
import {RenderPosition, render, replace} from "../utils/render.js";
import {UserAction, UpdateType} from "../consts.js";


const ESC_KEY_CODE = 27;
const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Card {
  constructor(filmListElement, changeData, changeMode, api) {
    this._filmListElement = filmListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmComponent = null;
    this._popupComponent = null;
    this._api = api;

    this._mode = Mode.DEFAULT;

    this._openPopup = this._openPopup.bind(this);

    this._onPopupCloseBtnClick = this._onPopupCloseBtnClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onPopupSubmit = this._onPopupSubmit.bind(this);

    this._onWatchListBtnClick = this._onWatchListBtnClick.bind(this);
    this._onWatchedBtnClick = this._onWatchedBtnClick.bind(this);
    this._onFavoritesBtnClick = this._onFavoritesBtnClick.bind(this);
  }

  init(filmData) {
    this._filmData = filmData;

    this._prevFilmComponent = this._filmComponent;
    this._prevPopupComponent = this._popupComponent;

    this._filmComponent = new FilmCard(filmData);


    this._filmComponent.setOnFilmTitleClick(this._openPopup);
    this._filmComponent.setOnFilmPosterClick(this._openPopup);
    this._filmComponent.setOnFilmCommentsBlockClick(this._openPopup);

    this._filmComponent.setWatchListClickHandler(this._onWatchListBtnClick);
    this._filmComponent.setWatchedClickHandler(this._onWatchedBtnClick);
    this._filmComponent.setFavoritesClickHandler(this._onFavoritesBtnClick);

    this._onPopupFavoritesClick = this._onPopupFavoritesClick.bind(this);
    this._onPopupWatchedClick = this._onPopupWatchedClick.bind(this);
    this._onPopupWatchingListClick = this._onPopupWatchingListClick.bind(this);

    if (this._prevFilmComponent === null || this._prevPopupComponent === null) {
      render(this._filmListElement, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, this._prevFilmComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._popupComponent, this._prevPopupComponent);
      this._popupComponent.setOnCloseBtnClick(this._onPopupCloseBtnClick);
    }

    this._prevFilmComponent.getElement().remove();
    this._prevPopupComponent.getElement().remove();
  }

  _replaceFilmToPopup() {
    this._filmListElement.replaceChild(this._popupComponent.getElement(), this._filmComponent.getElement());
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replacePopupToFilm() {
    this._filmListElement.replaceChild(this._filmComponent.getElement(), this._popupComponent.getElement());
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._popupComponent.removeOnCloseBtnClick();
    document.removeEventListener(`keydown`, this._onPopupSubmit);
    this._mode = Mode.DEFAULT;
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replacePopupToFilm();
    }
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      this._replacePopupToFilm();
      this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Popup.parseDataToFilm(this._popupComponent._data));
    }
  }

  _onPopupCloseBtnClick() {
    this._replacePopupToFilm();
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Popup.parseDataToFilm(this._popupComponent._data));
  }

  _openPopup() {
    this._api.getComments(this._filmData)
      .then((data) => {
        this._popupComponent = new Popup(data);
        this._replaceFilmToPopup();
        this._popupComponent.setOnCloseBtnClick(this._onPopupCloseBtnClick);
        this._popupComponent.setFavoritesClickHandler(this._onPopupFavoritesClick);
        this._popupComponent.setWatchedClickHandler(this._onPopupWatchedClick);
        this._popupComponent.setWatchListClickHandler(this._onPopupWatchingListClick);
        document.addEventListener(`keydown`, this._onEscKeyDown);
        document.addEventListener(`keydown`, this._onPopupSubmit);
      });
  }

  _onPopupFavoritesClick() {
    let data = this._popupComponent.getData();
    this._popupComponent.updateData({
      isInFavorites: !data.isInFavorites
    }, false);
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, Popup.parseDataToFilm(this._popupComponent._data));
    this._popupComponent.updateElement(data);
  }

  _onPopupWatchingListClick() {
    let data = this._popupComponent.getData();
    this._popupComponent.updateData({
      isInWatchList: !data.isInWatchList,
    }, false);
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, Popup.parseDataToFilm(this._popupComponent._data));
    this._popupComponent.updateElement(data);
  }

  _onPopupWatchedClick() {
    let data = this._popupComponent.getData();
    this._popupComponent.updateData({
      isInWatched: !data.isInWatched,
      watchingDate: !data.isInWatched ? new Date() : null,
    }, false);
    this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, Popup.parseDataToFilm(this._popupComponent._data));
    this._popupComponent.updateElement(data);
  }

  _onPopupSubmit(evt) {
    if (evt.ctrlKey && evt.keyCode === 13) {
      if (this._popupComponent._data.userComment === null && this._popupComponent._data.emoji === null) {
        return;
      }
      let createNewComment = () => {
        return {
          id: Date.now() + parseInt(Math.random() * 10000, 10),
          author: `user`,
          comment: this._popupComponent._data.userComment ? this._popupComponent._data.userComment : null,
          emotion: this._popupComponent._data.emoji ? this._popupComponent._data.emoji.split(`emoji-`).join(``) : null,
          date: new Date(),
        };
      };
      this._popupComponent._data.comments.push(createNewComment());

      this._popupComponent.updateData({userComment: null, emoji: null}, false);
    }
  }

  destroy() {
    this._filmComponent.remove();
    if (this._popupComponent) {
      this._popupComponent.remove();
    }
  }

  _onWatchListBtnClick(evt) {
    evt.preventDefault();
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Object.assign({}, this._filmData, {isInWatchList: !this._filmData.isInWatchList}));
  }

  _onWatchedBtnClick(evt) {
    evt.preventDefault();
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Object.assign({}, this._filmData, {isInWatched: !this._filmData.isInWatched, watchingDate: !this._filmData.isInWatched ? new Date() : null}));
  }

  _onFavoritesBtnClick(evt) {
    evt.preventDefault();
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Object.assign({}, this._filmData, {isInFavorites: !this._filmData.isInFavorites}));
  }
}
