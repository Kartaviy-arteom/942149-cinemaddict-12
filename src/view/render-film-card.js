import FilmCard from "./film-card.js";
import Popup from "./popup.js";
import {RenderPosition, render} from "../utils.js";

const ESC_KEY_CODE = 27;

export const renderFilmCard = (filmListElement, filmData) => {
  const filmComponent = new FilmCard(filmData);
  const popupComponent = new Popup(filmData);
  const popupCloseBtn = popupComponent.getElement().querySelector(`.film-details__close-btn`);

  const replaceFilmToPopup = () => {
    filmListElement.replaceChild(popupComponent.getElement(), filmComponent.getElement());
  };

  const replacePopupToFilm = () => {
    filmListElement.replaceChild(filmComponent.getElement(), popupComponent.getElement());
  };

  const closePopup = (evt) => {
    evt.preventDefault();
    replacePopupToFilm();
    document.removeEventListener(`keydown`, onEscKeyDown);
    popupCloseBtn.removeEventListener(`click`, onPopupCloseBtnClick);
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      closePopup(evt);
    }
  };

  const onPopupCloseBtnClick = (evt) => {
    closePopup(evt);
  };

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
  const filmTitle = filmComponent.getElement().querySelector(`.film-card__title`);
  const filmPoster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const filmCommentsBlock = filmComponent.getElement().querySelector(`.film-card__comments`);

  const popupTargets = [filmTitle, filmPoster, filmCommentsBlock];

  popupTargets.forEach((el) => el.addEventListener(`click`, () => {
    replaceFilmToPopup();
    popupCloseBtn.addEventListener(`click`, onPopupCloseBtnClick);
    document.addEventListener(`keydown`, onEscKeyDown);
  }));
};
