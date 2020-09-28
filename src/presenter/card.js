import FilmCard from "../view/film-card.js";
import Popup from "../view/popup.js";
import FilmsModel from "../model/films.js";
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
    this._deleteComment = this._deleteComment.bind(this);

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
        this._popupComponent.setCommentBlockDeleteHandler(this._deleteComment);
        document.addEventListener(`keydown`, this._onEscKeyDown);
        document.addEventListener(`keydown`, this._onPopupSubmit);
      })
      .catch(() => this._filmComponent.shake());
  }

  _onPopupFavoritesClick(evt) {
    evt.preventDefault();
    this._changeUserDetails(this._changeToOppositeFavoritesData);
  }

  _onPopupWatchingListClick(evt) {
    evt.preventDefault();
    this._changeUserDetails(this._changeToOppositeWatchingListsData);
  }

  _onPopupWatchedClick(evt) {
    evt.preventDefault();
    this._changeUserDetails(this._changeToOppositeWatchedData);
  }

  _changeUserDetails(changeDataFunction) {
    let data = this._popupComponent.getData();
    changeDataFunction(data);

    this._api.updateFilm(Popup.parseFilmToData(data)).then((response) => {
      this._popupComponent.updateData(Object.assign({}, Popup.parseDataToFilm(response), {userComment: data.userComment, emoji: data.emoji}), false);
    })
    .catch(() => {
      this._popupComponent.shake();
      changeDataFunction(data);
    });
  }

  _changeToOppositeWatchedData(data) {
    data.watchingDate = !data.isInWatched ? new Date() : null;
    data.isInWatched = !data.isInWatched;
  }

  _changeToOppositeFavoritesData(data) {
    data.isInFavorites = !data.isInFavorites;
  }

  _changeToOppositeWatchingListsData(data) {
    data.isInWatchList = !data.isInWatchList;
  }

  _onPopupSubmit(evt) {
    let data = this._popupComponent.getData();
    if (evt.ctrlKey && evt.keyCode === 13) {
      if (data.userComment === null || data.emoji === null) {
        return;
      }
      const newComment = this._createNewComment();
      this._popupComponent.blockForm();
      this._api.postComment(newComment, data.id).then((response) => {
        let newData = FilmsModel.adaptToClient(response.movie);
        newData = FilmsModel.adaptCommentToClient(response.comments, newData);
        this._popupComponent.updateData(Object.assign({}, newData, {userComment: null, emoji: null}), false);
      })
      .catch(() => {
        this._popupComponent.shakeForm();
        this._popupComponent.unblockForm();
      });
    }
  }

  _deleteComment(commentId) {
    this._api.deleteComment(commentId).then(() => {
      // let data = this._popupComponent.getData();
      // const index = data.comments.findIndex((comment) => comment.id === commentId);
      // data.comments = [
      //   ...data.comments.slice(0, index),
      //   ...this._films.slice(index + 1)
      // ];
      // this._popupComponent.updateData(Object.assign({}, data), false);
    })
    .catch(err => alert(err));
  }

  _createNewComment() {
    return {
      comment: this._popupComponent._data.userComment ? this._popupComponent._data.userComment : null,
      emotion: this._popupComponent._data.emoji ? this._popupComponent._data.emoji.split(`emoji-`).join(``) : null,
      date: new Date(),
    };
  }

  destroy() {
    this._filmComponent.remove();
    if (this._popupComponent) {
      this._popupComponent.remove();
    }
  }

  _onWatchListBtnClick(evt) {
    evt.preventDefault();
    this._changeData(UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({}, this._filmData, {isInWatchList: !this._filmData.isInWatchList}),
        this._filmComponent);
  }

  _onWatchedBtnClick(evt) {
    evt.preventDefault();
    this._changeData(UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({}, this._filmData, {isInWatched: !this._filmData.isInWatched, watchingDate: !this._filmData.isInWatched ? new Date() : null}),
        this._filmComponent);
  }

  _onFavoritesBtnClick(evt) {
    evt.preventDefault();
    this._changeData(UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign({}, this._filmData, {isInFavorites: !this._filmData.isInFavorites}),
        this._filmComponent);
  }
}
