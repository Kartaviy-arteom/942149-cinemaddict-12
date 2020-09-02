import BaseComponent from "./base-component.js";
import {sortType} from "../consts.js";

const createSortListTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${sortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${sortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${sortType.RATING}">Sort by rating</a></li>
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
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onSortTypeChange);
  }
}
