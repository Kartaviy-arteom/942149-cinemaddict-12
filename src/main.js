import Profile from "./presenter/profile.js";
import MainNav from "./presenter/main-nav.js";
import FooterStatistics from "./view/footer-statistics.js";
import FilmsModel from "./model/films.js";
import {RenderPosition, render} from "./utils/render.js";
import MovieList from "./presenter/movie-list.js";
import FilterModel from "./model/filter.js";
import {UpdateType} from "./consts.js";
import Api from "./api.js";


const AUTHORIZATION = `Basic hd65erv7daaasWEbfsckll3a5n`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);


const filmsModel = new FilmsModel();
api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  })
  .finally(() => {
    let footerStatistic = new FooterStatistics(filmsModel.getFilms().length).getElement();
    render(footerStatisticsElement, footerStatistic, RenderPosition.BEFOREEND);
  });


const filterModel = new FilterModel();
const profilePresenter = new Profile(headerElement, filmsModel);
const filmsListPresenter = new MovieList(mainElement, filmsModel, filterModel, api);
const mainNavPresenter = new MainNav(mainElement, filterModel, filmsModel);

profilePresenter.init();
mainNavPresenter.init();
filmsListPresenter.init(mainNavPresenter);
