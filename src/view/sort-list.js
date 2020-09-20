import BaseComponent from "./base-component.js";
import {SortType} from "../consts.js";

const ACTIVE_BTN_CLASS_NAME = `sort__button--active`;

const createSortListTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class SortList extends BaseComponent {
  constructor() {
    super();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }
  _getTemplate() {
    return createSortListTemplate();
  }

  _onSortTypeChange(evt) {
    if (evt.target.tagName.toLowerCase() !== `a`) {
      return;
    }

    evt.preventDefault();
    if (!evt.target.classList.contains(ACTIVE_BTN_CLASS_NAME)) {
      const a = this.getElement().querySelector(`.${ACTIVE_BTN_CLASS_NAME}`);
      a.classList.remove(ACTIVE_BTN_CLASS_NAME);
      evt.target.classList.add(ACTIVE_BTN_CLASS_NAME);
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onSortTypeChange);
  }
}
