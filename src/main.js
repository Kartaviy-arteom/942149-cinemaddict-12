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
import {getRandomInteger} from "./utils.js";

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

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsContainer, createFilmCard(films[i]), `beforeend`);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedTFilmCount = FILM_COUNT_PER_STEP;
  render(filmList, createShowMoreBtn(), `beforeend`);

  const showMoreBtn = filmList.querySelector(`.films-list__show-more`);

  showMoreBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films.slice(renderedTFilmCount, renderedTFilmCount + FILM_COUNT_PER_STEP).forEach((film) => render(filmsContainer, createFilmCard(film), `beforeend`));
    renderedTFilmCount += FILM_COUNT_PER_STEP;

    if (renderedTFilmCount >= films.length) {
      showMoreBtn.remove();
    }
  });
}

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

document.querySelector(`.film-details`).style.position = `static`;
