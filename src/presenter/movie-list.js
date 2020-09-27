import NoData from "../view/no-data.js";
import Card from "./card.js";
import ShowMoreBtn from "../view/show-more-btn.js";
import FilmsBlock from "../view/films-block.js";
import ExtraList from "../view/extra-list.js";
import SortList from "../view/sort-list.js";
import LoadingView from "../view/loading.js";
import {RenderPosition, render} from "../utils/render.js";
import {SortType} from "../consts.js";
import {sortTaskDown} from "../utils/card.js";
import {UserAction, UpdateType} from "../consts.js";
import {filter} from "../utils/filter.js";

const FILM_COUNT_PER_STEP = 5;
const GROUP_COUNT_PER_STEP = 1;
const extraListTitle = {
  TOP_RATED_TITLE: `Top rated`,
  MOST_COMMENTED_TITLE: `Most commented`,
};

export default class MovieList {
  constructor(boardWrapper, filmsModel, filterModel, api) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filmsContainer = null;
    this._api = api;
    this._boardWrappper = boardWrapper;
    this._noDataComponent = new NoData();
    this._sortListComponent = new SortList();
    this._cardComponent = null;
    this._showMoreBtnComponent = null;
    this._filmsBlock = new FilmsBlock();
    this._extraListComponent = new ExtraList();
    this._renderedFilmGroupCount = GROUP_COUNT_PER_STEP;

    this._transformedFilmsData = [];
    this._isLoading = true;
    this._loadingComponent = new LoadingView();
    this._changeSortType = this._changeSortType.bind(this);
    this._onFilmCardChange = this._onFilmCardChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._onModeChange = this._onModeChange.bind(this);

