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
import {generateUserStatus} from "./mock/user-status.js";
import {generateNavStats} from "./mock/main-nav.js";


const CARD_QUANTITY = 70;
const FILM_COUNT_PER_STEP = 5;
const GROUP_COUNT_PER_STEP = 1;

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

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const navStats = generateNavStats(films);

render(headerElement, createProfileTemplate(currentUserStatus), `beforeend`);
render(mainElement, createMainNavTemplate(navStats), `afterbegin`);
render(mainElement, createSortListTemplate(), `beforeend`);
render(mainElement, createFilmsBlockTemplate(), `beforeend`);

const filmsElement = mainElement.querySelector(`.films`);
const filmList = filmsElement.querySelector(`.films-list`);
const filmsContainer = filmList.querySelector(`.films-list__container`);

transformedFilms[0].forEach((el) => render(filmsContainer, createFilmCard(el), `beforeend`));

if (numberOfFilmsGroup > GROUP_COUNT_PER_STEP) {
  let renderedFilmGroupCount = GROUP_COUNT_PER_STEP;
  render(filmList, createShowMoreBtn(), `beforeend`);

  const showMoreBtn = filmList.querySelector(`.films-list__show-more`);

  showMoreBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    transformedFilms[renderedFilmGroupCount].forEach((el) => render(filmsContainer, createFilmCard(el), `beforeend`));
    renderedFilmGroupCount += GROUP_COUNT_PER_STEP;

    if (renderedFilmGroupCount >= numberOfFilmsGroup) {
      showMoreBtn.remove();
    }
  });
}

render(filmsElement, createExtraListTemplate(films, TOP_RATED_TITLE), `beforeend`);
render(filmsElement, createExtraListTemplate(films, MOST_COMMENTED_TITLE), `beforeend`);

render(footerStatisticsElement, createFooterStatisticsValueTemplate(films.length), `beforeend`);
render(document.body, createPopupTemplate(films[0]), `beforeend`);

document.querySelector(`.film-details`).style.position = `static`;
