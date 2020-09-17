import FilmCard from "./film-card.js";
import Popup from "./popup.js";
import {RenderPosition, render} from "../utils/render.js";

const ESC_KEY_CODE = 27;

export const renderFilmCard = (filmListElement, filmData) => {
  const filmComponent = new FilmCard(filmData);
  const popupComponent = new Popup(filmData);

  const replaceFilmToPopup = () => {
    filmListElement.replaceChild(popupComponent.getElement(), filmComponent.getElement());
  };

  const replacePopupToFilm = () => {
    filmListElement.replaceChild(filmComponent.getElement(), popupComponent.getElement());
  };

  const closePopup = () => {
    replacePopupToFilm();
    document.removeEventListener(`keydown`, onEscKeyDown);
    popupComponent.removeOnCloseBtnClick();
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      closePopup(evt);
    }
  };

  const onPopupCloseBtnClick = (evt) => {
    closePopup(evt);
  };

  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);

  const openPopup = () => {
    replaceFilmToPopup();
    popupComponent.setOnCloseBtnClick(onPopupCloseBtnClick);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmComponent.setOnFilmTitleClick(openPopup);
  filmComponent.setOnFilmPosterClick(openPopup);
  filmComponent.setOnFilmCommentsBlockClick(openPopup);
};
