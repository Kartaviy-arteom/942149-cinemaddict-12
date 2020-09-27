import MainNavView from "../view/main-nav.js";
import FilmBoard from "./movie-list.js";
import StatisticView from "../view/statistic.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {FilterType, UpdateType, STATS_ITEM} from "../consts.js";

export default class MainNav {
  constructor(mainNavContainer, filterModel, filmsModel) {
    this._mainNavContainer = mainNavContainer;
    this._filmBoard = new FilmBoard();
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._currentFilter = null;
    this._board = null;

    this._mainNavComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._handleStatsOpen = this._handleStatsOpen.bind(this);
  }

  init(activeItem) {
    if (activeItem) {
      this._currentFilter = activeItem;
    } else {
      this._currentFilter = this._filterModel.getFilter();
    }

    const filters = this._getFilters();
    const prevMainNavComponent = this._mainNavComponent;

    this._mainNavComponent = new MainNavView(filters, this._currentFilter);
    this._mainNavComponent.setStatsBtnClick = this._mainNavComponent.setStatsBtnClick.bind(this);
    this._mainNavComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._onFormStatisticChange = this._onFormStatisticChange.bind(this);
    this._watchedFilmsData = this._getWatchedFilms(this._filmsModel.getFilms());


    if (prevMainNavComponent === null) {
      render(this._mainNavContainer, this._mainNavComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._mainNavComponent, prevMainNavComponent);
    prevMainNavComponent.remove();
    this._statisticViewComponent = new StatisticView(this._watchedFilmsData);
  }

  _getWatchedFilms(data) {
    return data.slice().filter((film) => film.isInWatched);
  }

  getBoard(board) {
    this._board = board;
    this._mainNavComponent.setStatsBtnClick(this._handleStatsOpen);
  }

  _renderStatistic() {
    render(this._mainNavContainer, this._statisticViewComponent, RenderPosition.BEFOREEND);
    this._statisticViewComponent.setChart();
  }

  _onFormStatisticChange(evt) {
    this._statisticViewComponent.remove();
    this._statisticViewComponent = new StatisticView(this._watchedFilmsData, evt.target.value);
    this._statisticViewComponent.setFormChangeHandler(this._onFormStatisticChange);
    this._renderStatistic();
  }

  _handleModelEvent() {
    this.init();
    this._mainNavComponent.setStatsBtnClick(this._handleStatsOpen);
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }
    if (this._statisticViewComponent) {
      this._statisticViewComponent.remove();
    }
    this._board.init(this);
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleStatsOpen(evt) {
    evt.preventDefault();
    this._board.destroy();
    this.init(STATS_ITEM);
    this._statisticViewComponent.setFormChangeHandler(this._onFormStatisticChange);
    this._renderStatistic();
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `All`,
        count: filter[FilterType.ALL](films).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](films).length
      },
    ];
  }
}
