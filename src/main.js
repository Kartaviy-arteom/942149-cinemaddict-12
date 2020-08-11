import {createProfileTemplate} from "./view/profile.js";
import {createMainNavTemplate} from "./view/main-nav.js";
import {createSortListTemplate} from "./view/sort-list.js";
import {createFilmsBlockTemplate} from "./view/films-block.js";
import {createFilmCard} from "./view/film-card.js";
import {createShowMoreBtn} from "./view/show-more-btn.js";
import {createExtraListTemplate} from "./view/extra-list.js";
import {createFooterStatisticsValueTemplate} from "./view/footer-statistics-value.js";
import {createPopupTemplate} from "./view/popup.js";
import {generateFilmData} from "./mock/film-data.js";
import {getRandomInteger} from "../utils.js";

const CARD_QUANTITY = 5;
const EXTRA_LIST_CARD_QUANTITY = 2;
const TOP_RATED_TITLE = `Top rated`;
const MOST_COMMENTED_TITLE = `Most commented`;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const films = new Array(CARD_QUANTITY).fill().map(generateFilmData);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createProfileTemplate(), `beforeend`);
render(mainElement, createMainNavTemplate(), `afterbegin`);
render(mainElement, createSortListTemplate(), `beforeend`);
render(mainElement, createFilmsBlockTemplate(), `beforeend`);

const filmsElement = mainElement.querySelector(`.films`);
const filmList = filmsElement.querySelector(`.films-list`);
const filmsContainer = filmList.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_QUANTITY; i++) {
  render(filmsContainer, createFilmCard(films[i]), `beforeend`);
}
render(filmList, createShowMoreBtn(), `beforeend`);
render(filmsElement, createExtraListTemplate(TOP_RATED_TITLE), `beforeend`);
render(filmsElement, createExtraListTemplate(MOST_COMMENTED_TITLE), `beforeend`);

filmsElement.querySelectorAll(`.films-list--extra`).forEach((el) => {
  const filmContainer = el.querySelector(`.films-list__container`);
  for (let i = 0; i < EXTRA_LIST_CARD_QUANTITY; i++) {
    render(filmContainer, createFilmCard(films[getRandomInteger(0, films.length - 1)]), `beforeend`);
  }
});

render(footerStatisticsElement, createFooterStatisticsValueTemplate(films), `beforeend`);
render(document.body, createPopupTemplate(films[0]), `beforeend`);

// document.querySelector(`.film-details`).style.display = `none`;
