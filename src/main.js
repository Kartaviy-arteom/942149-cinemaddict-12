import Profile from "./view/profile.js";
import MainNav from "./view/main-nav.js";
import SortList from "./view/sort-list.js";
import FilmsBlock from "./view/films-block.js";
import FilmCard from "./view/film-card.js";
import ShowMoreBtn from "./view/show-more-btn.js";
import ExtraList from "./view/extra-list.js";
import FooterStatistics from "./view/footer-statistics-value.js";
import Popup from "./view/popup.js";
import NoData from "./view/no-data.js";
import {generateFilmData} from "./mock/film-data.js";
import {generateUserStatus} from "./mock/user-status.js";
import {generateNavStats} from "./mock/main-nav.js";
import {getRandomInteger, RenderPosition, render} from "./utils.js";
import {createFilmCard} from "./view/film-card.js";

const CARD_QUANTITY = 70;
const FILM_COUNT_PER_STEP = 5;
const GROUP_COUNT_PER_STEP = 1;
const EXTRA_CARDS_COUNT = 2;
const ESC_KEY_CODE = 27;

const TOP_RATED_TITLE = `Top rated`;
const MOST_COMMENTED_TITLE = `Most commented`;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const currentUserStatus = generateUserStatus();

const films = Array.from(Array(CARD_QUANTITY), generateFilmData);
let transformedFilms = [];
for (let i = 0; i < films.length; i += FILM_COUNT_PER_STEP) {
  transformedFilms.push(films.slice(i, i + FILM_COUNT_PER_STEP));
}
const numberOfFilmsGroup = transformedFilms.length;

const navStats = generateNavStats(films);

render(headerElement, new Profile(currentUserStatus).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MainNav(navStats).getElement(), RenderPosition.AFTERBEGIN);
render(mainElement, new SortList().getElement(), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsBlock();
render(mainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);

const filmList = filmsComponent.getElement().querySelector(`.films-list`);
const filmsContainer = filmList.querySelector(`.films-list__container`);

if (films.length === 0) {
  render(filmList, new NoData().getElement(), RenderPosition.AFTERBEGIN);
} else {

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

  transformedFilms[0].forEach((el) => renderFilmCard(filmsContainer, el));

  if (numberOfFilmsGroup > GROUP_COUNT_PER_STEP) {
    let renderedFilmGroupCount = GROUP_COUNT_PER_STEP;
    const showMoreBtnComponent = new ShowMoreBtn();

    render(filmList, showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

    showMoreBtnComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      transformedFilms[renderedFilmGroupCount].forEach((el) => renderFilmCard(filmsContainer, el));
      renderedFilmGroupCount += GROUP_COUNT_PER_STEP;

      if (renderedFilmGroupCount >= numberOfFilmsGroup) {
        showMoreBtnComponent.getElement().remove();
        showMoreBtnComponent.removeElement();
      }
    });
  }

  const choseRandomCardsTemplate = (filmsData, cardquantity) => {
    let template = ``;
    for (let i = 0; i < cardquantity; i++) {
      template += createFilmCard(films[getRandomInteger(0, filmsData.length - 1)]);
    }
    return template;
  };

  render(filmsComponent.getElement(), new ExtraList(choseRandomCardsTemplate(films, EXTRA_CARDS_COUNT), TOP_RATED_TITLE).getElement(), RenderPosition.BEFOREEND);
  render(filmsComponent.getElement(), new ExtraList(choseRandomCardsTemplate(films, EXTRA_CARDS_COUNT), MOST_COMMENTED_TITLE).getElement(), RenderPosition.BEFOREEND);
}


render(footerStatisticsElement, new FooterStatistics(films.length).getElement(), RenderPosition.BEFOREEND);
