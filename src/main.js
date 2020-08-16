import Profile from "./view/profile.js";
import MainNav from "./view/main-nav.js";
import SortList from "./view/sort-list.js";
import FilmsBlock from "./view/films-block.js";
import FilmCard from "./view/film-card.js";
import ShowMoreBtn from "./view/show-more-btn.js";
import ExtraList from "./view/extra-list.js";
import FooterStatistics from "./view/footer-statistics-value.js";
import {createPopupTemplate} from "./view/popup.js";
import {generateFilmData} from "./mock/film-data.js";
import {generateUserStatus} from "./mock/user-status.js";
import {generateNavStats} from "./mock/main-nav.js";
import {getRandomInteger, RenderPosition, render, renderTemplate} from "./utils.js";

const CARD_QUANTITY = 70;
const FILM_COUNT_PER_STEP = 5;
const EXTRA_LIST_CARD_QUANTITY = 2;
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

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsContainer, new FilmCard(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedTFilmCount = FILM_COUNT_PER_STEP;
  const showMoreBtnComponent = new ShowMoreBtn();

  render(filmList, showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreBtnComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(renderedTFilmCount, renderedTFilmCount + FILM_COUNT_PER_STEP).forEach((film) => render(filmsContainer, new FilmCard(film).getElement(), RenderPosition.BEFOREEND));
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
    render(filmContainer, new FilmCard(films[getRandomInteger(0, films.length - 1)]).getElement(), RenderPosition.BEFOREEND);
  }
});

render(footerStatisticsElement, new FooterStatistics(films).getElement(), RenderPosition.BEFOREEND);
renderTemplate(document.body, createPopupTemplate(films[0]), `beforeend`);

document.querySelector(`.film-details`).style.position = `static`;
