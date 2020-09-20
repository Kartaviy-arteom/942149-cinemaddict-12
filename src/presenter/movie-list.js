import NoData from "../view/no-data.js";
import Card from "./card.js";
import ShowMoreBtn from "../view/show-more-btn.js";
import FilmsBlock from "../view/films-block.js";
import ExtraList from "../view/extra-list.js";
import SortList from "../view/sort-list.js";
import {RenderPosition, render} from "../utils/render.js";
import {sortType} from "../consts.js";
import {sortTaskDown} from "../utils/card.js";
import {updateItem} from "../utils/common.js";

const FILM_COUNT_PER_STEP = 5;
const GROUP_COUNT_PER_STEP = 1;
const extraListTitle = {
  TOP_RATED_TITLE: `Top rated`,
  MOST_COMMENTED_TITLE: `Most commented`,
};

export default class MovieList {
  constructor(boardWrapper) {
    this._filmsContainer = null;
    this._boardWrappper = boardWrapper;
    this._noDataComponent = new NoData();
    this._sortListComponent = new SortList();
    this._cardComponent = null;
    this._showMoreBtnComponent = new ShowMoreBtn();
    this._filmsBlock = new FilmsBlock();
    this._extraListComponent = new ExtraList();

    this._transformedFilmsData = [];
    this._changeSortType = this._changeSortType.bind(this);
    this._onFilmCardChange = this._onFilmCardChange.bind(this);

    this._onModeChange = this._onModeChange.bind(this);

    this._filmPresenter = {};
  }

  init(filmsData) {
    this._filmsData = filmsData.slice();
    this._sourcedfilmsData = filmsData.slice();
    this._transformFilmsData();
    this._numberOfTasksGroup = this._transformedFilmsData.length;

    this._renderSortList();
    this._sortListComponent.setSortTypeChangeHandler(this._changeSortType);

    this._renderMovieList();
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
    this._filmsData = updateItem(this._filmsData, updatedFilmCard);
    this._sourcedfilmsData = updateItem(this._sourcedfilmsData, updatedFilmCard);
    this._filmPresenter[updatedFilmCard.id].forEach((el) => el.init(updatedFilmCard));
  }

  _transformFilmsData() {
    for (let i = 0; i < this._filmsData.length; i += FILM_COUNT_PER_STEP) {
      this._transformedFilmsData.push(this._filmsData.slice(i, i + FILM_COUNT_PER_STEP));
    }
  }

  _renderNoData() {
    render(this._boardWrappper, this._noDataComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSortList() {
    render(this._boardWrappper, this._sortListComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(cardData, container = this._filmsContainer) {
    this._cardComponent = new Card(container, this._onFilmCardChange, this._onModeChange);
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
    render(this._filmList, this._showMoreBtnComponent, RenderPosition.BEFOREEND);
    this._renderedTaskGroupCount = GROUP_COUNT_PER_STEP;
    this._showMoreBtnComponent.setOnBtnClick(() => {
      this._renderGroupOfFilmCard(this._renderedTaskGroupCount);
      this._renderedTaskGroupCount += GROUP_COUNT_PER_STEP;

      if (this._renderedTaskGroupCount >= this._numberOfTasksGroup) {
        this._removeShowMoreBtn();
      }
    });
  }

  _removeShowMoreBtn() {
    this._showMoreBtnComponent.getElement().remove();
    this._showMoreBtnComponent.removeElement();
  }

  _renderMovieList() {
    render(this._boardWrappper, this._filmsBlock, RenderPosition.BEFOREEND);
    this._filmList = this._filmsBlock.getElement().querySelector(`.films-list`);
    const filmsContainer = this._filmList.querySelector(`.films-list__container`);
    this._filmsContainer = filmsContainer;


    if (this._filmsData.length === 0) {
      render(this._filmList, this._noDataComponent, RenderPosition.AFTERBEGIN);
      return;
    }
    this._renderGroupOfFilmCard(0);

    if (this._numberOfTasksGroup > GROUP_COUNT_PER_STEP) {
      this._renderShowMoreBtn();
    }

    this._renderExtraList(extraListTitle.TOP_RATED_TITLE, this._filmsData);
    this._renderExtraList(extraListTitle.MOST_COMMENTED_TITLE, this._filmsData);
  }

  _renderExtraList(typeTitle, filmData) {
    let extraListData = [];
    if (typeTitle === extraListTitle.TOP_RATED_TITLE && filmData.every((el) => el.ratingValue !== 0)) {
      extraListData = filmData.slice()
        .sort((a, b) => b.ratingValue - a.ratingValue);
      extraListData = extraListData.slice(0, 2);
      const extraListComponent = new ExtraList(typeTitle);

      extraListData.forEach((el) => this._renderFilmCard(el, extraListComponent.getFilmList()));
      render(this._filmsBlock, extraListComponent, RenderPosition.BEFOREEND);
    }

    if (typeTitle === extraListTitle.MOST_COMMENTED_TITLE && !filmData.every((el) => Object.keys(el.comments).length === 0)) {
      extraListData = filmData.slice()
        .sort((a, b) => Object.keys(b.comments).length - Object.keys(a.comments).length);
      extraListData = extraListData.slice(0, 2);
      const extraListComponent = new ExtraList(typeTitle);

      extraListData.forEach((el) => this._renderFilmCard(el, extraListComponent.getFilmList()));
      render(this._filmsBlock, extraListComponent, RenderPosition.BEFOREEND);
    }
  }

  _changeSortType(chosenSortType) {
    if (this._currentSortType === chosenSortType) {
      return;
    }

    this._sortCards(chosenSortType);
    this._clearBordCardList();
    this._transformedFilmsData = [];
    this._transformFilmsData();
    this._renderGroupOfFilmCard(0);
    if (this._numberOfTasksGroup > GROUP_COUNT_PER_STEP) {
      this._renderShowMoreBtn();
    }
  }

  _sortCards(chosenSortType) {
    switch (chosenSortType) {
      case sortType.DATE:
        this._filmsData.sort(sortTaskDown);
        break;
      case sortType.RATING:
        this._filmsData.sort((a, b) => b.ratingValue - a.ratingValue);
        break;
      default:
        this._filmsData = this._sourcedfilmsData.slice();
    }

    this._currentSortType = sortType;
  }

  _clearBordCardList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedTaskGroupCount = GROUP_COUNT_PER_STEP;
  }
}
