import Profile from "./view/profile.js";
import MainNav from "./presenter/main-nav.js";
import FooterStatistics from "./view/footer-statistics-value.js";
import FilmsModel from "./model/films.js";
import {generateFilmData} from "./mock/film-data.js";
import {generateUserStatus} from "./mock/user-status.js";

import {RenderPosition, render} from "./utils/render.js";
import MovieList from "./presenter/movie-list.js";
import FilterModel from "./model/filter.js";


const CARD_QUANTITY = 3;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const currentUserStatus = generateUserStatus();

const films = Array.from(Array(CARD_QUANTITY), generateFilmData);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();


render(headerElement, new Profile(currentUserStatus), RenderPosition.BEFOREEND);

const filmsListPresenter = new MovieList(mainElement, filmsModel, filterModel);
const MainNavPresenter = new MainNav(mainElement, filterModel, filmsModel);

MainNavPresenter.init();
filmsListPresenter.init();

render(footerStatisticsElement, new FooterStatistics(films.length).getElement(), RenderPosition.BEFOREEND);