    this._filmPresenter = {};
  }

  init(MainNavPresenter) {

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._transformFilmsData();
    this._numberOfFilmsGroup = this._transformedFilmsData.length;

    this._renderMovieList();

    this._MainNavPresenter = MainNavPresenter;

    this._MainNavPresenter.getBoard(this);
  }

  destroy() {
    this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
    this._filmsBlock.remove();
    this._sortListComponent.remove();

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films.slice());

    switch (this._currentSortType) {
      case SortType.DATE:
        filtredFilms.sort(sortTaskDown);
        break;
      case SortType.RATING:
        filtredFilms.sort((a, b) => b.ratingValue - a.ratingValue);
        break;
    }

    return filtredFilms;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response);
        });
        break;
      case UserAction.GET_COMMENTS:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        for (let key in this._filmPresenter) {
          if (Object.prototype.hasOwnProperty.call(this._filmPresenter, key)) {
            this._filmPresenter[key].forEach((el) => {
              if (data.id === el.id) {
                el[data.id].init(data);
              }
            });
          }
        }
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderMovieList();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderMovieList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        this._loadingComponent.remove();
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderMovieList();
        break;
    }
  }

  _onModeChange() {
    this._setDefautMode();
  }

  _setDefautMode() {
    Object
    .values(this._filmPresenter)
    .forEach((presenters) => presenters.forEach((el) => el.resetView()));
  }


  _onFilmCardChange(updatedFilmCard) {
    this._filmPresenter[updatedFilmCard.id].forEach((el) => el.init(updatedFilmCard));
  }

  _transformFilmsData() {
    const filmsData = this._getFilms();
    for (let i = 0; i < filmsData.length; i += FILM_COUNT_PER_STEP) {
      this._transformedFilmsData.push(filmsData.slice(i, i + FILM_COUNT_PER_STEP));
    }
  }

  _renderNoData() {
    render(this._boardWrappper, this._noDataComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoading() {
    render(this._filmsContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderSortList() {
    render(this._boardWrappper, this._sortListComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(cardData, container = this._filmsContainer) {
    this._cardComponent = new Card(container, this._handleViewAction, this._onModeChange, this._api);
    this._cardComponent.init(cardData);
    if (!this._filmPresenter[cardData.id]) {
      this._filmPresenter[cardData.id] = [this._cardComponent];
    } else {
      this._filmPresenter[cardData.id].push(this._cardComponent);
    }
  }

  _renderGroupOfFilmCard(groupNumber) {
    this._transformedFilmsData[groupNumber].forEach((el) => this._renderFilmCard(el));
  }

  _renderShowMoreBtn() {
    if (this._showMoreBtnComponent !== null) {
      this._showMoreBtnComponent.remove();
    }

    this._showMoreBtnComponent = new ShowMoreBtn();
    render(this._filmList, this._showMoreBtnComponent, RenderPosition.BEFOREEND);
    this._renderedFilmGroupCount = GROUP_COUNT_PER_STEP;
    this._showMoreBtnComponent.setOnBtnClick(() => {
      this._renderGroupOfFilmCard(this._renderedFilmGroupCount);
      this._renderedFilmGroupCount += GROUP_COUNT_PER_STEP;

      if (this._renderedFilmGroupCount >= this._numberOfFilmsGroup) {
        this._removeShowMoreBtn();
      }
    });
  }

  _removeShowMoreBtn() {
    this._showMoreBtnComponent.getElement().remove();
    this._showMoreBtnComponent.removeElement();
  }

  _renderMovieList() {
    this._renderSortList();
    this._sortListComponent.setSortTypeChangeHandler(this._changeSortType);
    render(this._boardWrappper, this._filmsBlock, RenderPosition.BEFOREEND);
    this._filmList = this._filmsBlock.getElement().querySelector(`.films-list`);
    const filmsContainer = this._filmList.querySelector(`.films-list__container`);
    this._filmsContainer = filmsContainer;

    if (this._isLoading) {
      this._renderLoading();
      return;
    }


    if (this._getFilms().length === 0) {
      render(this._filmList, this._noDataComponent, RenderPosition.AFTERBEGIN);
      return;
    }
    for (let i = 0; i < this._renderedFilmGroupCount; i++) {
      this._renderGroupOfFilmCard(i);
    }

    if (this._numberOfFilmsGroup > this._renderedFilmGroupCount) {
      this._renderShowMoreBtn();
    }

    this._renderTopRatedBlock();
    this._renderMostCommentedBlock();
  }

  _renderMostCommentedBlock() {
    const filmData = this._getFilms();
    let extraListData = [];
    if (this._mostCommentedComponent) {
      this._mostCommentedComponent.remove();
    }

    if (!filmData.every((el) => Object.keys(el.commentsId).length === 0)) {
      extraListData = filmData.slice()
        .sort((a, b) => b.commentsId.length - a.commentsId.length);
      extraListData = extraListData.slice(0, 2);
      if (extraListData[1] && (extraListData[1].commentsId).length === 0) {
        extraListData = extraListData.slice(0, 1);
      }


      this._mostCommentedComponent = new ExtraList(extraListTitle.MOST_COMMENTED_TITLE);

      extraListData.forEach((el) => this._renderFilmCard(el, this._mostCommentedComponent.getFilmList()));
      render(this._filmsBlock, this._mostCommentedComponent, RenderPosition.BEFOREEND);
    }
  }

  _renderTopRatedBlock() {
    const filmData = this._getFilms();
    let extraListData = [];
    if (this._topRatedComponent) {
      this._topRatedComponent.remove();
    }
    if (filmData.every((el) => el.ratingValue !== 0)) {
      extraListData = filmData.slice()
        .sort((a, b) => b.ratingValue - a.ratingValue);
      extraListData = extraListData.slice(0, 2);
      if (extraListData[1] && extraListData[1].ratingValue === 0) {
        extraListData = extraListData.slice(0, 1);
      }

      this._topRatedComponent = new ExtraList(extraListTitle.TOP_RATED_TITLE);

      extraListData.forEach((el) => this._renderFilmCard(el, this._topRatedComponent.getFilmList()));
      render(this._filmsBlock, this._topRatedComponent, RenderPosition.BEFOREEND);
    }
  }

  _changeSortType(chosenSortType) {
    if (this._currentSortType === chosenSortType) {
      return;
    }

    this._currentSortType = chosenSortType;

    this._clearBoard({resetRenderedTaskCount: true, resetSortType: false});

    this._renderMovieList();
  }

  _sortCards(chosenSortType) {
    switch (chosenSortType) {
      case SortType.DATE:
        this._filmsData.sort(sortTaskDown);
        break;
      case SortType.RATING:
        this._filmsData.sort((a, b) => b.ratingValue - a.ratingValue);
        break;
      default:
        this._filmsData = this._sourcedfilmsData.slice();
    }

    this._currentSortType = SortType;
  }

  _clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    this._transformedFilmsData = [];
    this._transformFilmsData();
    this._numberOfFilmsGroup = this._transformedFilmsData.length;

    Object
      .values(this._filmPresenter)
      .forEach((presenters) => presenters.forEach((presenter)=> presenter.destroy()));
    this._filmPresenter = {};

    if (this._showMoreBtnComponent !== null) {
      this._noDataComponent.remove();
    }
    if (this._showMoreBtnComponent !== null) {
      this._showMoreBtnComponent.remove();
    }

    if (this._noDataComponent !== null) {
      this._noDataComponent.remove();
    }

    if (this._topRatedComponent) {
      this._topRatedComponent.remove();
    }
    if (this._mostCommentedComponent) {
      this._mostCommentedComponent.remove();
    }

    if (resetRenderedTaskCount) {
      this._renderedFilmGroupCount = GROUP_COUNT_PER_STEP;
    } else {

      this._renderedFilmGroupCount = Math.min(this._renderedFilmGroupCount, this._numberOfFilmsGroup);
    }

    if (resetSortType) {
      if (this._sortListComponent !== null) {
        this._sortListComponent.remove();
      }
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
