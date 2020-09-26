import Profile from "./presenter/profile.js";
import MainNav from "./presenter/main-nav.js";
import FooterStatistics from "./view/footer-statistics-value.js";
import FilmsModel from "./model/films.js";
import {generateFilmData} from "./mock/film-data.js";
import {RenderPosition, render} from "./utils/render.js";
import MovieList from "./presenter/movie-list.js";
import FilterModel from "./model/filter.js";


const CARD_QUANTITY = 30;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);


const films = Array.from(Array(CARD_QUANTITY), generateFilmData);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const profilePresenter = new Profile(headerElement, filmsModel);
const filmsListPresenter = new MovieList(mainElement, filmsModel, filterModel);
const mainNavPresenter = new MainNav(mainElement, filterModel, filmsModel);

profilePresenter.init();
mainNavPresenter.init();
filmsListPresenter.init(mainNavPresenter);

render(footerStatisticsElement, new FooterStatistics(films.length).getElement(), RenderPosition.BEFOREEND);
