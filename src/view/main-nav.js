import BaseComponent from "./base-component.js";
import {STATS_ITEM} from "../consts";

const createFilterItemTemplate = (filter, currentActiveItem) => {
  const {type, name, count} = filter;
  return (`<a href="#${type}" class="main-navigation__item ${currentActiveItem === type ? `main-navigation__item--active` : ``}" data-type="${type}">${name}${type !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`);
};

const createMainNavTemplate = (filterItems, currentActiveItem) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentActiveItem))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional ${currentActiveItem === STATS_ITEM ? `main-navigation__additional--active` : ``}">Stats</a>
    </nav>`;
};

export default class MainNav extends BaseComponent {
  constructor(filters, currentActiveItem) {
    super();
    this._filters = filters;
    this._currentActiveItem = currentActiveItem;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this.setStatsBtnClick = this.setStatsBtnClick.bind(this);
  }

  _getTemplate() {
    return createMainNavTemplate(this._filters, this._currentActiveItem);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.classList.contains(`main-navigation__item`)) {
      evt.preventDefault();
      this._callback.filterTypeChange(evt.target.dataset.type);
    }

    if (evt.target.classList.contains(`main-navigation__item-count`)) {
      evt.preventDefault();
      this._callback.filterTypeChange(evt.target.closest(`a`).dataset.type);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }

  setStatsBtnClick(callback) {
    this._callback.statsBtnClick = callback;
    this._additionalBlock = this.getElement().querySelector(`.main-navigation__additional`);
    this._additionalBlock.addEventListener(`click`, this._callback.statsBtnClick);
  }

  _removeHandlers() {
    this.getElement().removeEventListener(`click`, this._filterTypeChangeHandler);
    this._additionalBlock.removeEventListener(`click`, this._callback.statsBtnClick);
  }

  remove() {
    super.remove();
    this._removeHandlers();
  }
}
