import Profile from "./view/profile.js";
import MainNav from "./view/main-nav.js";
import FooterStatistics from "./view/footer-statistics-value.js";
import FilmsModel from "./model/films.js";
import {generateFilmData} from "./mock/film-data.js";
import {generateUserStatus} from "./mock/user-status.js";
import {generateNavStats} from "./mock/main-nav.js";
import {RenderPosition, render} from "./utils/render.js";
import MovieList from "./presenter/movie-list.js";


const CARD_QUANTITY = 3;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const currentUserStatus = generateUserStatus();

const films = Array.from(Array(CARD_QUANTITY), generateFilmData);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const navStats = generateNavStats(films);

render(headerElement, new Profile(currentUserStatus), RenderPosition.BEFOREEND);
render(mainElement, new MainNav(navStats), RenderPosition.AFTERBEGIN);

const filmsListPresenter = new MovieList(mainElement, filmsModel);
filmsListPresenter.init();

render(footerStatisticsElement, new FooterStatistics(films.length).getElement(), RenderPosition.BEFOREEND);
