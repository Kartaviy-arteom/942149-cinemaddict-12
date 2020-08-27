import Profile from "./view/profile.js";
import MainNav from "./view/main-nav.js";
import SortList from "./view/sort-list.js";
import FilmsBlock from "./view/films-block.js";
import ShowMoreBtn from "./view/show-more-btn.js";
import ExtraList from "./view/extra-list.js";
import FooterStatistics from "./view/footer-statistics-value.js";
import NoData from "./view/no-data.js";
import {renderFilmCard} from "./view/render-film-card.js";
import {generateFilmData} from "./mock/film-data.js";
import {generateUserStatus} from "./mock/user-status.js";
import {generateNavStats} from "./mock/main-nav.js";
import {getRandomInteger, RenderPosition, render} from "./utils.js";


const CARD_QUANTITY = 70;
const FILM_COUNT_PER_STEP = 5;
const GROUP_COUNT_PER_STEP = 1;
const EXTRA_CARDS_COUNT = 2;

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
    let randomData = [];
    for (let i = 0; i < cardquantity; i++) {
      randomData.push(films[getRandomInteger(0, filmsData.length - 1)]);
    }
    return randomData;
  };

  render(filmsComponent.getElement(), new ExtraList(TOP_RATED_TITLE, choseRandomCardsTemplate(films, EXTRA_CARDS_COUNT)).getElementWithChildren(), RenderPosition.BEFOREEND);
  render(filmsComponent.getElement(), new ExtraList(MOST_COMMENTED_TITLE, choseRandomCardsTemplate(films, EXTRA_CARDS_COUNT)).getElementWithChildren(), RenderPosition.BEFOREEND);
}


render(footerStatisticsElement, new FooterStatistics(films.length).getElement(), RenderPosition.BEFOREEND);
