import Profile from "./view/profile.js";
import MainNav from "./view/main-nav.js";
import SortList from "./view/sort-list.js";
import FilmsBlock from "./view/films-block.js";
import FilmCard from "./view/film-card.js";
import ShowMoreBtn from "./view/show-more-btn.js";
import ExtraList from "./view/extra-list.js";
import FooterStatistics from "./view/footer-statistics-value.js";
import Popup from "./view/popup.js";
import {generateFilmData} from "./mock/film-data.js";
import {generateUserStatus} from "./mock/user-status.js";
import {generateNavStats} from "./mock/main-nav.js";
import {getRandomInteger, RenderPosition, render} from "./utils.js";

const CARD_QUANTITY = 70;
const FILM_COUNT_PER_STEP = 5;
const EXTRA_LIST_CARD_QUANTITY = 2;
const ESC_KEY_CODE = 27;
const TOP_RATED_TITLE = `Top rated`;
const MOST_COMMENTED_TITLE = `Most commented`;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const currentUserStatus = generateUserStatus();

const films = new Array(CARD_QUANTITY).fill().map(generateFilmData);

const navStats = generateNavStats(films);

render(headerElement, new Profile(currentUserStatus).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MainNav(navStats).getElement(), RenderPosition.AFTERBEGIN);
render(mainElement, new SortList().getElement(), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsBlock();
render(mainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);

const filmList = filmsComponent.getElement().querySelector(`.films-list`);
const filmsContainer = filmList.querySelector(`.films-list__container`);

const renderFilmCard = (filmListElement, filmData) => {
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

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilmCard(filmsContainer, films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedTFilmCount = FILM_COUNT_PER_STEP;
  const showMoreBtnComponent = new ShowMoreBtn();

  render(filmList, showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreBtnComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(renderedTFilmCount, renderedTFilmCount + FILM_COUNT_PER_STEP).forEach((film) => renderFilmCard(filmsContainer, film));
    renderedTFilmCount += FILM_COUNT_PER_STEP;

    if (renderedTFilmCount >= films.length) {
      showMoreBtnComponent.getElement().remove();
      showMoreBtnComponent.removeElement();
    }
  });
}

render(filmsComponent.getElement(), new ExtraList(TOP_RATED_TITLE).getElement(), RenderPosition.BEFOREEND);
render(filmsComponent.getElement(), new ExtraList(MOST_COMMENTED_TITLE).getElement(), RenderPosition.BEFOREEND);

filmsComponent.getElement().querySelectorAll(`.films-list--extra`).forEach((el) => {
  const filmContainer = el.querySelector(`.films-list__container`);
  for (let i = 0; i < EXTRA_LIST_CARD_QUANTITY; i++) {
    renderFilmCard(filmContainer, films[getRandomInteger(0, films.length - 1)]);
  }
});

render(footerStatisticsElement, new FooterStatistics(films).getElement(), RenderPosition.BEFOREEND);
