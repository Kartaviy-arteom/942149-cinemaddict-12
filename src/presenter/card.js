import FilmCard from "../view/film-card.js";
import Popup from "../view/popup.js";
import {RenderPosition, render} from "../utils/render.js";

const ESC_KEY_CODE = 27;

export default class Card {
  constructor(filmListElement) {
    this._filmListElement = filmListElement;
    this._filmComponent = null;
    this._popupComponent = null;

    this._openPopup = this._openPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._onPopupCloseBtnClick = this._onPopupCloseBtnClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(filmData) {
    this._filmData = filmData;

    this._filmComponent = new FilmCard(filmData);
    this._popupComponent = new Popup(filmData);

    render(this._filmListElement, this._filmComponent, RenderPosition.BEFOREEND);

    this._filmComponent.setOnFilmTitleClick(this._openPopup);
    this._filmComponent.setOnFilmPosterClick(this._openPopup);
    this._filmComponent.setOnFilmCommentsBlockClick(this._openPopup);
  }

  _replaceFilmToPopup() {
    this._filmListElement.replaceChild(this._popupComponent.getElement(), this._filmComponent.getElement());
  }

  _replacePopupToFilm() {
    this._filmListElement.replaceChild(this._filmComponent.getElement(), this._popupComponent.getElement());
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      this._closePopup();
    }
  }

  _closePopup() {
    this._replacePopupToFilm();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._popupComponent.removeOnCloseBtnClick();
  }

  _onPopupCloseBtnClick() {
    this._closePopup();
  }

  _openPopup() {
    this._replaceFilmToPopup();
    this._popupComponent.setOnCloseBtnClick(this._onPopupCloseBtnClick);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }
}
