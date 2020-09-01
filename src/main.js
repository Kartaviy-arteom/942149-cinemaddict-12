import Profile from "./view/profile.js";
import MainNav from "./view/main-nav.js";
import SortList from "./view/sort-list.js";
import FooterStatistics from "./view/footer-statistics-value.js";
import {generateFilmData} from "./mock/film-data.js";
import {generateUserStatus} from "./mock/user-status.js";
import {generateNavStats} from "./mock/main-nav.js";
import {RenderPosition, render} from "./utils/render.js";
import MovieList from "./presenter/movie-list.js";


const CARD_QUANTITY = 10;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const currentUserStatus = generateUserStatus();

const films = Array.from(Array(CARD_QUANTITY), generateFilmData);

const navStats = generateNavStats(films);

render(headerElement, new Profile(currentUserStatus), RenderPosition.BEFOREEND);
render(mainElement, new MainNav(navStats), RenderPosition.AFTERBEGIN);
render(mainElement, new SortList(), RenderPosition.BEFOREEND);

const filmsListPresenter = new MovieList(mainElement);
filmsListPresenter.init(films);

render(footerStatisticsElement, new FooterStatistics(films.length).getElement(), RenderPosition.BEFOREEND);
